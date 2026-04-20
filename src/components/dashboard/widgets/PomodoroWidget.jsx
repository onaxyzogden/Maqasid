import { useEffect, useReducer } from 'react';
import { Timer, Play, Pause, RotateCcw } from 'lucide-react';

const WORK = 25 * 60;
const BREAK = 5 * 60;

function reducer(state, action) {
  switch (action.type) {
    case 'tick':
      if (!state.running) return state;
      if (state.remaining <= 1) {
        const nextMode = state.mode === 'work' ? 'break' : 'work';
        return { mode: nextMode, running: false, remaining: nextMode === 'work' ? WORK : BREAK };
      }
      return { ...state, remaining: state.remaining - 1 };
    case 'toggle':
      return { ...state, running: !state.running };
    case 'reset':
      return { mode: 'work', running: false, remaining: WORK };
    default:
      return state;
  }
}

function format(sec) {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

export default function PomodoroWidget() {
  const [state, dispatch] = useReducer(reducer, { mode: 'work', running: false, remaining: WORK });
  useEffect(() => {
    if (!state.running) return;
    const id = setInterval(() => dispatch({ type: 'tick' }), 1000);
    return () => clearInterval(id);
  }, [state.running]);

  return (
    <div className="ctx-widget ctx-widget--pomodoro">
      <div className="ctx-widget__title"><Timer size={14} /> {state.mode === 'work' ? 'Focus' : 'Break'}</div>
      <div className="ctx-widget__big ctx-widget__mono">{format(state.remaining)}</div>
      <div className="ctx-widget__actions">
        <button type="button" className="ctx-widget__btn" onClick={() => dispatch({ type: 'toggle' })}>
          {state.running ? <Pause size={14} /> : <Play size={14} />}
          <span>{state.running ? 'Pause' : 'Start'}</span>
        </button>
        <button type="button" className="ctx-widget__btn ctx-widget__btn--ghost" onClick={() => dispatch({ type: 'reset' })}>
          <RotateCcw size={14} />
        </button>
      </div>
    </div>
  );
}
