# Claude Memory

Persistent memory and context management for maintaining project knowledge across sessions. Use for storing decisions, learnings, and context that should persist.

## When to Use

- Recording important project decisions
- Storing architectural choices and rationale
- Capturing user preferences
- Documenting recurring patterns
- Building project-specific knowledge base

## Memory Architecture

### 1. Project Context (AGENTS.md / CLAUDE.md)

Central file for project-wide context:

```markdown
# Project: MTA Website

## Quick Facts
- Framework: Next.js 15 + React 19
- Styling: Tailwind CSS
- Backend: Express.js + MongoDB
- Deployment: Docker + Vercel

## Key Decisions
- Using Zustand for state (lightweight, already familiar)
- REST API over GraphQL (simpler for current needs)
- MongoDB over PostgreSQL (flexible schema for CMS-like content)

## Patterns
- Components: src/components/{Feature}/{Component}.tsx
- Services: src/services/{domain}.service.ts
- Hooks: src/hooks/use{Feature}.ts

## User Preferences
- Prefers explicit imports over barrel files
- Wants comprehensive error handling
- Values performance over feature richness
```

### 2. Decision Log

Track important decisions:

```markdown
## Decision Log

### 2024-01-15: State Management
**Decision:** Use Zustand over Redux
**Context:** Needed simple state management for form data
**Rationale:** 
- Smaller bundle size
- Less boilerplate
- Team already familiar
**Alternatives Considered:** Redux, Jotai, Context API

### 2024-01-16: API Design
**Decision:** REST over GraphQL
**Context:** Building CRUD APIs for contact forms
**Rationale:**
- Simpler implementation
- Better caching with standard HTTP
- Team expertise
```

### 3. Learnings Repository

Capture project-specific learnings:

```markdown
## Learnings

### Next.js App Router Gotchas
- `use client` must be at top of file
- Server components can't use hooks
- Metadata must be in server components

### MongoDB/Mongoose
- Always define indexes for query fields
- Use lean() for read-only queries
- Connection pooling is automatic

### Deployment
- Vercel preview deploys on every PR
- Environment variables need NEXT_PUBLIC_ prefix for client
- Docker build caches node_modules
```

## Memory Categories

### 1. Facts (Immutable)
```yaml
project_name: MTA Website
framework: Next.js 15
started: 2024-01-01
owner: Vinay Pal Singh Kadela
```

### 2. Decisions (Append-only)
```yaml
decisions:
  - date: 2024-01-15
    topic: state_management
    choice: zustand
    rationale: "Lightweight, familiar"
```

### 3. Preferences (Updateable)
```yaml
preferences:
  code_style: explicit_imports
  comments: minimal_but_clear
  testing: happy_path_first
```

### 4. Context (Session)
```yaml
current_task: "Building contact form"
blockers: []
next_steps:
  - Add email validation
  - Connect to backend
```

## Memory Operations

### Store Memory

When you learn something important:

```markdown
## New Learning: [Topic]

**Context:** [When/why this came up]
**Learning:** [What we discovered]
**Application:** [How to use this knowledge]
```

### Retrieve Memory

Before starting work, check:
1. AGENTS.md for project context
2. Decision log for past choices
3. Learnings for gotchas

### Update Memory

After significant work:
1. Update decision log if decisions were made
2. Add learnings if something new was discovered
3. Update preferences if user expressed them

## Memory Templates

### Session Start Checklist

```markdown
## Session Context

### Previous Session
- Last worked on: [feature/task]
- Left off at: [specific point]
- Blockers: [any]

### Current Session
- Goal: [what to accomplish]
- Priority: [high/medium/low]
- Time available: [estimate]
```

### Session End Summary

```markdown
## Session Summary: [Date]

### Completed
- [x] Task 1
- [x] Task 2

### In Progress
- [ ] Task 3 (50% done)

### Blockers
- [Blocker description]

### Decisions Made
- [Decision and rationale]

### Learnings
- [New knowledge gained]

### Next Session
- Start with: [specific task]
- Remember: [important context]
```

## MTA Website Memory

### Project Facts
```yaml
client: Manglam Technical Agency
type: Corporate website
owner: Vinay Pal Singh Kadela
brand_color: "#6B1A1A"
services: 6 (AI, SMM, Cybersecurity, SaaS, Branding, Content)
```

### Established Patterns
```yaml
components: frontend/src/components/
pages: frontend/src/pages/
api: backend/src/routes/
services: backend/src/services/
```

### Key Decisions
- Docker for deployment (containerized, portable)
- MongoDB for database (flexible, scalable)
- Tailwind for styling (utility-first, consistent)

## Memory Sync

At session boundaries:

1. **Start of session:** Read AGENTS.md, recall context
2. **During session:** Note decisions, learnings
3. **End of session:** Update AGENTS.md with new knowledge

## Related Skills

- [[writing-plans]] - Plans become memory
- [[retrospective]] - Session learnings to memory
- [[subagent-driven-development]] - Share context with subagents
