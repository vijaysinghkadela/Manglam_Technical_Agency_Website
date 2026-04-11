# Systematic Debugging

Use when encountering any bug, test failure, or unexpected behavior, before proposing fixes. This skill enforces a methodical approach to identifying root causes rather than guessing.

## When to Use

- Test failures occur
- Runtime errors or exceptions
- Unexpected behavior reported
- Performance issues identified
- User-reported bugs need investigation

## The Debugging Protocol

### Step 1: Reproduce the Issue

Before anything else, confirm you can reproduce the problem:

```bash
# Document the exact steps
1. Start the application with: npm run dev
2. Navigate to /contact
3. Submit form without email
4. Observe: Error appears but form still submits
```

**If you can't reproduce it, gather more information first.**

### Step 2: Gather Evidence

Collect all relevant data:

1. **Error messages** - Full stack traces, not just the message
2. **Logs** - Application logs, browser console, network tab
3. **Environment** - OS, Node version, browser, dependencies
4. **Recent changes** - What changed since it last worked?

```bash
# Check recent commits
git log --oneline -10

# Check for dependency changes
git diff HEAD~5 package.json
```

### Step 3: Form a Hypothesis

Based on evidence, form a specific hypothesis:

> "The form submits despite validation errors because the `handleSubmit` function doesn't check the `isValid` state before calling the API."

**Bad hypothesis**: "Something's wrong with the form."
**Good hypothesis**: Specific, testable, based on evidence.

### Step 4: Test the Hypothesis

Add targeted logging or debugging:

```typescript
// Add strategic console.logs
console.log('Form state before submit:', { isValid, errors, values });

// Or use debugger
debugger; // Execution pauses here in DevTools
```

### Step 5: Verify Root Cause

Before fixing, ensure you understand the root cause:

1. Can you explain WHY it happens?
2. Can you predict when it will/won't occur?
3. Does the fix address the root cause or just symptoms?

### Step 6: Fix and Verify

1. **Make the minimal fix** - Don't refactor while debugging
2. **Verify the fix** - Reproduce the original steps
3. **Check for regressions** - Run related tests
4. **Document the fix** - Commit message explains the bug

## Debugging Tools

### Frontend (React/Next.js)

```bash
# Browser DevTools
- Console tab for errors
- Network tab for API issues
- React DevTools for component state
- Sources tab for breakpoints

# VSCode
- Launch Chrome debugger
- Set breakpoints in code
```

### Backend (Node.js/Express)

```bash
# Node debugger
node --inspect src/server.js

# Add debug logging
DEBUG=app:* npm start

# Check specific routes
curl -X POST http://localhost:5000/api/contact -H "Content-Type: application/json" -d '{"email":"test@test.com"}'
```

### Database Issues

```bash
# MongoDB shell
mongosh
use mta_website
db.contacts.find().pretty()

# Check connection
db.adminCommand({ ping: 1 })
```

## Common Bug Categories

### 1. State Management Issues

- Check if state updates are async
- Verify state dependencies in useEffect
- Look for stale closures

### 2. API/Network Issues

- Check request/response in Network tab
- Verify CORS configuration
- Check authentication headers

### 3. Type Errors

- Enable strict TypeScript
- Check for null/undefined
- Verify API response shapes

### 4. Race Conditions

- Look for async operations completing out of order
- Check for missing await keywords
- Verify cleanup in useEffect

## Debugging Checklist

Before proposing a fix, verify:

- [ ] I can reproduce the issue consistently
- [ ] I have the full error message/stack trace
- [ ] I understand the expected vs actual behavior
- [ ] I've identified the specific line(s) causing the issue
- [ ] I understand WHY the bug occurs
- [ ] My fix addresses the root cause
- [ ] I've tested the fix resolves the issue
- [ ] I've checked for regressions

## Anti-Patterns to Avoid

1. **Shotgun debugging** - Random changes hoping something works
2. **Fix symptoms** - Hiding errors instead of fixing causes
3. **Skip reproduction** - Assuming you understand without verifying
4. **Blame dependencies** - Check your code first
5. **Solo debugging too long** - Ask for help after 30 minutes

## Related Skills

- [[test-driven-development]] - Write tests to prevent bugs
- [[verification-before-completion]] - Verify fixes work
- [[code-review]] - Catch bugs before they ship
