# Test-Driven Development (TDD)

Enforce disciplined RED-GREEN-REFACTOR cycles using separate subagents for test writing and implementation. Use when the user requests TDD, test-first development, or wants a feature built with tests enforced from the start.

## When to Use

- User explicitly requests TDD or "test-first" development
- Building critical features that require high reliability
- Implementing complex business logic that needs verification
- Refactoring existing code with confidence

## Workflow

### Phase 1: RED - Write Failing Tests First

Before writing any implementation code:

1. **Understand the requirement** - Clarify what behavior needs to be tested
2. **Write the test** - Create a test that describes the expected behavior
3. **Run the test** - Verify it fails (RED state)
4. **Commit the failing test** - This documents the requirement

```bash
# Run tests to verify RED state
npm test -- --watch
```

### Phase 2: GREEN - Minimal Implementation

Write the simplest code that makes the test pass:

1. **Write minimal code** - Only enough to pass the test
2. **No premature optimization** - Keep it simple
3. **Run tests** - Verify they pass (GREEN state)
4. **Commit the passing implementation**

### Phase 3: REFACTOR - Improve the Code

With passing tests as a safety net:

1. **Identify improvements** - DRY, clarity, performance
2. **Refactor incrementally** - Small changes, run tests often
3. **Maintain GREEN state** - Tests must stay passing
4. **Commit refactored code**

## Subagent Structure

### Test Writer Subagent

Responsible for:
- Analyzing requirements
- Writing comprehensive test cases
- Ensuring edge cases are covered
- Following testing best practices (AAA pattern)

### Implementer Subagent

Responsible for:
- Writing minimal implementation to pass tests
- Not adding untested functionality
- Following the "simplest thing that works" principle

## Testing Patterns

### Arrange-Act-Assert (AAA)

```typescript
describe('Calculator', () => {
  it('should add two numbers', () => {
    // Arrange
    const calculator = new Calculator();
    
    // Act
    const result = calculator.add(2, 3);
    
    // Assert
    expect(result).toBe(5);
  });
});
```

### Test Categories

1. **Unit Tests** - Test individual functions/components in isolation
2. **Integration Tests** - Test how components work together
3. **E2E Tests** - Test complete user workflows

## Commands

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage

# Run specific test file
npm test -- path/to/test.spec.ts
```

## Best Practices

1. **One assertion per test** - Keep tests focused
2. **Descriptive test names** - Document behavior, not implementation
3. **Independent tests** - No shared state between tests
4. **Fast tests** - Mock external dependencies
5. **Test behavior, not implementation** - Tests should survive refactoring

## Integration with MTA Project

For the MTA Website project:

- **Frontend tests**: Jest + React Testing Library for components
- **Backend tests**: Jest + Supertest for API endpoints
- **E2E tests**: Playwright for full user journeys

## Related Skills

- [[systematic-debugging]] - When tests reveal bugs
- [[verification-before-completion]] - Verify all tests pass before completing
- [[code-review]] - Review test coverage and quality
