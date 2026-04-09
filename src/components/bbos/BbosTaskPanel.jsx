import { useState, useEffect, useRef } from 'react';
import { X, Sparkles, Check, RotateCcw, AlertTriangle, ChevronDown, ChevronUp, Download, Upload } from 'lucide-react';
import { useTaskStore } from '../../store/task-store';
import { useAuthStore } from '../../store/auth-store';
import { useMobile } from '../../hooks/useMobile';
import { getBbosTaskDef, BBOS_VALIDATION_FLAG_LABELS } from '@data/bbos/bbos-task-definitions';
import { getStage } from '@data/bbos/bbos-pipeline';
import { exportBbosProject, downloadJson, importBbosData } from '@services/bbos-export';
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
  const deleteTask = taskStore.deleteTask;
  const moveTask = taskStore.moveTask;
  const user = useAuthStore((s) => s.user);
  const fileInputRef = useRef(null);

  const [rationaleOpen, setRationaleOpen] = useState(false);
  const [localFields, setLocalFields] = useState({});
  const saveTimeout = useRef(null);

  const def = task?.bbosTaskType ? getBbosTaskDef(task.bbosTaskType) : null;
  const stage = def ? getStage(def.stage) : null;

  useEffect(() => {
    if (task?.bbosFieldData) {
      setLocalFields(task.bbosFieldData);
    }
  }, [taskId]);

  if (!task || !def) return null;

  const fieldData = task.bbosFieldData || {};
  const aiDraftStatus = fieldData._aiDraftStatus || 'none';
  const aiDraftTimestamp = fieldData._aiDraftTimestamp || null;

  const handleFieldChange = (fieldId, value) => {
    setLocalFields((prev) => ({ ...prev, [fieldId]: value }));
    clearTimeout(saveTimeout.current);
    saveTimeout.current = setTimeout(() => {
      updateBbosFieldData(projectId, taskId, fieldId, value);
    }, 300);
  };

  const handleGLabelChange = (gLabel) => {
    updateTask(projectId, taskId, { gLabel });
  };

  const handleGenerateDraft = () => {
    // Placeholder: marks as pending until real AI integration is wired
    const now = new Date().toISOString();
    updateBbosFieldData(projectId, taskId, '_aiDraftStatus', 'pending');
    updateBbosFieldData(projectId, taskId, '_aiDraftTimestamp', now);
  };

  const handleAcceptDraft = () => {
    updateBbosFieldData(projectId, taskId, '_aiDraftStatus', 'accepted');
  };

  const handleRejectDraft = () => {
    updateBbosFieldData(projectId, taskId, '_aiDraftStatus', 'rejected');
  };

  const handleDelete = () => {
    if (confirm('Delete this task?')) {
      deleteTask(projectId, taskId);
      onClose();
    }
  };

  const handleExport = () => {
    const tasks = taskStore.tasksByProject[projectId] || [];
    const data = exportBbosProject(project, tasks);
    downloadJson(data, `${project.name.replace(/\s+/g, '-').toLowerCase()}-bbos-export.json`);
  };

  const handleImport = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const json = JSON.parse(ev.target.result);
        const result = importBbosData(json, projectId, taskStore);
        alert(`Import complete: ${result.updated} updated, ${result.created} created`);
        taskStore.loadTasks(projectId);
      } catch (err) {
        alert('Import failed: ' + err.message);
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
          onChange={(e) => moveTask(projectId, taskId, e.target.value)}
        >
          {columns.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
      </div>

      <div className="btp-body">

        {/* ── Purpose block ── */}
        <div className="btp-section">
          <div className="btp-section-label">Purpose</div>
          <p className="btp-purpose-text">{def.purpose}</p>
        </div>

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
                <input
                  type="text"
                  className="btp-field-input"
                  placeholder={field.placeholder || ''}
                  value={localFields[field.id] || ''}
                  onChange={(e) => handleFieldChange(field.id, e.target.value)}
                />
              )}
            </div>
          ))}
        </div>

        {/* ── G-Label ── */}
        <div className="btp-section btp-glabel-row">
          <span className="btp-section-label">Integrity Label</span>
          <GLabelPicker
            value={task.gLabel || null}
            onChange={handleGLabelChange}
          />
        </div>

        <div className="btp-divider" />

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

            {aiDraftStatus === 'none' && (
              <button className="btp-generate-btn" onClick={handleGenerateDraft}>
                <Sparkles size={14} /> Generate Draft
              </button>
            )}

            {aiDraftStatus === 'pending' && (
              <div className="btp-draft-pending">
                <div className="btp-draft-status btp-draft-status--pending">
                  <Sparkles size={12} /> AI-Generated Draft · {formatDateTime(aiDraftTimestamp)}
                </div>
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

            {aiDraftStatus === 'rejected' && (
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
        <div className="btp-footer-actions">
          <button
            className="btp-footer-btn"
            onClick={handleExport}
            title="Export BBOS data as JSON for LLM assistance"
          >
            <Download size={13} /> Export
          </button>
          <button
            className="btp-footer-btn"
            onClick={() => fileInputRef.current?.click()}
            title="Import BBOS data from JSON"
          >
            <Upload size={13} /> Import
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".json"
            onChange={handleImport}
            style={{ display: 'none' }}
          />
          <button className="btp-footer-del" onClick={handleDelete}>Delete</button>
        </div>
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
