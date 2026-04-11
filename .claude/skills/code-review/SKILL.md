# Code Review

Systematic code review skill for ensuring quality, catching bugs, and maintaining standards. Use when reviewing code changes, PRs, or self-reviewing before commit.

## When to Use

- Reviewing pull requests
- Self-review before committing
- Auditing existing code
- Onboarding to a new codebase
- After subagent completes implementation

## Review Categories

### 1. Correctness

Does the code do what it's supposed to?

```typescript
// Check: Does this handle all cases?
function divide(a: number, b: number): number {
  return a / b;  // ❌ Missing: b === 0 check
}

// Fixed
function divide(a: number, b: number): number {
  if (b === 0) throw new Error('Cannot divide by zero');
  return a / b;  // ✓
}
```

### 2. Security

Are there vulnerabilities?

```typescript
// ❌ SQL Injection risk
const query = `SELECT * FROM users WHERE id = ${userId}`;

// ✓ Parameterized query
const query = 'SELECT * FROM users WHERE id = ?';
db.query(query, [userId]);

// ❌ XSS risk
element.innerHTML = userInput;

// ✓ Safe
element.textContent = userInput;
```

### 3. Performance

Are there obvious performance issues?

```typescript
// ❌ N+1 query
users.forEach(async user => {
  const posts = await db.posts.find({ userId: user.id });
});

// ✓ Batch query
const userIds = users.map(u => u.id);
const posts = await db.posts.find({ userId: { $in: userIds } });
```

### 4. Readability

Is the code easy to understand?

```typescript
// ❌ Unclear
const x = a ? (b ? c : d) : e;

// ✓ Clear
let result;
if (a && b) {
  result = c;
} else if (a) {
  result = d;
} else {
  result = e;
}
```

### 5. Maintainability

Will this be easy to change?

```typescript
// ❌ Magic numbers
if (user.age >= 18 && user.score >= 75) { ... }

// ✓ Named constants
const MINIMUM_AGE = 18;
const PASSING_SCORE = 75;
if (user.age >= MINIMUM_AGE && user.score >= PASSING_SCORE) { ... }
```

### 6. Testing

Is the code testable and tested?

```typescript
// ❌ Hard to test (tight coupling)
function sendEmail(userId: string) {
  const user = database.getUser(userId);
  emailService.send(user.email, 'Hello');
}

// ✓ Testable (dependency injection)
function sendEmail(user: User, emailService: EmailService) {
  emailService.send(user.email, 'Hello');
}
```

## Review Checklist

### General
- [ ] Code compiles/builds without errors
- [ ] No linting warnings
- [ ] Follows project coding standards
- [ ] No commented-out code
- [ ] No debug statements (console.log)

### Functionality
- [ ] Implements requirements correctly
- [ ] Edge cases handled
- [ ] Error handling present
- [ ] Input validation
- [ ] Null/undefined checks

### Security
- [ ] No hardcoded secrets
- [ ] Input sanitization
- [ ] Authentication/authorization checks
- [ ] No SQL/NoSQL injection vectors
- [ ] No XSS vulnerabilities

### Performance
- [ ] No obvious N+1 queries
- [ ] Appropriate data structures
- [ ] No unnecessary re-renders (React)
- [ ] Lazy loading where appropriate

### Testing
- [ ] Tests exist for new code
- [ ] Tests are meaningful (not just coverage)
- [ ] Edge cases tested
- [ ] Tests pass

### Documentation
- [ ] Complex logic commented
- [ ] Public APIs documented
- [ ] README updated if needed

## Review Process

### Step 1: Understand Context

Before reviewing code:
- Read the PR description
- Understand the requirements
- Check related issues/tickets

### Step 2: High-Level Review

First pass - big picture:
- Does the approach make sense?
- Is the architecture appropriate?
- Are there major concerns?

### Step 3: Detailed Review

Second pass - line by line:
- Check each file systematically
- Note issues with specific lines
- Verify logic correctness

### Step 4: Test Verification

Verify testing:
- Are tests present?
- Do tests cover the changes?
- Are tests meaningful?

### Step 5: Provide Feedback

Structure feedback clearly:

```markdown
## Code Review: [PR Title]

### Summary
Overall good implementation. A few suggestions below.

### Must Fix (Blocking)
- **Line 45:** SQL injection vulnerability - use parameterized query
- **Line 78:** Missing null check will cause crash

### Should Fix (Non-blocking)
- **Line 23:** Consider extracting this to a constant
- **Line 56:** This could be simplified using array methods

### Suggestions (Optional)
- Nice pattern! Consider applying this elsewhere too
- Could add a comment explaining the business logic
```

## Common Issues by Language/Framework

### TypeScript/JavaScript
- Missing type annotations
- `any` type usage
- Async/await without try-catch
- Missing array bounds checks

### React
- Missing dependency arrays in useEffect
- Inline function definitions causing re-renders
- Missing keys in lists
- Direct state mutation

### Node.js/Express
- Unhandled promise rejections
- Missing error middleware
- Blocking the event loop
- Memory leaks in streams

### MongoDB/Mongoose
- Missing indexes
- Not using lean() for read-only
- Unbounded queries (no limit)
- Not handling ObjectId conversion

## Self-Review Checklist

Before committing, ask yourself:

1. **Would I approve this PR?**
2. **Is there any code I'm embarrassed about?**
3. **Did I leave any TODOs?**
4. **Are there any obvious bugs?**
5. **Will my future self understand this?**

## MTA Website Specifics

When reviewing MTA code, also check:

- [ ] Brand colors used correctly (#6B1A1A)
- [ ] Responsive design works
- [ ] Accessibility (ARIA, semantic HTML)
- [ ] SEO considerations (meta tags, semantic markup)
- [ ] Loading states for async operations
- [ ] Error boundaries for client components

## Related Skills

- [[test-driven-development]] - Tests support review
- [[systematic-debugging]] - Debug issues found in review
- [[verification-before-completion]] - Verify after fixing review items
