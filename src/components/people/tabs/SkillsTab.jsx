import { useState } from 'react';
import { X, Plus } from 'lucide-react';
import { useContactsStore } from '@store/contacts-store';

export default function SkillsTab({ contactId }) {
  const contact = useContactsStore((s) => s.contacts.find((c) => c.id === contactId));
  const updateContact = useContactsStore((s) => s.updateContact);

  const skills = contact?.skills || [];
  const [input, setInput] = useState('');

  function addSkill() {
    const value = input.trim();
    if (!value || skills.includes(value)) return;
    updateContact(contactId, { skills: [...skills, value] });
    setInput('');
  }

  function removeSkill(skill) {
    updateContact(contactId, { skills: skills.filter((s) => s !== skill) });
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') { e.preventDefault(); addSkill(); }
  }

  if (!contactId) return null;

  return (
    <div style={{ paddingTop: 16, display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* Input */}
      <div style={{ display: 'flex', gap: 8 }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Add a skill..."
          style={{
            flex: 1, padding: '8px 12px', borderRadius: 8,
            border: '1.5px solid var(--border)', background: 'var(--bg)',
            color: 'var(--text)', fontSize: 13, outline: 'none',
          }}
        />
        <button
          onClick={addSkill}
          disabled={!input.trim()}
          style={{
            display: 'flex', alignItems: 'center', gap: 4,
            padding: '8px 14px', borderRadius: 8,
            background: input.trim() ? 'var(--mod-people)' : 'var(--bg3)',
            color: input.trim() ? '#fff' : 'var(--text3)',
            border: 'none', fontWeight: 600, fontSize: 13, cursor: 'pointer',
          }}
        >
          <Plus size={14} /> Add
        </button>
      </div>

      {/* Skills tags */}
      {skills.length > 0 ? (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {skills.map((skill) => (
            <span
              key={skill}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                padding: '5px 10px', borderRadius: 6,
                background: 'color-mix(in srgb, var(--mod-people) 12%, transparent)',
                color: 'var(--text)', fontSize: 13, fontWeight: 500,
                border: '1px solid color-mix(in srgb, var(--mod-people) 25%, transparent)',
              }}
            >
              {skill}
              <button
                onClick={() => removeSkill(skill)}
                style={{
                  display: 'flex', alignItems: 'center', padding: 0,
                  background: 'none', border: 'none', cursor: 'pointer',
                  color: 'var(--text3)',
                }}
              >
                <X size={12} />
              </button>
            </span>
          ))}
        </div>
      ) : (
        <div style={{
          padding: 24, borderRadius: 12, background: 'var(--bg3)',
          textAlign: 'center', color: 'var(--text3)', fontSize: 13, lineHeight: 1.5,
        }}>
          No skills added yet. Type a skill above and press Enter.
        </div>
      )}
    </div>
  );
}
