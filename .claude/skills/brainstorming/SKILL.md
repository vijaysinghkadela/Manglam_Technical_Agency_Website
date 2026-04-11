# Brainstorming

Structured ideation and problem exploration skill. Use when facing open-ended problems, exploring solutions, or generating creative approaches before committing to implementation.

## When to Use

- Starting a new feature with unclear requirements
- Exploring multiple architectural approaches
- Stuck on a problem and need fresh perspectives
- Planning a major refactor or rewrite
- Generating marketing/content ideas
- User says "let's brainstorm" or "what are our options"

## Brainstorming Phases

### Phase 1: Divergent Thinking (Generate Ideas)

Goal: Maximum quantity, no judgment

**Rules:**
1. No criticism or evaluation
2. Wild ideas are welcome
3. Build on others' ideas
4. Go for quantity

**Techniques:**

#### Mind Mapping
```
                    ┌─ SEO optimization
                    ├─ Performance
         ┌─ Tech ──┼─ Accessibility
         │          └─ Mobile-first
         │
MTA Site─┼─ Design ─┬─ Modern aesthetic
         │          ├─ Brand consistency
         │          └─ User trust signals
         │
         └─ Content─┬─ Service pages
                    ├─ Case studies
                    └─ Blog/Resources
```

#### "How Might We" Questions
- How might we make the contact form more engaging?
- How might we showcase our expertise without being boastful?
- How might we reduce bounce rate on service pages?

#### Reverse Brainstorming
- How could we make this website terrible?
- Then flip each idea to its positive opposite

### Phase 2: Convergent Thinking (Evaluate Ideas)

Goal: Filter and prioritize

**Evaluation Criteria:**

| Idea | Impact | Effort | Risk | Priority |
|------|--------|--------|------|----------|
| Animated hero | High | Medium | Low | 1 |
| AI chatbot | Medium | High | Medium | 3 |
| Video testimonials | High | High | Low | 2 |

**Decision Matrix:**
- Must Have (M)
- Should Have (S)
- Could Have (C)
- Won't Have (W)

### Phase 3: Action Planning

Convert selected ideas into actionable tasks:

```markdown
## Selected: Animated Hero Section

### Implementation Steps
1. Design motion concepts in Figma
2. Choose animation library (Framer Motion)
3. Implement base animation
4. Add scroll-triggered effects
5. Optimize for performance
6. Test on mobile devices

### Success Criteria
- Load time < 2s
- Smooth 60fps animation
- Works on all major browsers
- Accessible (respects reduced-motion)
```

## Brainstorming Templates

### Feature Exploration

```markdown
## Feature: [Name]

### Problem Statement
What problem are we solving?

### User Stories
- As a [user], I want [action] so that [benefit]

### Possible Solutions
1. Option A: [description]
   - Pros:
   - Cons:
   
2. Option B: [description]
   - Pros:
   - Cons:

### Recommendation
[Which option and why]
```

### Architecture Decision

```markdown
## Decision: [Title]

### Context
What situation requires a decision?

### Options Considered
1. [Option 1]
2. [Option 2]
3. [Option 3]

### Decision Drivers
- Performance requirements
- Team expertise
- Timeline constraints
- Maintenance burden

### Decision
[Chosen option and rationale]

### Consequences
- Positive:
- Negative:
- Risks:
```

## Brainstorming for MTA Website

### Areas to Explore

1. **Homepage Hero**
   - Static vs animated
   - Video background vs illustration
   - Testimonial carousel vs static quote

2. **Service Presentation**
   - Cards vs detailed pages
   - Interactive demos vs case studies
   - Pricing visibility

3. **Trust Building**
   - Client logos
   - Testimonials (text vs video)
   - Certifications/badges
   - Case studies

4. **Lead Generation**
   - Contact form placement
   - Chat widget
   - Free consultation CTA
   - Newsletter signup

## Output Format

After brainstorming, produce:

1. **Summary** - Key insights from the session
2. **Top 3 Ideas** - Most promising approaches
3. **Next Steps** - Immediate actions to take
4. **Parking Lot** - Good ideas for later

## Related Skills

- [[writing-plans]] - Turn brainstorm output into implementation plans
- [[subagent-driven-development]] - Delegate implementation of ideas
- [[ui-ux-pro-max]] - Visual design brainstorming
