import { useState, useEffect, useRef } from 'react';
import { X, Sparkles, Check, RotateCcw, AlertTriangle, ChevronDown, ChevronUp, Download, Upload, Loader, Ban } from 'lucide-react';
import { useTaskStore } from '../../store/task-store';
import { useAuthStore } from '../../store/auth-store';
import { useMobile } from '../../hooks/useMobile';
import { getBbosTaskDef, getBbosTaskDeps, BBOS_VALIDATION_FLAG_LABELS } from '@data/bbos/bbos-task-definitions';
import { getStage } from '@data/bbos/bbos-pipeline';
import { downloadTaskTemplate, validateTaskTemplate, importTaskTemplate } from '@services/bbos-template';
import { useAppStore } from '../../store/app-store';
import { usePeopleStore, getInitials } from '../../store/people-store';
import { useProjectStore } from '../../store/project-store';
import { getAiConfig, hasAiConfig } from '@services/ai/ai-settings';
import { streamCompletion, AiClientError } from '@services/ai/ai-client';
import { buildPrompt } from '@services/ai/prompt-builder';
import { parseAiResponse } from '@services/ai/response-parser';
import GLabelPicker from '../shared/GLabelPicker';
import './BbosTaskPanel.css';

function formatDateTime(iso) {
  if (!iso) return '';
  return new Date(iso).toLocaleString('en', {
    month: 'short', day: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit', hour12: true,
  });
}

export default function BbosTaskPanel({ project, projectId, taskId, onClose }) {
  const mobile = useMobile();
  const task = useTaskStore((s) => s.getTask(projectId, taskId));
  const taskStore = useTaskStore();
  const updateTask = taskStore.updateTask;
  const updateBbosFieldData = taskStore.updateBbosFieldData;
  const moveTask = taskStore.moveTask;
  const user = useAuthStore((s) => s.user);
  const setActiveBbosTaskType = useAppStore((s) => s.setActiveBbosTaskType);
  const clearActiveBbosTaskType = useAppStore((s) => s.clearActiveBbosTaskType);
  const employees = usePeopleStore((s) => s.employees);
  const addProjectMember = useProjectStore((s) => s.addProjectMember);
  const projectMembers = (project?.members || [])
    .map((id) => employees.find((e) => e.id === id))
    .filter(Boolean);
  const allEmployees = employees.filter((e) => e.status !== 'terminated');
  const assignee = task ? employees.find((e) => e.id === task.assigneeId) : null;
  const templateInputRef = useRef(null);

  const [rationaleOpen, setRationaleOpen] = useState(false);
  const [localFields, setLocalFields] = useState({});
  const [notes, setNotes] = useState('');
  const [streamingText, setStreamingText] = useState('');
  const [draftWarnings, setDraftWarnings] = useState([]);
  const saveTimeout = useRef(null);
  const abortRef = useRef(null);

  const def = task?.bbosTaskType ? getBbosTaskDef(task.bbosTaskType) : null;
  const stage = def ? getStage(def.stage) : null;
  const deps = def ? getBbosTaskDeps(def.id) : { upstream: [], downstream: [], requirements: '' };

  useEffect(() => {
    if (task?.bbosFieldData) {
      setLocalFields(task.bbosFieldData);
    }
    if (task) setNotes(task.notes || '');
  }, [taskId]);

  // Clean up debounced save on unmount — prevents stale writes after panel close
  useEffect(() => {
    return () => clearTimeout(saveTimeout.current);
  }, []);

  // Wire active BBOS task type for journal badge context
  useEffect(() => {
    if (def?.id) setActiveBbosTaskType(def.id);
    return () => clearActiveBbosTaskType();
  }, [def?.id]);

  if (!task || !def) return null;

  const fieldData = task.bbosFieldData || {};
  const aiDraftStatus = fieldData._aiDraftStatus || 'none';
  const aiDraftTimestamp = fieldData._aiDraftTimestamp || null;

  const advanceToInProgress = () => {
    const toDoCol = project.columns?.find((c) => c.name === 'To Do');
    const inProgressCol = project.columns?.find((c) => c.name === 'In Progress');
    if (inProgressCol && task.columnId === toDoCol?.id) {
      moveTask(projectId, taskId, inProgressCol.id, 0, project.columns);
    }
  };

  const handleFieldChange = (fieldId, value) => {
    const next = { ...localFields, [fieldId]: value };
    setLocalFields(next);
    clearTimeout(saveTimeout.current);
    saveTimeout.current = setTimeout(() => {
      updateBbosFieldData(projectId, taskId, fieldId, value);
      // Auto-advance when at least 2 user fields have content (or 1 field with 50+ chars)
      if (!fieldId.startsWith('_')) {
        const filled = Object.entries(next)
          .filter(([k, v]) => !k.startsWith('_') && typeof v === 'string' && v.trim().length > 0);
        if (filled.length >= 2 || filled.some(([, v]) => v.trim().length >= 50)) {
          advanceToInProgress();
        }
      }
    }, 300);
  };

  const handleNotesChange = (e) => {
    setNotes(e.target.value);
    clearTimeout(saveTimeout.current);
    saveTimeout.current = setTimeout(() => {
      updateTask(projectId, taskId, { notes: e.target.value });
    }, 300);
  };

  const handleGLabelChange = (gLabel) => {
    updateTask(projectId, taskId, { gLabel });
  };

  const handleGenerateDraft = async () => {
    if (!hasAiConfig()) return;

    const config = getAiConfig();
    const now = new Date().toISOString();

    // Set generating status
    updateBbosFieldData(projectId, taskId, '_aiDraftStatus', 'generating');
    updateBbosFieldData(projectId, taskId, '_aiDraftTimestamp', now);
    updateBbosFieldData(projectId, taskId, '_aiDraftError', '');
    setStreamingText('');
    setDraftWarnings([]);

    // Build prompt
    const { system, messages } = buildPrompt(def, projectId);

    // Set up abort controller
    const controller = new AbortController();
    abortRef.current = controller;

    try {
      let fullText = '';
      for await (const chunk of streamCompletion(config, system, messages, controller.signal)) {
        fullText += chunk;
        setStreamingText(fullText);
      }

      // Parse response into field data
      const { fieldData, warnings } = parseAiResponse(fullText, def);

      // Populate fields (same pattern as template import)
      for (const [fieldId, value] of Object.entries(fieldData)) {
        updateBbosFieldData(projectId, taskId, fieldId, value);
      }
      setLocalFields((prev) => ({ ...prev, ...fieldData }));
      setDraftWarnings(warnings);
      advanceToInProgress();

      // Mark as pending (review state)
      updateBbosFieldData(projectId, taskId, '_aiDraftStatus', 'pending');
    } catch (err) {
      if (err.name === 'AbortError') {
        updateBbosFieldData(projectId, taskId, '_aiDraftStatus', 'none');
        return;
      }
      const msg = err instanceof AiClientError ? err.message : 'AI generation failed. Check console for details.';
      updateBbosFieldData(projectId, taskId, '_aiDraftStatus', 'error');
      updateBbosFieldData(projectId, taskId, '_aiDraftError', msg);
      console.error('[BBOS AI Draft]', err);
    } finally {
      abortRef.current = null;
      setStreamingText('');
    }
  };

  const handleCancelDraft = () => {
    if (abortRef.current) {
      abortRef.current.abort();
      abortRef.current = null;
    }
  };

  const handleAcceptDraft = () => {
    updateBbosFieldData(projectId, taskId, '_aiDraftStatus', 'accepted');
    setDraftWarnings([]);
  };

  const handleRejectDraft = () => {
    // Clear AI-generated field values
    for (const field of def.fields) {
      updateBbosFieldData(projectId, taskId, field.id, '');
    }
    setLocalFields((prev) => {
      const cleared = { ...prev };
      for (const field of def.fields) cleared[field.id] = '';
      return cleared;
    });
    updateBbosFieldData(projectId, taskId, '_aiDraftStatus', 'rejected');
    setDraftWarnings([]);
  };

  const handleDownloadTemplate = () => {
    downloadTaskTemplate(def);
  };

  const handleUploadTemplate = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const json = JSON.parse(ev.target.result);
        const validation = validateTaskTemplate(json, def);
        if (!validation.valid) {
          alert('Template validation failed:\n' + validation.errors.join('\n'));
          return;
        }
        const { fieldData, gLabel } = importTaskTemplate(json, def);
        for (const [fieldId, value] of Object.entries(fieldData)) {
          updateBbosFieldData(projectId, taskId, fieldId, value);
        }
        setLocalFields((prev) => ({ ...prev, ...fieldData }));
        if (gLabel) handleGLabelChange(gLabel);
        advanceToInProgress();
        alert(`Template imported: ${Object.keys(fieldData).length} field(s) populated.`);
      } catch (err) {
        alert('Template import failed: ' + err.message);
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const columns = project?.columns || [];
  const stageColor = stage?.color || 'var(--accent)';

  const panel = (
    <div className="bbos-task-panel slide-in-right" onClick={(e) => e.stopPropagation()}>

      {/* ── Stage header band ── */}
      <div className="btp-header" style={{ borderTopColor: stageColor }}>
        <div className="btp-header__stage">
          <span className="btp-stage-badge" style={{ color: stageColor, borderColor: stageColor }}>
            {def.stage}
          </span>
          <span className="btp-sublevel">{def.subLevel}</span>
          <span className="btp-label">{def.label}</span>
        </div>
        <button className="btp-close-btn" onClick={onClose}>
          <X size={16} />
        </button>
      </div>

      {/* ── Islamic attributes band ── */}
      <div className="btp-attrs-band">
        {def.governingAttributes.map((attr, i) => (
          <span key={attr}>
            <span className="btp-attr-name">{attr}</span>
            {i < def.governingAttributes.length - 1 && (
              <span className="btp-attr-sep"> · </span>
            )}
          </span>
        ))}
      </div>

      {/* ── Status dropdown ── */}
      <div className="btp-status-row">
        <span className="btp-section-label">Status</span>
        <select
          className="btp-field-select"
          value={task.columnId}
          onChange={(e) => moveTask(projectId, taskId, e.target.value, undefined, project.columns)}
        >
          {columns.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
      </div>

      {/* ── Assignee ── */}
      <div className="btp-status-row">
        <span className="btp-section-label">Assignee</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
          {assignee ? (
            <span className="btp-assignee-avatar">{getInitials(assignee.name)}</span>
          ) : (
            <span className="btp-assignee-avatar btp-assignee-avatar--empty">?</span>
          )}
          <select
            className="btp-field-select"
            value={task.assigneeId || ''}
            onChange={(e) => {
              const val = e.target.value;
              updateTask(projectId, taskId, { assigneeId: val || null });
              if (val) addProjectMember(projectId, val);
            }}
          >
            <option value="">Unassigned</option>
            {projectMembers.length > 0 && (
              <optgroup label="Project members">
                {projectMembers.map((e) => (
                  <option key={e.id} value={e.id}>{e.name}</option>
                ))}
              </optgroup>
            )}
            {allEmployees.filter((e) => !(project?.members || []).includes(e.id)).length > 0 && (
              <optgroup label="Add from team">
                {allEmployees
                  .filter((e) => !(project?.members || []).includes(e.id))
                  .map((e) => (
                    <option key={e.id} value={e.id}>{e.name}</option>
                  ))}
              </optgroup>
            )}
          </select>
        </div>
      </div>

      <div className="btp-body">

        {/* ── Purpose block ── */}
        <div className="btp-section">
          <div className="btp-section-label">Purpose</div>
          <p className="btp-purpose-text">{def.purpose}</p>
        </div>

        {/* ── Dependencies ── */}
        {(deps.upstream.length > 0 || deps.downstream.length > 0) && (
          <div className="btp-section">
            <div className="btp-section-label">Dependencies</div>
            {deps.requirements && (
              <p className="btp-deps-requirements">{deps.requirements}</p>
            )}
            {deps.upstream.length > 0 && (
              <div className="btp-deps-group">
                <span className="btp-deps-direction">Upstream</span>
                {deps.upstream.map((u) => (
                  <span key={u.id} className="btp-dep-chip btp-dep-chip--upstream">
                    {u.id} — {u.label}
                  </span>
                ))}
              </div>
            )}
            {deps.downstream.length > 0 && (
              <div className="btp-deps-group">
                <span className="btp-deps-direction">Downstream</span>
                {deps.downstream.map((d) => (
                  <span key={d.id} className="btp-dep-chip btp-dep-chip--downstream">
                    {d.id} — {d.label}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── Theological Rationale (collapsible) ── */}
        <div className="btp-section">
          <button
            className="btp-rationale-toggle"
            onClick={() => setRationaleOpen(!rationaleOpen)}
          >
            <span>Theological Rationale</span>
            {rationaleOpen ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
          </button>
          {rationaleOpen && (
            <p className="btp-rationale-text">{def.attrMeaning}</p>
          )}
        </div>

        {/* ── Per-Task Template ── */}
        <div className="btp-section">
          <div className="btp-section-label">Task Template</div>
          <div className="btp-template-box">
            <p className="btp-template-hint">Download a blank JSON template for this task</p>
            <div className="btp-template-actions">
              <button className="btp-template-btn" onClick={handleDownloadTemplate}>
                <Download size={14} /> Template
              </button>
              <button className="btp-template-btn" onClick={() => templateInputRef.current?.click()}>
                <Upload size={14} /> Upload
              </button>
              <input
                ref={templateInputRef}
                type="file"
                accept=".json,.bbos"
                onChange={handleUploadTemplate}
                style={{ display: 'none' }}
              />
            </div>
          </div>
        </div>

        <div className="btp-divider" />

        {/* ── Form fields ── */}
        <div className="btp-fields">
          {def.fields.map((field) => (
            <div key={field.id} className="btp-field">
              <label className="btp-field-label">{field.label}</label>
              {field.type === 'textarea' ? (
                <textarea
                  className="btp-field-textarea"
                  rows={field.rows || 3}
                  placeholder={field.placeholder || ''}
                  value={localFields[field.id] || ''}
                  onChange={(e) => handleFieldChange(field.id, e.target.value)}
                />
              ) : field.type === 'select' ? (
                <select
                  className="btp-field-select"
                  value={localFields[field.id] || ''}
                  onChange={(e) => handleFieldChange(field.id, e.target.value)}
                >
                  <option value="">Select...</option>
                  {field.options?.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              ) : field.type === 'number' ? (
                <input
                  type="number"
                  className="btp-field-input"
                  placeholder={field.placeholder || ''}
                  value={localFields[field.id] || ''}
                  onChange={(e) => handleFieldChange(field.id, e.target.value)}
                />
              ) : (
                <textarea
                  className="btp-field-input btp-field-textarea"
                  placeholder={field.placeholder || ''}
                  value={localFields[field.id] || ''}
                  onChange={(e) => handleFieldChange(field.id, e.target.value)}
                  rows={2}
                />
              )}
            </div>
          ))}
        </div>

        {/* ── G-Label ── */}
        {def.hasGLabel && (
          <div className="btp-section btp-glabel-row">
            <span className="btp-section-label">Integrity Label</span>
            <GLabelPicker
              value={task.gLabel || null}
              onChange={handleGLabelChange}
            />
          </div>
        )}

        {/* ── Notes ── */}
        <div className="btp-section">
          <div className="btp-section-label">Notes</div>
          <textarea
            className="btp-field-textarea"
            value={notes}
            onChange={handleNotesChange}
            placeholder="Add notes..."
            rows={4}
          />
        </div>

        {/* ── Validation flags ── */}
        {def.validationFlags?.length > 0 && (
          <div className="btp-flags">
            {def.validationFlags.map((flag) => {
              const info = BBOS_VALIDATION_FLAG_LABELS[flag];
              if (!info) return null;
              return (
                <div key={flag} className="btp-flag">
                  <AlertTriangle size={13} className="btp-flag-icon" />
                  <div>
                    <div className="btp-flag-label">{info.label}</div>
                    <div className="btp-flag-detail">{info.detail}</div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ── AI Draft section ── */}
        {def.hasAiDraft && (
          <div className="btp-draft-section">
            <div className="btp-section-label">AI Draft</div>

            {!hasAiConfig() && (
              <div className="btp-draft-no-key">
                <AlertTriangle size={13} />
                <span>Set your AI provider and API key in Settings to use AI drafts.</span>
              </div>
            )}

            {hasAiConfig() && aiDraftStatus === 'none' && (
              <button className="btp-generate-btn" onClick={handleGenerateDraft}>
                <Sparkles size={14} /> Generate Draft
              </button>
            )}

            {aiDraftStatus === 'generating' && (
              <div className="btp-draft-generating">
                <div className="btp-draft-status btp-draft-status--generating">
                  <Loader size={13} className="btp-spinner" /> Generating draft...
                </div>
                {streamingText && (
                  <div className="btp-draft-preview">
                    {streamingText.length > 300 ? '...' + streamingText.slice(-300) : streamingText}
                  </div>
                )}
                <button className="btp-draft-btn btp-draft-btn--cancel" onClick={handleCancelDraft}>
                  <Ban size={13} /> Cancel
                </button>
              </div>
            )}

            {aiDraftStatus === 'pending' && (
              <div className="btp-draft-pending">
                <div className="btp-draft-status btp-draft-status--pending">
                  <Sparkles size={12} /> AI-Generated Draft · {formatDateTime(aiDraftTimestamp)}
                </div>
                {draftWarnings.length > 0 && (
                  <div className="btp-draft-warnings">
                    {draftWarnings.map((w, i) => (
                      <div key={i} className="btp-draft-warning">
                        <AlertTriangle size={11} /> {w}
                      </div>
                    ))}
                  </div>
                )}
                <div className="btp-draft-actions">
                  <button className="btp-draft-btn btp-draft-btn--accept" onClick={handleAcceptDraft}>
                    <Check size={13} /> Accept Draft
                  </button>
                  <button className="btp-draft-btn btp-draft-btn--reject" onClick={handleRejectDraft}>
                    <RotateCcw size={13} /> Reject Draft
                  </button>
                </div>
              </div>
            )}

            {aiDraftStatus === 'accepted' && (
              <div className="btp-draft-status btp-draft-status--accepted">
                <Check size={12} /> Draft Accepted
              </div>
            )}

            {aiDraftStatus === 'error' && (
              <div className="btp-draft-error">
                <div className="btp-draft-status btp-draft-status--error">
                  <AlertTriangle size={12} /> {fieldData._aiDraftError || 'AI generation failed.'}
                </div>
                <button className="btp-generate-btn" onClick={handleGenerateDraft}>
                  <RotateCcw size={14} /> Retry
                </button>
              </div>
            )}

            {hasAiConfig() && aiDraftStatus === 'rejected' && (
              <button className="btp-generate-btn" onClick={handleGenerateDraft}>
                <RotateCcw size={14} /> Regenerate Draft
              </button>
            )}
          </div>
        )}
      </div>

      {/* ── Footer ── */}
      <div className="btp-footer">
        <span className="btp-footer-meta">
          {user?.name || 'You'} · {formatDateTime(task.createdAt)}
        </span>
      </div>
    </div>
  );

  if (mobile) {
    return (
      <div className="tdp-mobile-overlay" onClick={onClose}>
        {panel}
      </div>
    );
  }

  return panel;
}
