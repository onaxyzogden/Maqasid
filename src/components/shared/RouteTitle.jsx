import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { titleForPath } from '../../utils/route-title';

// Keeps document.title in step with the route (WCAG 2.4.2). Renders nothing.
export default function RouteTitle() {
  const { pathname } = useLocation();
  useEffect(() => {
    document.title = titleForPath(pathname);
  }, [pathname]);
  return null;
}
