# Writing Plans

Structured approach to creating implementation plans before coding. Use when starting features, refactoring, or any substantial development work.

## When to Use

- Starting a new feature or epic
- Planning a refactor or migration
- Before any work estimated at 2+ hours
- User requests a plan or roadmap
- Complex changes touching multiple files/systems

## Plan Structure

### 1. Overview Section

```markdown
## Overview

### Goal
[One sentence describing what we're building]

### Success Criteria
- [ ] [Measurable outcome 1]
- [ ] [Measurable outcome 2]
- [ ] [Measurable outcome 3]

### Non-Goals
- [What we're explicitly NOT doing]
```

### 2. Technical Approach

```markdown
## Technical Approach

### Architecture
[High-level description of the approach]

### Key Decisions
| Decision | Choice | Rationale |
|----------|--------|-----------|
| State management | Zustand | Already in use, lightweight |
| API design | REST | Consistency with existing APIs |

### Dependencies
- Existing: [components, services to use]
- New: [packages to install]
```

### 3. Implementation Steps

```markdown
## Implementation Steps

### Phase 1: Foundation
- [ ] Step 1.1: [Description]
- [ ] Step 1.2: [Description]

### Phase 2: Core Features
- [ ] Step 2.1: [Description]
- [ ] Step 2.2: [Description]

### Phase 3: Polish
- [ ] Step 3.1: [Description]
- [ ] Step 3.2: [Description]
```

### 4. File Changes

```markdown
## File Changes

### New Files
| File | Purpose |
|------|---------|
| `frontend/src/components/ContactForm.tsx` | Main form component |
| `backend/src/controllers/contact.controller.js` | API handler |

### Modified Files
| File | Changes |
|------|---------|
| `frontend/src/pages/contact.tsx` | Import new component |
| `backend/src/routes/index.js` | Add contact routes |
```

### 5. Testing Strategy

```markdown
## Testing Strategy

### Unit Tests
- [ ] ContactForm validation logic
- [ ] Contact controller handlers

### Integration Tests
- [ ] POST /api/contact endpoint

### E2E Tests
- [ ] Complete form submission flow
```

### 6. Risks & Mitigations

```markdown
## Risks & Mitigations

| Risk | Impact | Likelihood | Mitigation |
|------|--------|------------|------------|
| Email service downtime | High | Low | Queue failed sends |
| Spam submissions | Medium | High | Add reCAPTCHA |
```

## Plan Templates

### Feature Plan Template

```markdown
# Feature Plan: [Feature Name]

## Overview
### Goal
### Success Criteria
### Non-Goals
### Timeline Estimate

## User Stories
- As a [user], I want [action] so that [benefit]

## Technical Approach
### Architecture
### Key Decisions
### Dependencies

## Implementation Steps
### Phase 1: [Name]
### Phase 2: [Name]
### Phase 3: [Name]

## File Changes
### New Files
### Modified Files

## Testing Strategy

## Risks & Mitigations

## Open Questions
- [ ] Question 1
- [ ] Question 2
```

### Refactor Plan Template

```markdown
# Refactor Plan: [What's Being Refactored]

## Overview
### Current State
### Desired State
### Why Now

## Scope
### In Scope
### Out of Scope

## Approach
### Strategy
[Incremental vs Big Bang]

### Migration Path
1. Step 1
2. Step 2
3. Step 3

## Testing Strategy
### Before Refactor
- Ensure existing tests pass
- Add missing test coverage

### During Refactor
- Run tests after each change

### After Refactor
- Full regression test

## Rollback Plan
[How to revert if things go wrong]
```

### Bug Fix Plan Template

```markdown
# Bug Fix Plan: [Bug Description]

## Issue
### Reported Behavior
### Expected Behavior
### Steps to Reproduce

## Analysis
### Root Cause
### Affected Components

## Fix Approach
### Solution
### Alternative Approaches Considered

## Implementation
- [ ] Step 1
- [ ] Step 2

## Verification
- [ ] Original issue is resolved
- [ ] No regressions introduced
- [ ] Tests added for this case
```

## Planning Best Practices

### DO:
- **Be specific** - Vague plans lead to scope creep
- **Include estimates** - Even rough ones help planning
- **List dependencies** - Know what blocks what
- **Define done** - Clear success criteria
- **Plan for failure** - Include error handling, rollback

### DON'T:
- Over-plan simple tasks (< 2 hours)
- Plan implementation details too early
- Ignore risks
- Skip the "why" - context matters
- Write plans that only you understand

## Plan Review Checklist

Before starting implementation, verify:

- [ ] Goal is clear and achievable
- [ ] Success criteria are measurable
- [ ] Technical approach is sound
- [ ] Steps are in logical order
- [ ] Dependencies are identified
- [ ] Testing strategy is defined
- [ ] Risks are acknowledged
- [ ] Open questions are resolved

## Integration with MTA Project

For the MTA Website, consider:

1. **Brand Consistency** - Does it match MTA brand guidelines?
2. **Mobile-First** - Is mobile experience planned?
3. **SEO Impact** - Will this affect search rankings?
4. **Performance** - Loading time considerations?
5. **Accessibility** - WCAG compliance planned?

## Related Skills

- [[brainstorming]] - Explore options before planning
- [[subagent-driven-development]] - Execute the plan with subagents
- [[verification-before-completion]] - Verify plan completion
