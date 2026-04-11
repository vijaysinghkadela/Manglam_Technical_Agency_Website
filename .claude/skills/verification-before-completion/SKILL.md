# Verification Before Completion

Use when about to claim work is complete, fixed, or passing, before committing or creating PRs. Requires running verification commands and confirming output before making any success claims. Evidence before assertions always.

## Core Principle

> **Never claim something works without proving it works.**

## When to Use

- About to say "done" or "complete"
- About to commit code
- About to create a pull request
- About to claim a bug is fixed
- About to claim tests are passing

## Verification Protocol

### Step 1: Define Success Criteria

Before claiming completion, list what "done" means:

```markdown
## Completion Criteria for: [Task Name]

- [ ] Code compiles without errors
- [ ] All existing tests pass
- [ ] New tests pass
- [ ] Feature works as specified
- [ ] No lint errors
- [ ] Documentation updated
```

### Step 2: Run Verification Commands

Execute all relevant checks:

```bash
# TypeScript compilation
npx tsc --noEmit

# Linting
npm run lint

# All tests
npm test

# Build
npm run build

# Start and verify (for runtime issues)
npm run dev
```

### Step 3: Document Evidence

Capture proof of success:

```markdown
## Verification Results

### TypeScript Check
✓ No errors

### Lint
✓ No warnings or errors

### Tests
✓ 47 tests passed, 0 failed

### Build
✓ Build completed in 12.3s

### Manual Verification
✓ Tested feature in browser
✓ Confirmed expected behavior
```

### Step 4: Only Then Claim Completion

After ALL checks pass, you may claim:
- "Done"
- "Fixed"
- "Complete"
- "Ready for review"

## Verification Checklist by Task Type

### New Feature

```bash
# Must pass before "done":
- [ ] npm run build           # Builds successfully
- [ ] npm test                # All tests pass
- [ ] npm run lint            # No lint errors
- [ ] Manual testing          # Feature works as specified
- [ ] Edge cases tested       # Error states, empty states
- [ ] Mobile responsive       # Works on small screens
```

### Bug Fix

```bash
# Must pass before "fixed":
- [ ] Reproduce original bug  # Confirm understanding
- [ ] Apply fix               # Make the change
- [ ] Verify fix              # Bug no longer occurs
- [ ] npm test                # No regressions
- [ ] Add regression test     # Prevent future recurrence
```

### Refactor

```bash
# Must pass before "complete":
- [ ] npm test                # All tests pass (before)
- [ ] Apply refactor          # Make changes
- [ ] npm test                # All tests pass (after)
- [ ] Behavior unchanged      # Verify same outputs
```

### Dependency Update

```bash
# Must pass before "updated":
- [ ] npm install             # Install succeeds
- [ ] npm run build           # Build works
- [ ] npm test                # Tests pass
- [ ] npm audit               # No new vulnerabilities
```

## Verification Commands for MTA Website

### Frontend Verification

```bash
# Navigate to frontend
cd frontend

# TypeScript check
npx tsc --noEmit

# Lint
npm run lint

# Tests
npm test

# Build
npm run build

# Dev server (manual check)
npm run dev
# Then verify at http://localhost:3000
```

### Backend Verification

```bash
# Navigate to backend
cd backend

# Lint
npm run lint

# Tests
npm test

# Start server
npm start
# Then verify at http://localhost:5000/api/health
```

### Full Stack Verification

```bash
# From project root
docker-compose up --build

# Verify all services start
# - Frontend: http://localhost:3000
# - Backend: http://localhost:5000
# - API health: http://localhost:5000/api/health
```

## Anti-Patterns

### DON'T:

1. **Claim "tests pass" without running them**
   ```
   ❌ "All tests should pass now"
   ✓ "Ran npm test: 47 tests passed"
   ```

2. **Assume the build works**
   ```
   ❌ "This should build fine"
   ✓ "Build completed successfully in 12.3s"
   ```

3. **Skip verification for "small changes"**
   ```
   ❌ "Just a typo fix, should be fine"
   ✓ "Verified build passes after typo fix"
   ```

4. **Claim fixed without reproducing first**
   ```
   ❌ "Fixed the bug"
   ✓ "Reproduced bug, applied fix, verified resolution"
   ```

## Evidence Format

When reporting completion, use this format:

```markdown
## Task Complete: [Task Name]

### Verification Results

| Check | Status | Command/Action |
|-------|--------|----------------|
| TypeScript | ✓ Pass | `npx tsc --noEmit` |
| Lint | ✓ Pass | `npm run lint` |
| Tests | ✓ Pass | `npm test` (47 passing) |
| Build | ✓ Pass | `npm run build` (12.3s) |
| Manual Test | ✓ Pass | Verified in browser |

### Changes Made
- Modified: `src/components/Form.tsx`
- Added: `src/components/Form.test.tsx`

### Ready for Review
```

## Integration with Git Workflow

Before committing:

```bash
# Pre-commit checklist
npm run lint && npm test && npm run build

# If all pass, commit
git add .
git commit -m "feat: add contact form validation"

# Never commit without verification
```

## Related Skills

- [[test-driven-development]] - Write tests to verify
- [[systematic-debugging]] - Debug before claiming fixed
- [[code-review]] - Review verifies quality
