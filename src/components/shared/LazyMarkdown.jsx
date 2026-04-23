import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

/**
 * Thin wrapper around react-markdown + remark-gfm so the whole pair
 * can be pulled into a single lazy chunk. Import via:
 *
 *   const LazyMarkdown = lazy(() => import('@components/shared/LazyMarkdown'));
 *
 * Props are forwarded to <Markdown />. `remarkPlugins` defaults to [remarkGfm]
 * but can be overridden by callers.
 */
export default function LazyMarkdown({ children, remarkPlugins, ...rest }) {
  return (
    <Markdown remarkPlugins={remarkPlugins ?? [remarkGfm]} {...rest}>
      {children}
    </Markdown>
  );
}
