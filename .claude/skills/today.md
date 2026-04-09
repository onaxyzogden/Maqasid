---
name: today
description: Daily briefing — scans tasks, lessons, review gates, and recent git activity
user_invocable: true
---

# /today — Daily Briefing

Generate a structured daily briefing for the current session.

## Steps

1. **Read active tasks**: Open `tasks/todo.md` and summarize incomplete items
2. **Read recent lessons**: Open `tasks/lessons.md` and surface the 3 most recent entries
3. **Check review gates**: List all files in `stages/` that have `-review` or `-draft` in their name
4. **Recent git activity**: Run `git log --oneline -10` to show last 10 commits
5. **Output briefing** in this format:

```
## Daily Briefing — [DATE]

### Active Tasks
- [list from todo.md]

### Pending Review Gates
- [list from stages/ or "None — all clear"]

### Recent Lessons
- [3 most recent from lessons.md]

### Recent Commits
- [last 10 commits]

### Suggested Focus
[Based on the above, suggest what to work on first]
```

Keep the output concise. Do not read source code files — this is a status overview only.
