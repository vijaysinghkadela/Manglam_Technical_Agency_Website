# Subagent-Driven Development

Use when executing implementation plans with independent tasks in the current session. This skill orchestrates multiple parallel workstreams using specialized subagents.

## When to Use

- Large features requiring multiple parallel tasks
- Implementation plans with 3+ independent work items
- Need to maximize throughput on complex work
- Tasks can be cleanly separated by domain/concern

## Subagent Architecture

```
┌─────────────────────────────────────────────────────────┐
│                   ORCHESTRATOR AGENT                     │
│  - Breaks down work into parallel tasks                  │
│  - Assigns tasks to specialized subagents                │
│  - Monitors progress and handles dependencies            │
│  - Integrates results                                    │
└─────────────────────────────────────────────────────────┘
                            │
        ┌───────────────────┼───────────────────┐
        ▼                   ▼                   ▼
┌───────────────┐   ┌───────────────┐   ┌───────────────┐
│  IMPLEMENTER  │   │   REVIEWER    │   │    TESTER     │
│  - Write code │   │  - Code review│   │  - Write tests│
│  - Follow spec│   │  - Best practs│   │  - Run tests  │
│  - Document   │   │  - Security   │   │  - Coverage   │
└───────────────┘   └───────────────┘   └───────────────┘
```

## Subagent Types

### 1. Implementer Subagent

**Responsibilities:**
- Write production code following specifications
- Implement features according to the plan
- Add appropriate comments and documentation
- Follow project coding standards

**Prompt Template:**
```markdown
You are an Implementer subagent. Your task is to implement:

## Feature: [Feature Name]

### Specification
[Detailed spec from plan]

### Files to Create/Modify
- [file1.ts]
- [file2.ts]

### Constraints
- Follow existing code patterns
- Use TypeScript strict mode
- Add JSDoc comments

### Acceptance Criteria
- [ ] [Criterion 1]
- [ ] [Criterion 2]

Implement ONLY what is specified. Do not add unrequested features.
```

### 2. Reviewer Subagent

**Responsibilities:**
- Review code for quality and best practices
- Check for security vulnerabilities
- Ensure consistency with codebase
- Suggest improvements

**Prompt Template:**
```markdown
You are a Code Reviewer subagent. Review the following changes:

## Code to Review
[Code or file references]

## Review Checklist
- [ ] Code follows project conventions
- [ ] No security vulnerabilities
- [ ] Proper error handling
- [ ] Adequate documentation
- [ ] No unnecessary complexity
- [ ] Tests cover new code

Provide specific, actionable feedback.
```

### 3. Tester Subagent

**Responsibilities:**
- Write comprehensive test cases
- Ensure edge cases are covered
- Run tests and report results
- Maintain test coverage

**Prompt Template:**
```markdown
You are a Tester subagent. Write tests for:

## Feature: [Feature Name]

### Code to Test
[Implementation reference]

### Test Requirements
- Unit tests for all public functions
- Integration tests for API endpoints
- Edge cases: [list]

### Coverage Target
Minimum 80% code coverage
```

### 4. Documentation Subagent

**Responsibilities:**
- Write/update documentation
- Create API documentation
- Update README files
- Document architecture decisions

## Orchestration Workflow

### Step 1: Plan Decomposition

Break the plan into parallel workstreams:

```markdown
## Implementation Plan: Contact Form Enhancement

### Parallel Workstreams

#### Stream 1: Backend API (Implementer)
- Create validation middleware
- Update contact controller
- Add rate limiting

#### Stream 2: Frontend Form (Implementer)
- Build form component
- Add client validation
- Implement loading states

#### Stream 3: Tests (Tester)
- Unit tests for validation
- Integration tests for API
- E2E tests for form flow

#### Stream 4: Documentation (Documentation)
- API documentation
- Component documentation
```

### Step 2: Parallel Execution

Launch subagents for independent streams:

```typescript
// Conceptual representation
const results = await Promise.all([
  launchSubagent('implementer', backendSpec),
  launchSubagent('implementer', frontendSpec),
  launchSubagent('tester', testSpec),
  launchSubagent('documentation', docSpec),
]);
```

### Step 3: Integration

After parallel work completes:

1. **Merge Results** - Combine all outputs
2. **Resolve Conflicts** - Handle any overlapping changes
3. **Integration Testing** - Verify components work together
4. **Final Review** - Holistic review of combined work

### Step 4: Verification

Run full verification before completion:

```bash
# All tests pass
npm test

# Build succeeds
npm run build

# No lint errors
npm run lint
```

## Task Assignment Matrix

| Task Type | Subagent | Parallelizable |
|-----------|----------|----------------|
| New component | Implementer | Yes |
| API endpoint | Implementer | Yes |
| Unit tests | Tester | Yes (after impl) |
| Code review | Reviewer | Yes (after impl) |
| Documentation | Documentation | Yes |
| Integration | Orchestrator | No (sequential) |

## Communication Protocol

Subagents communicate through structured outputs:

```markdown
## Subagent Report

### Task: [Task Name]
### Status: Complete | In Progress | Blocked

### Output
[Description of what was done]

### Files Modified
- path/to/file.ts

### Blockers
[Any dependencies or issues]

### Ready for Review: Yes/No
```

## Best Practices

1. **Clear Boundaries** - Each subagent has well-defined scope
2. **No Overlap** - Avoid multiple agents editing same files
3. **Dependency Awareness** - Sequential tasks wait for dependencies
4. **Consistent Standards** - All agents follow same conventions
5. **Regular Integration** - Don't let parallel work diverge too long

## Related Skills

- [[writing-plans]] - Create plans to decompose
- [[verification-before-completion]] - Verify integrated work
- [[code-review]] - Review subagent outputs
- [[test-driven-development]] - Tester subagent workflow
