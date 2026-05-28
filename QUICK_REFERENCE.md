# 🚀 Quick Reference - Animation Hooks

## Import All Hooks
```tsx
import { 
  useFadeInOnScroll,
  useStaggerAnimation,
  useParallax,
  useScrollAnimation,
  useTextReveal,
  useCompositeAnimation,
  useCounterAnimation,
  useProgressBar,
  useHoverScroll,
  useWaveEffect,
  useFloating,
  useLenisScroll,
  useScrollTo
} from '@/hooks';
```

## 1️⃣ Fade In on Scroll
```tsx
const ref = useRef<HTMLDivElement>(null);
useFadeInOnScroll(ref);
return <div ref={ref}>Content fades in on scroll</div>;
```

## 2️⃣ Stagger Animation
```tsx
const containerRef = useRef<HTMLDivElement>(null);
useStaggerAnimation(containerRef, '.item'); // Selects .item elements
return <div ref={containerRef}><div className="item">1</div>...</div>;
```

## 3️⃣ Parallax Effect
```tsx
const ref = useRef<HTMLDivElement>(null);
useParallax(ref, 0.5); // 0.5 = speed multiplier
return <div ref={ref}>Parallax background</div>;
```

## 4️⃣ Smooth Scroll Navigation
```tsx
const { scrollTo } = useScrollTo();
return (
  <>
    <button onClick={() => scrollTo('#services')}>Jump</button>
    <section id="services">...</section>
  </>
);
```

## 5️⃣ Text Reveal
```tsx
const ref = useRef<HTMLHeadingElement>(null);
useTextReveal(ref);
return <h1 ref={ref}>Text fills on scroll</h1>;
```

## 6️⃣ Composite Animation (Multiple Effects)
```tsx
const ref = useRef<HTMLDivElement>(null);
useCompositeAnimation(ref, {
  fadeIn: true,
  scaleUp: true,
  slideFromLeft: true,
  duration: 0.8,
  delay: 0.2
});
return <div ref={ref}>Multiple effects!</div>;
```

## 7️⃣ Counter Animation
```tsx
const ref = useRef<HTMLDivElement>(null);
useCounterAnimation(ref, 100, 2); // Count to 100 in 2 seconds
return <div ref={ref}>0</div>;
```

## 8️⃣ Progress Bar
```tsx
const ref = useRef<HTMLDivElement>(null);
useProgressBar(ref, '.target-section');
return <div ref={ref} className="h-1 bg-blue-500"></div>;
```

## 9️⃣ Hover + Scroll Combined
```tsx
const ref = useRef<HTMLDivElement>(null);
useHoverScroll(ref);
return (
  <div ref={ref} className="p-8 border rounded cursor-pointer">
    Hover me!
  </div>
);
```

## 🔟 Wave Effect
```tsx
const ref = useRef<HTMLDivElement>(null);
useWaveEffect(ref, 'span'); // Waves all <span> elements
return (
  <div ref={ref}>
    <span>W</span><span>a</span><span>v</span><span>e</span>
  </div>
);
```

## 1️⃣1️⃣ Floating Animation
```tsx
const ref = useRef<HTMLDivElement>(null);
useFloating(ref, 20, 3); // Distance: 20px, Duration: 3s
return <div ref={ref}>🎈 Floating</div>;
```

---

## Configuration Pattern

Most hooks support options object:
```tsx
useScrollAnimation(callback, {
  trigger: '.section',      // What triggers it
  start: 'top center',      // When to start
  end: 'bottom center',     // When to end
  scrub: 1,                 // Sync with scroll (1 = smooth)
  duration: 1,              // Animation duration
  delay: 0,                 // Start delay
});
```

---

## Common Start/End Values
- `'top bottom'` - When element bottom hits viewport top
- `'center center'` - Element center at viewport center
- `'top 80%'` - 80% from top of viewport
- `'bottom top'` - When element top leaves viewport

---

## Performance Tips
✅ Use `0.3-0.5` for parallax speed (lower = better performance)
✅ Limit stagger items to <12 per section
✅ Test on mobile - disable heavy animations if needed

---

## Files
- **Hooks**: `hooks/index.ts`
- **Provider**: `app/layout.tsx` (SmoothScrollProvider)
- **Examples**: `components/AnimationShowcase.tsx`
- **Guide**: `ANIMATIONS_GUIDE.md`

---

**Everything is ready to use!** 🎉
