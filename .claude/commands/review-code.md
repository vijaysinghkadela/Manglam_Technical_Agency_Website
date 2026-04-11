# Review Code

Perform a comprehensive code review on specified files or recent changes.

## Usage
/review-code <file-path-or-description>

## Process
1. Read the specified code
2. Check for correctness, security, performance
3. Verify adherence to project standards
4. Provide actionable feedback

## Output
Structured code review with prioritized feedback.

---

$ARGUMENTS

Perform a code review on the code specified above.

Use the `code-review` skill to check:

### Correctness
- Logic errors
- Edge case handling
- Type safety

### Security
- Input validation
- Injection vulnerabilities
- Authentication/authorization

### Performance
- N+1 queries
- Unnecessary re-renders
- Memory leaks

### Standards
- MTA coding conventions
- TypeScript best practices
- React patterns

Provide feedback in this format:
1. **Critical Issues** - Must fix before merge
2. **Important Issues** - Should fix
3. **Suggestions** - Optional improvements
4. **Positive Notes** - What's done well

Be specific with line numbers and provide code examples for fixes.
