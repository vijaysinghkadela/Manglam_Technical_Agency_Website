# Debug Issue

Systematically debug a reported issue or unexpected behavior.

## Usage
/debug <issue-description>

## Process
1. Reproduce the issue
2. Gather evidence (logs, errors)
3. Form hypothesis
4. Test hypothesis
5. Identify root cause
6. Propose fix

## Output
Root cause analysis and recommended fix.

---

$ARGUMENTS

Debug the issue described above.

Use the `systematic-debugging` skill to:

### Step 1: Understand the Issue
- What is the expected behavior?
- What is the actual behavior?
- When did this start happening?

### Step 2: Reproduce
- Document exact steps to reproduce
- Identify if it's consistent or intermittent

### Step 3: Gather Evidence
- Check error messages and stack traces
- Review relevant logs
- Inspect network requests if applicable

### Step 4: Form Hypothesis
- Based on evidence, what might be causing this?
- Be specific and testable

### Step 5: Verify Root Cause
- Add targeted logging/debugging
- Confirm the hypothesis

### Step 6: Recommend Fix
- Propose minimal fix addressing root cause
- Include test to prevent regression

Output:
1. **Root Cause** - Why this is happening
2. **Evidence** - How we know
3. **Fix** - Code changes needed
4. **Prevention** - Test or check to add
