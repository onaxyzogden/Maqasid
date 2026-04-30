// MILOS wrapper for the BbosTaskPanel exported from
// `@ogden/ui-components/bbos`. The package component is pure UI; this wrapper
// reads MILOS stores for task/project/auth/people/app state, wires mutation
// callbacks back to those stores, and provides the AI streaming pipeline via
// the `onRequestAiDraft` callback prop. The polished MILOS GLabelPicker is
// injected via the `renderGLabelPicker` render-prop.

import { useMemo } from 'react';
import { BbosTaskPanel as PackageBbosTaskPanel } from '@ogden/ui-components/bbos';
import { useTaskStore } from '../../store/task-store';
import { useProjectStore } from '../../store/project-store';
import { useAuthStore } from '../../store/auth-store';
import { useAppStore } from '../../store/app-store';
import { usePeopleStore, getInitials } from '../../store/people-store';
import { getAiConfig, hasAiConfig } from '../../services/ai/ai-settings';
import { streamCompletion } from '../../services/ai/ai-client';
import { buildPrompt } from '../../services/ai/prompt-builder';
import { parseAiResponse } from '../../services/ai/response-parser';
import GLabelPicker from '../shared/GLabelPicker';

export default function BbosTaskPanel({ project, projectId, taskId, onClose, bbosRole, accentColor }) {
  const tasksByProject = useTaskStore((s) => s.tasksByProject);
  const updateTask = useTaskStore((s) => s.updateTask);
  const moveTask = useTaskStore((s) => s.moveTask);
  const updateBbosFieldData = useTaskStore((s) => s.updateBbosFieldData);

  const addProjectMember = useProjectStore((s) => s.addProjectMember);

  const user = useAuthStore((s) => s.user);
  const employees = usePeopleStore((s) => s.employees);

  const setActiveBbosTaskType = useAppStore((s) => s.setActiveBbosTaskType);
  const clearActiveBbosTaskType = useAppStore((s) => s.clearActiveBbosTaskType);

  const tasks = tasksByProject[projectId] || [];
  const task = tasks.find((t) => t.id === taskId) || null;

  const members = useMemo(
    () => (project?.members || [])
      .map((id) => employees.find((e) => e.id === id))
      .filter(Boolean),
    [project?.members, employees],
  );
  const assignee = task ? employees.find((e) => e.id === task.assigneeId) || null : null;

  return (
    <PackageBbosTaskPanel
      project={project}
      projectId={projectId}
      taskId={taskId}
      onClose={onClose}
      bbosRole={bbosRole}
      accentColor={accentColor}
      task={task}
      tasks={tasks}
      user={user}
      employees={employees}
      members={members}
      assignee={assignee}
      aiAvailable={hasAiConfig()}
      setActiveBbosTaskType={setActiveBbosTaskType}
      clearActiveBbosTaskType={clearActiveBbosTaskType}
      onUpdateTask={(id, patch) => updateTask(projectId, id, patch)}
      onFieldUpdate={(id, fieldId, value) => updateBbosFieldData(projectId, id, fieldId, value)}
      onMoveTask={(pid, id, columnId, idx, columns) => moveTask(pid, id, columnId, idx, columns)}
      onAddProjectMember={(pid, employeeId) => addProjectMember(pid, employeeId)}
      onRequestAiDraft={({ taskDef, projectId: pid, signal, onDelta, onComplete, onError }) => {
        (async () => {
          try {
            const { system, messages } = buildPrompt(taskDef, pid);
            const config = getAiConfig();
            let full = '';
            for await (const chunk of streamCompletion(config, system, messages, signal)) {
              full += chunk;
              onDelta(chunk);
            }
            const { fieldData, warnings } = parseAiResponse(full, taskDef);
            onComplete({ fieldData, warnings });
          } catch (err) {
            onError(err);
          }
        })();
      }}
      renderGLabelPicker={({ value, onChange }) => (
        <GLabelPicker value={value} onChange={onChange} />
      )}
      getInitials={getInitials}
    />
  );
}
