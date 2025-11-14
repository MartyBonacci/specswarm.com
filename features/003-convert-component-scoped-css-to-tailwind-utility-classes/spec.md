---
parent_branch: main
feature_number: 003
status: In Progress
created_at: 2025-11-11T20:32:14-07:00
---

# Feature: Convert Component-Scoped CSS to Tailwind Utility Classes

## Overview

Refactor the SpecSwarm marketing website to eliminate component-scoped CSS in Astro components, replacing it with Tailwind v4 utility classes. This migration will improve maintainability by centralizing styling through the existing design token system while preserving the site's exact visual appearance and functionality.

The current codebase contains approximately 2000 lines of scoped CSS across 10 components. This feature will convert layout, spacing, typography, and color declarations to Tailwind utilities while strategically preserving complex CSS patterns that are better suited to custom stylesheets (animations, pseudo-elements, browser-specific styling).

**Key Benefits**:
- Reduced CSS bundle size through utility class reuse
- Improved developer experience with consistent Tailwind patterns
- Easier maintenance through centralized design tokens
- Better documentation of component styling through class names
- Preserved visual design without regressions

## User Scenarios

### Scenario 1: Developer Modifying Component Styles

**Actor**: Frontend developer maintaining the marketing website

**Goal**: Update button padding to match new design specifications

**Current Experience** (with scoped CSS):
1. Opens Button.astro component file
2. Scrolls to find `<style>` block (often at bottom of 100+ line file)
3. Locates `.button { padding: ... }` declaration
4. Modifies value, saves
5. Refreshes browser to verify change

**Expected Experience** (with Tailwind):
1. Opens Button.astro component file
2. Finds button element with class="px-6 py-3"
3. Changes to class="px-8 py-4" inline
4. Refreshes browser to verify change
5. No need to scroll or search separate style block

**Success**: Developer can modify spacing in under 30 seconds (vs 1-2 minutes with scoped CSS)

### Scenario 2: Developer Ensuring Responsive Consistency

**Actor**: Frontend developer implementing mobile-responsive adjustments

**Goal**: Verify all components use consistent breakpoint values (640px, 768px)

**Current Experience**:
1. Must inspect 10 different `<style>` blocks across components
2. Find inconsistent media query syntax: `@media (min-width: 640px)`, `@media screen and (min-width: 640px)`, etc.
3. Search for all instances to ensure consistency
4. Update each file individually

**Expected Experience**:
1. All breakpoints use Tailwind's `md:` and `sm:` prefixes
2. Visual scan of HTML markup shows responsive classes
3. Single source of truth in global.css @theme for breakpoint values
4. Inconsistencies impossible due to Tailwind's standardized API

**Success**: Developer can audit responsive behavior by reading markup instead of searching CSS files

### Scenario 3: New Developer Onboarding

**Actor**: New frontend developer joining the SpecSwarm team

**Goal**: Understand how the header navigation is styled

**Current Experience**:
1. Opens Header.astro (400+ lines with embedded CSS)
2. Reads through custom CSS classes: `.nav-container`, `.nav-links`, `.nav-item`, `.mobile-toggle`
3. Must understand custom naming conventions
4. Unclear which styles come from global.css vs scoped CSS
5. Takes 15-20 minutes to understand header styling

**Expected Experience**:
1. Opens Header.astro
2. Reads Tailwind classes directly in markup: `class="flex items-center justify-between px-6 py-4"`
3. Recognizes standard Tailwind patterns immediately
4. Complex animations remain in `<style>` block with clear comments
5. Takes 5 minutes to understand header styling

**Success**: New developers can contribute to styling within first day (vs first week)

## Functional Requirements

### FR1: Tailwind Utility Conversion

The system shall convert scoped CSS declarations to Tailwind utility classes for the following properties:

**Layout & Positioning**:
- Display properties: `flex`, `grid`, `block`, `inline-block`, `hidden`
- Flexbox: `flex-direction`, `justify-content`, `align-items`, `gap`, `flex-wrap`
- Grid: `grid-template-columns`, `grid-template-rows`, `gap`, `grid-auto-flow`
- Positioning: `position`, `top`, `right`, `bottom`, `left`, `z-index`
- Sizing: `width`, `height`, `min-width`, `max-width`, `min-height`, `max-height`

**Spacing**:
- Padding: Convert all `padding` declarations using design token values
- Margin: Convert all `margin` declarations using design token values
- Gap: Convert all `gap` declarations for flex/grid layouts

**Colors**:
- Text colors: Convert using design token color variables (e.g., `text-[var(--color-text)]`)
- Background colors: Convert using design token color variables
- Border colors: Convert using design token color variables

**Typography**:
- Font sizes: Use arbitrary values with design tokens (e.g., `text-[var(--font-size-display-xl)]`)
- Font weights: Convert using Tailwind's font-weight scale
- Line heights: Use arbitrary values where needed
- Letter spacing: Use arbitrary values where needed

**Visual Effects**:
- Border radius: Convert using Tailwind's rounded utilities
- Box shadows: Use arbitrary values with design tokens
- Opacity: Convert using Tailwind's opacity scale
- Transforms: Simple transforms converted to utilities (translate, scale, rotate)
- Transitions: Simple transitions converted to utilities

**Interactive States**:
- Hover states: Convert using `hover:` variant
- Focus states: Convert using `focus-visible:` variant
- Active states: Convert using `active:` variant

**Responsive Breakpoints**:
- Mobile-first breakpoints: Use `md:` (768px) and `sm:` (640px) variants
- All responsive CSS converted to Tailwind's responsive syntax

**Accessibility**:
- Reduced motion: Use `motion-reduce:` variant for animation-related classes
- All focus-visible states preserved and enhanced

### FR2: Preserve Complex CSS Patterns

The system shall retain the following CSS patterns in scoped `<style>` blocks or global CSS:

**Animation Keyframes**:
- `@keyframes wordFadeIn` (AnimatedHero.tsx)
- `@keyframes blink` (AnimatedBrand.tsx)
- Hamburger menu transform animations (Header.astro)

**Pseudo-elements with Content**:
- All `::before` and `::after` pseudo-elements that use `content` property
- Icon font pseudo-elements
- Decorative elements

**Browser-Specific Styling**:
- Custom WebKit scrollbar styling in CodeBlock.astro
- Browser vendor prefixes where needed

**Global Overrides**:
- Shiki syntax highlighting overrides (`:global()` selectors in CodeBlock.astro)
- Third-party library style overrides

**React Component Inline Styles**:
- AnimatedHero.tsx inline `<style>` block (for scoped animations)
- AnimatedBrand.tsx inline `<style>` block (for scoped animations)

### FR3: Design Token Integration

The system shall use existing design tokens from global.css @theme block:

**Required Token Usage**:
- All color values must reference `var(--color-*)` tokens
- All spacing should align with design token scale
- All font sizes must reference `var(--font-size-*)` tokens
- All transition durations must reference `var(--transition-*)` tokens

**Arbitrary Value Syntax**:
- Fluid typography: `text-[var(--font-size-display-xl)]`
- Custom colors: `bg-[var(--color-surface)]`
- Design token references: Always use CSS custom property syntax in arbitrary values

### FR4: Component Conversion Priority

The system shall convert components in the following order to minimize risk:

**Phase 1: Simple Components** (validate approach):
1. Button.astro - Simplest component, good test case
2. FeatureCard.astro - Standard card pattern
3. ScenarioCard.astro - Similar to FeatureCard

**Phase 2: Layout Components**:
4. Footer.astro - Grid layout patterns
5. Header.astro - Complex, preserve hamburger animation CSS

**Phase 3: Page Components**:
6. index.astro - Homepage
7. features.astro - Features page
8. docs.astro - Documentation page
9. get-started.astro - Getting started page
10. use-cases.astro - Use cases page

**Phase 4: Special Cases**:
11. CodeBlock.astro - Preserve Shiki global overrides and scrollbar styling

**Phase 5: Cleanup**:
12. Delete unused mobile-menu.css file

### FR5: Visual Regression Prevention

The system shall ensure zero visual regressions:

**Desktop Navigation**:
- Navigation links render in correct positions
- Hover states display correctly
- Active/current page indicators work
- Logo and brand animation function properly

**Mobile Experience**:
- Hamburger menu button displays correctly
- Mobile menu opens and closes smoothly with existing animation
- Menu overlay covers viewport appropriately
- Touch targets meet minimum size requirements (44x44px)

**Interactive Elements**:
- All buttons maintain existing hover/focus states
- Focus rings visible for keyboard navigation
- Active states provide appropriate feedback

**Animations**:
- AnimatedBrand cycles through commands correctly: /specswarm:init → :build → :fix → :ship
- Hero word animation (wordFadeIn) displays correctly
- Hamburger menu transformation animates smoothly
- Reduced motion preferences respected

**Responsive Behavior**:
- All breakpoint transitions function at 640px and 768px
- No layout shifts during responsive transitions
- Content remains readable at all viewport sizes

### FR6: Technical Implementation Requirements

**Tailwind Variant Usage**:
- Use built-in variants: `hover:`, `focus-visible:`, `active:`, `md:`, `sm:`, `motion-reduce:`
- Combine variants correctly: `md:hover:bg-accent` for responsive hover states

**Complex Grid Patterns**:
- Use arbitrary grid syntax for auto-fit patterns: `grid-cols-[repeat(auto-fit,minmax(min(100%,20rem),1fr))]`
- Preserve responsive grid behavior

**Class Organization**:
- Group related utilities: layout → spacing → colors → typography → effects
- Use consistent ordering across components for readability

**Performance Considerations**:
- No increase in overall stylesheet size (utilities more efficient than scoped CSS)
- Preserve existing lazy-loading and code-splitting behavior
- Maintain current Lighthouse performance scores

## Success Criteria

### SC1: Code Quality Metrics

- **CSS Reduction**: Total lines of scoped CSS reduced by at least 80% (from ~2000 lines to <400 lines)
- **Utility Adoption**: At least 95% of convertible CSS properties use Tailwind utilities
- **Preserved Patterns**: All 6 animation keyframes remain functional
- **Token Compliance**: 100% of color/spacing/typography values use design tokens

### SC2: Visual Accuracy

- **Pixel-Perfect Match**: Screenshots of all pages at 375px, 768px, and 1440px viewports match pre-conversion baseline
- **Animation Integrity**: All animations (hamburger, hero words, brand cycling) function identically to current implementation
- **Interactive States**: All hover, focus, and active states produce identical visual feedback
- **Cross-Browser**: Visual consistency maintained across Chrome, Firefox, Safari, and Edge

### SC3: Developer Experience

- **Onboarding Speed**: New developers can understand component styling in under 5 minutes (vs 15-20 minutes currently)
- **Modification Speed**: Style changes complete in under 30 seconds (vs 1-2 minutes with scoped CSS)
- **Reduced Context Switching**: Developers modify styling without switching between markup and style blocks
- **Documentation Clarity**: Component markup serves as self-documenting style guide

### SC4: Accessibility Compliance

- **Keyboard Navigation**: All focus states remain visible and meet WCAG 2.1 AA contrast requirements
- **Reduced Motion**: All animations respect `prefers-reduced-motion: reduce` preference
- **Touch Targets**: All interactive elements maintain minimum 44x44px touch target size
- **Screen Readers**: No changes to semantic HTML structure or ARIA attributes

### SC5: Performance Maintenance

- **Bundle Size**: Overall CSS bundle size reduces or stays neutral (no increase)
- **Lighthouse Score**: Maintain current performance scores (no degradation)
- **First Contentful Paint**: No regression in FCP metrics
- **Time to Interactive**: No regression in TTI metrics

### SC6: Maintainability Improvements

- **Consistency**: All components use identical Tailwind patterns for identical visual patterns
- **Searchability**: Developers can find all instances of a color/spacing value through text search
- **Refactoring Safety**: Style changes isolated to single source (design tokens) instead of scattered across files
- **Code Review Efficiency**: Style changes visible in markup diffs, no separate style block review needed

## Key Entities

### Design Tokens

**Purpose**: Central source of truth for visual design values

**Properties**:
- Color tokens: Primary, surface, text, accent (terracotta), borders
- Spacing scale: Consistent increments for padding, margin, gap
- Typography scale: Display sizes (xl, lg, md), body sizes (lg, md, sm)
- Transition durations: Standard animation timing values
- Border radius values: Consistent corner rounding
- Shadow definitions: Elevation system values

**Location**: global.css @theme block (35+ custom properties)

**Usage**: Referenced via `var(--token-name)` in Tailwind arbitrary values

### Component Styling Patterns

**Purpose**: Reusable visual patterns across components

**Common Patterns**:
- Card containers: Border, padding, background, shadow, radius
- Button variants: Primary, secondary, ghost styles
- Navigation items: Spacing, hover states, active indicators
- Grid layouts: Auto-fit patterns, gap spacing
- Responsive containers: Max-width, padding, centering

**Conversion Strategy**: Identify patterns, convert to consistent Tailwind utilities

### Animation Definitions

**Purpose**: Complex animations requiring keyframe declarations

**Preserved Animations**:
- wordFadeIn: Fade and slide-up animation for hero text
- blink: Cursor blinking animation for brand component
- Hamburger transforms: Menu icon rotation and line transforms

**Location**: Component scoped `<style>` blocks (AnimatedHero.tsx, AnimatedBrand.tsx, Header.astro)

**Rationale**: Keyframe animations not efficiently expressible as utilities

## Assumptions

### Design System Assumptions

- **Design Token Completeness**: The existing 35+ design tokens in global.css @theme cover all color, spacing, and typography values needed
- **No New Tokens**: Migration does not require creating new design tokens beyond those already defined
- **Token Naming**: Current token naming convention (`--color-*`, `--font-size-*`, `--spacing-*`) is consistent and comprehensive

### Tailwind Configuration Assumptions

- **Tailwind v4 Features**: All Tailwind v4.0.0 features (CSS-first configuration, arbitrary values, modern syntax) are available
- **Build Process**: Existing build process correctly processes Tailwind directives and generates utility classes
- **Purging**: Tailwind's content scanning correctly identifies used utilities across .astro, .tsx, and .jsx files

### Visual Design Assumptions

- **No Design Changes**: This is a pure refactoring effort with zero intentional visual changes
- **Current Design Approval**: The existing visual design is approved and should be preserved exactly
- **Breakpoint Strategy**: The two-breakpoint responsive strategy (640px, 768px) is sufficient for the marketing site

### Browser Support Assumptions

- **Modern Browsers**: Target audience uses modern browsers supporting CSS custom properties, flexbox, and grid
- **No IE11**: No requirement to support Internet Explorer 11 or older browsers
- **Standard Features**: All Tailwind utilities work in target browsers without polyfills

### Development Workflow Assumptions

- **Testing Capability**: Developer can visually compare before/after screenshots at standard breakpoints
- **Dev Server**: Local development server (npm run dev) hot-reloads changes for quick iteration
- **No Breaking Changes**: Migration can be completed on a feature branch without disrupting main branch

### Component Architecture Assumptions

- **Astro Islands**: React components (AnimatedHero, AnimatedBrand, MobileMenu) will retain inline `<style>` blocks for component-specific animations
- **File Structure**: No changes to component file locations or import paths
- **Props/Slots**: No changes to component APIs, only internal styling implementation

### Performance Assumptions

- **Utility Efficiency**: Tailwind's utility classes are more efficient than equivalent scoped CSS due to reuse
- **Bundle Size**: Overall stylesheet size will decrease or remain neutral (no increase)
- **Runtime Performance**: No runtime performance impact from switching to utilities vs scoped CSS

### Accessibility Assumptions

- **Semantic Preservation**: All semantic HTML and ARIA attributes remain unchanged
- **Focus Management**: Tailwind's focus-visible variant correctly implements focus styling
- **Motion Preferences**: motion-reduce variant correctly applies when user has reduced-motion preference

### Third-Party Integration Assumptions

- **Shiki Compatibility**: Syntax highlighting library (Shiki) styles won't conflict with Tailwind utilities
- **No External Dependencies**: No additional npm packages required for this migration
- **Build Tool Support**: Vite + Astro correctly handle Tailwind v4 CSS processing
