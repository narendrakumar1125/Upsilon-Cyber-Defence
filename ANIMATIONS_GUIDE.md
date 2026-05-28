# Animation & Smooth Scroll Guide

## 🎬 What's Included

Your website now has:
- **GSAP 3.15.0** - Professional animation library
- **Lenis 1.3.23** - Smooth scrolling with scroll hijacking
- **Framer Motion 11.0.3** - React motion library (already had)

## 🚀 Setup (Already Done!)

### 1. Lenis Smooth Scroll
✅ Integrated in `app/layout.tsx` via `SmoothScrollProvider`
- Automatically enables smooth scrolling globally
- Works with all scroll-triggered animations

### 2. GSAP Hooks Ready to Use
Available in `hooks/index.ts`:

```typescript
export {
  useFadeInOnScroll,
  useStaggerAnimation,
  useParallax,
  useScrollAnimation,
  useTextReveal,
} from './useScrollAnimation';

export { useLenisScroll, useScrollTo } from './useLenisScroll';
```

## 📚 Usage Examples

### 1. **Fade In Animation** (Elements fade in on scroll)
```tsx
'use client';
import { useRef } from 'react';
import { useFadeInOnScroll } from '@/hooks';

export function MyComponent() {
  const ref = useRef<HTMLDivElement>(null);
  useFadeInOnScroll(ref);

  return (
    <div ref={ref} className="bg-blue-500 p-8">
      This fades in when scrolled into view
    </div>
  );
}
```

### 2. **Stagger Animation** (Multiple items animate with delay)
```tsx
'use client';
import { useRef } from 'react';
import { useStaggerAnimation } from '@/hooks';

export function CardGrid() {
  const containerRef = useRef<HTMLDivElement>(null);
  useStaggerAnimation(containerRef, '.card');

  return (
    <div ref={containerRef} className="grid grid-cols-3 gap-4">
      <div className="card">Card 1</div>
      <div className="card">Card 2</div>
      <div className="card">Card 3</div>
    </div>
  );
}
```

### 3. **Parallax Effect** (Element moves at different speed than scroll)
```tsx
'use client';
import { useRef } from 'react';
import { useParallax } from '@/hooks';

export function ParallaxHero() {
  const ref = useRef<HTMLDivElement>(null);
  useParallax(ref, 0.5); // Speed multiplier

  return (
    <div ref={ref} className="hero-image">
      Background moves slower than scroll
    </div>
  );
}
```

### 4. **Text Reveal Animation** (Text fills on scroll)
```tsx
'use client';
import { useRef } from 'react';
import { useTextReveal } from '@/hooks';

export function RevealText() {
  const ref = useRef<HTMLHeadingElement>(null);
  useTextReveal(ref);

  return (
    <h1 ref={ref} className="text-4xl font-bold">
      This text reveals on scroll
    </h1>
  );
}
```

### 5. **Smooth Scroll Navigation**
```tsx
'use client';
import { useScrollTo } from '@/hooks';

export function NavButton() {
  const { scrollTo } = useScrollTo();

  return (
    <button onClick={() => scrollTo('#services')}>
      Jump to Services (with smooth scroll)
    </button>
  );
}
```

## 🎨 Quick Implementation in Existing Components

### For Services Section
```tsx
// In ServicesSection.tsx
'use client';
import { useRef } from 'react';
import { useStaggerAnimation } from '@/hooks';

export default function ServicesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  useStaggerAnimation(containerRef, '.glass-card');

  return (
    <section ref={containerRef}>
      {/* Add animate-item class to cards, they'll stagger on scroll */}
      {/* ...existing code... */}
    </section>
  );
}
```

### For Hero Section
```tsx
// Already has advanced animations!
// HomeHeroSection uses Framer Motion + scroll transforms
// You can add Parallax for background elements:

import { useParallax } from '@/hooks';

// Add in your background elements:
useParallax(bgRef, 0.3);
```

## ⚙️ Animation Configuration

### Scroll Trigger Options
```typescript
interface ScrollAnimationOptions {
  trigger?: string | HTMLElement;        // What triggers the animation
  start?: string;                         // When to start (default: 'top center')
  end?: string;                           // When to end (default: 'bottom center')
  scrub?: boolean | number;               // Sync with scrollbar (1 = smooth)
  duration?: number;                      // Animation duration in seconds
  delay?: number;                         // Delay before animation
}
```

### Common Start/End Values
```
'top bottom'    - Element bottom enters viewport
'center center' - Element center reaches center
'bottom top'    - Element top exits viewport
'50px center'   - 50px offset from element
```

## 🎯 Performance Tips

1. **Use Parallax Sparingly** - Can impact performance on weak devices
   ```tsx
   useParallax(ref, 0.3); // Lower speed = better performance
   ```

2. **Limit Stagger Items** - Too many items = slower animations
   ```tsx
   useStaggerAnimation(ref, '.card'); // Keep under 12 items per section
   ```

3. **Disable on Mobile (Optional)**
   ```tsx
   const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
   if (!isMobile) {
     useFadeInOnScroll(ref);
   }
   ```

## 📁 File Structure
```
hooks/
  ├── useScrollAnimation.ts    (GSAP animations)
  ├── useLenisScroll.ts        (Smooth scroll setup)
  └── index.ts                 (Exports)

components/
  ├── SmoothScrollProvider.tsx (Global Lenis setup)
  ├── AnimationShowcase.tsx    (Example component)
  └── EnhancedServicesSection.tsx (Services with animations)
```

## 🧪 Test the Setup

1. Check smooth scrolling works - Scroll on any page
2. View `AnimationShowcase.tsx` as example of all animation types
3. Inspect with DevTools - Look for GSAP animations in timeline

## 🔗 Useful Resources

- **GSAP Docs**: https://greensock.com/docs
- **ScrollTrigger**: https://greensock.com/scrolltrigger
- **Lenis**: https://github.com/studio-freight/lenis
- **Framer Motion**: https://www.framer.com/motion

## 🎬 Next Steps

1. **Add to More Sections** - Copy the hook patterns to other components
2. **Customize Timing** - Adjust stagger delays and durations to taste
3. **Mix & Match** - Combine multiple animations for complex effects
4. **Disable Animations** - Set `enabled={false}` in `useLenisScroll()` if needed

---

## ⚡ Quick Copy-Paste Templates

### Template 1: Fade Section
```tsx
'use client';
const ref = useRef<HTMLDivElement>(null);
useFadeInOnScroll(ref);
return <section ref={ref}>Content</section>;
```

### Template 2: Stagger Cards
```tsx
'use client';
const containerRef = useRef<HTMLDivElement>(null);
useStaggerAnimation(containerRef, '.card');
return <div ref={containerRef}>{/* cards with .card class */}</div>;
```

### Template 3: Parallax Hero
```tsx
'use client';
const ref = useRef<HTMLDivElement>(null);
useParallax(ref, 0.5);
return <div ref={ref}>Hero Content</div>;
```

---

**All animations are production-ready and fully integrated! 🚀**
