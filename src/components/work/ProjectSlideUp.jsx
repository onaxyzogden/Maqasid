import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { useProjectStore } from '@store/project-store';
import { useTaskStore } from '@store/task-store';
import ProjectBoard from './ProjectBoard';
import './ProjectSlideUp.css';

export default function ProjectSlideUp({ projectId, onClose }) {
  const project = useProjectStore((s) => s.getProject(projectId));
  const loadTasks = useTaskStore((s) => s.loadTasks);

  useEffect(() => {
    if (projectId) loadTasks(projectId);
  }, [projectId, loadTasks]);

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  if (!project) return null;

  return createPortal(
    <div className="pp-slideup__root" role="dialog" aria-modal="true" aria-label={`Project: ${project.name}`}>
      <button
        type="button"
        className="pp-slideup__backdrop"
        aria-label="Close project"
        onClick={onClose}
      />
      <div className="pp-slideup__panel" role="document">
        <header className="pp-slideup__header">
          <div className="pp-slideup__title-wrap">
            <span className="pp-slideup__swatch" style={{ background: project.color || '#70d8c8' }} aria-hidden="true" />
            <h2 className="pp-slideup__title">{project.name}</h2>
          </div>
          <button type="button" className="pp-slideup__close" onClick={onClose} aria-label="Close">
            <X size={18} strokeWidth={2.25} />
          </button>
        </header>
        <div className="pp-slideup__body">
          <ProjectBoard projectId={projectId} project={project} hideFilter hideViewSwitcher />
        </div>
      </div>
    </div>,
    document.body,
  );
}
