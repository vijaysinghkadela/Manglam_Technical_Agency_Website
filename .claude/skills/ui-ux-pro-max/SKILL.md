# UI/UX Pro Max

Advanced UI/UX design skill for creating beautiful, accessible, and user-centered interfaces. Use when designing or implementing frontend components, pages, or improving user experience.

## When to Use

- Designing new UI components
- Improving existing user interfaces
- Creating responsive layouts
- Implementing design systems
- Optimizing user flows
- Accessibility improvements

## Design Principles

### 1. Visual Hierarchy

Establish clear importance levels:

```
Primary   → Main CTA, key headings (largest, boldest, brand color)
Secondary → Supporting info, secondary actions (medium, neutral)
Tertiary  → Helper text, metadata (small, muted)
```

### 2. Consistency

Maintain design tokens across the application:

```css
/* MTA Brand Tokens */
:root {
  /* Colors */
  --color-primary: #6B1A1A;      /* Deep Red */
  --color-secondary: #FFFFFF;    /* White */
  --color-accent: #000000;       /* Black */
  
  /* Typography */
  --font-heading: 'Inter', sans-serif;
  --font-body: 'Inter', sans-serif;
  
  /* Spacing */
  --space-xs: 0.25rem;
  --space-sm: 0.5rem;
  --space-md: 1rem;
  --space-lg: 1.5rem;
  --space-xl: 2rem;
  
  /* Border Radius */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 16px;
  --radius-full: 9999px;
}
```

### 3. White Space

Use generous spacing to improve readability:

```tsx
// Good - breathing room
<section className="py-20 px-6">
  <h2 className="mb-8">Services</h2>
  <div className="space-y-6">
    {services.map(s => <ServiceCard key={s.id} />)}
  </div>
</section>

// Bad - cramped
<section className="py-2 px-2">
  <h2 className="mb-1">Services</h2>
  ...
</section>
```

### 4. Feedback & States

Every interactive element needs states:

```tsx
// Button with all states
<button className="
  bg-primary text-white
  hover:bg-primary-dark
  focus:ring-2 focus:ring-primary/50
  active:scale-95
  disabled:opacity-50 disabled:cursor-not-allowed
  transition-all duration-200
">
  Submit
</button>
```

## Component Patterns

### Cards

```tsx
const ServiceCard = ({ title, description, icon }) => (
  <div className="
    group
    bg-white rounded-lg shadow-sm
    hover:shadow-md transition-shadow
    p-6 border border-gray-100
  ">
    <div className="
      w-12 h-12 rounded-lg bg-primary/10
      flex items-center justify-center
      text-primary mb-4
      group-hover:scale-110 transition-transform
    ">
      {icon}
    </div>
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);
```

### Forms

```tsx
const FormField = ({ label, error, children }) => (
  <div className="space-y-1">
    <label className="block text-sm font-medium text-gray-700">
      {label}
    </label>
    {children}
    {error && (
      <p className="text-sm text-red-600 flex items-center gap-1">
        <AlertCircle className="w-4 h-4" />
        {error}
      </p>
    )}
  </div>
);

const Input = ({ error, ...props }) => (
  <input
    className={`
      w-full px-4 py-2 rounded-lg border
      focus:ring-2 focus:ring-primary/50 focus:border-primary
      transition-colors
      ${error ? 'border-red-500' : 'border-gray-300'}
    `}
    {...props}
  />
);
```

### Navigation

```tsx
const Navbar = () => (
  <nav className="
    sticky top-0 z-50
    bg-white/80 backdrop-blur-md
    border-b border-gray-100
  ">
    <div className="max-w-7xl mx-auto px-6">
      <div className="flex items-center justify-between h-16">
        <Logo />
        <NavLinks />
        <MobileMenu />
      </div>
    </div>
  </nav>
);
```

## Responsive Design

### Mobile-First Approach

```tsx
// Start with mobile, add breakpoints up
<div className="
  grid grid-cols-1
  md:grid-cols-2
  lg:grid-cols-3
  gap-6
">
  {items.map(item => <Card key={item.id} />)}
</div>
```

### Breakpoint Reference

| Breakpoint | Width | Use Case |
|------------|-------|----------|
| `sm` | 640px | Large phones |
| `md` | 768px | Tablets |
| `lg` | 1024px | Laptops |
| `xl` | 1280px | Desktops |
| `2xl` | 1536px | Large screens |

## Animation & Micro-interactions

### Subtle Animations

```tsx
// Fade in on scroll
const FadeIn = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
  >
    {children}
  </motion.div>
);
```

### Loading States

```tsx
const Button = ({ loading, children }) => (
  <button disabled={loading} className="...">
    {loading ? (
      <span className="flex items-center gap-2">
        <Spinner className="w-4 h-4 animate-spin" />
        Processing...
      </span>
    ) : children}
  </button>
);
```

## Accessibility (A11y)

### Essential Requirements

1. **Color Contrast** - 4.5:1 for normal text, 3:1 for large text
2. **Focus Indicators** - Visible focus states for keyboard navigation
3. **Alt Text** - Descriptive alt text for images
4. **ARIA Labels** - For interactive elements without visible text
5. **Semantic HTML** - Use proper heading hierarchy, landmarks

```tsx
// Good accessibility
<button
  aria-label="Close dialog"
  onClick={onClose}
  className="focus:ring-2 focus:ring-primary"
>
  <XIcon aria-hidden="true" />
</button>

// Form accessibility
<label htmlFor="email">Email</label>
<input
  id="email"
  type="email"
  aria-describedby="email-error"
  aria-invalid={!!error}
/>
{error && <p id="email-error" role="alert">{error}</p>}
```

### Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

## MTA-Specific Design Guidelines

### Brand Application

- Primary buttons: Deep red `#6B1A1A`
- Secondary buttons: White with red border
- Text: Black `#000000` on white background
- Hover states: Darken primary by 10%

### Trust Signals

- Display MSME registration badge
- Show client testimonials prominently
- Include "6 Service Areas" visual
- Professional photography/illustrations

### Call-to-Actions

- Primary CTA: "Get Free Consultation"
- Secondary CTA: "View Our Services"
- Placement: Above fold, end of sections

## Design Review Checklist

- [ ] Visual hierarchy is clear
- [ ] Consistent spacing and sizing
- [ ] All states defined (hover, focus, active, disabled)
- [ ] Mobile responsive
- [ ] Accessible (keyboard, screen reader)
- [ ] Loading states for async actions
- [ ] Error states for forms
- [ ] Empty states for lists
- [ ] Brand guidelines followed

## Related Skills

- [[frontend-design]] - Implementation patterns
- [[brainstorming]] - Design exploration
- [[verification-before-completion]] - Test across devices
