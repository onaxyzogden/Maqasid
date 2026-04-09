# Detail

## Purpose
Shared detail panel — displays contact or employee details in a slide-out panel with tabbed content sections and inline editing.

## File Inventory
| File | Role |
|------|------|
| DetailPanel.jsx | Main panel container — handles open/close, selected entity, and tab routing |
| DetailPanel.css | Styles for panel slide-out animation, layout, and responsive behavior |
| DetailPanelHeader.jsx | Panel header — avatar, name, status badge, and close/action buttons |
| DetailPanelTabs.jsx | Tab navigation and content switching within the detail panel |
| EditSidePanel.jsx | Inline edit mode — form overlay for modifying entity fields without leaving the panel |

## Dependencies
- Stores: people store (selected contact/employee, edit state)
- Data: `src/data/config/contact-config.js`, `src/data/config/people-departments.js`
