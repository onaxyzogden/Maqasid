// BBOS Pipeline Dashboard - Execution View modal (tabs, factories, gate, retro).
// Rendered via portal to document.body with body scroll-lock (mirrors
// BbosTaskPanel).
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useTaskStore } from "../../../store/task-store";
import { downloadStageBundleTemplate, validateStageBundleTemplate, importStageBundleTemplate } from "@services/bbos-template";
import { getBbosTaskDefsByStage } from "@data/bbos/bbos-task-definitions";
import { Dot, Ornament, Spirit } from "./primitives";
import {
  bhiVars, iLabel, itemVars, metricVars, restoVars, typeLabel, typeVars,
  execTypeLabel, statusVars,
} from "./palette";

function AssetRow({ item, expanded, onToggle }) {
  return (
    <div className="bpd-row" data-expanded={expanded ? "true" : "false"}>
      <div className="bpd-row__head" onClick={onToggle}>
        <Dot status={item.status} />
        <div className="bpd-row__body-wrap">
          <div className="bpd-row__title-line">
            <span className="bpd-row__label">{item.label}</span>
            {item.glabel && <span className="bpd-row__glabel">{item.glabel}</span>}
          </div>
          <div className="bpd-row__desc">{item.desc}</div>
        </div>
        <span className="bpd-row__status" style={itemVars(item.status)}>{iLabel(item.status)}</span>
        <span className="bpd-row__chevron">{expanded ? "▲" : "▼"}</span>
      </div>
      {expanded && (
        <div className="bpd-row__detail">
          {item.content ? (
            <div className="bpd-row__content">{item.content}</div>
          ) : (
            <textarea className="bpd-textarea bpd-textarea--asset" placeholder={`Paste or type content for ${item.label}...`} />
          )}
          <div className="bpd-row__actions">
            {item.status !== "filed" && <button className="bpd-pillbtn bpd-pillbtn--file">✓ Mark Reviewed & File</button>}
            <button className="bpd-pillbtn bpd-pillbtn--ghost">↓ Import JSON</button>
          </div>
        </div>
      )}
    </div>
  );
}

const POSTING_FIELDS = [
  ["Channel", "e.g. Instagram, Email, LinkedIn"],
  ["Content Reference", "Asset ID or filename"],
  ["Posted At", "Date and time"],
  ["Outcome", "Responses, appointments booked"],
];
const CALL_FIELDS = [
  ["Prospect", "Name or reference"],
  ["Outcome", "Fit / No-Fit"],
  ["Basis", "Specific basis for decision"],
  ["Date", "Call date"],
];

function FieldGrid({ fields }) {
  return (
    <div className="bpd-fieldgrid">
      {fields.map(([label, placeholder], i) => (
        <div key={i}>
          <div className="bpd-field__label">{label}</div>
          <input className="bpd-input" placeholder={placeholder} />
        </div>
      ))}
    </div>
  );
}

function TaskRow({ task, expanded, onToggle }) {
  return (
    <div className="bpd-row" data-expanded={expanded ? "true" : "false"}>
      <div className="bpd-row__head" onClick={onToggle}>
        <Dot status={task.status} />
        <div className="bpd-row__body-wrap">
          <div className="bpd-row__title-line">
            <span className="bpd-row__label">{task.label}</span>
            <span className="bpd-row__typechip" style={typeVars(task.type)}>{typeLabel(task.type)}</span>
          </div>
          <div className="bpd-row__desc">{task.desc}</div>
        </div>
        <span className="bpd-row__status" style={itemVars(task.status)}>{iLabel(task.status)}</span>
        <span className="bpd-row__chevron">{expanded ? "▲" : "▼"}</span>
      </div>
      {expanded && (
        <div className="bpd-row__detail">
          {task.type === "gate_check" && task.checks && (
            <div className="bpd-checklist">
              <div className="bpd-checklist__label">Checklist</div>
              {task.checks.map((c, i) => (
                <div key={i} className="bpd-checklist__item">
                  <div className="bpd-checklist__box" />
                  <span className="bpd-checklist__text">{c}</span>
                </div>
              ))}
            </div>
          )}
          {task.type === "posting" && <FieldGrid fields={POSTING_FIELDS} />}
          {task.type === "call_log" && <FieldGrid fields={CALL_FIELDS} />}
          {task.type === "proof_capture" && (
            <div style={{ marginTop: 10 }}>
              <div className="bpd-upload">
                <div className="bpd-upload__main">↑ Upload evidence</div>
                <div className="bpd-upload__sub">Photo, document, or signed confirmation</div>
              </div>
              <textarea className="bpd-textarea bpd-textarea--note" placeholder="Notes on this milestone..." />
            </div>
          )}
          {(task.type === "confirmation" || task.type === "filing") && (
            <div style={{ marginTop: 10 }}>
              <textarea className="bpd-textarea bpd-textarea--note" placeholder="Notes or reference..." />
            </div>
          )}
          <button className="bpd-pillbtn bpd-pillbtn--complete">✓ Mark Complete</button>
        </div>
      )}
    </div>
  );
}

export default function BbosExecView({ stage, onClose, projectId }) {
  const exec = stage.execution;
  const isRetro = exec.type === "retrospective_dashboard";
  const tabs = isRetro
    ? [{ id: "metrics", label: "Metrics", icon: "◈" }, { id: "bhi", label: "Barakah Health", icon: "⧁" }, { id: "restoration", label: "Restoration Mandate", icon: "◆" }]
    : [
        { id: "research", label: "Research Factory", icon: "◐" },
        ...(exec.assetItems?.length > 0 ? [{ id: "assets", label: "Asset Factory", icon: "◫" }] : []),
        ...(exec.executionTasks?.length > 0 ? [{ id: "execution", label: "Execution", icon: "◉" }] : []),
        { id: "gate", label: "Gate Check", icon: "◆" },
      ];

  const taskStore = useTaskStore();
  const uploadRef = useRef(null);

  const [tab, setTab] = useState(tabs[0].id);
  const [expAsset, setExpAsset] = useState(null);
  const [expTask, setExpTask] = useState(null);
  const [checks, setChecks] = useState(exec.gateChecks ? exec.gateChecks.reduce((a, c) => ({ ...a, [c.id]: c.passed }), {}) : {});
  const [importOpen, setImportOpen] = useState(false);
  const [importText, setImportText] = useState("");
  const [parseError, setParseError] = useState(null);
  const [parseSuccess, setParseSuccess] = useState(null);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, []);

  const cycleCheck = (id) =>
    setChecks((p) => ({ ...p, [id]: p[id] === true ? false : p[id] === false ? null : true }));

  const handleDownload = () => {
    const stageDefs = getBbosTaskDefsByStage(stage.id);
    const existingTasks = projectId ? (taskStore.tasksByProject[projectId] || []) : [];
    downloadStageBundleTemplate(stage.id, stageDefs, existingTasks);
  };

  const handleParse = () => {
    setParseError(null);
    setParseSuccess(null);
    try {
      const json = JSON.parse(importText);
      const validation = validateStageBundleTemplate(json, stage.id);
      if (!validation.valid) {
        setParseError(validation.errors.join('\n'));
        return;
      }
      const items = importStageBundleTemplate(json);
      const existingTasks = projectId ? (taskStore.tasksByProject[projectId] || []) : [];
      let count = 0;
      for (const { taskType, fieldData, gLabel } of items) {
        const task = existingTasks.find((t) => t.bbosTaskType === taskType);
        if (!task) continue;
        const nonEmpty = Object.fromEntries(
          Object.entries(fieldData).filter(([, v]) => v !== '')
        );
        if (Object.keys(nonEmpty).length > 0 || gLabel) {
          taskStore.updateTask(projectId, task.id, {
            bbosFieldData: { ...task.bbosFieldData, ...nonEmpty },
            ...(gLabel ? { gLabel } : {}),
          });
          count++;
        }
      }
      setParseSuccess(`Imported: ${count} task(s) updated.`);
      setImportOpen(false);
      setImportText('');
    } catch (err) {
      setParseError('Parse failed: ' + err.message);
    }
  };

  const handleUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const json = JSON.parse(ev.target.result);
        const validation = validateStageBundleTemplate(json, stage.id);
        if (!validation.valid) {
          setParseError(validation.errors.join('\n'));
          setParseSuccess(null);
          return;
        }
        const items = importStageBundleTemplate(json);
        const existingTasks = projectId ? (taskStore.tasksByProject[projectId] || []) : [];
        let count = 0;
        for (const { taskType, fieldData, gLabel } of items) {
          const task = existingTasks.find((t) => t.bbosTaskType === taskType);
          if (!task) continue;
          const nonEmpty = Object.fromEntries(
            Object.entries(fieldData).filter(([, v]) => v !== '')
          );
          if (Object.keys(nonEmpty).length > 0 || gLabel) {
            taskStore.updateTask(projectId, task.id, {
              bbosFieldData: { ...task.bbosFieldData, ...nonEmpty },
              ...(gLabel ? { gLabel } : {}),
            });
            count++;
          }
        }
        setParseSuccess(`Imported: ${count} task(s) updated.`);
        setParseError(null);
      } catch (err) {
        setParseError('Upload failed: ' + err.message);
        setParseSuccess(null);
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const renderContent = () => {
    if (isRetro) {
      if (tab === "metrics") return (
        <div className="bpd-col" style={{ gap: 12 }}>
          <Spirit attr={exec.spiritualOpen.attr} note={exec.spiritualOpen.note} />
          {exec.metrics.length === 0 ? (
            <div className="bpd-empty">No metrics recorded yet. File the OPT Metric Dashboard (OPT-S1) to populate the Canonical Metrics.</div>
          ) : (
            <div className="bpd-metricgrid">
              {exec.metrics.map((m) => (
                <div key={m.id} className="bpd-metric">
                  <div className="bpd-metric__top">
                    <div className="bpd-metric__label">{m.label}</div>
                    {m.status && <span className="bpd-metric__badge" style={metricVars(m.status)}>{m.status.toUpperCase()}</span>}
                  </div>
                  <div className="bpd-metric__value" style={m.status ? metricVars(m.status) : undefined}>{m.value}</div>
                  {(m.benchmark || m.trend) && (
                    <div className="bpd-metric__foot">
                      {m.benchmark && <span className="bpd-metric__bench">Benchmark: {m.benchmark}</span>}
                      {m.trend && (
                        <span className="bpd-metric__trend" data-trend={m.trend}>
                          {m.trend === "up" ? "↑" : m.trend === "down" ? "↓" : "→"} {m.stage}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      );
      if (tab === "bhi") return (
        <div className="bpd-col" style={{ gap: 12 }}>
          {exec.bhiHero && (
            <div className="bpd-bhi-hero">
              <div className="bpd-bhi-hero__label">Barakah Health Index — Cycle {exec.bhiHero.cycle}</div>
              <div className="bpd-bhi-hero__value">{exec.bhiHero.value != null ? exec.bhiHero.value : "—"}</div>
              <div className="bpd-bhi-hero__sub">{exec.bhiHero.phrase || exec.bhiHero.reading || "Awaiting overall reading"}</div>
            </div>
          )}
          {exec.bhi.length === 0 ? (
            <div className="bpd-empty">No Barakah Health Index recorded yet. File OPT-A2 to populate the five leading indicators.</div>
          ) : exec.bhi.map((b) => (
            <div key={b.id} className="bpd-bhi" style={bhiVars(b.value)}>
              <div className="bpd-bhi__top">
                <div>
                  <div className="bpd-bhi__label">{b.label}</div>
                  <div className="bpd-bhi__desc">{b.desc}</div>
                </div>
                <div className="bpd-bhi__value">{b.value}</div>
              </div>
              <div className="bpd-bhi__track">
                <div className="bpd-bhi__fill" style={{ width: `${(b.value / 10) * 100}%` }} />
              </div>
            </div>
          ))}
        </div>
      );
      if (tab === "restoration") return (
        <div className="bpd-col" style={{ gap: 12 }}>
          <Spirit attr={exec.spiritualGate.attr} note={exec.spiritualGate.note} lg />
          <div className="bpd-section-label" style={{ marginTop: 4 }}>Restoration Mandate Items</div>
          {exec.restorationItems.length === 0 ? (
            <div className="bpd-empty">No restoration items yet. File the Top 3 Optimization Actions (OPT-S4) to populate the Restoration Mandate.</div>
          ) : exec.restorationItems.map((r) => (
            <div key={r.id} className="bpd-resto" style={restoVars(r.severity, r.status)}>
              {(r.severity || r.status) && (
                <div className="bpd-resto__tags">
                  {r.severity && <span className="bpd-resto__sev">{r.severity}</span>}
                  {r.status && <span className="bpd-resto__status">{r.status.replace("_", " ")}</span>}
                </div>
              )}
              <div className="bpd-resto__label">{r.label}</div>
              <div className="bpd-resto__action">{r.action}</div>
              <div className="bpd-resto__actions">
                <button className="bpd-resto__btn bpd-resto__btn--resolve">Mark Resolved</button>
                <button className="bpd-resto__btn bpd-resto__btn--accept">Accept Risk</button>
              </div>
            </div>
          ))}
          <div className="bpd-cycle-statement">
            <div className="bpd-cycle-statement__label">Cycle Completion Statement</div>
            <textarea
              className="bpd-cycle-statement__textarea"
              placeholder="State in your own words what this cycle taught you about your capacity for honest stewardship. This is not a performance summary. It is a reflection on what changed in you — not just what changed in the system."
            />
            <button className="bpd-btn-gold bpd-btn-gold--cycle">⧁  Close Cycle — Begin Cycle 2</button>
          </div>
        </div>
      );
    }

    if (tab === "research") return (
      <div className="bpd-col" style={{ gap: 10 }}>
        <Spirit attr={exec.spiritualOpen.attr} note={exec.spiritualOpen.note} />
        <div style={{ marginTop: 4 }}>
          <div className="bpd-section-label" style={{ marginBottom: 8 }}>Research Factory — S-Outputs</div>
          <div className="bpd-dl-row">
            <button className="bpd-dl-btn" onClick={handleDownload} title={`Download ${stage.id} stage bundle`}>
              ↓ Download <span className="bpd-dl-btn__stage">{stage.id}</span>
            </button>
            <button className="bpd-dl-btn" onClick={() => uploadRef.current?.click()} title={`Upload ${stage.id} stage bundle`}>
              ↑ Upload <span className="bpd-dl-btn__stage">{stage.id}</span>
            </button>
            <input ref={uploadRef} type="file" accept=".json" style={{ display: 'none' }} onChange={handleUpload} />
            {parseSuccess && <span className="bpd-parse-result bpd-parse-result--ok">{parseSuccess}</span>}
          </div>
          <div className="bpd-import-trigger" data-open={importOpen ? "true" : "false"}
            onClick={() => { setImportOpen(!importOpen); setParseError(null); setParseSuccess(null); }}>
            <div className="bpd-import-trigger__icon">↑</div>
            <div>
              <div className="bpd-import-trigger__title">Import Stage Pack (JSON)</div>
              <div className="bpd-import-trigger__sub">Full S-output + Asset pack. One import event per stage.</div>
            </div>
          </div>
          {importOpen && (
            <div className="bpd-import-panel">
              <div className="bpd-import-panel__label">Paste JSON Pack</div>
              <textarea
                className="bpd-import-panel__textarea"
                value={importText}
                onChange={(e) => setImportText(e.target.value)}
                placeholder={"{\n  \"stage\": \"STR\",\n  \"research\": [...],\n  \"assets\": [...]\n}"}
              />
              <button className="bpd-import-panel__parse" onClick={handleParse}>Parse & Stage for Review</button>
              {parseError && <div className="bpd-parse-result bpd-parse-result--err">{parseError}</div>}
            </div>
          )}
          {exec.researchItems.map((r) => (
            <AssetRow key={r.id} item={r} expanded={expAsset === r.id} onToggle={() => setExpAsset(expAsset === r.id ? null : r.id)} />
          ))}
        </div>
      </div>
    );
    if (tab === "assets") return (
      <div className="bpd-col" style={{ gap: 10 }}>
        <div className="bpd-section-label" style={{ marginBottom: 4 }}>Asset Factory — Deliverables</div>
        {exec.assetItems.map((a) => (
          <AssetRow key={a.id} item={a} expanded={expAsset === a.id} onToggle={() => setExpAsset(expAsset === a.id ? null : a.id)} />
        ))}
      </div>
    );
    if (tab === "execution") return (
      <div className="bpd-col" style={{ gap: 10 }}>
        <div className="bpd-section-label" style={{ marginBottom: 4 }}>
          {exec.type === "field_execution" ? "Field Execution" : "Execution & Tracking"}
        </div>
        {exec.executionTasks
          ? exec.executionTasks.map((t) => (
            <TaskRow key={t.id} task={t} expanded={expTask === t.id} onToggle={() => setExpTask(expTask === t.id ? null : t.id)} />
          ))
          : <div className="bpd-empty">No execution tasks for this stage type.</div>}
      </div>
    );
    if (tab === "gate") return (
      <div className="bpd-col" style={{ gap: 12 }}>
        <Spirit attr={exec.spiritualGate.attr} note={exec.spiritualGate.note} lg />
        <div className="bpd-section-label" style={{ marginTop: 4 }}>Gate Checks — {stage.gate.label}</div>
        {exec.gateChecks && exec.gateChecks.map((gc) => {
          const val = checks[gc.id];
          const attr = val === true ? "true" : val === false ? "false" : "null";
          return (
            <div key={gc.id} className="bpd-gatecheck" data-val={attr} onClick={() => cycleCheck(gc.id)}>
              <div className="bpd-gatecheck__box">{val === true ? "✓" : val === false ? "✕" : ""}</div>
              <span className="bpd-gatecheck__text">{gc.label}</span>
            </div>
          );
        })}
        <button className="bpd-btn-gold bpd-btn-gold--gate">⧁  Submit Gate Review</button>
      </div>
    );
    return null;
  };

  const overlay = (
    <div className="bpd-modal-overlay">
      <div className="bpd-modal-scrim bpd-modal-scrim--exec" onClick={onClose}>
        <div className="bpd-modal bpd-modal--exec" style={statusVars(stage.status)} onClick={(e) => e.stopPropagation()}>
          <div className="bpd-modal__head">
            <div className="bpd-modal__head-left">
              <span style={{ color: "var(--bpd-gold)", lineHeight: 0 }}><Ornament size={28} opacity={0.5} /></span>
              <div>
                <div className="bpd-modal__eyebrow">BBOS · Execution View · {stage.code}</div>
                <div className="bpd-modal__title">{stage.n} — {stage.name}</div>
              </div>
            </div>
            <div className="bpd-modal__head-right">
              <div className="bpd-modal__typechip">{execTypeLabel(exec.type)}</div>
              <button className="bpd-modal__close" onClick={onClose}>×</button>
            </div>
          </div>
          <div className="bpd-tabs">
            {tabs.map((t) => (
              <button key={t.id} className="bpd-tab" data-active={tab === t.id ? "true" : "false"} onClick={() => setTab(t.id)}>
                <span>{t.icon}</span>{t.label}
              </button>
            ))}
          </div>
          <div className="bpd-exec__content">{renderContent()}</div>
        </div>
      </div>
    </div>
  );

  return createPortal(overlay, document.body);
}
