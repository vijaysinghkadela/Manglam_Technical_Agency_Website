# Implement Feature

Implement a feature using the subagent-driven development pattern.

## Usage
/implement <feature-or-plan>

## Process
1. Break down into parallel tasks
2. Assign to appropriate agents
3. Execute in parallel where possible
4. Integrate results
5. Verify completion

## Output
Implemented feature with tests.

---

$ARGUMENTS

Implement the feature/plan specified above.

Use the `subagent-driven-development` skill:

### Task Breakdown
Identify independent workstreams:
- Frontend components
- Backend API
- Tests
- Documentation

### Parallel Execution
Run independent tasks simultaneously:

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  Frontend   │     │   Backend   │     │    Tests    │
│  Component  │     │     API     │     │   (after)   │
└─────────────┘     └─────────────┘     └─────────────┘
```

### Agent Assignments
- **UI/UX Agent**: Styling, responsive design
- **React Agent**: Component logic, state
- **API Agent**: Express routes, controllers
- **Test Agent**: Unit and integration tests

### Integration
After parallel work:
1. Merge all changes
2. Resolve any conflicts
3. Run integration tests
4. Verify end-to-end

### Verification
Before claiming complete:
- All tests pass
- Build succeeds
- Feature works as specified

Execute the implementation now.
