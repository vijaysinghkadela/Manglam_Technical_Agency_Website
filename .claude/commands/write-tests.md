# Write Tests

Write comprehensive tests for specified code.

## Usage
/write-tests <file-or-feature>

## Process
1. Analyze the code to test
2. Identify test cases (happy path, edge cases, errors)
3. Write tests using appropriate testing tools
4. Ensure meaningful coverage

## Output
Test file(s) with comprehensive test cases.

---

$ARGUMENTS

Write tests for the code/feature specified above.

Use the `test-driven-development` skill to:

### Analyze
- What are the public APIs/interfaces?
- What are the expected behaviors?
- What are the edge cases?
- What can go wrong?

### Test Categories
1. **Happy Path** - Normal successful usage
2. **Edge Cases** - Boundary conditions, empty inputs
3. **Error Cases** - Invalid inputs, failures
4. **Integration** - How it works with other parts

### Testing Stack
- Frontend components: Jest + React Testing Library
- Backend API: Jest + Supertest
- Utilities: Jest

### Guidelines
- Use AAA pattern (Arrange-Act-Assert)
- One concept per test
- Descriptive test names
- Test behavior, not implementation

Output the test file with:
- Proper imports and setup
- Organized describe blocks
- Comprehensive test cases
- Cleanup if needed
