import { useEffect, useRef, useState } from 'react';
import QuranVerseCard from './QuranVerseCard';
import './QuranEmbed.css';

const SCRIPT_SRC = 'https://quran.com/widget/embed-widget.js';
const LOAD_TIMEOUT_MS = 5000;

function ensureWidgetScript() {
  if (typeof document === 'undefined') return;
  if (document.querySelector(`script[src="${SCRIPT_SRC}"]`)) return;
  const script = document.createElement('script');
  script.src = SCRIPT_SRC;
  script.defer = true;
  document.body.appendChild(script);
}

export default function QuranEmbed({ verseKey }) {
  const initiallyOnline = typeof navigator === 'undefined' ? true : navigator.onLine;
  const [useIframe, setUseIframe] = useState(initiallyOnline);
  const [loaded, setLoaded] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const handleOnline = () => setUseIframe(true);
    const handleOffline = () => setUseIframe(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  useEffect(() => {
    if (!useIframe) return;
    ensureWidgetScript();
    setLoaded(false);
    timeoutRef.current = setTimeout(() => {
      setUseIframe(false);
    }, LOAD_TIMEOUT_MS);
    return () => clearTimeout(timeoutRef.current);
  }, [useIframe, verseKey]);

  if (!useIframe) {
    return <QuranVerseCard verseKey={verseKey} />;
  }

  const encoded = verseKey.replace(':', '%3A');
  return (
    <div className="qe">
      <iframe
        src={`https://quran.com/embed/v1?verses=${encoded}&translations=20&reciter=13&mushaf=kfgqpc_v2&wbw=true&wbwTransliteration=true&showTranslationName=true&tafsir=false&reflections=false&lessons=false&answers=false`}
        width="100%"
        data-quran-embed="true"
        allow="clipboard-write"
        frameBorder="0"
        title={`Quran ${verseKey}`}
        onLoad={() => {
          setLoaded(true);
          clearTimeout(timeoutRef.current);
        }}
      />
      {!loaded && <div className="qe__placeholder"><QuranVerseCard verseKey={verseKey} /></div>}
    </div>
  );
}
