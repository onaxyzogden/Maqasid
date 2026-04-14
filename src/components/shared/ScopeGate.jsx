import { useMemo } from 'react';
import { ShieldX } from 'lucide-react';
import { getBbosRole, BBOS_TASK_ACCESS } from '../../data/bbos/bbos-role-access';
import { getBbosTaskDefsByStage } from '../../data/bbos/bbos-task-definitions';
import { getStage } from '../../data/bbos/bbos-pipeline';

export default function ScopeGate({ bbosRole, bbosFilter }) {
  const role = getBbosRole(bbosRole);
  const stage = getStage(bbosFilter);
  const availableRoles = useMemo(() => {
    const allDefs = getBbosTaskDefsByStage(bbosFilter);
    const roleIds = new Set();
    for (const def of allDefs) {
      const entry = BBOS_TASK_ACCESS[def.id];
      if (entry) {
        for (const [r, level] of Object.entries(entry)) {
          if (level !== '-' && r !== bbosRole) roleIds.add(r);
        }
      }
    }
    return [...roleIds].map((id) => getBbosRole(id)).filter(Boolean);
  }, [bbosFilter, bbosRole]);

  return (
    <div className="bfd__scope-gate">
      <ShieldX size={48} />
      <h3>OUTSIDE YOUR SCOPE</h3>
      <p>The <strong>{role.label}</strong> role does not have access to <strong>{stage?.label || bbosFilter}</strong>.</p>
      {availableRoles.length > 0 && (
        <p className="bfd__scope-gate-hint">
          Access is available under: {availableRoles.map((r) => r.label).join(', ')}
        </p>
      )}
    </div>
  );
}
