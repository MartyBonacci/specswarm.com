# Research: Convert Component-Scoped CSS to Tailwind Utility Classes

**Feature**: 003 - Convert Component-Scoped CSS to Tailwind Utility Classes
**Research Date**: 2025-11-11
**Researcher**: Claude Code (SpecSwarm)

---

## Table of Contents

1. [Tailwind v4 Arbitrary Value Syntax for CSS Custom Properties](#1-tailwind-v4-arbitrary-value-syntax-for-css-custom-properties)
2. [Best Practices for Preserving Animations in Tailwind Migration](#2-best-practices-for-preserving-animations-in-tailwind-migration)
3. [Complex Grid Pattern Syntax in Tailwind](#3-complex-grid-pattern-syntax-in-tailwind)
4. [Motion-Reduce Variant Usage Patterns](#4-motion-reduce-variant-usage-patterns)
5. [Visual Regression Testing Approaches](#5-visual-regression-testing-approaches)

---

## 1. Tailwind v4 Arbitrary Value Syntax for CSS Custom Properties

### Overview

Tailwind CSS v4 (Oxide engine) introduces CSS-first configuration and enhanced support for CSS custom properties (CSS variables) through arbitrary value syntax. This allows referencing design tokens defined in `@theme` blocks directly in utility classes.

### Key Syntax Patterns

#### Basic Arbitrary Value Syntax

**Format**: `utility-[arbitraryValue]`

**Examples**:
```html
<!-- Background color using CSS custom property -->
<div class="bg-[var(--color-surface)]">

<!-- Text color using design token -->
<p class="text-[var(--color-primary)]">

<!-- Padding using spacing token -->
<section class="px-[var(--spacing-site-margin)]">

<!-- Font size using typography token -->
<h1 class="text-[var(--font-size-display-xl)]">

<!-- Custom shadow -->
<div class="shadow-[0_4px_16px_rgba(217,119,87,0.1)]">

<!-- Complex transform -->
<button class="hover:translate-y-[-2px]">
```

#### Arbitrary Values with Spaces

When arbitrary values contain spaces, **do not quote** the value. Tailwind v4 handles this automatically.

**Correct**:
```html
<div class="grid-cols-[2fr_repeat(3,1fr)]">
```

**Incorrect** (Tailwind v3 pattern):
```html
<div class="grid-cols-['2fr repeat(3, 1fr)']">
```

#### Color Values with Alpha Channel

**RGB/RGBA**:
```html
<div class="bg-[rgba(217,119,87,0.1)]">
<div class="bg-[rgb(217,119,87)]">
```

**Hex with Alpha** (Tailwind v4 Oxide):
```html
<div class="bg-[#d97757/10]">  <!-- 10% opacity -->
<div class="bg-[#d97757/50]">  <!-- 50% opacity -->
```

#### Design Token Reference Patterns

**Our Design System** (from global.css @theme):
```css
@theme {
  --color-primary: #131314;
  --color-accent: #d97757;
  --spacing-lg: 2rem;
  --font-size-display-xl: clamp(2.5rem, 2.041rem + 1.959vw, 4rem);
}
```

**Usage in Utilities**:
```html
<!-- Text color -->
<p class="text-[var(--color-primary)]">

<!-- Background color -->
<div class="bg-[var(--color-accent)]">

<!-- Padding -->
<section class="p-[var(--spacing-lg)]">

<!-- Font size (fluid typography) -->
<h1 class="text-[var(--font-size-display-xl)]">
```

### Tailwind v4-Specific Features

#### CSS-First Configuration

Tailwind v4 eliminates the need for `tailwind.config.js`. All configuration happens in CSS via `@theme` blocks.

**Our Setup** (global.css):
```css
@import "tailwindcss";

@theme {
  /* Color system */
  --color-primary: #131314;
  --color-accent: #d97757;
  /* ... */
}
```

This means:
- Design tokens defined in `@theme` are available throughout the project
- Arbitrary values can reference these tokens via `var(--token-name)`
- No JavaScript configuration needed

#### Arbitrary Value Type Inference

Tailwind v4 automatically infers value types:

```html
<!-- Automatically recognized as length -->
<div class="w-[var(--spacing-xl)]">

<!-- Automatically recognized as color -->
<div class="bg-[var(--color-surface)]">

<!-- Automatically recognized as number -->
<div class="z-[var(--z-modal)]">
```

### Common Patterns in Our Migration

#### Spacing with Design Tokens

**Before** (scoped CSS):
```css
.container {
  padding: var(--spacing-lg);
  gap: var(--spacing-md);
  margin-top: var(--spacing-section-xl);
}
```

**After** (Tailwind utilities):
```html
<div class="p-[var(--spacing-lg)] gap-[var(--spacing-md)] mt-[var(--spacing-section-xl)]">
```

#### Colors with Design Tokens

**Before**:
```css
.card {
  background-color: var(--color-surface);
  color: var(--color-primary);
  border: 1px solid var(--color-border);
}
```

**After**:
```html
<div class="bg-[var(--color-surface)] text-[var(--color-primary)] border border-[var(--color-border)]">
```

#### Typography with Fluid Design Tokens

**Before**:
```css
.title {
  font-size: var(--font-size-display-xl);
  line-height: 1.2;
  font-weight: 700;
}
```

**After**:
```html
<h1 class="text-[var(--font-size-display-xl)] leading-tight font-bold">
```

Note: Tailwind's `leading-tight` = 1.25, which is close to 1.2. For exact match, use `leading-[1.2]`.

#### Transitions with Duration Tokens

**Before**:
```css
.button {
  transition: all var(--duration-fast) ease-out;
}
```

**After**:
```html
<button class="transition-all duration-[var(--duration-fast)] ease-out">
```

### Best Practices

1. **Always use `var()` function**: `text-[var(--color-primary)]` not `text-[--color-primary]`
2. **No quotes needed**: Tailwind v4 handles spaces in arbitrary values
3. **Prefer design tokens**: Use `bg-[var(--color-surface)]` over `bg-white`
4. **Type inference works**: No need to specify value type
5. **Combine with variants**: `hover:bg-[var(--color-accent)]` works perfectly

### Edge Cases and Limitations

#### When Arbitrary Values Don't Work

**Pseudo-element content property**:
```css
/* Cannot be expressed in Tailwind */
.element::before {
  content: '';
  /* ... */
}
```
**Solution**: Keep in `<style>` block

**Complex calc() expressions**:
```html
<!-- Works -->
<div class="w-[calc(100%-2rem)]">

<!-- Complex - may need CSS -->
<div class="w-[calc(var(--spacing-xl)*3+var(--nav-height))]">
```

**Browser-specific pseudo-elements**:
```css
/* Cannot be expressed in Tailwind */
::-webkit-scrollbar {
  height: 8px;
}
```
**Solution**: Keep in `<style>` block

### Resources

- [Tailwind CSS v4 Documentation](https://tailwindcss.com/docs) (as of 2025)
- [CSS-First Configuration](https://tailwindcss.com/docs/v4-beta#css-first-configuration)
- [Arbitrary Values Guide](https://tailwindcss.com/docs/adding-custom-styles#using-arbitrary-values)

---

## 2. Best Practices for Preserving Animations in Tailwind Migration

### Overview

Tailwind provides animation utilities for common patterns (spin, ping, pulse, bounce), but complex custom animations with `@keyframes` are better kept in CSS. This section covers when to convert vs. preserve animations.

### Decision Framework: Convert or Preserve?

#### ✅ Convert to Tailwind Utilities

**Simple transforms** (no keyframes):
```html
<!-- Hover translate -->
<div class="hover:-translate-y-0.5">

<!-- Hover scale -->
<div class="hover:scale-105">

<!-- Hover rotate -->
<div class="hover:rotate-3">
```

**Standard transitions**:
```html
<!-- All properties -->
<button class="transition-all duration-200">

<!-- Specific properties -->
<button class="transition-colors duration-300">
<button class="transition-transform duration-200">
```

**Built-in animations** (if applicable):
```html
<div class="animate-spin">     <!-- Rotating spinner -->
<div class="animate-pulse">    <!-- Pulsing fade -->
<div class="animate-bounce">   <!-- Bouncing motion -->
```

#### ❌ Preserve in CSS

**Multi-step keyframe animations**:
```css
@keyframes wordFadeIn {
  from {
    opacity: 0;
    transform: translateY(24px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

**Reason**: Cannot express multi-property, multi-step animations with utilities alone.

**Complex timing functions**:
```css
@keyframes blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}
```

**Reason**: Step-based timing (50% threshold) not expressible in utilities.

**Animations with multiple properties**:
```css
.card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(217, 119, 87, 0.1);
}
```

**Can convert** to:
```html
<div class="hover:-translate-y-0.5 hover:shadow-[0_4px_16px_rgba(217,119,87,0.1)]">
```

But if animation is more complex:
```css
.card:hover {
  transform: translateY(-2px) scale(1.02) rotate(-1deg);
  box-shadow: 0 4px 16px rgba(217, 119, 87, 0.1);
  border-color: var(--color-accent);
  background: linear-gradient(135deg, white, var(--color-background));
}
```

**Better to preserve** if combining 4+ properties.

### Our Animation Inventory

#### Animation 1: wordFadeIn (AnimatedHero.tsx)

**Purpose**: Fade in and slide up words sequentially

**CSS**:
```css
@keyframes wordFadeIn {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animated-word-visible {
  animation: wordFadeIn 500ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
```

**Decision**: ❌ Preserve in CSS

**Rationale**:
- Custom cubic-bezier timing function
- `forwards` fill mode to maintain final state
- Applied dynamically with sequential delays via inline styles
- Part of React component with scoped styles

**Location**: Keep in AnimatedHero.tsx inline `<style>` block

---

#### Animation 2: blink (AnimatedBrand.tsx)

**Purpose**: Blinking cursor effect

**CSS**:
```css
@keyframes blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}

.cursor {
  animation: blink 1s step-end infinite;
}
```

**Decision**: ❌ Preserve in CSS

**Rationale**:
- Multi-step timing (50% threshold)
- `step-end` timing function (not available as utility)
- `infinite` iteration (not expressible in utility)
- Part of React component with scoped styles

**Location**: Keep in AnimatedBrand.tsx inline `<style>` block

---

#### Animation 3: Hamburger Menu Transforms (Header.astro)

**Purpose**: Animate hamburger icon to X when menu opens

**CSS**:
```css
.hamburger {
  transition: background-color 0.3s ease;
}

.hamburger::before,
.hamburger::after {
  transition: transform 0.3s ease;
}

.mobile-menu-toggle[aria-expanded="true"] .hamburger {
  background-color: transparent;
}

.mobile-menu-toggle[aria-expanded="true"] .hamburger::before {
  transform: rotate(45deg) translate(5px, 5px);
}

.mobile-menu-toggle[aria-expanded="true"] .hamburger::after {
  transform: rotate(-45deg) translate(5px, -5px);
}
```

**Decision**: ❌ Preserve in CSS

**Rationale**:
- Uses pseudo-elements (`::before`, `::after`) with `content` property
- Pseudo-elements cannot be styled with Tailwind utilities
- Attribute-based state selector (`[aria-expanded="true"]`)
- Complex transform with multiple values

**Location**: Keep in Header.astro `<style>` block

**Alternative Considered**: Use Tailwind with JavaScript classes
```html
<!-- Could add .menu-open class via JS -->
<span class="hamburger menu-open:bg-transparent">
```

**Rejected because**: Pseudo-elements still require CSS, and attribute selector is semantically better than class toggling.

---

#### Simple Hover Transitions (Convertible)

**Example**: Button hover effects

**Before**:
```css
.button {
  transition: all var(--duration-fast) ease-out;
}

.button:hover {
  background-color: rgba(217, 119, 87, 0.9);
  transform: translateY(-1px);
}
```

**After**:
```html
<button class="transition-all duration-[var(--duration-fast)] ease-out
               hover:bg-[rgba(217,119,87,0.9)] hover:-translate-y-px">
```

**Decision**: ✅ Convert to utilities

**Rationale**: Simple property transitions, easily expressed with hover: variant

---

### Pattern: Combining Preserved Animations with Utilities

**Strategy**: Use utilities for layout/spacing/colors, preserve animations in minimal `<style>` block

**Example**: Header.astro

```astro
<header class="sticky top-0 z-[99999] bg-[var(--color-background)] border-b border-[var(--color-border)]">
  <nav class="max-w-[var(--content-max-width)] mx-auto px-[var(--spacing-site-margin)]">
    <button class="mobile-menu-toggle" aria-expanded="false">
      <span class="hamburger"></span>
    </button>
  </nav>
</header>

<style>
  /* Preserved: Hamburger animation (pseudo-elements) */
  .hamburger {
    display: block;
    width: 24px;
    height: 2px;
    background-color: var(--color-primary);
    position: relative;
    transition: background-color 0.3s ease;
  }

  .hamburger::before,
  .hamburger::after {
    content: '';
    position: absolute;
    width: 24px;
    height: 2px;
    background-color: var(--color-primary);
    transition: transform 0.3s ease;
  }

  .hamburger::before { top: -7px; }
  .hamburger::after { bottom: -7px; }

  .mobile-menu-toggle[aria-expanded="true"] .hamburger {
    background-color: transparent;
  }

  .mobile-menu-toggle[aria-expanded="true"] .hamburger::before {
    transform: rotate(45deg) translate(5px, 5px);
  }

  .mobile-menu-toggle[aria-expanded="true"] .hamburger::after {
    transform: rotate(-45deg) translate(5px, -5px);
  }
</style>
```

**Benefits**:
- Layout uses Tailwind utilities (sticky, top-0, flex, etc.)
- Animation preserved in CSS (only what's necessary)
- Clear separation of concerns
- Minimal CSS footprint

### Reduced Motion Support

**All animations must respect** `prefers-reduced-motion: reduce`

**Tailwind utility**:
```html
<div class="transition-all motion-reduce:transition-none">
<div class="hover:scale-105 motion-reduce:hover:scale-100">
```

**CSS pattern** (for preserved animations):
```css
@media (prefers-reduced-motion: reduce) {
  .animated-word {
    animation: none;
    opacity: 1;
    transform: none;
  }
}
```

**Our implementation**: All preserved animations include reduced motion overrides

### Best Practices Summary

1. **Convert simple transitions**: Use `transition-*` and `hover:` utilities
2. **Preserve keyframe animations**: Keep `@keyframes` in CSS
3. **Preserve pseudo-element animations**: Cannot style `::before`/`::after` with utilities
4. **Document preserved CSS**: Add comments explaining why CSS is kept
5. **Minimize CSS blocks**: Only include what cannot be expressed as utilities
6. **Always support reduced motion**: Use `motion-reduce:` variant or media query

---

## 3. Complex Grid Pattern Syntax in Tailwind

### Overview

Tailwind CSS provides grid utilities for common patterns, but complex grid layouts (especially with `auto-fit`, `minmax`, and mixed column sizes) require arbitrary value syntax.

### Standard Grid Utilities

**Equal columns**:
```html
<div class="grid grid-cols-3">      <!-- 3 equal columns -->
<div class="grid grid-cols-4">      <!-- 4 equal columns -->
<div class="grid grid-cols-12">     <!-- 12-column grid -->
```

**Explicit column sizing**:
```html
<div class="grid grid-cols-[200px_1fr]">           <!-- Fixed + flexible -->
<div class="grid grid-cols-[1fr_2fr]">             <!-- 1:2 ratio -->
<div class="grid grid-cols-[auto_1fr_auto]">       <!-- Auto sidebars -->
```

**Gap spacing**:
```html
<div class="grid gap-4">                           <!-- 1rem gap -->
<div class="grid gap-[var(--spacing-lg)]">         <!-- Design token gap -->
<div class="grid gap-x-4 gap-y-8">                 <!-- Different x/y gaps -->
```

### Complex Patterns in Our Codebase

#### Pattern 1: Auto-Fit Responsive Grid

**Use Case**: Feature cards that automatically wrap based on available space

**CSS Version**:
```css
.feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 20rem), 1fr));
  gap: var(--spacing-xl);
}
```

**Tailwind Utility**:
```html
<div class="grid grid-cols-[repeat(auto-fit,minmax(min(100%,20rem),1fr))] gap-[var(--spacing-xl)]">
```

**Breakdown**:
- `grid` - Display grid
- `grid-cols-[...]` - Arbitrary grid-template-columns value
- `repeat(auto-fit, ...)` - Create as many columns as fit
- `minmax(min(100%, 20rem), 1fr)` - Column width between 100% (mobile) and flexible
- `gap-[var(--spacing-xl)]` - Gap using design token

**Note**: No spaces in arbitrary value. Tailwind v4 handles this.

---

#### Pattern 2: Mixed Column Sizes (Footer Grid)

**Use Case**: Footer with larger brand column, 3 smaller link columns

**CSS Version**:
```css
.footer-grid {
  display: grid;
  grid-template-columns: 2fr repeat(3, 1fr);
  gap: var(--spacing-xl);
}
```

**Tailwind Utility**:
```html
<div class="grid grid-cols-[2fr_repeat(3,1fr)] gap-[var(--spacing-xl)]">
```

**Breakdown**:
- First column: `2fr` (twice as wide)
- Next 3 columns: `1fr` each (equal width)
- Underscores replace spaces in arbitrary value

**Responsive Override**:
```html
<div class="grid grid-cols-[2fr_repeat(3,1fr)] gap-[var(--spacing-xl)]
            md:grid-cols-1 md:gap-[var(--spacing-lg)]">
```

At `<768px`, switches to single column with smaller gap.

---

#### Pattern 3: Named Grid Areas

**Use Case**: Complex page layouts with header, sidebar, content, footer

**CSS Version**:
```css
.page-layout {
  display: grid;
  grid-template-areas:
    "header header"
    "sidebar content"
    "footer footer";
  grid-template-columns: 250px 1fr;
  grid-template-rows: auto 1fr auto;
}

.header { grid-area: header; }
.sidebar { grid-area: sidebar; }
```

**Tailwind Approach**: Use regular grid with `col-span` and `row-span`

```html
<div class="grid grid-cols-[250px_1fr] grid-rows-[auto_1fr_auto]">
  <header class="col-span-2">Header</header>
  <aside>Sidebar</aside>
  <main>Content</main>
  <footer class="col-span-2">Footer</footer>
</div>
```

**Alternative**: Keep grid-template-areas in CSS if complex

```css
.page-layout {
  display: grid;
  grid-template-areas:
    "header header header"
    "sidebar content aside"
    "footer footer footer";
  grid-template-columns: 200px 1fr 200px;
}
```

**Reason to preserve**: Grid areas provide semantic naming, easier to maintain if many areas.

---

#### Pattern 4: Dense Grid Packing

**Use Case**: Masonry-like layout where items fill gaps

**CSS Version**:
```css
.masonry-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-auto-flow: dense;
  gap: 1rem;
}
```

**Tailwind Utility**:
```html
<div class="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] grid-flow-dense gap-4">
```

**Breakdown**:
- `grid-flow-dense` - Fill gaps with smaller items
- `auto-fill` vs `auto-fit`:
  - `auto-fill`: Creates as many columns as fit, even if empty
  - `auto-fit`: Collapses empty columns

---

### Grid Utilities Quick Reference

| Pattern | CSS | Tailwind Utility |
|---------|-----|------------------|
| Equal columns | `grid-template-columns: repeat(3, 1fr)` | `grid-cols-3` |
| Fixed + Flexible | `grid-template-columns: 200px 1fr` | `grid-cols-[200px_1fr]` |
| Auto-fit responsive | `repeat(auto-fit, minmax(20rem, 1fr))` | `grid-cols-[repeat(auto-fit,minmax(20rem,1fr))]` |
| Mixed ratios | `2fr repeat(3, 1fr)` | `grid-cols-[2fr_repeat(3,1fr)]` |
| Dense packing | `grid-auto-flow: dense` | `grid-flow-dense` |
| Column span | `grid-column: span 2` | `col-span-2` |
| Row span | `grid-row: span 3` | `row-span-3` |
| Gap all | `gap: 1rem` | `gap-4` |
| Gap horizontal | `column-gap: 1rem` | `gap-x-4` |
| Gap vertical | `row-gap: 2rem` | `gap-y-8` |

### Responsive Grid Patterns

**Mobile-first approach** (Tailwind default):
```html
<!-- Mobile: 1 column, Tablet: 2 columns, Desktop: 3 columns -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
```

**Desktop-first with mobile override**:
```html
<!-- Desktop: 4 columns, Mobile: 1 column -->
<div class="grid grid-cols-[2fr_repeat(3,1fr)] md:grid-cols-1">
```

**Conditional gap sizes**:
```html
<div class="grid gap-[var(--spacing-xl)] md:gap-[var(--spacing-lg)]">
```

### Our Migration Strategy

1. **Simple grids** (equal columns): Use standard utilities (`grid-cols-3`)
2. **Complex grids** (auto-fit, mixed sizes): Use arbitrary values (`grid-cols-[...]`)
3. **Named areas** (if very complex): Consider preserving in CSS
4. **Responsive grids**: Always use mobile-first breakpoints
5. **Gap spacing**: Always use design tokens (`gap-[var(--spacing-*)]`)

### Common Mistakes to Avoid

❌ **Spaces in arbitrary values**:
```html
<!-- WRONG -->
<div class="grid-cols-[2fr repeat(3, 1fr)]">

<!-- CORRECT -->
<div class="grid-cols-[2fr_repeat(3,1fr)]">
```

❌ **Missing brackets**:
```html
<!-- WRONG -->
<div class="grid-cols-repeat(3,1fr)">

<!-- CORRECT -->
<div class="grid-cols-[repeat(3,1fr)]">
```

❌ **Forgetting responsive overrides**:
```html
<!-- Desktop only - breaks on mobile -->
<div class="grid grid-cols-[2fr_repeat(3,1fr)]">

<!-- Responsive - works everywhere -->
<div class="grid grid-cols-[2fr_repeat(3,1fr)] md:grid-cols-1">
```

### Testing Grid Layouts

**Visual inspection**:
1. Inspect grid with browser DevTools (Grid overlay)
2. Verify columns count at each breakpoint
3. Check gap spacing matches design
4. Ensure content doesn't overflow

**Responsive testing**:
1. Test at exact breakpoint (768px) - verify transition
2. Test mobile (375px) - ensure readable
3. Test desktop (1440px) - ensure not too stretched

---

## 4. Motion-Reduce Variant Usage Patterns

### Overview

The `prefers-reduced-motion` CSS media feature detects if a user has requested reduced motion in their system settings. Tailwind provides the `motion-reduce:` variant to respect this preference and improve accessibility.

### Why Motion-Reduce Matters

**Accessibility requirement**: WCAG 2.1 Success Criterion 2.3.3 (Level AAA) requires respecting user motion preferences.

**Users who benefit**:
- People with vestibular disorders (motion sickness from animations)
- Users with attention deficit disorders
- Anyone who finds animations distracting

**Our constitutional commitment**: "Accessibility as Standard" principle requires WCAG 2.1 Level AA minimum.

### Tailwind motion-reduce: Variant

**Syntax**: `motion-reduce:{utility}`

**Applies when**: User has set `prefers-reduced-motion: reduce` in OS settings

**Examples**:
```html
<!-- Disable all transitions -->
<div class="transition-all motion-reduce:transition-none">

<!-- Disable transform on hover -->
<div class="hover:scale-105 motion-reduce:hover:scale-100">

<!-- Disable translate -->
<div class="hover:-translate-y-2 motion-reduce:hover:translate-y-0">

<!-- Disable rotate -->
<div class="hover:rotate-3 motion-reduce:hover:rotate-0">
```

### Patterns in Our Codebase

#### Pattern 1: Button Hover Lift

**Before** (CSS):
```css
.button {
  transition: all var(--duration-fast) ease-out;
}

.button:hover {
  transform: translateY(-1px);
}

@media (prefers-reduced-motion: reduce) {
  .button {
    transition: none;
  }

  .button:hover {
    transform: none;
  }
}
```

**After** (Tailwind):
```html
<button class="transition-all duration-[var(--duration-fast)] ease-out
               hover:-translate-y-px hover:shadow-lg
               motion-reduce:transition-none
               motion-reduce:hover:translate-y-0">
```

**Breakdown**:
- `transition-all` - Transition all properties
- `motion-reduce:transition-none` - Disable transition when motion reduced
- `hover:-translate-y-px` - Lift on hover
- `motion-reduce:hover:translate-y-0` - No lift when motion reduced
- Shadow remains (visual feedback without motion)

---

#### Pattern 2: Card Hover Effects

**Before**:
```css
.feature-card {
  transition: all var(--duration-fast) ease-out;
}

.feature-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(217, 119, 87, 0.1);
}

@media (prefers-reduced-motion: reduce) {
  .feature-card {
    transition: none;
  }

  .feature-card:hover {
    transform: none;
  }
}
```

**After**:
```html
<div class="transition-all duration-[var(--duration-fast)]
            hover:-translate-y-0.5 hover:shadow-[0_4px_16px_rgba(217,119,87,0.1)]
            hover:border-[var(--color-accent)]
            motion-reduce:transition-none
            motion-reduce:hover:translate-y-0">
```

**Key point**: Border color change and shadow remain (non-motion feedback), only transform is disabled.

---

#### Pattern 3: Preserved Keyframe Animations

**For animations in CSS** (not utilities), use media query:

```css
@keyframes wordFadeIn {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animated-word {
  animation: wordFadeIn 500ms ease-out forwards;
}

/* Disable animation for reduced motion */
@media (prefers-reduced-motion: reduce) {
  .animated-word {
    animation: none;
    opacity: 1;
    transform: none;
  }
}
```

**Our implementation**: All preserved animations (wordFadeIn, blink, hamburger) include this pattern.

---

### Comprehensive Motion-Reduce Checklist

**For each animated element**, apply motion-reduce variants:

#### Transitions

```html
<!-- Disable all transitions -->
<div class="transition-all motion-reduce:transition-none">

<!-- Disable specific transition -->
<div class="transition-transform motion-reduce:transition-none">
```

#### Transforms

```html
<!-- Translate -->
<div class="hover:-translate-y-2 motion-reduce:hover:translate-y-0">

<!-- Scale -->
<div class="hover:scale-105 motion-reduce:hover:scale-100">

<!-- Rotate -->
<div class="hover:rotate-3 motion-reduce:hover:rotate-0">

<!-- Combined -->
<div class="hover:scale-105 hover:rotate-3
            motion-reduce:hover:scale-100 motion-reduce:hover:rotate-0">
```

#### Opacity Fades

**Decision**: Opacity changes are generally acceptable for reduced motion.

```html
<!-- OK to keep opacity transition -->
<div class="hover:opacity-80 transition-opacity">

<!-- Or disable if combined with transform -->
<div class="hover:opacity-80 hover:-translate-y-2
            transition-all
            motion-reduce:transition-opacity
            motion-reduce:hover:translate-y-0">
```

**Guideline**: Disable opacity transitions if combined with transforms. Allow standalone opacity changes.

#### Spinning/Rotating Animations

```html
<!-- Loading spinner - disable entirely -->
<div class="animate-spin motion-reduce:animate-none">

<!-- Or use alternative indication -->
<div class="animate-spin motion-reduce:animate-pulse">
```

### Testing Motion-Reduce

**Browser DevTools**:
1. Open DevTools (F12)
2. Open Command Palette (Cmd/Ctrl + Shift + P)
3. Type "Emulate CSS prefers-reduced-motion"
4. Select "reduce"
5. Verify animations disabled

**Operating System Settings**:

**macOS**:
- System Preferences → Accessibility → Display → Reduce Motion

**Windows**:
- Settings → Ease of Access → Display → Show animations in Windows

**Linux** (GNOME):
- Settings → Universal Access → Reduce Animation

**iOS**:
- Settings → Accessibility → Motion → Reduce Motion

**Android**:
- Settings → Accessibility → Remove animations

### Our Implementation Strategy

1. **Every transition gets motion-reduce**: `transition-all motion-reduce:transition-none`
2. **Every transform gets motion-reduce**: `hover:-translate-y-2 motion-reduce:hover:translate-y-0`
3. **Preserved animations include media query**: All `@keyframes` have `@media (prefers-reduced-motion: reduce)` override
4. **Non-motion feedback remains**: Colors, shadows, borders remain active
5. **Test with DevTools**: Validate all pages with motion-reduce emulation

### Anti-Patterns to Avoid

❌ **Forgetting motion-reduce on transforms**:
```html
<!-- BAD - no motion-reduce -->
<div class="hover:-translate-y-2">

<!-- GOOD - motion-reduce included -->
<div class="hover:-translate-y-2 motion-reduce:hover:translate-y-0">
```

❌ **Removing all visual feedback**:
```html
<!-- BAD - no feedback with reduced motion -->
<div class="hover:-translate-y-2 hover:shadow-lg
            motion-reduce:hover:translate-y-0 motion-reduce:hover:shadow-none">

<!-- GOOD - shadow remains -->
<div class="hover:-translate-y-2 hover:shadow-lg
            motion-reduce:hover:translate-y-0">
```

❌ **Inconsistent application**:
```html
<!-- BAD - some transforms have motion-reduce, others don't -->
<div class="hover:-translate-y-2 motion-reduce:hover:translate-y-0">
  <span class="hover:rotate-3">  <!-- Missing motion-reduce! -->
```

### Best Practices Summary

1. **Always include motion-reduce** for transitions and transforms
2. **Keep non-motion feedback** (colors, shadows, borders)
3. **Test with DevTools** emulation and real OS settings
4. **Document exceptions** if any animation must remain (rare)
5. **CSS animations need media queries** - utilities use variants

---

## 5. Visual Regression Testing Approaches

### Overview

Visual regression testing ensures UI changes don't introduce unintended visual differences. For this migration, we need pixel-perfect accuracy to validate Tailwind utilities produce identical output to scoped CSS.

### Approach Selection

**Automated vs. Manual**:
- **Automated tools** (Percy, Chromatic, BackstopJS): Best for CI/CD, large teams, frequent changes
- **Manual comparison**: Best for one-time migrations, small teams, controlled environments

**Our choice**: **Manual comparison** with browser DevTools

**Rationale**:
- One-time migration (not ongoing)
- Small team/solo developer
- Full control over comparison process
- No additional dependencies
- Sufficient for 5-page marketing site

### Manual Visual Regression Process

#### Step 1: Baseline Capture

**Setup**:
1. Ensure site is in stable state (no uncommitted changes)
2. Start dev server: `npm run dev`
3. Open browser (recommend Chrome DevTools)

**Capture process**:

**Per-page captures**:
```
Pages to capture:
1. Homepage (/)
2. Features (/features)
3. Get Started (/get-started)
4. Docs (/docs)
5. Use Cases (/use-cases)

Viewports to test:
- Mobile: 375px width (iPhone SE)
- Tablet: 768px width (iPad portrait)
- Desktop: 1440px width (standard laptop)
```

**DevTools screenshot method**:
1. Open DevTools (F12)
2. Toggle device toolbar (Cmd/Ctrl + Shift + M)
3. Set viewport width
4. Click three-dot menu in device toolbar
5. Select "Capture screenshot"
6. Save as `{page}-{viewport}.png`

**Example filenames**:
```
screenshots/baseline/
  homepage-mobile.png
  homepage-tablet.png
  homepage-desktop.png
  features-mobile.png
  features-tablet.png
  ...
```

**Interactive states**:
1. Hover states: Use DevTools "Force element state" → `:hover`
2. Focus states: Use DevTools "Force element state" → `:focus`
3. Active states: Use DevTools "Force element state" → `:active`

**Animations**:
- Record screen capture (macOS: Cmd + Shift + 5, Windows: Windows + G)
- Save as `animation-hero-words.mov`, `animation-brand-cycling.mov`, etc.

---

#### Step 2: Comparison Methodology

**After component conversion**:

**Side-by-side comparison**:
1. Take new screenshot with same viewport size
2. Open baseline and new screenshots in separate windows
3. Use OS window management to place side-by-side
4. Alternate focus between windows (visual flicker test)

**Browser overlay technique**:
1. Open baseline screenshot in browser tab
2. Open live site in another tab
3. Use `Alt+Tab` to quickly switch (visual diff via persistence of vision)

**DevTools overlay**:
1. Screenshot live site
2. Use browser extension (e.g., "Imagecompare") to overlay images
3. Adjust opacity slider to see differences

**Pixel-level inspection**:
1. Use DevTools "Measure" tool (Cmd/Ctrl + Shift + C)
2. Hover over elements to see exact pixel dimensions
3. Compare spacing, sizing, positioning

---

#### Step 3: Validation Checklist

**For each component conversion**, validate:

**Layout & Spacing** (most critical):
```
□ Padding matches exactly
□ Margin matches exactly
□ Gap (flex/grid) matches exactly
□ Element positioning matches (absolute/relative/fixed)
□ Width/height matches
□ Max-width/min-width matches
```

**Colors**:
```
□ Text color matches
□ Background color matches
□ Border color matches
□ Shadow color and opacity match
□ Hover state colors match
□ Focus state colors match
```

**Typography**:
```
□ Font size matches
□ Font weight matches
□ Line height matches
□ Letter spacing matches (if used)
□ Text alignment matches
```

**Visual Effects**:
```
□ Border radius matches
□ Box shadows match (size, blur, spread, color)
□ Opacity matches
□ Transforms match (translate, scale, rotate)
```

**Interactive States**:
```
□ Hover effects match
□ Focus indicators visible and match
□ Active states match
□ Disabled states match (if applicable)
```

**Responsive Behavior**:
```
□ Mobile layout matches baseline
□ Tablet layout matches baseline
□ Desktop layout matches baseline
□ Breakpoint transitions are clean (no jumps)
□ Content readable at all sizes
```

**Animations**:
```
□ Transition duration matches
□ Transition timing function matches
□ Keyframe animations function identically
□ Reduced motion disables animations
```

---

#### Step 4: Difference Tolerance

**Acceptable differences** (ignore these):
- Sub-pixel rendering (<1px differences)
- Font anti-aliasing variations (browser-specific)
- Browser default styles (minimal, should be normalized)

**Unacceptable differences** (must fix):
- Any spacing change ≥2px
- Any color mismatch
- Missing interactive states
- Broken animations
- Layout shifts
- Missing or misaligned content

---

### Automated Testing (Optional Enhancement)

If visual regressions become frequent (e.g., ongoing development), consider:

#### Option 1: Percy (Recommended for teams)

**Setup**:
```bash
npm install --save-dev @percy/cli @percy/puppeteer
```

**Usage**:
```javascript
// percy-snapshots.js
const percySnapshot = require('@percy/puppeteer');
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto('http://localhost:3000/');
  await percySnapshot(page, 'Homepage');

  await page.goto('http://localhost:3000/features');
  await percySnapshot(page, 'Features');

  // ... more pages

  await browser.close();
})();
```

**Pros**: Cloud-hosted, great UI, team collaboration
**Cons**: Paid service, overkill for solo projects

---

#### Option 2: BackstopJS (Recommended for solo)

**Setup**:
```bash
npm install --save-dev backstopjs
npx backstop init
```

**Config** (backstop.json):
```json
{
  "viewports": [
    { "name": "mobile", "width": 375, "height": 812 },
    { "name": "tablet", "width": 768, "height": 1024 },
    { "name": "desktop", "width": 1440, "height": 900 }
  ],
  "scenarios": [
    {
      "label": "Homepage",
      "url": "http://localhost:3000/"
    },
    {
      "label": "Features",
      "url": "http://localhost:3000/features"
    }
  ]
}
```

**Usage**:
```bash
# Capture reference
npx backstop reference

# Run test (after changes)
npx backstop test

# Approve changes
npx backstop approve
```

**Pros**: Free, local, automated
**Cons**: Initial setup, test maintenance

---

#### Option 3: Playwright (Best for E2E + visual)

**Setup**:
```bash
npm install --save-dev @playwright/test
```

**Test** (tests/visual.spec.ts):
```typescript
import { test, expect } from '@playwright/test';

test('homepage visual regression', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await expect(page).toHaveScreenshot('homepage.png');
});

test('features page visual regression', async ({ page }) => {
  await page.goto('http://localhost:3000/features');
  await expect(page).toHaveScreenshot('features.png');
});
```

**Run**:
```bash
# Generate baseline
npx playwright test --update-snapshots

# Run tests
npx playwright test
```

**Pros**: Integrated E2E + visual, multi-browser
**Cons**: Requires test writing, slower than manual

---

### Our Implementation Plan

**For this migration**:

**Phase 1-3 (Simple components)**: Manual comparison only
- Fast iteration
- Learn conversion patterns
- Minimal overhead

**Phase 4 (Complex pages)**: Manual + DevTools measurement
- Higher risk components
- Precise spacing validation
- Interactive state verification

**Post-migration**: Consider Playwright for ongoing development
- Prevent future regressions
- Automate release validation
- Multi-browser testing

**Tooling decision**: Revisit after Feature 003 completion

---

### Browser Testing Strategy

**Primary browser**: Chrome (DevTools, largest user base)

**Secondary browsers**:
- Firefox (Gecko engine differences)
- Safari (WebKit, iOS simulation)
- Edge (Chromium-based, Windows users)

**Testing priority**:
1. **Chrome** (90% of validation)
2. **Safari** (important for iOS users, WebKit-specific issues)
3. **Firefox** (cross-engine validation)
4. **Edge** (Windows compatibility)

**Mobile testing**:
- Chrome DevTools device emulation (primary)
- Real device testing (if available, secondary)

---

### Documentation Template

**For each component**, create validation report:

```markdown
## Component: Button.astro

**Conversion Date**: 2025-11-11
**Tester**: [Name]

### Screenshots

- Baseline: `screenshots/baseline/button-states.png`
- After: `screenshots/after/button-states.png`

### Viewports Tested

- [x] Mobile (375px)
- [x] Tablet (768px)
- [x] Desktop (1440px)

### States Tested

- [x] Default
- [x] Hover
- [x] Focus
- [x] Active
- [x] Disabled

### Validation Results

**Layout & Spacing**: ✅ Pass
- Padding: Identical
- Margin: Identical
- Width/Height: Identical

**Colors**: ✅ Pass
- Background: Matches design token
- Text: Matches design token
- Border: Matches design token

**Interactive States**: ✅ Pass
- Hover: Transform and shadow identical
- Focus: Outline visible, identical
- Active: State feedback identical

**Responsive**: ✅ Pass
- Mobile: Renders correctly
- Tablet: Renders correctly
- Desktop: Renders correctly

**Accessibility**: ✅ Pass
- Keyboard navigation: Works
- Focus visible: Yes
- Reduced motion: Tested, works

### Issues Found

None

### Status

✅ **Conversion Validated - Ready for next component**
```

---

### Best Practices Summary

1. **Capture baseline first** - before any changes
2. **Test incrementally** - after each component conversion
3. **Use consistent viewports** - 375px, 768px, 1440px
4. **Document differences** - even if acceptable
5. **Test interactive states** - hover, focus, active
6. **Test reduced motion** - accessibility requirement
7. **Cross-browser validate** - at minimum Chrome + Safari
8. **Automate when needed** - after manual process established

---

## Research Summary

### Key Findings

1. **Tailwind v4 Arbitrary Values**: Fully support CSS custom properties via `var(--token)` syntax
2. **Animation Preservation**: Keep `@keyframes` and pseudo-element animations in CSS
3. **Complex Grids**: Use arbitrary syntax `grid-cols-[2fr_repeat(3,1fr)]` with underscores for spaces
4. **Motion-Reduce**: Apply `motion-reduce:` variant to all transitions and transforms
5. **Visual Regression**: Manual comparison with DevTools sufficient for one-time migration

### Migration Confidence

**High confidence patterns**:
- ✅ Layout utilities (flex, grid)
- ✅ Spacing with design tokens
- ✅ Colors with design tokens
- ✅ Typography utilities
- ✅ Interactive states (hover, focus)
- ✅ Responsive breakpoints

**Preserve in CSS**:
- ❌ Keyframe animations
- ❌ Pseudo-element content
- ❌ Browser-specific pseudo-elements
- ❌ Complex attribute selectors

### Recommended Tools

**Required**:
- Browser DevTools (built-in)
- Screenshot comparison (manual)

**Optional** (post-migration):
- Playwright (automated visual + E2E)
- Lighthouse CI (performance monitoring)

### Next Steps

1. Proceed with implementation plan
2. Start with Button.astro (simple component)
3. Validate approach before scaling to complex components
4. Document learnings in each phase

---

**Research Version**: 1.0.0
**Research Date**: 2025-11-11
**Status**: Complete - Ready for Implementation
