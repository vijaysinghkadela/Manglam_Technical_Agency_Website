# Frontend Design

Creates distinctive, production-grade frontend interfaces with high design quality. Use when building websites, landing pages, dashboards, React components, or HTML/CSS layouts where visual quality matters. Avoids generic AI aesthetics.

## When to Use

- Building new pages or components
- Implementing designs from Figma/mockups
- Creating landing pages
- Building dashboards
- Any frontend work where visual quality matters

## Design Philosophy

### Avoid Generic AI Aesthetics

Common patterns to avoid:
- Excessive gradients on everything
- Generic hero with centered text + CTA
- Overuse of rounded corners
- Default blue/purple color schemes
- Stock-photo-heavy layouts

### Distinctive Design Principles

1. **Brand-first** - Design reflects the specific brand
2. **Purposeful** - Every element has a reason
3. **Confident** - Bold choices, not safe defaults
4. **Refined** - Attention to details matters

## MTA Brand Implementation

### Color System

```css
:root {
  /* Primary */
  --mta-primary: #6B1A1A;
  --mta-primary-dark: #4A1212;
  --mta-primary-light: #8B2A2A;
  
  /* Neutrals */
  --mta-black: #000000;
  --mta-white: #FFFFFF;
  --mta-gray-50: #F9FAFB;
  --mta-gray-100: #F3F4F6;
  --mta-gray-500: #6B7280;
  --mta-gray-900: #111827;
}
```

### Typography

```css
/* Headings */
.heading-xl { @apply text-5xl md:text-6xl font-bold tracking-tight; }
.heading-lg { @apply text-4xl md:text-5xl font-bold; }
.heading-md { @apply text-2xl md:text-3xl font-semibold; }
.heading-sm { @apply text-xl font-semibold; }

/* Body */
.body-lg { @apply text-lg leading-relaxed; }
.body-md { @apply text-base leading-relaxed; }
.body-sm { @apply text-sm; }
```

## Component Library

### Hero Sections

```tsx
// Bold, brand-forward hero
const Hero = () => (
  <section className="relative bg-black text-white min-h-[90vh] flex items-center">
    {/* Subtle texture overlay */}
    <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />
    
    <div className="container mx-auto px-6 py-20 relative z-10">
      <div className="max-w-4xl">
        {/* Badge */}
        <span className="inline-block px-3 py-1 bg-mta-primary/20 text-mta-primary 
                         rounded-full text-sm font-medium mb-6">
          MSME Registered Agency
        </span>
        
        {/* Headline */}
        <h1 className="heading-xl text-white mb-6">
          Empowering Your
          <span className="text-mta-primary"> Digital Future</span>
        </h1>
        
        {/* Subheadline */}
        <p className="body-lg text-gray-400 mb-8 max-w-2xl">
          Full-service technical agency delivering AI, development, 
          cybersecurity, and digital marketing solutions.
        </p>
        
        {/* CTAs */}
        <div className="flex flex-wrap gap-4">
          <Button variant="primary" size="lg">
            Get Free Consultation
          </Button>
          <Button variant="outline" size="lg">
            View Services
          </Button>
        </div>
      </div>
    </div>
  </section>
);
```

### Service Cards

```tsx
const ServiceCard = ({ service }) => (
  <div className="group relative bg-white rounded-xl overflow-hidden
                  border border-gray-100 hover:border-mta-primary/30
                  transition-all duration-300 hover:shadow-xl">
    {/* Accent line */}
    <div className="h-1 bg-gradient-to-r from-mta-primary to-mta-primary-dark" />
    
    <div className="p-8">
      {/* Icon */}
      <div className="w-14 h-14 rounded-xl bg-mta-primary/10 
                      flex items-center justify-center mb-6
                      group-hover:bg-mta-primary group-hover:text-white
                      transition-colors duration-300">
        {service.icon}
      </div>
      
      {/* Content */}
      <h3 className="heading-sm text-gray-900 mb-3">{service.title}</h3>
      <p className="body-md text-gray-600 mb-6">{service.description}</p>
      
      {/* Link */}
      <a href={service.href} className="inline-flex items-center gap-2 
                                        text-mta-primary font-medium
                                        group-hover:gap-3 transition-all">
        Learn More
        <ArrowRight className="w-4 h-4" />
      </a>
    </div>
  </div>
);
```

### Contact Form

```tsx
const ContactForm = () => (
  <form className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
    <h2 className="heading-md text-gray-900 mb-2">Get in Touch</h2>
    <p className="body-md text-gray-600 mb-8">
      Tell us about your project and we'll respond within 24 hours.
    </p>
    
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <FormField label="Full Name" required>
          <Input placeholder="John Doe" />
        </FormField>
        <FormField label="Email" required>
          <Input type="email" placeholder="john@company.com" />
        </FormField>
      </div>
      
      <FormField label="Service Interested In">
        <Select options={services} placeholder="Select a service" />
      </FormField>
      
      <FormField label="Message" required>
        <Textarea 
          placeholder="Tell us about your project..."
          rows={5}
        />
      </FormField>
      
      <Button type="submit" variant="primary" size="lg" className="w-full">
        Send Message
      </Button>
    </div>
  </form>
);
```

## Layout Patterns

### Asymmetric Grid

```tsx
<section className="py-20">
  <div className="container mx-auto px-6">
    <div className="grid lg:grid-cols-12 gap-12 items-center">
      {/* Content - takes 5 columns */}
      <div className="lg:col-span-5">
        <h2 className="heading-lg mb-6">Why Choose MTA?</h2>
        <p className="body-lg text-gray-600 mb-8">
          Single-point accountability with integrated service delivery.
        </p>
        <FeatureList features={features} />
      </div>
      
      {/* Visual - takes 7 columns */}
      <div className="lg:col-span-7 relative">
        <div className="aspect-[4/3] rounded-2xl overflow-hidden">
          <Image src="/team.jpg" fill className="object-cover" />
        </div>
        {/* Floating stat card */}
        <div className="absolute -bottom-6 -left-6 bg-white rounded-xl 
                        shadow-xl p-6 hidden md:block">
          <div className="text-4xl font-bold text-mta-primary">6+</div>
          <div className="text-gray-600">Service Areas</div>
        </div>
      </div>
    </div>
  </div>
</section>
```

### Bento Grid

```tsx
<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
  {/* Large feature */}
  <div className="col-span-2 row-span-2 bg-mta-primary rounded-2xl p-8 text-white">
    <LargeFeatureContent />
  </div>
  
  {/* Small cards */}
  <div className="bg-gray-50 rounded-2xl p-6">
    <SmallFeature />
  </div>
  <div className="bg-gray-50 rounded-2xl p-6">
    <SmallFeature />
  </div>
  <div className="col-span-2 bg-black rounded-2xl p-6 text-white">
    <WideFeature />
  </div>
</div>
```

## Animation Guidelines

### Entrance Animations

```tsx
// Framer Motion
const variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' }
  }
};

<motion.div
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
  variants={variants}
>
  Content
</motion.div>
```

### Hover Effects

```css
/* Subtle lift */
.card {
  @apply transition-all duration-300;
}
.card:hover {
  @apply -translate-y-1 shadow-xl;
}

/* Border accent */
.card {
  @apply border-2 border-transparent;
}
.card:hover {
  @apply border-mta-primary/30;
}
```

## Performance Considerations

1. **Images** - Use Next.js Image component with proper sizing
2. **Fonts** - Subset fonts, use font-display: swap
3. **CSS** - Purge unused Tailwind classes
4. **Animations** - Use transform/opacity only, avoid layout shifts

## Quality Checklist

- [ ] Matches MTA brand guidelines
- [ ] Works on mobile (320px+)
- [ ] Works on desktop (1920px+)
- [ ] Hover states for interactive elements
- [ ] Focus states for accessibility
- [ ] Loading states for async content
- [ ] Error states for forms
- [ ] Consistent spacing (use design tokens)
- [ ] Typography hierarchy is clear
- [ ] Colors have sufficient contrast

## Related Skills

- [[ui-ux-pro-max]] - Design principles
- [[verification-before-completion]] - Test across devices
- [[brainstorming]] - Explore design options
