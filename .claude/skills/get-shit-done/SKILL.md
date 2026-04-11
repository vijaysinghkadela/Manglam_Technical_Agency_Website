# Get Shit Done

High-velocity execution mode for when you need to ship fast without sacrificing quality. Use when deadlines are tight, momentum is key, or the user explicitly wants rapid progress.

## When to Use

- Tight deadlines
- User says "just do it" or "let's ship this"
- Well-defined tasks with clear requirements
- Need to break through analysis paralysis
- Building MVPs or prototypes

## Core Philosophy

> **Perfect is the enemy of done. Ship it, then iterate.**

## The GSD Protocol

### 1. Clarify Scope (2 min max)

Ask ONE clarifying question if absolutely necessary:

```
You: "Quick check - should the contact form include phone field or just email?"
```

If requirements are clear enough, skip clarification and start.

### 2. Start Before You're Ready

Don't wait for:
- Perfect understanding
- Complete requirements
- Ideal conditions

Start with what you know. Iterate.

### 3. Work in Tight Loops

```
Build small thing → Test → Show → Repeat
     (15 min)       (2 min) (1 min)
```

### 4. Make Decisions Fast

| Reversible Decision | Action |
|---------------------|--------|
| Yes | Decide in < 1 min |
| No | Spend 5 min max |

Most decisions are reversible. Act accordingly.

### 5. Ship Incrementally

```
v0.1 → Works at all
v0.2 → Works correctly
v0.3 → Works well
v0.4 → Works beautifully
```

Don't aim for v0.4 on first attempt.

## GSD Patterns

### The 15-Minute Sprint

Set a timer. Ship SOMETHING in 15 minutes.

```bash
# Example: Add contact form
# 0:00 - Create component file
# 0:03 - Basic form structure
# 0:08 - Add validation
# 0:12 - Style it
# 0:15 - DONE. Test. Commit.
```

### The "Good Enough" Standard

| Aspect | Good Enough | Over-Engineered |
|--------|-------------|-----------------|
| Validation | Required fields | Real-time + debounced + custom rules |
| Error handling | Try/catch, user message | Retry logic, error boundaries, logging |
| Styling | Consistent, clean | Pixel-perfect, animated |
| Tests | Happy path | 100% coverage |

### Cut Scope Ruthlessly

Original request:
> "Build a contact form with validation, file uploads, multi-step wizard, and integrations with 3 CRMs"

GSD version:
> "Build a contact form with validation. Ship. Add features in v2."

## Anti-Patterns to Avoid

### 1. Bikeshedding
❌ 30 min debate on button color
✓ Pick one, move on

### 2. Premature Optimization
❌ "Let me add caching first"
✓ Ship without caching, optimize when needed

### 3. Gold Plating
❌ Add features nobody asked for
✓ Build exactly what's needed

### 4. Perfection Paralysis
❌ "It's not ready yet"
✓ "It works. Ship it. Iterate."

### 5. Meeting Creep
❌ "Let's discuss this more"
✓ Make a decision, adjust if wrong

## GSD for Different Task Types

### New Feature

```bash
# 1. Create minimal component (5 min)
# 2. Add core logic (10 min)
# 3. Basic styling (5 min)
# 4. Quick test (2 min)
# 5. Commit and move on

# Total: ~25 min
```

### Bug Fix

```bash
# 1. Reproduce (2 min)
# 2. Find cause (5 min)
# 3. Fix (5 min)
# 4. Verify (2 min)
# 5. Commit

# Total: ~15 min
```

### Refactor

```bash
# 1. Ensure tests exist (or skip if not critical)
# 2. Make the change
# 3. Verify nothing broke
# 4. Commit

# Don't refactor without purpose
```

## When NOT to Use GSD

- Security-critical code
- Financial transactions
- Medical/safety systems
- Core architecture decisions
- Hiring/firing decisions

These require deliberation.

## GSD Mantras

1. **"What's the smallest thing that could work?"**
2. **"Ship it and see what happens"**
3. **"Done is better than perfect"**
4. **"If in doubt, ship"**
5. **"We can fix it in prod"** (for non-critical issues)

## Tracking Progress

Keep momentum visible:

```markdown
## Today's GSD Log

- [x] 9:00 - Contact form basic structure
- [x] 9:20 - Form validation
- [x] 9:35 - Backend endpoint
- [x] 9:50 - Integration complete
- [ ] 10:00 - Email notification (next)
```

## Recovery Protocol

When stuck for > 10 minutes:

1. **Timebox it** - "5 more minutes then I move on"
2. **Simplify** - Remove complexity, try again
3. **Ask** - Quick question, don't spin
4. **Skip** - Mark as TODO, ship what works
5. **Rubber duck** - Explain the problem out loud

## MTA Website GSD Examples

### Homepage Hero (30 min max)
```
- Hero section with headline: 10 min
- CTA button: 5 min
- Background image/gradient: 5 min
- Responsive: 10 min
SHIP IT.
```

### Contact Page (45 min max)
```
- Form component: 15 min
- Validation: 10 min
- Backend endpoint: 10 min
- Success/error states: 10 min
SHIP IT.
```

## Related Skills

- [[writing-plans]] - Quick plan before GSD
- [[verification-before-completion]] - Quick verify before ship
- [[systematic-debugging]] - When stuck, debug systematically
