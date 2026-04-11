import { useMemo } from 'react';
import { BBOS_STAGES, BBOS_LAYERS, getStageLayer } from '@data/bbos/bbos-pipeline';
import { getAccessibleStagesForRole } from '@data/bbos/bbos-role-access';
import './BbosPipelineHeader.css';

export default function BbosPipelineHeader({ currentStageId, activeFilter, onStageClick, bbosRole, stageStatusMap }) {
  const accessibleStages = useMemo(() => getAccessibleStagesForRole(bbosRole), [bbosRole]);
  return (
    <div className="bbos-pipeline">
      {/* Layer labels */}
      <div className="bbos-layers">
        {BBOS_LAYERS.map((layer) => (
          <div
            key={layer.id}
            className="bbos-layer-band"
            style={{
              '--layer-color': layer.color,
              gridColumn: `span ${layer.stages.length}`,
            }}
          >
            {layer.label}
          </div>
        ))}
      </div>

      {/* Stage nodes */}
      <div className="bbos-stages">
        {BBOS_STAGES.map((stage, i) => {
          const layer = getStageLayer(stage.id);
          const isCurrent = stage.id === currentStageId;
          const isFiltered = stage.id === activeFilter;
          const isInaccessible = accessibleStages && !accessibleStages.has(stage.id);
          const stageStatus = stageStatusMap?.[stage.id];

          return (
            <button
              key={stage.id}
              className={[
                'bbos-stage-node',
                stageStatus && `bbos-stage-node--status-${stageStatus}`,
                isCurrent && 'bbos-stage-node--current',
                isFiltered && 'bbos-stage-node--filtered',
                isInaccessible && 'bbos-stage-node--inaccessible',
              ].filter(Boolean).join(' ')}
              style={{ '--stage-color': layer?.color || 'var(--primary)' }}
              onClick={() => onStageClick?.(stage.id)}
              title={`${stage.label}: ${stage.description}`}
            >
              <span className="bbos-stage-id">{stage.id}</span>
              <span className="bbos-stage-label">{stage.label}</span>
              {i < BBOS_STAGES.length - 1 && <span className="bbos-stage-connector" />}
            </button>
          );
        })}
      </div>
    </div>
  );
}
