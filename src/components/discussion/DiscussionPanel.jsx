import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { safeGetJSON, safeSet } from '../../services/storage';
import { useAppStore } from '../../store/app-store';
import { useAuthStore } from '../../store/auth-store';
import './DiscussionPanel.css';

const STORAGE_KEY = 'global_discussion_messages';

function getInitials(name) {
  if (!name) return '?';
  return name.split(' ').map((w) => w[0]).join('').slice(0, 2);
}

function formatTime(iso) {
  if (!iso) return '';
  return new Date(iso).toLocaleString('en', {
    month: 'short', day: 'numeric',
    hour: '2-digit', minute: '2-digit', hour12: true,
  });
}

export default function DiscussionPanel() {
  const discussionOpen = useAppStore((s) => s.discussionOpen);
  const setDiscussionOpen = useAppStore((s) => s.setDiscussionOpen);
  const user = useAuthStore((s) => s.user);

  const [isPanelClosing, setIsPanelClosing] = useState(false);
  const [messages, setMessages] = useState(() => safeGetJSON(STORAGE_KEY, []));
  const [draft, setDraft] = useState('');
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom when messages change or panel opens
  useEffect(() => {
    if (discussionOpen && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages.length, discussionOpen]);

  const sendMessage = () => {
    if (!draft.trim()) return;
    const msg = {
      id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
      text: draft.trim(),
      author: user?.name || 'You',
      createdAt: new Date().toISOString(),
    };
    const updated = [...messages, msg];
    setMessages(updated);
    safeSet(STORAGE_KEY, updated);
    setDraft('');
  };

  const closePanel = () => {
    setIsPanelClosing(true);
    setTimeout(() => {
      setDiscussionOpen(false);
      setIsPanelClosing(false);
    }, 220);
  };

  if (!discussionOpen) return null;

  const authorName = user?.name || 'You';

  return (
    <>
      <div className="discussion-panel-overlay" onClick={closePanel} />
      <div className={`discussion-panel${isPanelClosing ? ' discussion-panel--closing' : ''}`}>
        <div className="discussion-panel__header">
          <span className="discussion-panel__title">Discussion</span>
          <button className="discussion-panel__close" onClick={closePanel}>
            <X size={16} />
          </button>
        </div>

        <div className="discussion-panel__messages">
          {messages.length === 0 ? (
            <div className="discussion-panel__empty">
              <MessageCircle size={28} style={{ color: 'var(--text3)', marginBottom: 8 }} />
              <div>No messages yet. Start the conversation.</div>
            </div>
          ) : (
            messages.map((msg) => (
              <div key={msg.id} className="discussion-panel__message">
                <div className="discussion-panel__avatar">{getInitials(msg.author)}</div>
                <div className="discussion-panel__msg-content">
                  <div className="discussion-panel__msg-meta">
                    <span className="discussion-panel__msg-author">{msg.author}</span>
                    <span className="discussion-panel__msg-time">{formatTime(msg.createdAt)}</span>
                  </div>
                  <p className="discussion-panel__msg-text">{msg.text}</p>
                </div>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="discussion-panel__input-area">
          <textarea
            className="discussion-panel__textarea"
            placeholder="Type a message..."
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
              }
            }}
            rows={1}
          />
          <button
            className="btn btn-primary discussion-panel__send"
            onClick={sendMessage}
            disabled={!draft.trim()}
          >
            <Send size={14} />
          </button>
        </div>
      </div>
    </>
  );
}
