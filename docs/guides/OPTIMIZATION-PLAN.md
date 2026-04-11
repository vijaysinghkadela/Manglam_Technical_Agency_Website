# MTA Website Cross-Browser Optimization Plan

## Overview

### Goal
Optimize the MTA Website for universal browser compatibility (Chrome, Safari, Edge, Firefox, Opera) while maintaining all animations and visual fidelity. Eliminate lag and improve performance across all devices.

### Success Criteria
- [ ] Lighthouse Performance score > 90 on all major browsers
- [ ] First Contentful Paint (FCP) < 1.5s
- [ ] Largest Contentful Paint (LCP) < 2.5s
- [ ] Cumulative Layout Shift (CLS) < 0.1
- [ ] Total Blocking Time (TBT) < 200ms
- [ ] No visual regressions (all animations preserved)
- [ ] Works identically on Chrome, Safari, Edge, Firefox, Opera

### Non-Goals
- Removing animations (must preserve all)
- Changing visual design
- Reducing functionality

---

## Analysis of Current State

### Identified Performance Issues

1. **Animation Heavy-Lifting**
   - Framer Motion used extensively
   - Multiple parallax effects on hero
   - Continuous marquee animations
   - Film grain overlay (SVG filter)
   - Orbital ring animations

2. **Browser-Specific Concerns**
   - Safari: Backdrop-filter performance, will-change overuse
   - Firefox: CSS mask-image support, scrollbar styling
   - Edge: WebKit-specific properties
   - Opera: Same as Chrome (Chromium-based)

3. **Performance Bottlenecks**
   - Custom cursor on all elements (`cursor: none !important`)
   - Large number of animated elements
   - Lenis smooth scroll library
   - Multiple radial gradients on hero
   - Font loading (3 font families)

---

## Implementation Phases

### Phase 1: CSS & Animation Optimization (Agent: CSS-Performance)

**Tasks:**
1. Add GPU-accelerated transforms with `transform: translateZ(0)`
2. Optimize `will-change` usage (only when needed)
3. Add vendor prefixes for cross-browser support
4. Optimize keyframe animations for compositor
5. Add `contain` property for layout optimization
6. Fix Safari backdrop-filter issues
7. Add Firefox-specific fallbacks

### Phase 2: React Component Optimization (Agent: React-Performance)

**Tasks:**
1. Add React.memo() to prevent unnecessary re-renders
2. Optimize useCallback/useMemo usage
3. Add Intersection Observer for viewport-based rendering
4. Implement component-level code splitting
5. Optimize Framer Motion variants (reduce layout triggers)
6. Add requestAnimationFrame throttling for scroll handlers

### Phase 3: Asset & Bundle Optimization (Agent: Asset-Performance)

**Tasks:**
1. Optimize font loading strategy (preload critical fonts)
2. Add image optimization with Next.js Image
3. Implement lazy loading for below-fold content
4. Add resource hints (preconnect, dns-prefetch)
5. Configure bundle splitting for optimal chunks

### Phase 4: Browser Compatibility Layer (Agent: Compatibility)

**Tasks:**
1. Add CSS feature detection with @supports
2. Add polyfills for older browsers
3. Create browser-specific CSS overrides
4. Add fallbacks for CSS properties
5. Test and fix Safari-specific issues

---

## File Changes

### Modified Files
| File | Changes |
|------|---------|
| `frontend/src/styles/globals.css` | Add vendor prefixes, optimize animations, add @supports |
| `frontend/src/pages/layout.tsx` | Optimize font loading, add preloads |
| `frontend/src/components/home/HeroSection.tsx` | Optimize parallax, add memo |
| `frontend/src/components/ui/MagneticCursor.tsx` | Optimize RAF usage |
| `frontend/src/contexts/LenisProvider.tsx` | Add browser detection, fallbacks |
| `frontend/src/components/home/MarqueeTicker.tsx` | GPU optimization |
| `frontend/src/components/home/OrbitalRing.tsx` | Compositor-only animations |

### New Files
| File | Purpose |
|------|---------|
| `frontend/src/lib/browser-detect.ts` | Browser detection utility |
| `frontend/src/lib/performance.ts` | Performance utilities |
| `frontend/src/hooks/useReducedMotion.ts` | Respect user preferences |
| `frontend/src/hooks/useIsVisible.ts` | Intersection Observer hook |
| `frontend/next.config.ts` | Performance optimizations |

---

## Optimization Techniques by Browser

### Chrome (Blink)
- Use `content-visibility: auto` for off-screen content
- Leverage native lazy loading
- Use `transform: translate3d(0,0,0)` for GPU layers

### Safari (WebKit)
- Add `-webkit-` prefixes for all transforms
- Avoid excessive `will-change`
- Use `transform: translateZ(0)` sparingly
- Add fallbacks for `backdrop-filter`

### Firefox (Gecko)
- Add `-moz-` prefixes where needed
- Use `scroll-behavior: smooth` fallback
- Add `scrollbar-width` and `scrollbar-color`

### Edge (Chromium)
- Same optimizations as Chrome
- Test with high contrast mode

### Opera (Chromium)
- Same optimizations as Chrome
- Test with Opera GX gaming mode

---

## Testing Strategy

### Automated Tests
- Lighthouse CI for performance metrics
- Playwright cross-browser tests
- Visual regression testing

### Manual Tests
- Test on each browser (Chrome, Safari, Edge, Firefox, Opera)
- Test on mobile devices (iOS Safari, Chrome Android)
- Test reduced motion preference
- Test with slow 3G throttling

---

## Risk Mitigation

| Risk | Mitigation |
|------|------------|
| Animation jank | Use compositor-only properties |
| Safari issues | Feature detection + fallbacks |
| Bundle size increase | Monitor with bundle analyzer |
| Breaking changes | Visual regression tests |

---

*Created: 2024 | Agent: Orchestrator*
