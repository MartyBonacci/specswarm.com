# Implementation Plan: Convert Component-Scoped CSS to Tailwind Utility Classes

## Technical Context

### Current State

**Stack**: Astro 5.15.4 + React 19 + Tailwind CSS v4.0.0 (Oxide engine) + TypeScript 5.x + Shiki 3.15.0

**Component Inventory**:
- 12 Astro components (.astro files)
- 3 React components (.tsx files)
- 1 legacy CSS file (mobile-menu.css - already empty)

**Scoped CSS Situation**:
- Approximately 1,800-2,000 lines of scoped CSS across 10 primary components
- CSS distributed across component `<style>` blocks in Astro files
- React components use inline `<style>` JSX for animations (AnimatedHero, AnimatedBrand)
- Complex patterns: animations, pseudo-elements, browser-specific styling

**Design Token System**:
- 35+ custom properties defined in `/src/styles/global.css` @theme block
- Color tokens: `--color-primary`, `--color-accent`, `--color-background`, `--color-surface`, `--color-border`, `--color-secondary`
- Spacing scale: `--spacing-*` (xs through xl, plus section spacing)
- Typography: `--font-size-*` using clamp() for fluid responsive sizing
- Transitions: `--duration-*` and `--ease-*` for consistent animations
- Layout: `--nav-height`, `--content-max-width`, etc.

**Build Process**:
- Vite-powered builds via Astro
- Tailwind v4 configured via `@tailwindcss/vite` plugin
- CSS-first configuration approach (no tailwind.config.js)
- All design tokens centralized in global.css @theme

### Key Technical Decisions and Constraints

**Migration Strategy**:
- Component-by-component conversion to minimize risk
- Preserve visual pixel-perfect accuracy (zero regressions)
- Maintain all existing animations and interactive states
- Keep React component inline styles for scoped animations

**Constraints**:
- Cannot modify design tokens (treat as immutable)
- Cannot change breakpoint values (640px, 768px fixed)
- Must preserve all accessibility features (focus states, reduced motion, ARIA)
- Cannot introduce new dependencies (Tailwind utilities only)
- Must maintain current Lighthouse performance scores (≥95)

**Tailwind v4 Capabilities**:
- Arbitrary value syntax: `bg-[var(--color-surface)]`
- CSS custom property support in utilities
- Modern variant stacking: `md:hover:bg-accent`
- No configuration file needed (CSS-first approach)

---

## Tech Stack Compliance Report

### ✅ Approved Technologies (already in stack)

All technologies required for this feature are already approved and in use:

- **Astro** 5.15.4 - Component framework
- **React** 19.2.0 - Interactive islands (AnimatedHero, AnimatedBrand, MobileMenu)
- **TypeScript** 5.x - Type safety (strict mode)
- **Tailwind CSS** 4.0.0 - Utility-first styling framework (Oxide engine)
- **Shiki** 3.15.0 - Syntax highlighting (CodeBlock component)
- **Vite** - Build tool (bundled with Astro)

### ➕ New Technologies (auto-added)

**None required** - This feature uses only existing stack technologies.

### ⚠️ Conflicting Technologies

**None** - No conflicts detected.

### ❌ Prohibited Technologies

**None used** - All patterns conform to tech stack guidelines:
- Using Tailwind utilities instead of CSS-in-JS libraries ✅
- Using functional React components (no class components) ✅
- Using TypeScript instead of PropTypes ✅
- No Sass/SCSS (using Tailwind) ✅

---

## Constitution Check

### Alignment with Constitutional Principles

#### 1. Performance First ✅

**How this feature aligns**:
- Tailwind utilities are more efficient than scoped CSS (reuse across components)
- Expected CSS bundle size reduction of 80% (2000 → <400 lines)
- Utilities are more cache-friendly (shared classes)
- No runtime performance impact (pure CSS transformation)

**Potential violations**: None

**Mitigations**: N/A

#### 2. Content Accuracy and Freshness ✅

**How this feature aligns**:
- No content changes - pure styling refactor
- Maintains existing component APIs and props
- Preserves all semantic HTML structure

**Potential violations**: None

**Mitigations**: N/A

#### 3. Accessibility as Standard ✅

**How this feature aligns**:
- Preserves all existing focus states via `focus-visible:` variant
- Maintains `motion-reduce:` variant for animation preferences
- No changes to semantic HTML or ARIA attributes
- Keyboard navigation states unchanged
- Color contrast maintained (using same design tokens)

**Potential violations**: Risk of accidentally removing focus indicators during conversion

**Mitigations**:
- Explicit validation checklist item for focus states
- Visual regression testing at each phase
- Test with keyboard navigation after each component conversion

#### 4. User-Centric Design ✅

**How this feature aligns**:
- Zero visual changes to end users
- Maintains all responsive breakpoints
- Preserves all interactive feedback (hovers, active states)

**Potential violations**: None

**Mitigations**: N/A

#### 5. Developer Experience (DX) ✅✅ (Primary Benefit)

**How this feature aligns**:
- **Major DX improvement** - primary goal of this feature
- Inline styling in markup (no context switching)
- Consistent Tailwind patterns across components
- Self-documenting styles via utility class names
- Faster style modifications (no searching style blocks)
- Easier onboarding for new developers familiar with Tailwind

**Potential violations**: None

**Mitigations**: N/A

#### 6. SEO and Discoverability ✅

**How this feature aligns**:
- No changes to semantic HTML structure
- No impact on meta tags or page structure
- Maintains fast page loads (potentially improves via smaller CSS)

**Potential violations**: None

**Mitigations**: N/A

### Constitutional Compliance Summary

**Overall Assessment**: ✅ Fully compliant

This feature actively supports constitutional principles, particularly:
- Performance First (reduced CSS bundle size)
- Accessibility (preserves all a11y features)
- Developer Experience (primary benefit area)

No principle violations detected. Recommended to proceed.

---

## Phase 0: Research

Research topics documented in separate `research.md` file:

1. **Tailwind v4 Arbitrary Value Syntax** - Using CSS custom properties in utilities
2. **Animation Preservation Patterns** - Best practices for maintaining @keyframes
3. **Complex Grid Syntax** - Auto-fit patterns in Tailwind
4. **Motion-Reduce Variant Usage** - Accessibility for reduced motion
5. **Visual Regression Testing** - Approaches for pixel-perfect validation

See `/features/003-convert-component-scoped-css-to-tailwind-utility-classes/research.md` for detailed findings.

---

## Phase 1: Design

### Component Inventory

**Total Components**: 10 components requiring conversion

**Conversion Priority Order** (from spec FR4):

| Priority | Component | Lines of CSS | Complexity | Risk Level | Rationale |
|----------|-----------|--------------|------------|------------|-----------|
| **Phase 1: Simple Components** |
| 1 | Button.astro | ~100 | Low | Low | Simplest component, perfect test case for validation approach |
| 2 | FeatureCard.astro | ~100 | Low-Medium | Low | Standard card pattern, minimal complexity |
| 3 | ScenarioCard.astro | ~130 | Low-Medium | Low | Similar to FeatureCard, validates card patterns |
| **Phase 2: Layout Components** |
| 4 | Footer.astro | ~145 | Medium | Medium | Grid layout, responsive columns, but straightforward |
| 5 | Header.astro | ~230 | High | High | Complex hamburger animations, desktop/mobile nav, sticky positioning |
| **Phase 3: Page Components** |
| 6 | index.astro | ~400 | High | Medium | Homepage with multiple sections, hero, problem/solution grids |
| 7 | features.astro | ~200 | Medium | Medium | Feature grid layouts, standard patterns |
| 8 | get-started.astro | ~150 | Medium | Low | Step-by-step layout, minimal complexity |
| 9 | docs.astro | ~100 | Low-Medium | Low | Documentation layout, text-heavy |
| 10 | use-cases.astro | ~150 | Medium | Low | Scenario cards, similar patterns to features |
| **Phase 4: Special Cases** |
| 11 | CodeBlock.astro | ~80 | Medium | Medium | Shiki global overrides, WebKit scrollbar styling |
| **Phase 5: Cleanup** |
| 12 | mobile-menu.css | 1 | N/A | None | Already empty, just delete file |

**React Components** (Not converted - retain inline styles):
- AnimatedHero.tsx - Inline `<style>` with @keyframes wordFadeIn
- AnimatedBrand.tsx - Inline `<style>` with @keyframes blink
- MobileMenu.tsx - Minimal/no scoped styles

**Estimated Total CSS Lines**: ~1,785 lines to convert

---

### Conversion Strategy

#### What to Convert (Detailed Breakdown)

**Layout Utilities**:
```
Display:
- flex → flex
- grid → grid
- inline-flex → inline-flex
- block → block
- hidden → hidden

Flexbox:
- flex-direction: column → flex-col
- justify-content: space-between → justify-between
- align-items: center → items-center
- gap: var(--spacing-md) → gap-[var(--spacing-md)]
- flex-wrap: wrap → flex-wrap

Grid:
- grid-template-columns: repeat(3, 1fr) → grid-cols-3
- grid-template-columns: 2fr repeat(3, 1fr) → grid-cols-[2fr_repeat(3,1fr)]
- grid-auto-flow: dense → grid-flow-dense
- gap: var(--spacing-xl) → gap-[var(--spacing-xl)]

Positioning:
- position: sticky → sticky
- position: absolute → absolute
- top: 0 → top-0
- z-index: 50 → z-50

Sizing:
- width: 100% → w-full
- max-width: var(--content-max-width) → max-w-[var(--content-max-width)]
- height: var(--nav-height) → h-[var(--nav-height)]
```

**Spacing System** (using design tokens):
```
Padding:
- padding: var(--spacing-lg) → p-[var(--spacing-lg)]
- padding-inline: var(--spacing-site-margin) → px-[var(--spacing-site-margin)]
- padding-block: var(--spacing-section-lg) → py-[var(--spacing-section-lg)]

Margin:
- margin: 0 auto → mx-auto
- margin-left: auto → ml-auto
- margin-top: var(--spacing-sm) → mt-[var(--spacing-sm)]

Gap:
- gap: var(--spacing-md) → gap-[var(--spacing-md)]
- gap: 0.5rem → gap-2
```

**Color System** (using design tokens):
```
Text Colors:
- color: var(--color-primary) → text-[var(--color-primary)]
- color: var(--color-accent) → text-[var(--color-accent)]
- color: white → text-white

Background Colors:
- background-color: var(--color-surface) → bg-[var(--color-surface)]
- background-color: rgba(217, 119, 87, 0.1) → bg-[rgba(217,119,87,0.1)]

Border Colors:
- border: 1px solid var(--color-border) → border border-[var(--color-border)]
- border-bottom: 1px solid var(--color-border) → border-b border-[var(--color-border)]
```

**Typography** (using design tokens):
```
Font Sizes:
- font-size: var(--font-size-display-xl) → text-[var(--font-size-display-xl)]
- font-size: 1.25rem → text-xl
- font-size: 0.875rem → text-sm

Font Weights:
- font-weight: 700 → font-bold
- font-weight: 600 → font-semibold
- font-weight: 500 → font-medium

Line Heights:
- line-height: 1.2 → leading-tight
- line-height: 1.6 → leading-relaxed

Letter Spacing:
- letter-spacing: 0.05em → tracking-wide
```

**Visual Effects**:
```
Border Radius:
- border-radius: 0.5rem → rounded-lg
- border-radius: 0.75rem → rounded-xl

Box Shadows:
- box-shadow: 0 4px 16px rgba(...) → shadow-[0_4px_16px_rgba(...)]

Opacity:
- opacity: 0.5 → opacity-50
- opacity: 0.8 → opacity-80

Transforms:
- transform: translateY(-2px) → -translate-y-[2px]
- transform: translateX(4px) → translate-x-1

Transitions:
- transition: all var(--duration-fast) ease-out → transition-all duration-[var(--duration-fast)]
```

**Interactive States**:
```
Hover:
- .button:hover → hover:
- .button:hover:not(:disabled) → hover:enabled:

Focus:
- .button:focus-visible → focus-visible:

Active:
- .button:active → active:
```

**Responsive Breakpoints**:
```
Mobile-first:
- @media (max-width: 768px) → md: (reverse logic)
- @media (max-width: 640px) → sm: (reverse logic)
- @media (min-width: 768px) → md:

Example:
.desktop-only { display: flex; }
@media (max-width: 768px) {
  .desktop-only { display: none; }
}

Becomes:
class="flex md:hidden"
```

**Accessibility Variants**:
```
Reduced Motion:
@media (prefers-reduced-motion: reduce) {
  .button { transition: none; }
}

Becomes:
class="transition-all motion-reduce:transition-none"
```

---

#### What to Preserve (Detailed List)

**1. Animation Keyframes** (Keep in `<style>` blocks):

```css
/* AnimatedHero.tsx - PRESERVE */
@keyframes wordFadeIn {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* AnimatedBrand.tsx - PRESERVE */
@keyframes blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}

/* Header.astro - PRESERVE */
/* Hamburger menu transform animations */
.mobile-menu-toggle[aria-expanded="true"] .hamburger::before {
  transform: rotate(45deg) translate(5px, 5px);
}
```

**Rationale**: Keyframe animations cannot be efficiently expressed as Tailwind utilities. These require multi-step timing functions and complex transforms.

**2. Pseudo-elements with Content Property** (Keep in `<style>` blocks):

```css
/* Header.astro - PRESERVE */
.nav-link-active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2px;
  background-color: var(--color-accent);
}

/* Any ::before or ::after with content: '' */
.hamburger::before,
.hamburger::after {
  content: '';
  /* ... */
}
```

**Rationale**: Tailwind doesn't support `content` property in utilities. Pseudo-elements creating visual elements must remain in CSS.

**3. Browser-Specific Styling** (Keep in `<style>` blocks):

```css
/* CodeBlock.astro - PRESERVE */
.code-block-content::-webkit-scrollbar {
  height: 8px;
}

.code-block-content::-webkit-scrollbar-track {
  background-color: var(--color-background);
}

.code-block-content::-webkit-scrollbar-thumb {
  background-color: var(--color-border);
  border-radius: 4px;
}
```

**Rationale**: WebKit-specific pseudo-elements not supported by Tailwind utilities.

**4. Global Overrides** (Keep in `<style>` blocks):

```css
/* CodeBlock.astro - PRESERVE */
.code-block-content :global(.shiki-pre) {
  margin: 0;
  padding: 1rem;
  background-color: var(--color-surface) !important;
  /* ... */
}

.code-block-content :global(.shiki-code) {
  display: block;
  font-family: "Fira Code", /* ... */;
}
```

**Rationale**: Shiki generates its own class names. We need `:global()` selectors to override third-party library styles.

**5. React Component Inline Styles** (No changes):

```jsx
/* AnimatedHero.tsx - PRESERVE ENTIRELY */
<style>{`
  .animated-hero { /* ... */ }
  .animated-word { /* ... */ }
  @keyframes wordFadeIn { /* ... */ }
`}</style>

/* AnimatedBrand.tsx - PRESERVE ENTIRELY */
<style>{`
  .animated-brand { /* ... */ }
  .cursor { /* ... */ }
  @keyframes blink { /* ... */ }
`}</style>
```

**Rationale**: These inline styles are scoped to React components and include animations. Migration to Tailwind would provide no benefit and increase complexity.

---

### Visual Regression Prevention

#### Baseline Capture Strategy

**Viewport Sizes**:
1. Mobile: 375px width (iPhone SE)
2. Tablet: 768px width (iPad portrait)
3. Desktop: 1440px width (standard laptop)

**Pages to Capture**:
- Homepage (/)
- Features (/features)
- Get Started (/get-started)
- Docs (/docs)
- Use Cases (/use-cases)

**States to Capture**:
- Default state
- Hover states (buttons, links, cards)
- Focus states (keyboard navigation)
- Active states (button pressed)
- Mobile menu open/closed (mobile viewport)
- Animations in progress (hero, brand cycling)

**Capture Method**:
1. Start dev server: `npm run dev`
2. Open browser DevTools
3. Set viewport to each size
4. Take full-page screenshots
5. Capture interactive states via DevTools screenshot tool
6. Record animation sequences (screen recording if needed)

**Storage**:
- Create `/features/003-convert-component-scoped-css-to-tailwind-utility-classes/screenshots/baseline/` directory
- Organize by page and viewport: `homepage-mobile.png`, `homepage-tablet.png`, etc.
- Save hover/focus states: `homepage-desktop-button-hover.png`

#### Comparison Methodology

**After Each Component Conversion**:
1. Rebuild site: `npm run dev` (hot reload)
2. Navigate to affected pages
3. Take screenshots at same viewport sizes
4. Compare side-by-side with baseline

**Comparison Tools**:
- Browser DevTools overlay (opacity adjustment)
- Manual pixel comparison for critical elements
- Visual inspection checklist (see below)

**Verification Checklist**:
- [ ] Spacing matches exactly (padding, margin, gap)
- [ ] Colors match exactly (text, background, borders)
- [ ] Typography matches (font size, weight, line height)
- [ ] Border radius matches
- [ ] Shadows match
- [ ] Hover states identical
- [ ] Focus states visible and identical
- [ ] Animations function identically
- [ ] Responsive breakpoints trigger correctly
- [ ] No layout shifts

**Acceptable Differences**:
- Sub-pixel rendering differences (<1px)
- Browser font rendering variations
- Anti-aliasing differences

**Unacceptable Differences** (must fix before proceeding):
- Any spacing change ≥2px
- Color mismatches
- Missing interactive states
- Broken animations
- Layout shifts
- Missing content

---

### File-by-File Conversion Plan

#### Phase 1: Simple Components (Validation)

**Purpose**: Validate conversion approach on low-risk components

---

**1. Button.astro**

**Current CSS**: ~100 lines (lines 30-130)

**Complexity**: Low

**Risk**: Low

**Conversion Approach**:
- Base styles → utilities: `inline-flex items-center justify-center gap-2`
- Variants → conditional classes via `class:list`
- Size variants → direct utilities: `px-4 py-2` (sm), `px-6 py-3` (md), `px-8 py-4` (lg)
- Hover states → `hover:` variant
- Focus states → `focus-visible:` variant

**Preserved Patterns**: None (all converts cleanly)

**Before** (scoped CSS):
```css
.button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background-color: var(--color-accent);
  /* ... */
}
```

**After** (Tailwind utilities):
```astro
<button
  class="inline-flex items-center justify-center gap-2 px-6 py-3
         bg-[var(--color-accent)] text-white font-semibold rounded-lg
         transition-all duration-[var(--duration-fast)]
         hover:bg-[rgba(217,119,87,0.9)] hover:-translate-y-px
         hover:shadow-[0_4px_12px_rgba(217,119,87,0.2)]
         active:translate-y-0
         focus-visible:outline-2 focus-visible:outline-[var(--color-accent)]
         disabled:opacity-50 disabled:cursor-not-allowed
         motion-reduce:transition-none motion-reduce:hover:transform-none"
>
  <slot />
</button>
```

**Expected Challenges**:
- Managing long class lists (readability)
- Conditional variant logic

**Mitigation**:
- Group related utilities with newlines for readability
- Use `class:list` for dynamic variants

**Testing Focus**: Verify all 3 variants (primary, secondary, ghost) and 3 sizes render identically

---

**2. FeatureCard.astro**

**Current CSS**: ~100 lines (lines 63-162)

**Complexity**: Low-Medium

**Risk**: Low

**Conversion Approach**:
- Card container → `flex flex-col gap-[var(--spacing-md)] p-[var(--spacing-lg)]`
- Border/background → `bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl`
- Icon container → `flex items-center justify-center w-12 h-12 bg-[rgba(217,119,87,0.1)] rounded-xl`
- Hover effects → `hover:border-[var(--color-accent)] hover:-translate-y-0.5`
- Responsive → `sm:p-[var(--spacing-md)]`

**Preserved Patterns**: None

**Before**:
```css
.feature-card {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
  padding: var(--spacing-lg);
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 0.75rem;
}
```

**After**:
```astro
<div
  class="flex flex-col gap-[var(--spacing-md)] p-[var(--spacing-lg)]
         bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl
         transition-all duration-[var(--duration-fast)]
         hover:border-[var(--color-accent)] hover:-translate-y-0.5
         hover:shadow-[0_4px_16px_rgba(217,119,87,0.1)]
         motion-reduce:transition-none motion-reduce:hover:transform-none
         sm:p-[var(--spacing-md)]"
>
```

**Expected Challenges**: Icon styling with alpha backgrounds

**Mitigation**: Use arbitrary rgba values

**Testing Focus**: Verify hover shadow and transform effects

---

**3. ScenarioCard.astro**

**Current CSS**: ~130 lines (lines 78-209)

**Complexity**: Low-Medium

**Risk**: Low

**Conversion Approach**:
- Similar to FeatureCard (validate pattern consistency)
- Persona badge → `inline-block w-fit px-3 py-1.5 bg-[rgba(217,119,87,0.1)]`
- Outcome section → `flex items-start gap-2 pt-[var(--spacing-sm)]`
- Arrow positioning → `absolute top-[var(--spacing-lg)] right-[var(--spacing-lg)]`
- Hover arrow → `group-hover:translate-x-1` (using group utility)

**Preserved Patterns**: None

**Expected Challenges**: Positioning arrow in top-right corner

**Mitigation**: Use `relative` on card, `absolute` on arrow with `group` for hover

**Testing Focus**: Verify arrow slides on hover, persona badge styling

---

#### Phase 2: Layout Components

**Purpose**: Convert structural layout components (higher complexity)

---

**4. Footer.astro**

**Current CSS**: ~145 lines (lines 102-248)

**Complexity**: Medium

**Risk**: Medium

**Conversion Approach**:
- Grid layout → `grid grid-cols-[2fr_repeat(3,1fr)] gap-[var(--spacing-xl)]`
- Brand column → `flex flex-col gap-[var(--spacing-sm)]`
- Link columns → `flex flex-col gap-3`
- Bottom section → `flex justify-between items-center flex-wrap gap-[var(--spacing-sm)]`
- Responsive → `md:grid-cols-1 md:gap-[var(--spacing-lg)]`

**Preserved Patterns**: None

**Before**:
```css
.footer-grid {
  display: grid;
  grid-template-columns: 2fr repeat(3, 1fr);
  gap: var(--spacing-xl);
}

@media (max-width: 768px) {
  .footer-grid {
    grid-template-columns: 1fr;
  }
}
```

**After**:
```astro
<div
  class="grid grid-cols-[2fr_repeat(3,1fr)] gap-[var(--spacing-xl)]
         pb-[var(--spacing-lg)] mb-[var(--spacing-lg)]
         border-b border-[var(--color-border)]
         md:grid-cols-1 md:gap-[var(--spacing-lg)]"
>
```

**Expected Challenges**:
- Complex grid template with mixed column sizes
- Responsive grid collapse

**Mitigation**:
- Use arbitrary grid syntax for desktop
- Override with single column on mobile

**Testing Focus**: Verify 4-column desktop layout collapses to single column at 768px

---

**5. Header.astro**

**Current CSS**: ~230 lines (lines 122-351)

**Complexity**: High

**Risk**: High

**Conversion Approach**:
- Sticky header → `sticky top-0 z-[99999] bg-[var(--color-background)] border-b border-[var(--color-border)]`
- Nav container → `w-full`
- Nav content → `max-w-[var(--content-max-width)] mx-auto px-[var(--spacing-site-margin)] h-[var(--nav-height)] flex items-center gap-[var(--spacing-lg)]`
- Nav links → `flex items-center gap-[var(--spacing-md)] ml-auto`
- Desktop/mobile toggle → `md:hidden` / `hidden md:block`

**Preserved Patterns**:
- Hamburger menu animations (::before, ::after pseudo-elements)
- Active link underline (::after pseudo-element with content)

**CSS to PRESERVE**:
```css
/* KEEP - Pseudo-elements with content */
.hamburger::before,
.hamburger::after {
  content: '';
  position: absolute;
  width: 24px;
  height: 2px;
  background-color: var(--color-primary);
  transition: transform 0.3s ease;
}

.mobile-menu-toggle[aria-expanded="true"] .hamburger::before {
  transform: rotate(45deg) translate(5px, 5px);
}

.nav-link-active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2px;
  background-color: var(--color-accent);
}
```

**Before** (layout):
```css
.nav-content {
  margin: 0 auto;
  padding: 0 var(--spacing-site-margin);
  height: var(--nav-height);
  display: flex;
  align-items: center;
  gap: var(--spacing-lg);
}
```

**After** (layout):
```astro
<div
  class="mx-auto px-[var(--spacing-site-margin)] h-[var(--nav-height)]
         flex items-center gap-[var(--spacing-lg)]
         md:h-[var(--nav-height-mobile)] md:gap-[var(--spacing-sm)]"
>
```

**Expected Challenges**:
- Managing desktop/mobile visibility toggles
- Preserving hamburger animation complexity
- Mobile menu positioning (fixed overlay)

**Mitigation**:
- Keep animation CSS in `<style>` block with clear comments
- Use responsive display utilities (`hidden md:flex`)
- Test thoroughly at 768px breakpoint

**Testing Focus**:
- Desktop navigation displays correctly
- Mobile hamburger button visible at <768px
- Hamburger animation transforms smoothly
- Mobile menu opens/closes properly
- Active link underline displays

---

#### Phase 3: Page Components

**Purpose**: Convert page-level layout components

---

**6. index.astro (Homepage)**

**Current CSS**: ~400 lines (estimated)

**Complexity**: High

**Risk**: Medium

**Conversion Approach**:
- Hero section → `relative overflow-hidden py-[var(--spacing-section-xl)]`
- Content containers → `content-max` (keep global utility class)
- Section spacing → Use existing utility classes: `section-spacing-xl`, `section-spacing-lg`
- Grid layouts → `grid grid-cols-2 gap-8 md:grid-cols-1`
- Problem/solution cards → Similar to FeatureCard pattern
- Workflow section → `relative` positioning for background image
- Metrics grid → `grid grid-cols-3 gap-6 md:grid-cols-1`

**Preserved Patterns**: None (AnimatedHero component handles its own animations)

**Expected Challenges**:
- Multiple complex sections with different layouts
- Background decorative images (tracks.svg, orchestration.svg)

**Mitigation**:
- Convert section-by-section
- Keep decorative images with `absolute` positioning

**Testing Focus**:
- Hero section layout and spacing
- Problem/solution grid at mobile/desktop
- Workflow section background image positioning
- Metrics section responsive behavior

---

**7. features.astro**

**Current CSS**: ~200 lines (estimated)

**Complexity**: Medium

**Risk**: Medium

**Conversion Approach**:
- Feature grid → `grid grid-cols-3 gap-8 md:grid-cols-1 sm:grid-cols-1`
- Section headers → `text-center max-w-3xl mx-auto mb-16`
- Feature cards use FeatureCard.astro (already converted in Phase 1)

**Preserved Patterns**: None

**Expected Challenges**: Complex responsive grid

**Mitigation**: Test grid at all breakpoints

**Testing Focus**: 3-column desktop → 1-column mobile transition

---

**8. get-started.astro**

**Current CSS**: ~150 lines (estimated)

**Complexity**: Medium

**Risk**: Low

**Conversion Approach**:
- Step containers → `flex flex-col gap-8`
- Step numbers → `flex items-center justify-center w-12 h-12 rounded-full bg-[var(--color-accent)]`
- Code examples use CodeBlock.astro (convert in Phase 4)

**Preserved Patterns**: None

**Expected Challenges**: Step number circle styling

**Mitigation**: Use fixed width/height with flexbox centering

**Testing Focus**: Step progression visual hierarchy

---

**9. docs.astro**

**Current CSS**: ~100 lines (estimated)

**Complexity**: Low-Medium

**Risk**: Low

**Conversion Approach**:
- Documentation layout → `max-w-4xl mx-auto px-[var(--spacing-site-margin)]`
- Heading styles → `text-[var(--font-size-display-l)] font-bold mb-4`
- Text content → `text-[var(--font-size-paragraph-m)] text-[var(--color-secondary)]`

**Preserved Patterns**: None

**Expected Challenges**: Minimal (mostly text layout)

**Mitigation**: N/A

**Testing Focus**: Typography hierarchy, reading line length

---

**10. use-cases.astro**

**Current CSS**: ~150 lines (estimated)

**Complexity**: Medium

**Risk**: Low

**Conversion Approach**:
- Scenario grid → Similar to features page
- Scenario cards use ScenarioCard.astro (already converted in Phase 1)

**Preserved Patterns**: None

**Expected Challenges**: Minimal (uses existing card components)

**Mitigation**: N/A

**Testing Focus**: Grid responsive behavior

---

#### Phase 4: Special Cases

---

**11. CodeBlock.astro**

**Current CSS**: ~80 lines (lines 51-131)

**Complexity**: Medium

**Risk**: Medium

**Conversion Approach**:
- Container → `bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg overflow-hidden`
- Header → `flex items-center justify-between px-4 py-3 bg-[var(--color-background)] border-b border-[var(--color-border)]`
- Content → `overflow-x-auto`

**Preserved Patterns**:
- Shiki global overrides (`:global()` selectors)
- WebKit scrollbar styling

**CSS to PRESERVE**:
```css
/* KEEP - Shiki overrides */
.code-block-content :global(.shiki-pre) {
  margin: 0;
  padding: 1rem;
  background-color: var(--color-surface) !important;
  font-size: 0.875rem;
  line-height: 1.5;
  overflow-x: auto;
}

.code-block-content :global(.shiki-code) {
  display: block;
  font-family: "Fira Code", "SF Mono", Monaco, "Cascadia Code", "Roboto Mono", Consolas, monospace;
  font-weight: 500;
}

/* KEEP - Scrollbar styling */
.code-block-content::-webkit-scrollbar {
  height: 8px;
}

.code-block-content::-webkit-scrollbar-track {
  background-color: var(--color-background);
}

.code-block-content::-webkit-scrollbar-thumb {
  background-color: var(--color-border);
  border-radius: 4px;
}

.code-block-content::-webkit-scrollbar-thumb:hover {
  background-color: var(--color-secondary);
}
```

**Expected Challenges**:
- Third-party library style overrides
- Browser-specific pseudo-elements

**Mitigation**:
- Keep minimal `<style>` block for preserved patterns
- Convert only container and header styles to utilities

**Testing Focus**:
- Syntax highlighting displays correctly
- Scrollbar appears and functions on overflow
- Code font rendering

---

#### Phase 5: Cleanup

---

**12. mobile-menu.css**

**Current State**: Already empty (1 line: `/* Empty - no longer used */`)

**Action**: Delete file

**Risk**: None

**Command**: `rm src/styles/mobile-menu.css`

**Remove import** (if any): Search for imports of this file and remove

**Testing Focus**: Ensure no broken imports after deletion

---

## Phase 2: Implementation Sequence

### Stage 1: Setup and Validation Tools

**Purpose**: Establish baseline and validation methodology

---

**T001: Set up baseline screenshot capture**

**Objective**: Capture pixel-perfect baseline screenshots for visual regression testing

**Steps**:
1. Create directory: `/features/003-convert-component-scoped-css-to-tailwind-utility-classes/screenshots/baseline/`
2. Start dev server: `npm run dev`
3. For each page (/, /features, /get-started, /docs, /use-cases):
   - Set viewport to 375px width (mobile)
   - Take full-page screenshot → save as `{page}-mobile.png`
   - Set viewport to 768px width (tablet)
   - Take full-page screenshot → save as `{page}-tablet.png`
   - Set viewport to 1440px width (desktop)
   - Take full-page screenshot → save as `{page}-desktop.png`
4. Capture interactive states:
   - Button hover states
   - Focus states (keyboard navigation)
   - Mobile menu open state
5. Document animation baselines:
   - Record AnimatedBrand cycling through commands
   - Record AnimatedHero word fade-in

**Acceptance Criteria**:
- [ ] 15 baseline screenshots captured (5 pages × 3 viewports)
- [ ] Interactive state screenshots captured
- [ ] Animation behavior documented
- [ ] All screenshots stored in baseline directory

**Estimated Time**: 30 minutes

---

**T002: Create visual comparison checklist**

**Objective**: Document validation process for each component conversion

**Steps**:
1. Create `/features/003-convert-component-scoped-css-to-tailwind-utility-classes/validation-checklist.md`
2. Include verification items for:
   - Spacing accuracy
   - Color matching
   - Typography consistency
   - Interactive states
   - Animations
   - Responsive behavior
3. Create per-component checklist template

**Acceptance Criteria**:
- [ ] validation-checklist.md created
- [ ] Template includes all verification categories
- [ ] Checklist ready for use in Stage 2

**Estimated Time**: 15 minutes

---

### Stage 2: Phase 1 Components (Simple)

**Purpose**: Convert and validate simple components to establish pattern

---

**T003: Convert Button.astro**

**Objective**: Replace scoped CSS with Tailwind utilities in Button component

**Steps**:
1. Read current Button.astro implementation
2. Identify all CSS properties to convert
3. Map CSS to Tailwind utilities:
   - Base styles → flex, items-center, etc.
   - Size variants → px-*, py-* utilities
   - Color variants → bg-*, text-*, border-*
   - Interactive states → hover:, focus-visible:, active:, disabled:
   - Reduced motion → motion-reduce:
4. Update component markup with utility classes
5. Use `class:list` for dynamic variant classes
6. Remove `<style>` block (should be empty after conversion)
7. Test all variants and sizes locally

**Acceptance Criteria**:
- [ ] All CSS converted to utilities
- [ ] `<style>` block removed
- [ ] 3 variants work (primary, secondary, ghost)
- [ ] 3 sizes work (sm, md, lg)
- [ ] Hover/focus/active states function
- [ ] Disabled state displays correctly
- [ ] Reduced motion respected
- [ ] Component renders without errors

**Estimated Time**: 45 minutes

---

**T004: Validate Button.astro (visual regression check)**

**Objective**: Ensure Button component matches baseline exactly

**Steps**:
1. Build site: `npm run dev`
2. Navigate to pages using Button component
3. Take screenshots at 375px, 768px, 1440px
4. Compare side-by-side with baseline
5. Run through validation checklist:
   - [ ] Spacing matches
   - [ ] Colors match
   - [ ] Typography matches
   - [ ] Hover states identical
   - [ ] Focus states visible
   - [ ] Active states function
   - [ ] Disabled states match
   - [ ] Responsive behavior correct
6. Test keyboard navigation
7. Test reduced motion preference

**Acceptance Criteria**:
- [ ] Visual regression: 0 pixel differences >2px
- [ ] All validation checklist items pass
- [ ] Keyboard navigation works
- [ ] Reduced motion tested and working

**Estimated Time**: 20 minutes

---

**T005: Convert FeatureCard.astro**

**Objective**: Replace scoped CSS with Tailwind utilities in FeatureCard component

**Steps**:
1. Read current FeatureCard.astro implementation
2. Map CSS to utilities:
   - Card container → flex flex-col, gap, padding, border, rounded
   - Icon container → flex, sizing, background, rounded
   - Content → flex flex-col, gap
   - Title/description → typography utilities
   - Metric badge → inline-flex, padding, background, rounded
   - Hover effects → hover: variant
   - Responsive → sm: variant
3. Update component markup
4. Remove `<style>` block
5. Test with different props (icon, metric variations)

**Acceptance Criteria**:
- [ ] All CSS converted
- [ ] `<style>` block removed
- [ ] Card with icon renders correctly
- [ ] Card with metric badge renders correctly
- [ ] Card without icon/metric renders correctly
- [ ] Hover effects work
- [ ] Mobile adjustments apply at 640px

**Estimated Time**: 45 minutes

---

**T006: Validate FeatureCard.astro**

**Objective**: Ensure FeatureCard matches baseline

**Steps**:
1. Navigate to /features page (uses FeatureCard)
2. Take screenshots at all viewports
3. Compare with baseline
4. Validate checklist:
   - [ ] Card spacing matches
   - [ ] Border and shadows match
   - [ ] Icon container styling correct
   - [ ] Hover effects identical
   - [ ] Transform on hover matches
   - [ ] Responsive padding at 640px
5. Test all variant combinations

**Acceptance Criteria**:
- [ ] Visual regression: 0 differences
- [ ] Validation checklist passes
- [ ] All prop variations tested

**Estimated Time**: 20 minutes

---

**T007: Convert ScenarioCard.astro**

**Objective**: Replace scoped CSS with Tailwind utilities in ScenarioCard component

**Steps**:
1. Read current ScenarioCard.astro
2. Map CSS to utilities (similar to FeatureCard):
   - Card container with position relative
   - Persona badge → inline-block, w-fit, padding, background
   - Outcome section → flex items-start, gap
   - Outcome icon → flex-shrink-0, color
   - Arrow (for link variant) → absolute positioning
   - Hover arrow translate → group/group-hover pattern
3. Update component markup
4. Remove `<style>` block
5. Test link variant vs non-link variant

**Acceptance Criteria**:
- [ ] All CSS converted
- [ ] `<style>` block removed
- [ ] Persona badge displays correctly
- [ ] Outcome section renders properly
- [ ] Arrow positioning works (link variant)
- [ ] Hover arrow translate functions
- [ ] Non-link variant displays correctly

**Estimated Time**: 45 minutes

---

**T008: Validate ScenarioCard.astro**

**Objective**: Ensure ScenarioCard matches baseline

**Steps**:
1. Navigate to /use-cases page (uses ScenarioCard)
2. Take screenshots at all viewports
3. Validate:
   - [ ] Card spacing and borders match
   - [ ] Persona badge styling correct
   - [ ] Outcome icon color matches
   - [ ] Arrow positioning correct (top-right)
   - [ ] Arrow slides on hover
   - [ ] Hover border color change works
4. Test both link and non-link variants

**Acceptance Criteria**:
- [ ] Visual regression: 0 differences
- [ ] Validation checklist passes
- [ ] Both variants tested

**Estimated Time**: 20 minutes

---

### Stage 3: Phase 2 Components (Layout)

**Purpose**: Convert structural layout components

---

**T009: Convert Footer.astro**

**Objective**: Replace scoped CSS with Tailwind utilities in Footer component

**Steps**:
1. Read current Footer.astro
2. Map CSS to utilities:
   - Footer container → background, border-top, padding-block
   - Footer content → max-width, margin, padding-inline
   - Footer grid → grid grid-cols-[2fr_repeat(3,1fr)], gap
   - Brand column → flex flex-col, gap
   - Link columns → flex flex-col, gap
   - Footer links list → flex flex-col, gap
   - Footer bottom → flex justify-between, flex-wrap
   - Responsive → md:grid-cols-1, md:gap
3. Update component markup
4. Remove `<style>` block
5. Test desktop 4-column and mobile 1-column layouts

**Acceptance Criteria**:
- [ ] All CSS converted
- [ ] `<style>` block removed
- [ ] Desktop 4-column grid works
- [ ] Mobile collapses to 1 column at 768px
- [ ] Brand column styling correct
- [ ] Link hover states work
- [ ] Footer bottom flex layout works

**Estimated Time**: 1 hour

---

**T010: Validate Footer.astro**

**Objective**: Ensure Footer matches baseline

**Steps**:
1. Check Footer on all pages (consistent across site)
2. Take screenshots at all viewports
3. Validate:
   - [ ] Grid layout correct at desktop (4 columns)
   - [ ] Grid collapses at 768px (1 column)
   - [ ] Brand column spacing matches
   - [ ] Link column spacing matches
   - [ ] Footer bottom alignment correct
   - [ ] External link icons display
   - [ ] Hover states on links work
4. Test responsive transition at 768px breakpoint

**Acceptance Criteria**:
- [ ] Visual regression: 0 differences
- [ ] Validation checklist passes
- [ ] Grid responsive behavior correct

**Estimated Time**: 20 minutes

---

**T011: Convert Header.astro (preserve hamburger animation CSS)**

**Objective**: Replace scoped CSS with Tailwind utilities while preserving animation CSS

**Steps**:
1. Read current Header.astro
2. Identify CSS to PRESERVE:
   - `.hamburger::before` and `.hamburger::after` (pseudo-elements with content)
   - `.mobile-menu-toggle[aria-expanded="true"]` transforms
   - `.nav-link-active::after` (pseudo-element underline)
3. Map convertible CSS to utilities:
   - Header → sticky top-0, z-index, background, border-bottom
   - Nav container → width
   - Nav content → max-width, margin, padding, height, flex, items-center, gap
   - Logo → font-size, font-weight, color
   - Nav links → flex, items-center, gap, ml-auto
   - Nav link → color, font-size, font-weight, transition, position, padding
   - GitHub link → flex, items-center, gap, padding, border, rounded
   - Mobile menu toggle → display utilities
   - Mobile menu → fixed positioning, background, z-index, overflow, padding
   - Desktop/mobile visibility → hidden, md:flex, md:hidden
4. Update component markup with utilities
5. Keep minimal `<style>` block with:
   - Hamburger pseudo-element animations
   - Nav link active underline
   - Add comments explaining preserved CSS
6. Test desktop navigation
7. Test mobile menu toggle
8. Test hamburger animation

**Acceptance Criteria**:
- [ ] Layout CSS converted to utilities
- [ ] Hamburger animation CSS preserved in `<style>`
- [ ] Active link underline CSS preserved
- [ ] Desktop navigation displays correctly
- [ ] Mobile hamburger visible at <768px
- [ ] Mobile menu opens/closes
- [ ] Hamburger transforms smoothly
- [ ] Active link indicator displays

**Estimated Time**: 1.5 hours

---

**T012: Validate Header.astro**

**Objective**: Ensure Header matches baseline and animations work

**Steps**:
1. Check Header on all pages
2. Take screenshots at all viewports
3. Desktop validation:
   - [ ] Logo displays correctly
   - [ ] Nav links aligned properly
   - [ ] GitHub link styling matches
   - [ ] Hover states work on nav links
   - [ ] Active page indicator displays
   - [ ] Focus states visible
4. Mobile validation (<768px):
   - [ ] Desktop nav hidden
   - [ ] Hamburger button visible
   - [ ] Hamburger icon renders correctly
   - [ ] Click hamburger → menu opens
   - [ ] Hamburger animates to X
   - [ ] Click again → menu closes
   - [ ] Hamburger animates back to lines
   - [ ] Mobile menu positioning correct
   - [ ] Mobile menu links functional
5. Test at exact 768px breakpoint (transition point)

**Acceptance Criteria**:
- [ ] Visual regression: 0 differences
- [ ] Validation checklist passes
- [ ] Hamburger animation smooth and correct
- [ ] Mobile menu functions properly
- [ ] Breakpoint transition clean

**Estimated Time**: 30 minutes

---

### Stage 4: Phase 3 Components (Pages)

**Purpose**: Convert page-level components

---

**T013: Convert index.astro (Homepage)**

**Objective**: Replace scoped CSS with Tailwind utilities in homepage

**Steps**:
1. Read current index.astro
2. Identify sections:
   - Hero section
   - Problem-Solution section
   - Workflow section
   - Features section
   - Metrics section
   - CTA section
3. For each section, map CSS to utilities:
   - Section containers → position, overflow, padding-block
   - Content wrappers → use global `content-max` utility
   - Background images → absolute positioning
   - Grids → grid grid-cols-*, gap, responsive variants
   - Cards → utilize existing card components (already converted)
   - Typography → text-*, font-*, leading-*
4. Update section markup
5. Remove `<style>` block (or keep minimal if needed)
6. Test each section individually

**Acceptance Criteria**:
- [ ] Hero section converted and functional
- [ ] Problem-Solution grid works
- [ ] Workflow section background positioned correctly
- [ ] Features grid responsive
- [ ] Metrics section layout correct
- [ ] CTA section styling matches
- [ ] AnimatedHero component works (no changes needed)

**Estimated Time**: 2 hours

---

**T014: Validate index.astro**

**Objective**: Ensure homepage matches baseline

**Steps**:
1. Navigate to homepage (/)
2. Take screenshots at all viewports
3. Validate each section:
   - [ ] Hero spacing and typography match
   - [ ] Background tracks.svg positioned correctly
   - [ ] AnimatedHero word animation works
   - [ ] Problem/Solution cards side-by-side desktop
   - [ ] Problem/Solution stacked on mobile
   - [ ] Workflow background orchestration.svg correct
   - [ ] Features grid 3-column → 1-column
   - [ ] Metrics grid responsive
   - [ ] CTA section centered and styled
4. Scroll through entire page checking for layout shifts
5. Test all interactive elements (buttons, links)

**Acceptance Criteria**:
- [ ] Visual regression: 0 differences
- [ ] All sections validated
- [ ] No layout shifts on scroll
- [ ] Interactive elements functional

**Estimated Time**: 30 minutes

---

**T015: Convert features.astro**

**Objective**: Replace scoped CSS with Tailwind utilities in features page

**Steps**:
1. Read current features.astro
2. Map CSS to utilities:
   - Section headers → text-center, max-w-3xl, mx-auto, mb-16
   - Feature grid → grid grid-cols-3, gap, md:grid-cols-1
   - Feature cards use FeatureCard.astro (already converted)
3. Update markup
4. Remove `<style>` block

**Acceptance Criteria**:
- [ ] Section headers centered and styled
- [ ] Feature grid 3-column desktop
- [ ] Feature grid 1-column mobile
- [ ] FeatureCard components render correctly

**Estimated Time**: 45 minutes

---

**T016: Validate features.astro**

**Objective**: Ensure features page matches baseline

**Steps**:
1. Navigate to /features
2. Take screenshots at all viewports
3. Validate:
   - [ ] Section header typography matches
   - [ ] Grid layout correct at all breakpoints
   - [ ] Feature cards display properly
   - [ ] Hover effects on cards work
4. Test grid transition at 768px

**Acceptance Criteria**:
- [ ] Visual regression: 0 differences
- [ ] Grid responsive behavior correct

**Estimated Time**: 15 minutes

---

**T017: Convert get-started.astro**

**Objective**: Replace scoped CSS with Tailwind utilities in get-started page

**Steps**:
1. Read current get-started.astro
2. Map CSS to utilities:
   - Step containers → flex flex-col, gap
   - Step numbers → flex, items-center, justify-center, w-12, h-12, rounded-full
   - Step content → flex-1, typography utilities
   - Code blocks use CodeBlock.astro (convert in T023)
3. Update markup
4. Remove `<style>` block

**Acceptance Criteria**:
- [ ] Step progression layout correct
- [ ] Step numbers circular and styled
- [ ] Step content typography matches
- [ ] CodeBlock components display (validation in T024)

**Estimated Time**: 45 minutes

---

**T018: Validate get-started.astro**

**Objective**: Ensure get-started page matches baseline

**Steps**:
1. Navigate to /get-started
2. Take screenshots at all viewports
3. Validate:
   - [ ] Step containers spacing correct
   - [ ] Step numbers circular and centered
   - [ ] Typography hierarchy matches
   - [ ] Code blocks render (full validation in T024)

**Acceptance Criteria**:
- [ ] Visual regression: 0 differences
- [ ] Step layout correct

**Estimated Time**: 15 minutes

---

**T019: Convert docs.astro**

**Objective**: Replace scoped CSS with Tailwind utilities in docs page

**Steps**:
1. Read current docs.astro
2. Map CSS to utilities:
   - Documentation container → max-w-4xl, mx-auto, px-*
   - Headings → text-*, font-*, mb-*
   - Paragraphs → text-*, text-*, leading-*
   - Lists → ml-*, space-y-*
3. Update markup
4. Remove `<style>` block

**Acceptance Criteria**:
- [ ] Documentation layout correct
- [ ] Typography hierarchy matches
- [ ] Reading line length appropriate
- [ ] Content spacing matches

**Estimated Time**: 30 minutes

---

**T020: Validate docs.astro**

**Objective**: Ensure docs page matches baseline

**Steps**:
1. Navigate to /docs
2. Take screenshots at all viewports
3. Validate:
   - [ ] Container max-width correct
   - [ ] Heading typography matches
   - [ ] Paragraph spacing and sizing correct
   - [ ] List formatting matches

**Acceptance Criteria**:
- [ ] Visual regression: 0 differences
- [ ] Typography validated

**Estimated Time**: 15 minutes

---

**T021: Convert use-cases.astro**

**Objective**: Replace scoped CSS with Tailwind utilities in use-cases page

**Steps**:
1. Read current use-cases.astro
2. Map CSS to utilities:
   - Section headers → similar to features.astro
   - Scenario grid → grid grid-cols-*, gap, md:grid-cols-1
   - Scenario cards use ScenarioCard.astro (already converted)
3. Update markup
4. Remove `<style>` block

**Acceptance Criteria**:
- [ ] Section headers styled correctly
- [ ] Scenario grid responsive
- [ ] ScenarioCard components render properly

**Estimated Time**: 45 minutes

---

**T022: Validate use-cases.astro**

**Objective**: Ensure use-cases page matches baseline

**Steps**:
1. Navigate to /use-cases
2. Take screenshots at all viewports
3. Validate:
   - [ ] Grid layout correct
   - [ ] Scenario cards display properly
   - [ ] Responsive behavior matches

**Acceptance Criteria**:
- [ ] Visual regression: 0 differences
- [ ] Grid validated

**Estimated Time**: 15 minutes

---

### Stage 5: Phase 4 Special Cases

**Purpose**: Convert components with preserved CSS patterns

---

**T023: Convert CodeBlock.astro (preserve Shiki overrides)**

**Objective**: Replace scoped CSS with Tailwind utilities while preserving Shiki and scrollbar CSS

**Steps**:
1. Read current CodeBlock.astro
2. Identify CSS to PRESERVE:
   - `:global(.shiki-pre)` styles
   - `:global(.shiki-code)` styles
   - `::-webkit-scrollbar*` pseudo-elements
3. Map convertible CSS to utilities:
   - Code block container → bg-*, border, rounded-lg, overflow-hidden
   - Header → flex, items-center, justify-between, px-4, py-3, bg-*, border-b
   - Title → text-sm, font-semibold
   - Lang badge → text-xs, font-medium, uppercase, tracking-wide
   - Content container → overflow-x-auto
4. Update markup
5. Keep minimal `<style>` block with:
   - Shiki global overrides
   - Scrollbar styling
   - Add comments explaining preserved patterns
6. Test with various code examples
7. Test horizontal scrolling on long code lines

**Acceptance Criteria**:
- [ ] Container CSS converted to utilities
- [ ] Header CSS converted to utilities
- [ ] Shiki overrides preserved in `<style>`
- [ ] Scrollbar styling preserved in `<style>`
- [ ] Syntax highlighting works correctly
- [ ] Scrollbar appears on overflow
- [ ] Scrollbar styling matches baseline

**Estimated Time**: 1 hour

---

**T024: Validate CodeBlock.astro**

**Objective**: Ensure CodeBlock matches baseline and Shiki works

**Steps**:
1. Navigate to pages with code blocks (/get-started, /docs)
2. Take screenshots at all viewports
3. Validate:
   - [ ] Container border and background match
   - [ ] Header layout and styling match
   - [ ] Title and language badge display correctly
   - [ ] Syntax highlighting works (colors correct)
   - [ ] Code font rendering matches
   - [ ] Long code lines trigger scrollbar
   - [ ] Scrollbar styling matches (WebKit browsers)
   - [ ] Scrollbar hover states work
4. Test with different languages (bash, typescript, etc.)

**Acceptance Criteria**:
- [ ] Visual regression: 0 differences
- [ ] Syntax highlighting functional
- [ ] Scrollbar validated

**Estimated Time**: 20 minutes

---

### Stage 6: Cleanup and Final Validation

**Purpose**: Remove legacy files and perform comprehensive validation

---

**T025: Delete mobile-menu.css file**

**Objective**: Remove unused CSS file

**Steps**:
1. Verify file is truly empty/unused: `cat src/styles/mobile-menu.css`
2. Search for any imports of this file: `grep -r "mobile-menu.css" src/`
3. If imports found, remove them
4. Delete file: `rm src/styles/mobile-menu.css`
5. Rebuild site: `npm run dev`
6. Verify no build errors
7. Test mobile menu still functions

**Acceptance Criteria**:
- [ ] File deleted
- [ ] All imports removed (if any)
- [ ] Site builds without errors
- [ ] Mobile menu functions normally

**Estimated Time**: 15 minutes

---

**T026: Final visual regression test across all pages**

**Objective**: Comprehensive validation of entire site

**Steps**:
1. Rebuild site: `npm run build && npm run dev`
2. For each page (/, /features, /get-started, /docs, /use-cases):
   - Take screenshots at 375px, 768px, 1440px
   - Compare with baseline screenshots
   - Document any differences
3. Test all interactive elements:
   - [ ] All buttons hover/focus/active states
   - [ ] All links hover states
   - [ ] Header navigation (desktop and mobile)
   - [ ] Hamburger menu animation
   - [ ] Mobile menu open/close
   - [ ] Card hover effects
   - [ ] AnimatedBrand cycling
   - [ ] AnimatedHero word fade-in
4. Test responsive behavior:
   - [ ] All breakpoints transition cleanly
   - [ ] No layout shifts
   - [ ] Content remains readable
5. Test accessibility:
   - [ ] Keyboard navigation works
   - [ ] Focus states visible
   - [ ] Reduced motion respected
6. Run Lighthouse audit:
   - [ ] Performance ≥95
   - [ ] Accessibility 100
   - [ ] Best Practices ≥95
   - [ ] SEO 100

**Acceptance Criteria**:
- [ ] 0 visual regressions across all pages
- [ ] All interactive elements validated
- [ ] All responsive breakpoints validated
- [ ] Accessibility validated
- [ ] Lighthouse scores meet/exceed baseline

**Estimated Time**: 1 hour

---

**T027: Update documentation**

**Objective**: Document the migration and utility patterns

**Steps**:
1. Update project README if needed (note: Tailwind-first approach)
2. Create `/docs/tailwind-patterns.md` documenting:
   - Common utility patterns used
   - Design token usage in utilities
   - Preserved CSS patterns and rationale
   - Examples of complex conversions
3. Update this feature's `spec.md` status to "Completed"
4. Document metrics:
   - Lines of CSS before/after
   - Utility adoption percentage
   - Bundle size impact

**Acceptance Criteria**:
- [ ] Documentation created
- [ ] Patterns documented
- [ ] Metrics recorded
- [ ] spec.md updated to "Completed"

**Estimated Time**: 30 minutes

---

## Validation Checklist

**For each component conversion**, verify:

### Visual Validation

- [ ] Desktop navigation works correctly (Header)
- [ ] Mobile hamburger menu opens/closes smoothly (Header)
- [ ] AnimatedBrand cycles through commands (/specswarm:init → :build → :fix → :ship)
- [ ] Hero word animation (wordFadeIn) displays correctly
- [ ] All hover states function properly (buttons, links, cards)
- [ ] Focus states visible for keyboard navigation (all interactive elements)
- [ ] Active states provide feedback (buttons)
- [ ] Responsive breakpoints work at 640px and 768px
- [ ] No layout shifts during responsive transitions
- [ ] All animations respect reduced motion preference

### Functional Validation

- [ ] All links navigate correctly
- [ ] All buttons trigger expected actions
- [ ] Mobile menu toggle works
- [ ] Keyboard navigation functional (Tab, Enter, Escape)
- [ ] Screen reader compatibility (no semantic changes)

### Code Quality Validation

- [ ] No `<style>` blocks remain (except preserved patterns)
- [ ] Utility classes organized and readable
- [ ] Design tokens used via `var(--token-name)` in arbitrary values
- [ ] Responsive variants applied correctly
- [ ] Accessibility variants applied (focus-visible, motion-reduce)
- [ ] No hardcoded color/spacing values (use tokens)

### Performance Validation

- [ ] Page loads without errors
- [ ] No console warnings
- [ ] CSS bundle size reduced or neutral
- [ ] Lighthouse performance ≥95
- [ ] First Contentful Paint <1.5s
- [ ] Largest Contentful Paint <2.5s

### Accessibility Validation

- [ ] Focus indicators visible (2px outline, 2px offset)
- [ ] Color contrast meets WCAG 2.1 AA (4.5:1 normal text, 3:1 large text)
- [ ] Touch targets ≥44x44px
- [ ] Reduced motion honored
- [ ] Semantic HTML unchanged
- [ ] ARIA attributes unchanged

---

## Success Metrics

### SC1: Code Quality Metrics

**Target**: CSS reduction ≥80%, utility adoption ≥95%

**Measurement**:
- Count total lines in `<style>` blocks before: ~1,800 lines
- Count total lines in `<style>` blocks after: <360 lines
- Calculate reduction percentage: (1800 - 360) / 1800 = 80%
- Count preserved CSS patterns: 6 patterns (keyframes, pseudo-elements, scrollbar)
- Verify all preserved patterns functional
- Verify 100% of convertible properties use Tailwind utilities

**Validation**:
```bash
# Count CSS lines before (baseline)
find src -name "*.astro" -exec grep -Pzo '<style>.*?</style>' {} \; | wc -l

# Count CSS lines after (target: <360 lines)
find src -name "*.astro" -exec grep -Pzo '<style>.*?</style>' {} \; | wc -l
```

**Success Criteria**:
- [ ] ≥80% CSS reduction achieved
- [ ] ≥95% utility adoption for convertible properties
- [ ] All 6 preserved patterns function correctly
- [ ] 100% design token compliance

---

### SC2: Visual Accuracy

**Target**: Pixel-perfect match at defined viewports

**Measurement**:
- Compare screenshots before/after at 375px, 768px, 1440px
- Document pixel differences (acceptable: <2px)
- Verify animation timing and behavior
- Validate interactive state visual feedback

**Validation**:
- Side-by-side screenshot comparison
- Manual pixel inspection of critical elements
- Animation behavior observation
- Interactive state testing

**Success Criteria**:
- [ ] 0 pixel differences >2px at all viewports
- [ ] All animations (hamburger, hero words, brand cycling) identical
- [ ] All interactive states (hover, focus, active) produce identical visual feedback
- [ ] Cross-browser consistency (Chrome, Firefox, Safari, Edge)

---

### SC3: Developer Experience

**Target**: Sub-30-second style modifications, sub-5-minute onboarding

**Measurement**:
- Time to change button padding (before: search style block, modify, save; after: edit class, save)
- Time for new developer to understand Header component styling
- Count of files needing modification for color changes (before: 10 components; after: 1 global.css)

**Validation**:
- Stopwatch test for common modifications
- User observation of new developer onboarding
- Code review efficiency measurement

**Success Criteria**:
- [ ] Style modifications complete in <30 seconds
- [ ] New developers understand component styling in <5 minutes
- [ ] 0 context switches between markup and style blocks
- [ ] Self-documenting utility class names aid comprehension

---

### SC4: Accessibility Compliance

**Target**: WCAG 2.1 AA compliance maintained

**Measurement**:
- Lighthouse accessibility score
- Manual keyboard navigation testing
- Reduced motion preference testing
- Color contrast validation
- Touch target size verification

**Validation**:
```bash
# Lighthouse accessibility audit
npm run build
lighthouse http://localhost:4321 --only-categories=accessibility

# Manual testing
# - Tab through all interactive elements
# - Verify focus indicators visible
# - Toggle prefers-reduced-motion in DevTools
# - Verify animations disabled
```

**Success Criteria**:
- [ ] Lighthouse accessibility score: 100
- [ ] All focus states visible and meet 3:1 contrast ratio
- [ ] All animations respect `prefers-reduced-motion: reduce`
- [ ] All touch targets ≥44x44px
- [ ] No semantic HTML changes
- [ ] No ARIA attribute changes

---

### SC5: Performance Maintenance

**Target**: Maintain Lighthouse ≥95, no bundle size increase

**Measurement**:
- Lighthouse performance score before/after
- CSS bundle size before/after
- First Contentful Paint (FCP) before/after
- Time to Interactive (TTI) before/after

**Validation**:
```bash
# Build and measure bundle size
npm run build
du -sh dist/

# Lighthouse performance audit
lighthouse http://localhost:4321 --only-categories=performance
```

**Success Criteria**:
- [ ] CSS bundle size reduced or neutral (no increase)
- [ ] Lighthouse performance score ≥95 (maintained or improved)
- [ ] FCP <1.5s (no regression)
- [ ] TTI <3.5s (no regression)

---

### SC6: Maintainability Improvements

**Target**: Single source of truth, improved searchability

**Measurement**:
- Count locations where `--color-accent` is used (should be 1: global.css)
- Count files requiring changes for spacing system update (before: 10; after: 1)
- Measure code review time for style changes (PR diff visibility)

**Validation**:
- Search codebase for color/spacing value usage
- Simulate design token change and count affected files
- Review sample PR with style changes

**Success Criteria**:
- [ ] All color values reference design tokens (100% compliance)
- [ ] All spacing values reference design tokens or Tailwind scale
- [ ] Style changes visible in markup diffs (no separate style block review)
- [ ] Refactoring safety: token changes propagate automatically

---

## Estimated Total Time

**Stage 1**: 45 minutes (setup and validation tools)
**Stage 2**: 3 hours 30 minutes (Phase 1 components)
**Stage 3**: 3 hours 20 minutes (Phase 2 components)
**Stage 4**: 6 hours 30 minutes (Phase 3 page components)
**Stage 5**: 1 hour 20 minutes (Phase 4 special cases)
**Stage 6**: 1 hour 45 minutes (cleanup and final validation)

**Total Estimated Time**: 16 hours 30 minutes

**Recommended Pace**: 2-3 components per day over 5-7 days for thorough validation

---

## Risk Mitigation

**High-Risk Components**: Header.astro (complex animations), index.astro (large scope)

**Mitigation Strategy**:
1. Validate approach on simple components first (Button, FeatureCard)
2. Take frequent screenshots during conversion
3. Keep `git stash` ready for quick rollback
4. Test incrementally (convert section, test, convert next section)
5. Preserve animations in CSS rather than forcing Tailwind conversion

**Rollback Plan**:
- Git branch per component conversion
- Ability to revert individual component if issues arise
- Baseline screenshots serve as acceptance criteria

**Testing Strategy**:
- Visual regression after each component
- Comprehensive validation after each phase
- Final validation before merge

---

## Notes

- This plan assumes existing design tokens are complete and immutable
- React component inline styles (AnimatedHero, AnimatedBrand) intentionally not converted
- Tailwind v4 arbitrary value syntax required: `bg-[var(--color-surface)]`
- No new dependencies required (Tailwind utilities only)
- All measurements baseline against current implementation
- Success depends on pixel-perfect visual regression validation

---

**Plan Version**: 1.0.0
**Created**: 2025-11-11
**Author**: Claude Code (SpecSwarm)
**Status**: Ready for Implementation
