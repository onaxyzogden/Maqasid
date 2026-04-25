import { useEffect } from 'react';
import { useParams, useNavigate, useSearchParams, useLocation, Outlet } from 'react-router-dom';
import { useProjectStore } from '@store/project-store';
import { useTaskStore } from '@store/task-store';
import ProjectBoard from '@components/work/ProjectBoard';

const TAB_SUFFIXES = ['/people', '/tasks', '/money', '/assets', '/office', '/tech', '/journal'];

export default function Project() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const project = useProjectStore((s) => s.getProject(projectId));
  const loadTasks = useTaskStore((s) => s.loadTasks);
  const isProjectsView = !TAB_SUFFIXES.some((s) => location.pathname.endsWith(s));

  useEffect(() => {
    if (projectId) loadTasks(projectId);
    // reason: loadTasks is a stable store action
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId]);

  // Handle ?task= deep-link from search
  useEffect(() => {
    const taskParam = searchParams.get('task');
    if (taskParam) {
      searchParams.delete('task');
      setSearchParams(searchParams, { replace: true });
    }
    // reason: setSearchParams is stable; deps narrowed to searchParams
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  if (!project) {
    return (
      <div style={{ textAlign: 'center', padding: 'var(--space-16)' }}>
        <h3 style={{ marginBottom: 'var(--space-2)' }}>Project not found</h3>
        <button className="btn btn-primary" onClick={() => navigate('/app/work')}>Back to Projects</button>
      </div>
    );
  }

  if (!isProjectsView) {
    return <Outlet />;
  }


  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: 0 }}>
      <ProjectBoard projectId={projectId} project={project} hideFilter />
    </div>
  );
}
