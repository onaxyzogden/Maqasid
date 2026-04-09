---
type: community
cohesion: 0.11
members: 21
---

# BBOS Role Access & Pipeline UI

**Cohesion:** 0.11 - loosely connected
**Members:** 21 nodes

## Members
- [[BbosPipelineHeader()]] - code - src\components\bbos\BbosPipelineHeader.jsx
- [[BbosPipelineHeader.jsx]] - code - src\components\bbos\BbosPipelineHeader.jsx
- [[BbosRoleBadge()]] - code - src\components\bbos\BbosRoleBadge.jsx
- [[BbosRoleBadge.jsx]] - code - src\components\bbos\BbosRoleBadge.jsx
- [[BbosRolePicker()]] - code - src\components\bbos\BbosRolePicker.jsx
- [[BbosRolePicker.jsx]] - code - src\components\bbos\BbosRolePicker.jsx
- [[GLabelBadge()]] - code - src\components\shared\GLabelBadge.jsx
- [[GLabelBadge.jsx]] - code - src\components\shared\GLabelBadge.jsx
- [[KanbanBoard()]] - code - src\components\work\KanbanBoard.jsx
- [[KanbanBoard.jsx]] - code - src\components\work\KanbanBoard.jsx
- [[KanbanCard()]] - code - src\components\work\KanbanCard.jsx
- [[KanbanCard.jsx]] - code - src\components\work\KanbanCard.jsx
- [[KanbanColumn()]] - code - src\components\work\KanbanColumn.jsx
- [[KanbanColumn.jsx]] - code - src\components\work\KanbanColumn.jsx
- [[bbos-role-access.js]] - code - src\data\bbos\bbos-role-access.js
- [[formatDate()]] - code - src\components\work\KanbanCard.jsx
- [[g-labels.js]] - code - src\data\config\g-labels.js
- [[getAccessibleStagesForRole()]] - code - src\data\bbos\bbos-role-access.js
- [[getBbosRole()]] - code - src\data\bbos\bbos-role-access.js
- [[getGLabel()]] - code - src\data\config\g-labels.js
- [[getTaskAccessLevel()]] - code - src\data\bbos\bbos-role-access.js

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/BBOS_Role_Access_&_Pipeline_UI
SORT file.name ASC
```

## Connections to other communities
- 6 edges to [[_COMMUNITY_Layout & Islamic Ceremony UI]]
- 3 edges to [[_COMMUNITY_App Router & Module Pages]]

## Top bridge nodes
- [[KanbanBoard.jsx]] - degree 6, connects to 2 communities
- [[BbosPipelineHeader.jsx]] - degree 4, connects to 2 communities
- [[bbos-role-access.js]] - degree 9, connects to 1 community
- [[KanbanCard.jsx]] - degree 7, connects to 1 community
- [[BbosRolePicker.jsx]] - degree 4, connects to 1 community