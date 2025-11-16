# Tasks: Convert Component-Scoped CSS to Tailwind Utility Classes

**Feature**: 003
**Status**: Planning Complete
**Total Estimated Time**: 16.5 hours

## Overview

This feature converts approximately 1,800-2,000 lines of component-scoped CSS to Tailwind v4 utility classes across 10 components while preserving exact visual appearance, animations, and functionality.

**Conversion Strategy**: Phased approach starting with simple components to validate patterns, then progressively handling more complex components with preserved CSS for animations and pseudo-elements.

**Success Criteria**:
- ≥80% CSS reduction (1,800 → <360 lines)
- 100% pixel-perfect visual match at 375px, 768px, 1440px
- All animations preserved and functional
- Zero accessibility regressions

---

## Phase 1: Setup & Validation Tools

### T001: Create baseline visual documentation [1 hour]
**Priority**: CRITICAL (blocks all validation)
**Files**:
- Create: `/home/marty/code-projects/specswarm.com/features/003-convert-component-scoped-css-to-tailwind-utility-classes/validation/`
- Create: `/home/marty/code-projects/specswarm.com/features/003-convert-component-scoped-css-to-tailwind-utility-classes/validation/baseline-screenshots.md`

**Acceptance Criteria**:
- [X] Screenshot checklist created for 5 pages × 3 viewports (375px, 768px, 1440px)
- [X] Interactive state capture plan documented (hover, focus, active)
- [X] Animation sequence recording methodology defined

**Tasks**:
1. Create validation directory structure
2. Document screenshot capture process
3. Create checklist template for each component
4. Define visual comparison methodology

---

### T002: Capture pre-conversion baseline screenshots [2 hours]
**Priority**: CRITICAL (blocks validation)
**Files**: `/home/marty/code-projects/specswarm.com/features/003-convert-component-scoped-css-to-tailwind-utility-classes/validation/baseline/`
**Dependencies**: T001

**Acceptance Criteria**:
- [ ] All 5 pages captured at 3 viewports (15 screenshots total)
- [ ] Hover states captured for all interactive elements
- [ ] Focus states captured for keyboard navigation
- [ ] Animation sequences recorded (hamburger menu, hero words, brand cycling)

**Tasks**:
1. Start dev server: `npm run dev`
2. Screenshot homepage (/, 375px, 768px, 1440px)
3. Screenshot features page (/features, 3 viewports)
4. Screenshot docs page (/docs, 3 viewports)
5. Screenshot get-started page (/get-started, 3 viewports)
6. Screenshot use-cases page (/use-cases, 3 viewports)
7. Capture interactive state variants (hover, focus, active)
8. Record animation sequences

---

## Phase 2: Simple Components (Pattern Validation)

### T003: Convert Button.astro to Tailwind utilities [1 hour]
**Priority**: HIGH (validates conversion approach)
**Files**: `/home/marty/code-projects/specswarm.com/src/components/Button.astro`
**Dependencies**: T002
**Complexity**: Low

**Current State**: ~100 lines of scoped CSS
**Target State**: ~10 lines Tailwind classes

**Acceptance Criteria**:
- [X] All button variants converted (primary, secondary, ghost)
- [X] Padding/margin use design tokens via arbitrary values
- [X] Colors reference var(--color-*) tokens
- [X] Hover/focus/active states converted to variants
- [X] Reduced motion variants applied
- [ ] No visual regressions (validate in browser)

**Conversion Map**:
```
Old: .button { display: flex; align-items: center; }
New: class="flex items-center"

Old: .button { padding: var(--spacing-md) var(--spacing-lg); }
New: class="py-[var(--spacing-md)] px-[var(--spacing-lg)]"

Old: .button { background: var(--color-primary); }
New: class="bg-[var(--color-primary)]"

Old: .button:hover { background: var(--color-primary-dark); }
New: class="hover:bg-[var(--color-primary-dark)]"
```

**Tasks**:
1. Read current Button.astro implementation
2. Identify all CSS declarations
3. Map each declaration to Tailwind utility or arbitrary value
4. Replace scoped `<style>` with inline class attributes
5. Use `class:list` for dynamic variant classes
6. Test all button variants (3 variants × 3 sizes)
7. Remove `<style>` block

---

### T004: Validate Button.astro conversion [30 min]
**Priority**: HIGH
**Files**: `/home/marty/code-projects/specswarm.com/src/components/Button.astro`, validation screenshots
**Dependencies**: T003

**Acceptance Criteria**:
- [ ] Visual comparison passed (pixel-perfect match)
- [ ] All interactive states function identically
- [ ] Hover states render correctly
- [ ] Focus states visible for keyboard navigation
- [ ] No console errors or warnings

**Tasks**:
1. Screenshot converted button at 3 viewports
2. Compare with baseline screenshots
3. Test all interactive states (hover, focus, active)
4. Verify keyboard navigation focus
5. Test reduced motion preference (DevTools emulation)
6. Check browser DevTools for errors
7. Document any differences (should be zero)

---

### T005: Convert FeatureCard.astro to Tailwind utilities [1.5 hours]
**Priority**: HIGH
**Files**: `/home/marty/code-projects/specswarm.com/src/components/FeatureCard.astro`
**Dependencies**: T004 (validates approach)
**Complexity**: Medium
**Parallelizable**: [P] (independent of T007)

**Current State**: ~150 lines of scoped CSS
**Target State**: ~20 lines Tailwind classes

**Acceptance Criteria**:
- [X] Card container styling converted (border, padding, background, shadow, radius)
- [X] Grid layout converted to Tailwind grid utilities
- [X] Typography sizing uses var(--font-size-*) via arbitrary values
- [X] Hover elevation effect converted
- [X] Responsive behavior maintained (640px breakpoint)

**Preservation**:
- None (all CSS converts to utilities)

**Tasks**:
1. Read current FeatureCard.astro
2. Convert card container styles (border, bg, shadow, radius)
3. Convert grid layout and gap spacing
4. Convert typography (font-size, weight, color)
5. Convert icon container styling
6. Convert hover effects (transform, shadow)
7. Test responsive breakpoints (640px, 768px)
8. Validate visual match
9. Remove `<style>` block

---

### T006: Validate FeatureCard.astro conversion [30 min]
**Priority**: HIGH
**Files**: `/home/marty/code-projects/specswarm.com/src/components/FeatureCard.astro`
**Dependencies**: T005

**Acceptance Criteria**:
- [ ] Card renders identically at all viewports
- [ ] Hover elevation animates smoothly
- [ ] Grid layout responsive behavior matches baseline
- [ ] No visual regressions

**Tasks**:
1. Navigate to /features page
2. Screenshot at 3 viewports
3. Compare with baseline
4. Test hover effects on all cards
5. Test responsive behavior at 640px
6. Validate spacing and typography

---

### T007: Convert ScenarioCard.astro to Tailwind utilities [1.5 hours]
**Priority**: HIGH
**Files**: `/home/marty/code-projects/specswarm.com/src/components/ScenarioCard.astro`
**Dependencies**: T004
**Complexity**: Medium
**Parallelizable**: [P] (similar to FeatureCard)

**Current State**: ~140 lines of scoped CSS
**Target State**: ~18 lines Tailwind classes

**Acceptance Criteria**:
- [x] Card container styling converted
- [x] Persona badge styling converted
- [x] Outcome section layout converted
- [x] Arrow positioning (link variant) converted using group/group-hover
- [x] All interactive states function

**Tasks**:
1. Read current ScenarioCard.astro
2. Convert card container (similar to FeatureCard pattern)
3. Convert persona badge (inline-block, w-fit, padding, background)
4. Convert outcome section (flex, items-start, gap)
5. Convert arrow positioning (absolute, group/group-hover)
6. Test link variant vs non-link variant
7. Validate visual match
8. Remove `<style>` block

---

### T008: Validate ScenarioCard.astro conversion [30 min]
**Priority**: HIGH
**Files**: `/home/marty/code-projects/specswarm.com/src/components/ScenarioCard.astro`
**Dependencies**: T007

**Acceptance Criteria**:
- [ ] Card renders identically
- [ ] Persona badge displays correctly
- [ ] Arrow positioning correct (top-right)
- [ ] Arrow slides on hover (group-hover effect)
- [ ] Both link and non-link variants tested

**Tasks**:
1. Navigate to /use-cases page
2. Screenshot at 3 viewports
3. Test hover effects (arrow slide)
4. Validate both card variants
5. Compare with baseline

---

## Phase 3: Layout Components

### T009: Convert Footer.astro to Tailwind utilities [2 hours]
**Priority**: MEDIUM
**Files**: `/home/marty/code-projects/specswarm.com/src/components/Footer.astro`
**Dependencies**: T006, T008
**Complexity**: Medium-High
**Parallelizable**: [P]

**Current State**: ~200 lines of scoped CSS
**Target State**: ~25 lines Tailwind classes

**Acceptance Criteria**:
- [x] Footer grid layout converted (auto-fit pattern with arbitrary grid syntax)
- [x] Link styling and hover states converted
- [x] Responsive stacking behavior maintained
- [x] Copyright section styling converted

**Complex Grid Conversion**:
```
Old: grid-template-columns: 2fr repeat(3, 1fr);
New: class="grid grid-cols-[2fr_repeat(3,1fr)]"
```

**Tasks**:
1. Read current Footer.astro
2. Convert grid layout (4-column desktop: 2fr repeat(3, 1fr))
3. Convert brand column (flex flex-col, gap)
4. Convert link columns (flex flex-col, gap)
5. Convert link styles and hover states
6. Convert footer bottom section (flex justify-between)
7. Convert responsive breakpoints (md:grid-cols-1)
8. Test footer at all viewports
9. Validate visual match
10. Remove `<style>` block

---

### T010: Validate Footer.astro conversion [30 min]
**Priority**: MEDIUM
**Files**: `/home/marty/code-projects/specswarm.com/src/components/Footer.astro`
**Dependencies**: T009

**Acceptance Criteria**:
- [ ] Grid layout correct at desktop (4 columns)
- [ ] Grid collapses at 768px (1 column)
- [ ] Link hover states work
- [ ] Responsive behavior matches baseline

**Tasks**:
1. Check footer on all pages
2. Screenshot at 3 viewports
3. Test grid responsive behavior (4-col → 1-col at 768px)
4. Test link hover states
5. Validate spacing and alignment

---

### T011: Convert Header.astro to Tailwind utilities (preserve hamburger CSS) [3 hours]
**Priority**: MEDIUM
**Files**: `/home/marty/code-projects/specswarm.com/src/components/Header.astro`
**Dependencies**: T010
**Complexity**: HIGH

**Current State**: ~400 lines of scoped CSS (largest component)
**Target State**: ~40 lines Tailwind classes + ~60 lines preserved animation CSS

**Acceptance Criteria**:
- [x] Desktop navigation layout converted
- [x] Mobile hamburger button styling converted
- [x] Hamburger animation CSS preserved in `<style>` block
- [x] Navigation links and hover states converted
- [x] Logo/brand positioning converted
- [x] Mobile menu overlay converted
- [x] Responsive breakpoints maintained
- [x] Active link indicator preserved (::after pseudo-element)

**Preservation Strategy**:
- Keep @keyframes for hamburger menu transformation (3 line animation)
- Keep pseudo-element CSS for hamburger icon lines (::before, ::after with content)
- Keep active link underline (::after with content)
- Convert all other CSS to Tailwind utilities

**Tasks**:
1. Read current Header.astro
2. Identify and isolate hamburger animation CSS
3. Identify and isolate active link indicator CSS
4. Convert header container (sticky, top-0, z-index, border-bottom)
5. Convert nav container and content (max-width, padding, height, flex)
6. Convert logo/brand section
7. Convert desktop navigation layout (flex, items-center, gap)
8. Convert nav link styles and hover states
9. Convert GitHub link styling
10. Convert mobile menu overlay (fixed, background, positioning)
11. Preserve hamburger animation in `<style>` block with clear comments
12. Preserve active link indicator in `<style>` block
13. Test desktop navigation
14. Test mobile menu open/close animation
15. Test responsive breakpoints
16. Validate visual match

---

### T012: Validate Header.astro conversion [45 min]
**Priority**: MEDIUM
**Files**: `/home/marty/code-projects/specswarm.com/src/components/Header.astro`
**Dependencies**: T011

**Acceptance Criteria**:
- [ ] Desktop navigation renders identically
- [ ] Mobile hamburger menu opens/closes smoothly
- [ ] Hamburger icon animates correctly (3 lines rotate/translate)
- [ ] All hover states function
- [ ] Focus states visible
- [ ] Active page indicator displays
- [ ] Responsive behavior matches baseline

**Tasks**:
1. Check Header on all pages
2. Screenshot at 3 viewports
3. Test desktop navigation (all links, hover states)
4. Test mobile menu at <768px:
   - Hamburger button visible
   - Click to open menu
   - Hamburger animates to X
   - Click to close menu
   - Hamburger animates back to lines
5. Test active page indicator
6. Test keyboard navigation
7. Test at exact 768px breakpoint
8. Validate visual match

---

## Phase 4: Page Components

### T013: Convert index.astro (Homepage) to Tailwind utilities [2 hours]
**Priority**: MEDIUM
**Files**: `/home/marty/code-projects/specswarm.com/src/pages/index.astro`
**Dependencies**: T012
**Complexity**: Medium
**Parallelizable**: [P] (pages can be converted in parallel)

**Current State**: ~250 lines of scoped CSS
**Target State**: ~30 lines Tailwind classes

**Acceptance Criteria**:
- [x] Hero section layout converted
- [x] Problem-Solution section grid converted
- [x] Workflow section styling converted
- [x] Features section grid converted
- [x] Metrics section layout converted
- [x] CTA section styling converted
- [x] All responsive breakpoints maintained
- [x] Background images (tracks.svg, orchestration.svg) positioned correctly

**Tasks**:
1. Read current index.astro
2. Convert hero section (position, overflow, padding-block, background)
3. Convert Problem-Solution grid (grid grid-cols-2, md:grid-cols-1)
4. Convert Workflow section (relative positioning for background)
5. Convert Features grid (grid grid-cols-3, md:grid-cols-1)
6. Convert Metrics grid (grid grid-cols-3, md:grid-cols-1)
7. Convert CTA section styling
8. Test each section individually
9. Validate visual match
10. Remove `<style>` block

---

### T014: Validate index.astro conversion [30 min]
**Files**: `/home/marty/code-projects/specswarm.com/src/pages/index.astro`
**Dependencies**: T013

**Acceptance Criteria**:
- [ ] All sections render identically
- [ ] Background images positioned correctly
- [ ] AnimatedHero word animation works
- [ ] Grids responsive (3-col → 1-col)
- [ ] No layout shifts

**Tasks**:
1. Navigate to homepage (/)
2. Screenshot at 3 viewports
3. Validate each section visually
4. Test AnimatedHero animation
5. Test all grid responsive behavior
6. Scroll through entire page checking for layout shifts

---

### T015: Convert features.astro to Tailwind utilities [2 hours]
**Priority**: MEDIUM
**Files**: `/home/marty/code-projects/specswarm.com/src/pages/features.astro`
**Dependencies**: T012
**Parallelizable**: [P]

**Current State**: ~220 lines of scoped CSS
**Target State**: ~28 lines Tailwind classes

**Acceptance Criteria**:
- [ ] Section headers centered and styled
- [ ] Feature grid 3-column desktop, 1-column mobile
- [ ] FeatureCard components render correctly
- [ ] Responsive behavior matches baseline

**Tasks**:
1. Read current features.astro
2. Convert section headers (text-center, max-w-3xl, mx-auto, mb-16)
3. Convert feature grid (grid grid-cols-3, gap, md:grid-cols-1)
4. Test FeatureCard rendering
5. Validate visual match
6. Remove `<style>` block

---

### T016: Validate features.astro conversion [30 min]
**Files**: `/home/marty/code-projects/specswarm.com/src/pages/features.astro`
**Dependencies**: T015

**Acceptance Criteria**:
- [ ] Section headers match baseline
- [ ] Grid layout correct at all breakpoints
- [ ] Feature cards display properly
- [ ] Hover effects on cards work

**Tasks**:
1. Navigate to /features
2. Screenshot at 3 viewports
3. Test grid transition at 768px
4. Validate card hover effects

---

### T017: Convert get-started.astro to Tailwind utilities [2 hours]
**Priority**: MEDIUM
**Files**: `/home/marty/code-projects/specswarm.com/src/pages/get-started.astro`
**Dependencies**: T012
**Parallelizable**: [P]

**Current State**: ~200 lines of scoped CSS
**Target State**: ~25 lines Tailwind classes

**Acceptance Criteria**:
- [ ] Step progression layout correct
- [ ] Step numbers circular and styled
- [ ] Step content typography matches
- [ ] CodeBlock components display correctly
- [ ] Responsive behavior matches

**Tasks**:
1. Read current get-started.astro
2. Convert step containers (flex flex-col, gap)
3. Convert step numbers (flex, items-center, justify-center, w-12, h-12, rounded-full)
4. Convert step content (flex-1, typography utilities)
5. Test CodeBlock rendering
6. Validate visual match
7. Remove `<style>` block

---

### T018: Validate get-started.astro conversion [30 min]
**Files**: `/home/marty/code-projects/specswarm.com/src/pages/get-started.astro`
**Dependencies**: T017

**Acceptance Criteria**:
- [ ] Step containers spacing correct
- [ ] Step numbers circular and centered
- [ ] Typography hierarchy matches
- [ ] Code blocks render correctly

**Tasks**:
1. Navigate to /get-started
2. Screenshot at 3 viewports
3. Validate step layout
4. Test code block rendering

---

### T019: Convert docs.astro to Tailwind utilities [2 hours]
**Priority**: MEDIUM
**Files**: `/home/marty/code-projects/specswarm.com/src/pages/docs.astro`
**Dependencies**: T012
**Parallelizable**: [P]

**Current State**: ~210 lines of scoped CSS
**Target State**: ~26 lines Tailwind classes

**Acceptance Criteria**:
- [ ] Documentation layout correct
- [ ] Typography hierarchy matches
- [ ] Reading line length appropriate
- [ ] Content spacing matches

**Tasks**:
1. Read current docs.astro
2. Convert documentation container (max-w-4xl, mx-auto, px-*)
3. Convert headings (text-*, font-*, mb-*)
4. Convert paragraphs (text-*, leading-*)
5. Convert lists (ml-*, space-y-*)
6. Validate visual match
7. Remove `<style>` block

---

### T020: Validate docs.astro conversion [30 min]
**Files**: `/home/marty/code-projects/specswarm.com/src/pages/docs.astro`
**Dependencies**: T019

**Acceptance Criteria**:
- [ ] Container max-width correct
- [ ] Heading typography matches
- [ ] Paragraph spacing and sizing correct
- [ ] List formatting matches

**Tasks**:
1. Navigate to /docs
2. Screenshot at 3 viewports
3. Validate typography hierarchy
4. Check reading line length

---

### T021: Convert use-cases.astro to Tailwind utilities [2 hours]
**Priority**: LOW
**Files**: `/home/marty/code-projects/specswarm.com/src/pages/use-cases.astro`
**Dependencies**: T012
**Parallelizable**: [P]

**Current State**: ~190 lines of scoped CSS
**Target State**: ~24 lines Tailwind classes

**Acceptance Criteria**:
- [ ] Section headers styled correctly
- [ ] Scenario grid responsive
- [ ] ScenarioCard components render properly

**Tasks**:
1. Read current use-cases.astro
2. Convert section headers (similar to features.astro)
3. Convert scenario grid (grid grid-cols-*, gap, md:grid-cols-1)
4. Test ScenarioCard rendering
5. Validate visual match
6. Remove `<style>` block

---

### T022: Validate use-cases.astro conversion [30 min]
**Files**: `/home/marty/code-projects/specswarm.com/src/pages/use-cases.astro`
**Dependencies**: T021

**Acceptance Criteria**:
- [ ] Grid layout correct
- [ ] Scenario cards display properly
- [ ] Responsive behavior matches

**Tasks**:
1. Navigate to /use-cases
2. Screenshot at 3 viewports
3. Test grid responsive behavior
4. Validate card rendering

---

## Phase 5: Special Cases

### T023: Convert CodeBlock.astro (preserve Shiki overrides) [1.5 hours]
**Priority**: MEDIUM
**Files**: `/home/marty/code-projects/specswarm.com/src/components/CodeBlock.astro`
**Dependencies**: T022
**Complexity**: MEDIUM-HIGH

**Current State**: ~180 lines of scoped CSS
**Target State**: ~20 lines Tailwind classes + ~40 lines preserved CSS

**Acceptance Criteria**:
- [ ] Code container styling converted
- [ ] Shiki syntax highlighting overrides preserved in :global() selectors
- [ ] Custom scrollbar styling preserved (WebKit-specific)
- [ ] Copy button styling converted
- [ ] Language badge styling converted

**Preservation Strategy**:
- Keep :global() selectors for Shiki token styling
- Keep ::-webkit-scrollbar CSS for custom scrollbar
- Convert all other styling to Tailwind utilities

**Tasks**:
1. Read current CodeBlock.astro
2. Identify Shiki global overrides (:global(.shiki ...))
3. Identify WebKit scrollbar CSS
4. Convert code block container (bg, border, rounded-lg, overflow-hidden)
5. Convert header (flex, items-center, justify-between, px-4, py-3)
6. Convert title and language badge styling
7. Convert copy button styling
8. Convert content container (overflow-x-auto)
9. Preserve Shiki and scrollbar CSS in `<style>` block
10. Test syntax highlighting renders correctly
11. Test scrollbar on long code blocks
12. Validate visual match

---

### T024: Validate CodeBlock.astro conversion [30 min]
**Files**: `/home/marty/code-projects/specswarm.com/src/components/CodeBlock.astro`
**Dependencies**: T023

**Acceptance Criteria**:
- [ ] Syntax highlighting renders identically
- [ ] Custom scrollbar displays correctly
- [ ] Copy button functions and styles match
- [ ] Language badge displays correctly

**Tasks**:
1. Navigate to pages with code blocks (/get-started, /docs)
2. Screenshot at 3 viewports
3. Test syntax highlighting (colors correct)
4. Test scrollbar on long code lines (WebKit browsers)
5. Test copy button functionality
6. Validate visual match

---

## Phase 6: Cleanup & Final Validation

### T025: Delete unused mobile-menu.css file [5 min]
**Priority**: LOW
**Files**: `/home/marty/code-projects/specswarm.com/src/styles/mobile-menu.css` (delete)
**Dependencies**: T024

**Acceptance Criteria**:
- [x] File deleted from filesystem
- [x] No imports reference this file
- [x] Build succeeds without errors

**Tasks**:
1. Verify file is not imported anywhere
2. Delete src/styles/mobile-menu.css
3. Run build to verify no errors: `npm run build`
4. Test mobile menu still functions

---

### T026: Comprehensive visual regression test [1 hour]
**Priority**: CRITICAL
**Files**: All converted components and pages
**Dependencies**: T025

**Acceptance Criteria**:
- [ ] All pages screenshot at 3 viewports match baseline
- [ ] All interactive states function identically
- [ ] All animations work (hamburger, hero words, brand cycling)
- [ ] Responsive breakpoints behave correctly
- [ ] No console errors or warnings
- [ ] Lighthouse performance score ≥95 (no regression)

**Tasks**:
1. Rebuild site: `npm run build && npm run dev`
2. Screenshot all 5 pages at 375px, 768px, 1440px (15 total)
3. Compare with baseline screenshots pixel-by-pixel
4. Test all interactive states:
   - All buttons (hover, focus, active)
   - All links (hover)
   - Header navigation (desktop and mobile)
   - Hamburger menu animation
   - Mobile menu open/close
   - Card hover effects
   - AnimatedBrand cycling
   - AnimatedHero word fade-in
5. Test responsive behavior:
   - All breakpoints transition cleanly
   - No layout shifts
   - Content remains readable
6. Test accessibility:
   - Keyboard navigation works
   - Focus states visible
   - Reduced motion respected (DevTools emulation)
7. Run Lighthouse audit:
   - Performance ≥95
   - Accessibility 100
   - Best Practices ≥95
   - SEO 100
8. Check browser console for errors
9. Document results in validation/final-report.md

---

### T027: Update documentation and create completion report [30 min]
**Priority**: LOW
**Files**:
- `/home/marty/code-projects/specswarm.com/features/003-convert-component-scoped-css-to-tailwind-utility-classes/COMPLETION-REPORT.md` (create)
- Update component documentation if needed

**Dependencies**: T026

**Acceptance Criteria**:
- [ ] Completion report created with metrics
- [ ] CSS reduction percentage calculated
- [ ] Visual regression results documented
- [ ] Any learnings or gotchas documented

**Tasks**:
1. Calculate CSS reduction (before/after line counts)
2. Document final utility adoption percentage
3. List all preserved CSS patterns (animations, scrollbar, Shiki)
4. Document any challenges encountered
5. Record Lighthouse score comparison
6. Create COMPLETION-REPORT.md with all metrics

---

## Task Summary

**Total Tasks**: 27
**Estimated Total Time**: 16.5 hours (5-7 days at 2-3 hours/day)

**Phase Breakdown**:
- Phase 1 (Setup): 2 tasks, 3 hours
- Phase 2 (Simple Components): 6 tasks, 5 hours
- Phase 3 (Layout Components): 4 tasks, 6.25 hours
- Phase 4 (Page Components): 10 tasks, 11 hours
- Phase 5 (Special Cases): 2 tasks, 2 hours
- Phase 6 (Cleanup): 3 tasks, 1.5 hours

**Parallel Opportunities**:
- T005 + T007 (FeatureCard + ScenarioCard - similar patterns, can be done in parallel)
- T009 (Footer - independent of other layout components once cards are done)
- T013, T015, T017, T019, T021 (All page components can be done in parallel after Header complete)

**Critical Path**:
T001 → T002 → T003 → T004 → T011 → T012 → (pages in parallel) → T026 → T027

**Dependencies**:
- All validation tasks depend on their corresponding conversion task
- Page conversions (T013-T022) can run in parallel after Header (T012) is complete
- Final validation (T026) blocks on all conversions complete

---

## Conversion Patterns Reference

### Common Conversions

**Layout**:
```
display: flex → flex
flex-direction: column → flex-col
align-items: center → items-center
justify-content: space-between → justify-between
gap: var(--spacing-md) → gap-[var(--spacing-md)]
```

**Spacing**:
```
padding: var(--spacing-lg) → p-[var(--spacing-lg)]
padding-inline: var(--spacing-site-margin) → px-[var(--spacing-site-margin)]
margin: 0 auto → mx-auto
```

**Colors**:
```
color: var(--color-primary) → text-[var(--color-primary)]
background-color: var(--color-surface) → bg-[var(--color-surface)]
border: 1px solid var(--color-border) → border border-[var(--color-border)]
```

**Typography**:
```
font-size: var(--font-size-display-xl) → text-[var(--font-size-display-xl)]
font-weight: 700 → font-bold
line-height: 1.2 → leading-tight
```

**Interactive States**:
```
.button:hover → hover:
.button:focus-visible → focus-visible:
.button:active → active:
```

**Responsive**:
```
@media (min-width: 768px) → md:
@media (max-width: 768px) → md: (reverse logic)
```

**Accessibility**:
```
@media (prefers-reduced-motion: reduce) → motion-reduce:
```

### Preserved CSS Patterns

**Must Keep in `<style>` blocks**:
1. @keyframes animations
2. Pseudo-elements with content property (::before, ::after)
3. Browser-specific pseudo-elements (::-webkit-scrollbar)
4. :global() selectors for third-party overrides (Shiki)
5. Complex attribute selectors ([aria-expanded="true"])

---

## Validation Checklist

**For each component**, verify:

### Visual
- [ ] Desktop navigation works (Header)
- [ ] Mobile hamburger menu opens/closes smoothly (Header)
- [ ] AnimatedBrand cycles through commands
- [ ] Hero word animation displays correctly
- [ ] All hover states function properly
- [ ] Focus states visible for keyboard navigation
- [ ] Active states provide feedback
- [ ] Responsive breakpoints work at 640px and 768px
- [ ] No layout shifts during responsive transitions
- [ ] All animations respect reduced motion preference

### Functional
- [ ] All links navigate correctly
- [ ] All buttons trigger expected actions
- [ ] Mobile menu toggle works
- [ ] Keyboard navigation functional
- [ ] Screen reader compatibility (no semantic changes)

### Code Quality
- [ ] No `<style>` blocks remain (except preserved patterns)
- [ ] Utility classes organized and readable
- [ ] Design tokens used via var(--token-name) in arbitrary values
- [ ] Responsive variants applied correctly
- [ ] Accessibility variants applied (focus-visible, motion-reduce)
- [ ] No hardcoded color/spacing values

### Performance
- [ ] Page loads without errors
- [ ] No console warnings
- [ ] CSS bundle size reduced or neutral
- [ ] Lighthouse performance ≥95

### Accessibility
- [ ] Focus indicators visible
- [ ] Color contrast meets WCAG 2.1 AA
- [ ] Touch targets ≥44x44px
- [ ] Reduced motion honored
- [ ] Semantic HTML unchanged
- [ ] ARIA attributes unchanged

---

## Notes

- This is a pure refactoring effort with zero intentional visual changes
- All design tokens are immutable (no changes to global.css @theme)
- React components (AnimatedHero, AnimatedBrand) retain inline styles
- Tailwind v4 arbitrary value syntax required: `bg-[var(--color-surface)]`
- No new dependencies required (Tailwind utilities only)
- Success depends on pixel-perfect visual regression validation

---

**Tasks Version**: 1.0.0
**Created**: 2025-11-11
**Status**: Ready for Implementation
