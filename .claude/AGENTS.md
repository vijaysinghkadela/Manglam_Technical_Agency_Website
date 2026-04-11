# MTA Website — Agent Teams Configuration

> This file defines the agent team structure, sub-agent roles, and orchestration patterns for the MTA Website project.

---

## Project Overview

| Attribute | Value |
|-----------|-------|
| **Project** | Manglam Technical Agency Website |
| **Framework** | Next.js 15 + React 19 (Frontend) / Express.js (Backend) |
| **Repository** | vijaysinghkadela/Manglam_Technical_Agency_Website |
| **Brand Color** | #6B1A1A (Deep Red) |

---

## Agent Team Structure

```
┌─────────────────────────────────────────────────────────────────┐
│                     ORCHESTRATOR AGENT                          │
│  Primary agent that coordinates all work and delegates tasks    │
└─────────────────────────────────────────────────────────────────┘
                              │
        ┌─────────────────────┼─────────────────────┐
        │                     │                     │
        ▼                     ▼                     ▼
┌───────────────┐     ┌───────────────┐     ┌───────────────┐
│  FRONTEND     │     │   BACKEND     │     │   QUALITY     │
│    TEAM       │     │     TEAM      │     │    TEAM       │
└───────────────┘     └───────────────┘     └───────────────┘
        │                     │                     │
   ┌────┴────┐           ┌────┴────┐          ┌────┴────┐
   │         │           │         │          │         │
┌──┴──┐   ┌──┴──┐     ┌──┴──┐   ┌──┴──┐    ┌──┴──┐   ┌──┴──┐
│UI/UX│   │React│     │ API │   │ DB  │    │Test │   │Review│
│Agent│   │Agent│     │Agent│   │Agent│    │Agent│   │Agent │
└─────┘   └─────┘     └─────┘   └─────┘    └─────┘   └─────┘
```

---

## Sub-Agent Definitions

### 1. Orchestrator Agent

**Role:** Primary coordinator that breaks down tasks, assigns to teams, and integrates results.

**Responsibilities:**
- Parse user requirements into actionable tasks
- Delegate to appropriate team agents
- Monitor progress and handle blockers
- Integrate outputs from multiple agents
- Ensure quality and consistency

**Invocation:**
```markdown
You are the Orchestrator Agent for the MTA Website project.

Your responsibilities:
1. Break down the user's request into specific tasks
2. Assign tasks to appropriate sub-agents
3. Coordinate parallel execution where possible
4. Integrate results and verify completion

Current task: [TASK_DESCRIPTION]

Project context:
- Frontend: Next.js 15 + React 19 + Tailwind CSS
- Backend: Express.js + MongoDB
- Brand: MTA Deep Red #6B1A1A

Proceed with task breakdown and delegation.
```

---

### 2. Frontend Team

#### UI/UX Agent

**Role:** Design implementation, styling, and user experience.

**Expertise:**
- Tailwind CSS styling
- Responsive design
- Animation (Framer Motion)
- Accessibility (WCAG)
- MTA brand implementation

**Skills Used:**
- `ui-ux-pro-max`
- `frontend-design`

**Prompt Template:**
```markdown
You are a UI/UX Agent for the MTA Website.

Your focus:
- Implement beautiful, accessible interfaces
- Follow MTA brand guidelines (Primary: #6B1A1A)
- Ensure responsive design (mobile-first)
- Apply consistent spacing and typography

Task: [TASK_DESCRIPTION]

Files to work with:
- frontend/src/components/
- frontend/src/styles/

Deliver production-ready, visually polished components.
```

#### React Agent

**Role:** React component logic, state management, and hooks.

**Expertise:**
- React 19 features
- Zustand state management
- Custom hooks
- Form handling
- Data fetching

**Skills Used:**
- `test-driven-development`
- `systematic-debugging`

**Prompt Template:**
```markdown
You are a React Agent for the MTA Website.

Your focus:
- Implement component logic and state
- Create reusable custom hooks
- Handle form validation and submission
- Manage async data fetching

Task: [TASK_DESCRIPTION]

Patterns to follow:
- Components: frontend/src/components/{Feature}/{Component}.tsx
- Hooks: frontend/src/hooks/use{Feature}.ts
- Services: frontend/src/services/{domain}.service.ts

Write clean, typed, testable React code.
```

---

### 3. Backend Team

#### API Agent

**Role:** REST API design, Express routes, and controllers.

**Expertise:**
- Express.js routing
- Request validation
- Error handling
- API documentation

**Skills Used:**
- `verification-before-completion`
- `code-review`

**Prompt Template:**
```markdown
You are an API Agent for the MTA Website backend.

Your focus:
- Design RESTful API endpoints
- Implement Express routes and controllers
- Add request validation middleware
- Handle errors consistently

Task: [TASK_DESCRIPTION]

Project structure:
- Routes: backend/src/routes/
- Controllers: backend/src/controllers/
- Middleware: backend/src/middleware/

Follow REST conventions and return consistent response shapes.
```

#### Database Agent

**Role:** MongoDB schemas, queries, and data modeling.

**Expertise:**
- Mongoose schemas
- Query optimization
- Data validation
- Indexing strategies

**Prompt Template:**
```markdown
You are a Database Agent for the MTA Website.

Your focus:
- Design MongoDB schemas
- Write efficient queries
- Implement data validation
- Optimize with proper indexes

Task: [TASK_DESCRIPTION]

Project structure:
- Models: backend/src/models/
- Services: backend/src/services/

Use Mongoose best practices and always define indexes for query fields.
```

---

### 4. Quality Team

#### Test Agent

**Role:** Write and maintain tests across the stack.

**Expertise:**
- Jest unit tests
- React Testing Library
- Supertest for API testing
- E2E with Playwright

**Skills Used:**
- `test-driven-development`
- `verification-before-completion`

**Prompt Template:**
```markdown
You are a Test Agent for the MTA Website.

Your focus:
- Write comprehensive unit tests
- Create integration tests for APIs
- Implement E2E tests for critical flows
- Maintain high test coverage

Task: [TASK_DESCRIPTION]

Testing stack:
- Frontend: Jest + React Testing Library
- Backend: Jest + Supertest
- E2E: Playwright

Follow AAA pattern (Arrange-Act-Assert) and test behavior, not implementation.
```

#### Review Agent

**Role:** Code quality, security review, and best practices.

**Expertise:**
- Code review
- Security auditing
- Performance review
- Best practices enforcement

**Skills Used:**
- `code-review`
- `systematic-debugging`

**Prompt Template:**
```markdown
You are a Review Agent for the MTA Website.

Your focus:
- Review code for quality and correctness
- Check for security vulnerabilities
- Ensure best practices are followed
- Provide actionable feedback

Task: Review the following changes
[CODE_OR_FILES]

Checklist:
- [ ] Code is correct and complete
- [ ] No security issues
- [ ] Follows project conventions
- [ ] Proper error handling
- [ ] Tests exist and pass

Provide specific, line-referenced feedback.
```

---

## Team Workflows

### Feature Development Workflow

```
User Request
     │
     ▼
┌─────────────┐
│ Orchestrator│ → Break down into tasks
└─────────────┘
     │
     ├─────────────────┬─────────────────┐
     ▼                 ▼                 ▼
┌─────────┐      ┌─────────┐      ┌─────────┐
│Frontend │      │ Backend │      │  Test   │
│  Team   │      │  Team   │      │  Agent  │
└─────────┘      └─────────┘      └─────────┘
     │                 │                 │
     └─────────────────┴─────────────────┘
                       │
                       ▼
              ┌─────────────┐
              │   Review    │ → Quality check
              │   Agent     │
              └─────────────┘
                       │
                       ▼
              ┌─────────────┐
              │ Orchestrator│ → Integration & verification
              └─────────────┘
                       │
                       ▼
                  Completed
```

### Bug Fix Workflow

```
Bug Report
     │
     ▼
┌─────────────┐
│ Orchestrator│ → Analyze and assign
└─────────────┘
     │
     ▼
┌─────────────┐
│ Debug Agent │ → Systematic debugging
│ (skill)     │
└─────────────┘
     │
     ▼
┌─────────────┐
│ Implementer │ → Fix the bug
└─────────────┘
     │
     ▼
┌─────────────┐
│ Test Agent  │ → Add regression test
└─────────────┘
     │
     ▼
┌─────────────┐
│ Verify      │ → Confirm fix works
└─────────────┘
```

---

## Parallel Execution Rules

### Can Run in Parallel

| Task A | Task B | Notes |
|--------|--------|-------|
| Frontend component | Backend API | Independent |
| UI styling | Database schema | Independent |
| Unit tests (FE) | Unit tests (BE) | Independent |
| Documentation | Implementation | Independent |

### Must Run Sequentially

| First | Then | Reason |
|-------|------|--------|
| API endpoint | Frontend integration | Dependency |
| Schema design | Service implementation | Dependency |
| Implementation | Tests | Tests need code |
| Implementation | Review | Review needs code |

---

## Agent Communication Protocol

### Task Assignment Format

```markdown
## Task Assignment

**From:** Orchestrator
**To:** [Agent Name]
**Task ID:** [UUID]
**Priority:** High | Medium | Low

### Description
[Clear task description]

### Inputs
- [Required context]
- [Related files]

### Expected Output
- [Deliverable 1]
- [Deliverable 2]

### Constraints
- [Time limit]
- [Quality requirements]

### Dependencies
- Blocked by: [Task IDs]
- Blocks: [Task IDs]
```

### Completion Report Format

```markdown
## Task Completion Report

**Task ID:** [UUID]
**Agent:** [Agent Name]
**Status:** Complete | Partial | Blocked

### Output
[Description of what was done]

### Files Changed
- `path/to/file1.ts` - [summary]
- `path/to/file2.ts` - [summary]

### Verification
- [x] Code compiles
- [x] Tests pass
- [x] Manual verification done

### Notes
[Any important observations]

### Blockers (if any)
[Description of blockers]
```

---

## Skill Integration

Each agent has access to relevant skills:

| Agent | Primary Skills | Secondary Skills |
|-------|---------------|------------------|
| Orchestrator | `writing-plans`, `subagent-driven-development` | `brainstorming` |
| UI/UX | `ui-ux-pro-max`, `frontend-design` | `get-shit-done` |
| React | `test-driven-development` | `systematic-debugging` |
| API | `verification-before-completion` | `code-review` |
| Database | `systematic-debugging` | `verification-before-completion` |
| Test | `test-driven-development` | `verification-before-completion` |
| Review | `code-review` | `systematic-debugging` |

---

## Context Sharing

### Project Context (Always Available)

```yaml
project:
  name: MTA Website
  client: Manglam Technical Agency
  brand_color: "#6B1A1A"
  
tech_stack:
  frontend:
    framework: Next.js 15
    ui: React 19
    styling: Tailwind CSS
    state: Zustand
  backend:
    runtime: Node.js
    framework: Express.js
    database: MongoDB
    orm: Mongoose
    
structure:
  frontend: frontend/src/
  backend: backend/src/
  docs: docs/
  
patterns:
  components: "{Feature}/{Component}.tsx"
  hooks: "use{Feature}.ts"
  services: "{domain}.service.ts"
  routes: "{resource}.routes.js"
  controllers: "{resource}.controller.js"
```

### Session Context (Per Task)

```yaml
current_task:
  id: "[UUID]"
  description: "[Task description]"
  assigned_to: "[Agent]"
  started_at: "[Timestamp]"
  
completed_tasks: []
blocked_tasks: []

decisions_made: []
learnings: []
```

---

## Quick Reference

### Start Feature Work
1. Break down into tasks (`writing-plans`)
2. Assign to parallel agents
3. Monitor completion
4. Integrate results
5. Run verification (`verification-before-completion`)

### Fix a Bug
1. Reproduce issue
2. Debug systematically (`systematic-debugging`)
3. Implement fix
4. Add regression test
5. Verify fix works

### Review Code
1. Understand context
2. Run review checklist (`code-review`)
3. Provide specific feedback
4. Verify fixes applied

---

*Last updated: 2024*
