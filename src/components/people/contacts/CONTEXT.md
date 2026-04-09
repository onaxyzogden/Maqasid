# Contacts

## Purpose
Contact management — listing, cards, table view, and adding contacts. Provides both card and table layouts with toolbar filtering and a floating action button for quick add.

## File Inventory
| File | Role |
|------|------|
| ContactsPage.jsx | Main contacts page — manages view mode (card/table) and filtering state |
| ContactsPage.css | Styles for contacts page layout and view transitions |
| ContactCard.jsx | Individual contact card with avatar, name, and key details |
| ContactCard.css | Styles for contact card layout and hover states |
| ContactsTable.jsx | Table/list view of contacts with sortable columns |
| ContactsToolbar.jsx | Toolbar with search, filter, and view toggle controls |
| AddContactModal.jsx | Modal form for creating a new contact |
| FloatingFAB.jsx | Floating action button for quick-add contact from any scroll position |

## Dependencies
- Stores: people store (contacts list, contact CRUD)
- Data: `src/data/config/contact-config.js`
