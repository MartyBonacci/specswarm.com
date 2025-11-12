# Implementation Plan: Complete Site Redesign with New Content Strategy

**Feature**: 002-complete-site-redesign-implementing-new-content-strategy-and
**Created**: 2025-11-11
**Status**: Planning Complete

---

## Executive Summary

This plan outlines the complete teardown and rebuild of specswarm.com with a new content strategy and Anthropic-inspired design system. The implementation will replace all existing pages and components while maintaining the approved tech stack (Astro 5, React 19, Tailwind CSS v4).

**Key Deliverables**:
- 5 new pages (Home, Features, Get Started, Docs, Use Cases)
- Complete design system based on anthropic.com aesthetic (light theme)
- All content sourced from main SpecSwarm repository
- Responsive, accessible, performant implementation

**Estimated Complexity**: High (complete redesign, design extraction, content rewrite)

---

## Tech Stack Compliance Report

### ✅ Approved Technologies (already in stack)

All technologies required for this feature are pre-approved in `/memory/tech-stack.md`:

- **Astro** 5.15.4 - Static site generator (approved)
- **React** 19.2.0 - UI library for islands (approved)
- **TypeScript** 5.x - Language (approved)
- **Tailwind CSS** 4.0.0 - Styling framework (approved)
- **Shiki** 3.15.0 - Syntax highlighting (approved)
- **Lucide React** - Icons (approved in "Icons" section)

### ➕ New Technologies

**None**. This feature uses only existing approved technologies.

### ⚠️ Conflicting Technologies

**None** detected.

### ❌ Prohibited Technologies

**None** used. The feature spec explicitly avoids:
- Redux/MobX (using React hooks for island state - compliant)
- CSS-in-JS (using Tailwind CSS - compliant)
- Class components (functional components only - compliant)

**Tech Stack Validation**: ✅ **PASS** - No violations, no new technologies, fully compliant

---

## Constitution Check

### Principle 1: Performance First

**Status**: ✅ **ALIGNED**

**Evidence from Spec**:
- FR9.1: Lighthouse performance score ≥95 (matches constitution requirement)
- FR9.1: Bundle size per page <200KB (matches constitution requirement)
- FR9.1: LCP <2.5s, TBT <200ms, CLS <0.1 (all match constitution)
- Success Criteria: "Core Web Vitals meet 'Good' thresholds"

**Implementation Notes**:
- Astro SSG ensures minimal JavaScript by default
- React islands only for interactive components (AnimatedHero, MobileMenu if needed, CodeBlock)
- Shiki server-side rendering (zero runtime cost)
- Image optimization and lazy loading planned

### Principle 2: Content Accuracy and Freshness

**Status**: ✅ **ALIGNED**

**Evidence from Spec**:
- FR8.1: All content sourced from `/home/marty/code-projects/specswarm/` repo
- FR8.2: "Accurate command syntax for all examples"
- FR8.2: "Version numbers and statistics match official SpecSwarm data"
- Success Criteria: "Content accurately reflects SpecSwarm README.md source"

**Implementation Notes**:
- Content extraction phase will reference latest SpecSwarm docs
- Feature 015 case study data verified from CHANGELOG.md
- Command examples from CHEATSHEET.md

### Principle 3: Accessibility as Standard

**Status**: ✅ **ALIGNED**

**Evidence from Spec**:
- FR9.2: WCAG 2.1 Level AA compliance required
- FR9.2: Semantic HTML, keyboard navigation, screen reader support
- FR9.2: Color contrast ratios (4.5:1 normal, 3:1 large)
- Success Criteria: "Zero violations in axe-core accessibility audit"
- Success Criteria: "All interactive elements keyboard-accessible"

**Implementation Notes**:
- Animations respect prefers-reduced-motion
- Focus indicators on all interactive elements
- Alternative text for all icons/images

### Principle 4: User-Centric Design

**Status**: ✅ **ALIGNED**

**Evidence from Spec**:
- 6 user scenarios covering discovery to power usage
- Content Strategy: "Minimal and confident - no overselling or marketing fluff"
- FR9.3: Mobile-first approach
- Design System: Generous whitespace, clear hierarchy
- Success Criteria: "Visitors understand value within 30 seconds"

**Implementation Notes**:
- Problem-first approach leads with developer pain points
- Progressive disclosure (3-command workflow, then granular options)
- Scannable content (bullets, clear sections, visual hierarchy)

### Principle 5: Developer Experience (DX)

**Status**: ✅ **ALIGNED**

**Evidence from Spec**:
- TypeScript 5.x strict mode required
- Component organization: Pages, Components (shared), Design System
- Reusable components specified (Header, Footer, CTA Buttons, Code Block, etc.)
- FR9.6: "Build completes without errors or warnings"

**Implementation Notes**:
- Clear component structure from spec
- TypeScript interfaces for all components
- Consistent naming conventions

### Principle 6: SEO and Discoverability

**Status**: ✅ **ALIGNED**

**Evidence from Spec**:
- FR9.5: Complete SEO optimization requirements
- FR9.5: Semantic HTML with proper meta tags
- FR9.5: OpenGraph and Twitter Card tags
- FR9.5: Page titles and meta descriptions specified
- FR9.5: Proper heading structure (single H1, logical hierarchy)

**Implementation Notes**:
- Each page has defined title and description
- Clean URLs (/, /features, /get-started, /docs, /use-cases)
- Semantic HTML throughout

**Overall Constitution Compliance**: ✅ **100% ALIGNED** - All 6 principles satisfied

---

## Technical Context

### Primary Technologies

**Framework**: Astro 5.15.4
- Static site generation (SSG) for optimal performance
- React islands for interactivity
- File-based routing
- Built-in optimization (image, CSS, JS)

**UI Library**: React 19.2.0
- Functional components only
- Hooks for island state (useState, useEffect)
- Islands architecture (selective hydration)

**Language**: TypeScript 5.x (strict mode)
- Strict type checking enabled
- Interfaces for all component props
- Type safety across codebase

**Styling**: Tailwind CSS v4.0.0 (Oxide engine)
- Utility-first CSS framework
- Configured via @tailwindcss/vite plugin
- Custom design tokens from anthropic.com analysis

**Syntax Highlighting**: Shiki 3.15.0
- VS Code-quality highlighting
- Server-side rendering (zero runtime cost)
- Minimal color scheme for light theme

**Icons**: Lucide React
- Simple, minimal icon set
- Tree-shakeable imports
- Consistent visual style

### Design System Source

**Primary Reference**: anthropic.com

**Extraction Requirements**:
- Color palette (adapted to light theme)
  - Primary text: #131314 (deep charcoal)
  - Accent: #d97757 (terracotta)
  - Background: #FAF9F0 (light cream/warm white)
  - Surface: #FFFFFF (pure white)
  - Borders: #E5E5E5 (subtle gray)
- Typography scale (clamp() values for fluid sizing)
  - System font stack or Anthropic font
  - Fira Code for monospace/code
- Spacing system (section: 80-120px, element: 16-32px)
- Animation patterns (text entrance, scroll reveals, hover transitions)
- Component styles (buttons, cards, code blocks)

### Content Sources

**SpecSwarm Repository** (`/home/marty/code-projects/specswarm/`):
- README.md - Feature descriptions, command examples
- CHANGELOG.md - Feature 015 metrics and validation data
- docs/WORKFLOW.md - Workflow guidance
- docs/CHEATSHEET.md - Command reference
- marketplace.json - Plugin metadata

**Redesign Spec**: `/home/marty/code-projects/specswarm.com/docs/redesign-2025.md`
- Complete content strategy
- Page-by-page content specifications
- Design system details

### Architecture Patterns

**Astro Islands**:
- Static pages with selective interactivity
- React components for interactive elements only
- Hydration strategies:
  - `client:load` - Hero animations (above fold)
  - `client:visible` - Below-fold components
  - `client:idle` - Non-critical interactivity

**File Structure**:
```
src/
├── pages/
│   ├── index.astro         (Home)
│   ├── features.astro      (Features)
│   ├── get-started.astro   (Get Started)
│   ├── docs.astro          (Documentation Hub)
│   └── use-cases.astro     (Use Cases)
├── layouts/
│   └── BaseLayout.astro    (SEO, meta tags, global structure)
├── components/
│   ├── Header.astro
│   ├── Footer.astro
│   ├── AnimatedHero.tsx    (React island)
│   ├── MobileMenu.tsx      (React island, if needed)
│   ├── CodeBlock.tsx       (React island)
│   ├── Button.astro
│   ├── FeatureCard.astro
│   └── ScenarioCard.astro
└── styles/
    └── global.css          (@import "tailwindcss")
```

**Component Responsibility**:
- `.astro` files: Static content, layout, server-side rendering
- `.tsx` files: Interactive islands with client-side state
- Minimal props passed to islands (serialization cost)

### Performance Strategy

**Optimization Techniques**:
- Astro SSG (pre-rendered HTML)
- Minimal JavaScript (islands only)
- CSS purging via Tailwind (unused classes removed)
- Shiki server-side (no runtime highlighting)
- Image optimization (if images added)
- Lazy loading for below-fold content
- No external fonts if system stack sufficient

**Bundle Budget**: <200KB per page
- Breakdown estimate:
  - HTML: ~10-15KB
  - CSS (Tailwind): ~30-50KB (gzipped)
  - JS (React islands): ~80-100KB (gzipped)
  - Shiki: Server-rendered (0KB client)
  - Total: ~120-165KB (within budget)

### Accessibility Strategy

**WCAG 2.1 Level AA Compliance**:
- Semantic HTML (header, nav, main, footer, article, section)
- Heading hierarchy (single H1 per page)
- ARIA labels where needed (icon buttons, navigation)
- Keyboard navigation (Tab, Enter, Esc for modals)
- Focus indicators (outline, ring utilities)
- Color contrast validation (4.5:1 minimum)
- Screen reader testing (NVDA/VoiceOver)
- prefers-reduced-motion support

**Testing Tools**:
- axe-core during development
- Lighthouse accessibility audit
- Manual keyboard navigation testing
- Screen reader verification

### Browser Support

**Target Browsers**:
- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions - macOS and iOS)

**No Support**:
- Internet Explorer 11 (deprecated)
- Legacy browsers (graceful degradation)

**Feature Detection**:
- Clipboard API (for copy buttons - graceful fallback)
- IntersectionObserver (for scroll animations - progressive enhancement)

---

## Phase 0: Research & Design Extraction

### Research Tasks

#### R1: anthropic.com Design Extraction

**Objective**: Extract exact design system values from anthropic.com for light theme adaptation

**Tasks**:
1. Visit anthropic.com and analyze design language
2. Extract color palette:
   - Primary text colors
   - Accent colors (terracotta #d97757)
   - Background colors
   - Border colors
   - Code block colors
3. Extract typography system:
   - Font families (system stack or web fonts)
   - Fluid typography clamp() values
   - Font weights and line heights
   - Heading scale
4. Extract spacing system:
   - Container max-width and padding
   - Section spacing (vertical rhythm)
   - Grid system and gaps
5. Extract animation patterns:
   - Text entrance effects (staggered words)
   - Scroll reveal animations
   - Hover transitions (timing, easing)
6. Extract component styles:
   - Button styles (outlined, filled states)
   - Card styles (shadows, borders, radius)
   - Link styles (underline offset, color)
7. Document in research.md with exact CSS values

**Deliverable**: research.md with complete design system specification

#### R2: Content Extraction from SpecSwarm Repo

**Objective**: Extract accurate content from SpecSwarm source documentation

**Tasks**:
1. Read `/home/marty/code-projects/specswarm/README.md`:
   - Extract feature descriptions
   - Extract command examples with syntax
   - Extract value proposition text
2. Read `/home/marty/code-projects/specswarm/CHANGELOG.md`:
   - Extract Feature 015 validation data (76/76 tasks, 96.3% pass rate)
   - Extract time savings metrics (3-5 days → 4-5 hours)
   - Verify all statistics for accuracy
3. Read `/home/marty/code-projects/specswarm/docs/WORKFLOW.md`:
   - Extract workflow explanations
   - Extract step-by-step guidance
4. Read `/home/marty/code-projects/specswarm/docs/CHEATSHEET.md`:
   - Extract command reference
   - Extract common workflows
   - Extract flags and options
5. Document extracted content in research.md with source citations

**Deliverable**: research.md with source content organized by page

#### R3: Animation Implementation Patterns

**Objective**: Research Intersection Observer and animation best practices

**Tasks**:
1. Research Intersection Observer API:
   - Threshold values for scroll reveals
   - Lazy loading patterns
   - Performance considerations
2. Research text animation patterns:
   - Word-by-word staggered entrance
   - CSS vs JS animation trade-offs
   - prefers-reduced-motion handling
3. Research React + Astro island animation:
   - Hydration timing
   - Animation triggers
   - State management for animations
4. Document implementation approach in research.md

**Deliverable**: research.md with animation implementation strategy

### Design Decisions

#### DD1: Mobile Menu Implementation

**Decision**: Conditional mobile menu based on navigation link count

**Options Considered**:
1. Always use hamburger menu on mobile
2. Stack navigation links if 5 links fit cleanly
3. Hybrid: Hamburger only if links don't fit

**Chosen**: Option 3 (Hybrid approach)

**Rationale**:
- 5 navigation links (Home, Features, Get Started, Docs, Use Cases) + GitHub icon
- Test during implementation if links fit at 375px width
- If fit: Stack vertically, no hamburger needed (simpler)
- If don't fit: Implement hamburger menu React island
- Reduces complexity if menu not needed

**Implementation Notes**:
- Design mobile navigation layout first
- Test at 375px (iPhone SE) and 414px (iPhone Pro Max)
- If hamburger needed, create MobileMenu.tsx React island
- Use client:load for above-fold menu

#### DD2: Hero Text Animation Complexity

**Decision**: Simple staggered fade-in on homepage hero only

**Options Considered**:
1. Complex animation with transforms, rotations, color changes
2. Simple staggered fade-in
3. No animation (static text)

**Chosen**: Option 2 (Simple staggered fade-in)

**Rationale**:
- Matches Anthropic aesthetic (moderate motion)
- Adds polish without overwhelming
- Performance budget friendly
- Easy to disable with prefers-reduced-motion
- One-time animation (not repeating)
- Applied only to homepage hero (other pages static)

**Implementation Notes**:
- AnimatedHero.tsx React island
- Split text into words, map with index
- Opacity 0 → 1 transition, 50-100ms stagger
- Total animation duration ~1-2 seconds
- CSS transition (not JavaScript for performance)
- respects prefers-reduced-motion (instant display)

#### DD3: Code Block Interactivity

**Decision**: Display-only code blocks with minimal styling

**Options Considered**:
1. Interactive code blocks with copy button
2. Display-only with syntax highlighting
3. Plain text (no highlighting)

**Chosen**: Option 2 (Display-only with syntax highlighting)

**Rationale**:
- Spec states "minimal code examples (1-2 lines max)"
- Single-line commands don't need copy buttons
- Shiki server-side rendering (zero runtime cost)
- Reduces React island count (better performance)
- Users can manually select and copy

**Implementation Notes**:
- Use Shiki during Astro build (not client-side)
- Minimal color scheme for light theme
- Light gray background (#F5F5F5)
- No line numbers for single-line examples
- Responsive: horizontal scroll on mobile if needed

#### DD4: Design Token Organization

**Decision**: Tailwind CSS custom config with anthropic.com values

**Options Considered**:
1. Custom CSS variables + Tailwind utilities
2. Tailwind config with extend theme
3. Inline values in components

**Chosen**: Option 2 (Tailwind config extend)

**Rationale**:
- Maintains Tailwind utility-first approach
- Centralizes design tokens (single source of truth)
- Type-safe with TypeScript
- Easy to update globally
- No context switching (all Tailwind)

**Implementation Notes**:
- tailwind.config.mjs extend:
  - colors: { primary, accent, surface, border }
  - fontSize: { display-xl, display-m, body-l }
  - spacing: { section-lg, section-md, element-lg }
- Use semantic names (not anthropic-specific)
- Document mapping in research.md

#### DD5: Font Strategy

**Decision**: Use system font stack (no web fonts)

**Options Considered**:
1. Load Anthropic's web font (if identifiable)
2. Use similar web font (Inter, Geist, etc.)
3. System font stack

**Chosen**: Option 3 (System font stack)

**Rationale**:
- Zero network requests (instant load)
- Native rendering (best performance)
- Respects user's OS preferences
- Smaller bundle size
- Constitution Principle 1 (Performance First)

**Implementation Notes**:
```css
font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
             "Helvetica Neue", Arial, sans-serif;
```
- Code font: Fira Code (if available) or monospace fallback
- Document in global.css
- Test rendering on macOS, Windows, Linux

---

## Phase 1: Foundation Setup

### F1: Project Structure and Cleanup

**Objective**: Remove existing code and create fresh structure

**Tasks**:
1. **Delete existing pages**:
   - Remove src/pages/index.astro (current home)
   - Remove src/pages/features.astro (current features)
   - Remove src/pages/pricing.astro (current pricing)

2. **Delete existing components**:
   - Remove all components in src/components/
   - Clean slate for new components

3. **Create new directory structure**:
   ```
   mkdir -p src/pages
   mkdir -p src/layouts
   mkdir -p src/components
   mkdir -p src/styles
   ```

4. **Preserve configuration files**:
   - Keep astro.config.mjs
   - Keep package.json
   - Keep tsconfig.json
   - Keep tailwind.config (will update)

**Acceptance Criteria**:
- All old page files deleted
- All old component files deleted
- New directory structure created
- Configuration files preserved
- Build still runs (even if empty)

### F2: Design System Configuration

**Objective**: Configure Tailwind CSS with anthropic.com design tokens

**Tasks**:
1. **Update tailwind.config.mjs**:
   - Extend theme with custom colors:
     ```js
     colors: {
       primary: '#131314',
       secondary: '#64748b', // slate
       accent: '#d97757',    // terracotta
       background: '#FAF9F0',
       surface: '#FFFFFF',
       border: '#E5E5E5',
       'code-bg': '#F5F5F5',
     }
     ```
   - Extend fontSize with fluid typography:
     ```js
     fontSize: {
       'display-xl': 'clamp(2.5rem, 2.04rem + 1.95vw, 4rem)',
       'display-m': 'clamp(1.75rem, 1.67rem + 0.32vw, 2rem)',
       'body-l': 'clamp(1.125rem, 1.08rem + 0.16vw, 1.25rem)',
     }
     ```
   - Extend spacing:
     ```js
     spacing: {
       'section-lg': 'clamp(5rem, 4rem + 4vw, 7.5rem)',
       'section-md': 'clamp(3rem, 2.5rem + 2vw, 5rem)',
     }
     ```

2. **Create src/styles/global.css**:
   ```css
   @import "tailwindcss";

   /* System font stack */
   html {
     font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
                  "Helvetica Neue", Arial, sans-serif;
   }

   /* Code font */
   code, pre {
     font-family: 'Fira Code', 'Cascadia Code', 'Consolas', monospace;
   }

   /* Smooth scrolling */
   html {
     scroll-behavior: smooth;
   }

   /* Reduced motion */
   @media (prefers-reduced-motion: reduce) {
     *,
     *::before,
     *::after {
       animation-duration: 0.01ms !important;
       animation-iteration-count: 1 !important;
       transition-duration: 0.01ms !important;
     }
   }
   ```

3. **Import global styles in BaseLayout**

**Acceptance Criteria**:
- Tailwind config includes all design tokens from research.md
- Global CSS created with font stacks and accessibility styles
- Design tokens accessible via Tailwind utilities (bg-accent, text-primary, etc.)
- prefers-reduced-motion styles in place

### F3: Base Layout Component

**Objective**: Create BaseLayout.astro with SEO and global structure

**Tasks**:
1. **Create src/layouts/BaseLayout.astro**:
   - Props interface: { title: string; description: string; ogImage?: string }
   - HTML boilerplate with semantic structure
   - Meta tags:
     - Charset, viewport
     - Title and description
     - OpenGraph tags (og:title, og:description, og:image, og:url, og:type)
     - Twitter Card tags
   - Global CSS import
   - Slot for page content
   - Header and Footer components (to be created)

2. **SEO Defaults**:
   - Default title suffix: "| SpecSwarm - AI automation that doesn't go off the rails"
   - Default OG image path (to be added later)
   - Canonical URL logic

3. **Type Safety**:
   - TypeScript interface for props
   - Default values for optional props

**Acceptance Criteria**:
- BaseLayout.astro created
- All SEO meta tags included
- TypeScript props interface defined
- Global CSS imported
- Layout renders with test content

---

## Phase 2: Shared Components

### C1: Header Navigation

**Objective**: Create site header with navigation

**Tasks**:
1. **Create src/components/Header.astro**:
   - SpecSwarm logo/brand (text-based)
   - Navigation links: Home | Features | Get Started | Docs | Use Cases
   - GitHub icon link (Lucide React external-link icon)
   - Responsive design:
     - Desktop: Horizontal navigation
     - Mobile: Test if links fit, implement hamburger if needed (see DD1)
   - Active page indicator (check Astro.url.pathname)
   - Sticky/fixed positioning (stays visible on scroll)
   - Tailwind styling with design tokens

2. **Mobile Navigation** (conditional):
   - If needed, create src/components/MobileMenu.tsx (React island)
   - Hamburger icon button
   - Overlay/slide-in menu
   - Close button or outside-click close
   - Smooth animation (200ms ease)
   - client:load directive

3. **Accessibility**:
   - Semantic nav element
   - ARIA labels for GitHub icon
   - Keyboard navigation
   - Focus indicators

**Acceptance Criteria**:
- Header component created and styled
- Navigation links functional
- GitHub link opens in new tab
- Active page indication works
- Mobile responsive (hamburger if needed)
- Keyboard accessible
- Sticky positioning works

### C2: Footer Component

**Objective**: Create site footer with links and attribution

**Tasks**:
1. **Create src/components/Footer.astro**:
   - SpecSwarm branding
   - Navigation links: Documentation | GitHub | Support | License
   - "Free. Forever. MIT License." message
   - Copyright: "© 2025 SpecSwarm"
   - Responsive layout:
     - Desktop: Multi-column or horizontal
     - Mobile: Stacked vertical
   - Tailwind styling (subtle, not competing with content)

2. **Link destinations**:
   - Documentation → /docs
   - GitHub → https://github.com/MartyBonacci/specswarm (external)
   - Support → GitHub issues or same as GitHub
   - License → GitHub license or docs

3. **Styling**:
   - Subtle background (white or very light gray)
   - Small text (14-16px)
   - Adequate padding
   - Border-top separator

**Acceptance Criteria**:
- Footer component created
- All links functional and open correctly
- "Free Forever" message prominent
- Responsive layout works
- Styling subtle and professional

### C3: CTA Button Component

**Objective**: Create reusable CTA button with consistent styling

**Tasks**:
1. **Create src/components/Button.astro**:
   - Props: { href: string; variant?: 'primary' | 'secondary'; children: any }
   - Primary variant:
     - Outlined initially (terracotta border)
     - Filled on hover (terracotta background, white text)
     - 6-8px border-radius
     - 12px 24px padding (medium) or 16px 32px (large prop)
   - Secondary variant (if needed):
     - Different color scheme
   - Smooth transitions (200ms ease)
   - Accessible (focus states, ARIA if needed)

2. **TypeScript**:
   - Interface for props
   - Default variant to 'primary'

3. **Styling**:
   - Tailwind utilities
   - Use design tokens (accent color)
   - Hover and focus states

**Acceptance Criteria**:
- Button component created
- Primary variant matches spec (outlined → filled on hover)
- Smooth transitions work
- TypeScript props interface defined
- Focus indicators visible
- Reusable across pages

### C4: Code Block Component

**Objective**: Create code block with Shiki syntax highlighting

**Tasks**:
1. **Create src/components/CodeBlock.astro**:
   - Props: { code: string; lang: string }
   - Use Shiki for server-side syntax highlighting
   - Light gray background (#F5F5F5)
   - 6-8px border-radius
   - 16-24px padding
   - Fira Code font (or monospace fallback)
   - Minimal color scheme for light theme
   - No line numbers (single-line examples)
   - Responsive: horizontal scroll on mobile if needed

2. **Shiki Configuration**:
   - Import and configure Shiki in component
   - Choose light theme (github-light or similar)
   - Support languages: bash, typescript, markdown, yaml

3. **Styling**:
   - Tailwind utilities
   - Proper overflow handling
   - Readable line-height

**Acceptance Criteria**:
- CodeBlock component created
- Shiki renders syntax highlighting server-side
- Light theme applied
- Responsive with horizontal scroll
- No runtime JavaScript (server-only)
- Renders correctly for bash, typescript, etc.

### C5: Feature Card Component

**Objective**: Create reusable feature card for Features page

**Tasks**:
1. **Create src/components/FeatureCard.astro**:
   - Props: { icon: string; title: string; description: string; codeExample?: string }
   - Icon (Lucide React component)
   - Title (heading)
   - Description (2-3 sentences)
   - Optional code example (using CodeBlock component)
   - Consistent styling:
     - White background (surface color)
     - Subtle border or shadow
     - 8-12px border-radius
     - 24-32px padding
     - Equal visual weight

2. **Layout**:
   - Icon at top (or left)
   - Title below icon
   - Description below title
   - Code example at bottom (if provided)

3. **Styling**:
   - Tailwind utilities
   - Design tokens
   - Proper spacing between elements

**Acceptance Criteria**:
- FeatureCard component created
- Icon, title, description rendering correctly
- Optional code example works
- Consistent styling
- Reusable for 6 feature cards

### C6: Scenario Card Component

**Objective**: Create scenario card for Use Cases page

**Tasks**:
1. **Create src/components/ScenarioCard.astro**:
   - Props: { icon: string; challenge: string; approach: string; result: string }
   - Icon (Lucide React)
   - "The Challenge" section
   - "The SpecSwarm Approach" section
   - "Result" section
   - Consistent styling with FeatureCard

2. **Layout**:
   - Icon at top
   - Three sections clearly separated
   - Visual hierarchy (headings, spacing)

3. **Styling**:
   - White background
   - Subtle border/shadow
   - Adequate padding and spacing

**Acceptance Criteria**:
- ScenarioCard component created
- All three sections render correctly
- Icon displays properly
- Consistent with FeatureCard styling
- Reusable for 3 scenario cards

---

## Phase 3: Page Implementation

### P1: Home Page

**Objective**: Implement complete homepage with all sections

**Tasks**:
1. **Create src/pages/index.astro**:
   - Use BaseLayout with title: "Home | SpecSwarm - AI automation that doesn't go off the rails"
   - Meta description: "SpecSwarm maintains YOUR tech stack, follows natural development workflows, and keeps you in control. Build → Fix → Ship in 3 commands."

2. **Hero Section**:
   - Implement AnimatedHero component (see C7 below)
   - Heading: "AI automation that doesn't go off the rails"
   - Subtext: "When AI builds features, does it use YOUR stack? Follow YOUR patterns? Ask before making decisions?"
   - CTA Button: "Get Started in 5 Minutes" (href="/get-started")
   - Generous whitespace, center-aligned

3. **Problem Section**:
   - Heading: "The Problem with AI Code Generation"
   - List 4 pain points (bullets or icons):
     - Drifts from your approved tech stack
     - Makes decisions without asking
     - Black box automation you can't control
     - Inconsistent with your patterns
   - Single column, clean layout

4. **Solution Section - Three Commands**:
   - Heading: "Build. Fix. Ship."
   - 3-column grid (desktop) or stacked (mobile):
     - /specswarm:build (CodeBlock + description)
     - /specswarm:fix (CodeBlock + description)
     - /specswarm:ship (CodeBlock + description)
   - Small note: "Need more control? Granular commands available for power users."

5. **What Makes It Different Section**:
   - Heading: "What Makes SpecSwarm Different"
   - 4 FeatureCards in 2x2 grid:
     - Tech Stack Enforcement
     - Natural Workflows
     - Decision Checkpoints
     - Quality Gates
   - (Or create inline cards if FeatureCard not suitable)

6. **Proof Section**:
   - Single line: "85-90% time savings • 96.3% test pass rate • 76/76 tasks completed"
   - Link: "Read the full case study →" (href="/use-cases#case-study")
   - Centered, small text, subtle

7. **Footer CTA**:
   - Text: "Try your first feature in 5 minutes"
   - Button: "Get Started" (href="/get-started")
   - Centered, clean

**Acceptance Criteria**:
- All 7 sections implemented
- Hero animation works (or static if animation skipped)
- All content accurate (from research.md)
- Responsive design works
- Links functional
- Tailwind styling applied
- Matches spec design intent

### P2: Features Page

**Objective**: Implement Features page with feature grid

**Tasks**:
1. **Create src/pages/features.astro**:
   - BaseLayout with title: "Features | SpecSwarm"
   - Meta description: "Complete capabilities for build, maintain, and ship. Tech stack enforcement, quality gates, natural workflows, and autonomous execution."

2. **Page Hero**:
   - Heading: "Capabilities"
   - Subtext: "Everything you need to build, maintain, and ship with confidence."

3. **Feature Grid**:
   - 6 FeatureCards in 2-3 column grid:
     1. Tech Stack Enforcement (icon, description, optional code)
     2. Build → Fix → Ship (icon, description)
     3. Quality Gates (icon, description)
     4. Natural Workflows (icon, description)
     5. Autonomous Execution (icon, description)
     6. Complete Lifecycle (icon, description)
   - Content from `/home/marty/code-projects/specswarm/README.md` (via research.md)

4. **Footer CTA**:
   - Text: "See it in action"
   - Button: "Explore Use Cases" (href="/use-cases")

**Acceptance Criteria**:
- All 6 feature cards implemented
- Content accurate and sourced from SpecSwarm README
- Grid responsive (2-3 cols desktop, 1 col mobile)
- Icons display correctly
- Footer CTA works

### P3: Get Started Page

**Objective**: Implement Get Started tutorial page

**Tasks**:
1. **Create src/pages/get-started.astro**:
   - BaseLayout with title: "Get Started | SpecSwarm"
   - Meta description: "Install SpecSwarm and build your first feature in 5 minutes. Step-by-step guide from installation to first ship."

2. **Page Hero**:
   - Heading: "Get Started"
   - Subtext: "Install SpecSwarm and build your first feature in 5 minutes."

3. **4-Step Tutorial**:
   - Linear flow with numbered steps

   **Step 1: Install**:
   - CodeBlock: `/plugin https://github.com/MartyBonacci/specswarm`
   - Description: "SpecSwarm is a Claude Code plugin. Run this command in Claude Code to install."

   **Step 2: Initialize Your Project**:
   - CodeBlock: `/specswarm:init`
   - Description: "Define your tech stack and quality standards. Creates configuration files."

   **Step 3: Build Your First Feature**:
   - CodeBlock: `/specswarm:build "add user profile avatar upload feature"`
   - Bullet list:
     - Ask clarifying questions
     - Create implementation plan
     - Break into tasks
     - Write code, tests, docs
     - Run quality validation
   - Note: "You review and approve at each checkpoint."

   **Step 4: Ship It**:
   - CodeBlock: `/specswarm:ship`
   - Description: "Quality checks. Merge if passing. Report if not."

4. **Next Steps Section**:
   - Heading: "Next Steps"
   - List:
     - Try /specswarm:fix for bug fixing
     - Explore granular commands for more control
     - Read full documentation
   - Link: "View Documentation →" (href="/docs")

**Acceptance Criteria**:
- All 4 steps implemented with correct content
- CodeBlocks render with syntax highlighting
- Clear visual separation between steps
- Next Steps section includes link to docs
- Mobile responsive

### P4: Documentation Hub Page

**Objective**: Implement Documentation Hub with command reference

**Tasks**:
1. **Create src/pages/docs.astro**:
   - BaseLayout with title: "Documentation | SpecSwarm"
   - Meta description: "Complete command reference, workflows, and configuration guide for SpecSwarm."

2. **Page Hero**:
   - Heading: "Documentation"
   - Subtext: "Complete reference for SpecSwarm workflows, commands, and configuration."

3. **Quick Command Reference Section**:
   - Subheading: "Quick Command Reference"

   **High-Level Commands**:
   - List 4 commands:
     - /specswarm:build - Description + example
     - /specswarm:fix - Description + example
     - /specswarm:upgrade - Description + example
     - /specswarm:ship - Description + example
   - Use CodeBlock for examples

   **Granular Commands**:
   - List 6 commands:
     - /specswarm:specify
     - /specswarm:clarify
     - /specswarm:plan
     - /specswarm:tasks
     - /specswarm:implement
     - /specswarm:complete
   - Brief description each

   - Link: "View full command reference on GitHub →"

4. **Common Workflows Section**:
   - Subheading: "Common Workflows"
   - 3 workflows:
     - New Feature Development (numbered steps)
     - Bug Fixing (numbered steps)
     - Dependency Upgrade (numbered steps)
   - Link: "Read detailed workflow guide →" (GitHub)

5. **Configuration Section**:
   - Subheading: "Project Configuration"
   - Topics:
     - Tech Stack Definition
     - Quality Standards
     - Advanced Configuration
   - Link: "View configuration guide →"

6. **External Resources Section**:
   - Subheading: "External Resources"
   - Links:
     - Full Workflow Guide (GitHub)
     - Command Cheatsheet (GitHub)
     - GitHub Repository
     - Changelog

**Acceptance Criteria**:
- All sections implemented
- Commands displayed with CodeBlock
- All external links functional and open in new tab
- Content accurate (from CHEATSHEET.md via research.md)
- Clean documentation layout

### P5: Use Cases Page

**Objective**: Implement Use Cases page with scenarios and case study

**Tasks**:
1. **Create src/pages/use-cases.astro**:
   - BaseLayout with title: "Use Cases | SpecSwarm"
   - Meta description: "Real-world SpecSwarm scenarios: new features (3-5 days → 4-5 hours), bug fixing with regression tests, dependency upgrades."

2. **Page Hero**:
   - Heading: "Use Cases"
   - Subtext: "See how SpecSwarm handles real development scenarios."

3. **3 Scenario Cards**:
   - Use ScenarioCard component:

     **Scenario 1: Building a New Feature**:
     - Icon
     - Challenge: Manual development (3-5 days)
     - Approach: /specswarm:build command
     - Result: "3-5 days → 4-5 hours"

     **Scenario 2: Fixing a Production Bug**:
     - Icon
     - Challenge: Manual debugging and regression tests
     - Approach: /specswarm:fix command
     - Result: "Automated regression test creation"

     **Scenario 3: Upgrading Major Dependencies**:
     - Icon
     - Challenge: Reading changelogs, refactoring
     - Approach: /specswarm:upgrade command
     - Result: "Automated breaking change analysis"

4. **Case Study Section** (id="case-study"):
   - Heading: "Real-World Production Validation"
   - Subheading: "Project: CustomCult2 - React 19 + Redux + Three.js"
   - Feature: "Complete testing infrastructure"
   - Scope bullets:
     - Vitest configuration
     - React Testing Library
     - 3D rendering test utilities
     - Redux store testing
     - Component test suite (26 components)
   - Results metrics:
     - 76/76 tasks completed (100%)
     - 131/136 tests passing (96.3%)
     - 3,500+ lines test code
     - 1,530 lines documentation
     - Successfully merged to sprint-4
   - Time comparison: 3-5 days → 4-5 hours
   - Validation points:
     - Tech stack enforcement
     - Autonomous execution
     - Production-ready quality
     - Complex dependency handling
   - Link: "View full case study →" (GitHub)

**Acceptance Criteria**:
- All 3 scenario cards implemented
- Case study section complete with accurate data (from CHANGELOG.md)
- Metrics formatted cleanly
- ID anchor works for navigation from home page
- Content accurate and verified

---

## Phase 4: React Islands (Interactive Components)

### C7: Animated Hero Text Component

**Objective**: Create staggered word animation for homepage hero

**Tasks**:
1. **Create src/components/AnimatedHero.tsx**:
   - Props: { text: string }
   - Split text into words
   - Map each word to span with staggered animation
   - Opacity 0 → 1 transition
   - Delay: 50-100ms * index
   - Duration: 400-600ms
   - Easing: ease-out
   - CSS-based (not JavaScript animation)

2. **prefers-reduced-motion**:
   - Check media query
   - If reduced motion: instant display (no animation)
   - CSS approach: animation-duration: 0.01ms

3. **Integration**:
   - Use in index.astro hero section
   - client:load directive (above fold)
   - Pass hero text as prop

4. **TypeScript**:
   - Interface for props
   - Type safety

**Acceptance Criteria**:
- AnimatedHero component created
- Words fade in with stagger effect
- prefers-reduced-motion respected (instant display)
- Works in index.astro hero
- CSS-based animation (performant)
- TypeScript types defined

### C8: Mobile Menu Component (Conditional)

**Objective**: Create mobile menu if hamburger needed (see DD1)

**Tasks** (only if needed based on mobile layout testing):
1. **Create src/components/MobileMenu.tsx**:
   - Props: { links: Array<{ href: string; label: string }> }
   - State: isOpen (useState)
   - Hamburger icon button (Lucide Menu icon)
   - Overlay/slide-in panel
   - Navigation links (vertical list)
   - Close button (Lucide X icon)
   - Close on link click
   - Close on outside click (useEffect + ref)

2. **Animation**:
   - Smooth slide-in/out (200ms ease)
   - Overlay fade (background)

3. **Accessibility**:
   - ARIA labels on buttons
   - Keyboard navigation (Tab, Esc to close)
   - Focus management

4. **Integration**:
   - Use in Header.astro (conditional render based on screen size)
   - client:load directive

**Acceptance Criteria** (if component needed):
- MobileMenu component created
- Opens/closes smoothly
- Links render correctly
- Outside click closes menu
- Esc key closes menu
- Accessible (keyboard, ARIA)
- TypeScript types

**Note**: Skip this component entirely if mobile navigation fits without hamburger menu (decision during Header implementation).

---

## Phase 5: Content Population

### CP1: Extract Design Values from anthropic.com

**Objective**: Visit anthropic.com and extract exact design system values

**Tasks**:
1. Visit anthropic.com
2. Use browser DevTools to inspect:
   - Color values (text, backgrounds, accents)
   - Font families and weights
   - Typography scale (clamp() formulas if visible)
   - Spacing values (padding, margins)
   - Animation timings and easings
3. Document exact CSS values in research.md
4. Adapt to light theme:
   - Dark backgrounds → light backgrounds
   - Light text → dark text
   - Preserve accent colors (terracotta)
5. Create mapping table in research.md

**Acceptance Criteria**:
- All design values extracted and documented
- Light theme adaptation complete
- Mapping table created
- Values ready for Tailwind config

### CP2: Extract Content from SpecSwarm Repository

**Objective**: Extract all content from SpecSwarm repo documentation

**Tasks**:
1. **Read and extract from README.md**:
   - Feature descriptions (for Features page)
   - Command examples with syntax
   - Value proposition text
   - Document in research.md with sections:
     - Home Page Content
     - Features Page Content
     - Get Started Content

2. **Read and extract from CHANGELOG.md**:
   - Feature 015 validation data
   - Exact metrics (76/76, 96.3%, etc.)
   - Time savings (3-5 days → 4-5 hours)
   - Scope details
   - Document in research.md under "Case Study Content"

3. **Read and extract from WORKFLOW.md**:
   - Workflow explanations
   - Step descriptions
   - Document in research.md under "Documentation Content"

4. **Read and extract from CHEATSHEET.md**:
   - Command reference
   - Common workflows
   - Flags and options
   - Document in research.md under "Documentation Content"

5. **Verify accuracy**:
   - Cross-check metrics
   - Verify command syntax
   - Check version numbers

**Acceptance Criteria**:
- All content extracted from source files
- Organized in research.md by page
- Metrics verified for accuracy
- Command syntax correct
- Source citations included

### CP3: Write Page Content

**Objective**: Populate all pages with extracted content

**Tasks**:
1. **Update index.astro** with content from research.md:
   - Hero text (verified messaging)
   - Problem section (4 pain points)
   - Solution section (3 commands with descriptions)
   - What Makes It Different (4 features)
   - Proof section (verified metrics)

2. **Update features.astro** with content from research.md:
   - 6 feature descriptions from README.md
   - Accurate feature names and explanations

3. **Update get-started.astro** with content from research.md:
   - 4-step tutorial with accurate descriptions
   - Correct command examples
   - Next steps with links

4. **Update docs.astro** with content from research.md:
   - Command reference from CHEATSHEET.md
   - Workflow descriptions from WORKFLOW.md
   - External links to GitHub docs

5. **Update use-cases.astro** with content from research.md:
   - 3 scenario descriptions
   - Feature 015 case study (verified data from CHANGELOG.md)
   - Accurate metrics and results

**Acceptance Criteria**:
- All pages populated with real content (no placeholders)
- Content matches source documentation exactly
- Metrics accurate and verified
- Command syntax correct
- Links functional

---

## Phase 6: Testing and Quality Assurance

### QA1: Performance Testing

**Objective**: Verify performance meets constitution requirements

**Tasks**:
1. **Build production site**:
   ```bash
   npm run build
   npm run preview
   ```

2. **Run Lighthouse audits**:
   - Test each page (Home, Features, Get Started, Docs, Use Cases)
   - Performance score target: ≥95
   - Metrics targets:
     - FCP <1.5s
     - LCP <2.5s
     - TBT <200ms
     - CLS <0.1

3. **Measure bundle sizes**:
   - Check dist/ folder
   - Each page HTML + CSS + JS < 200KB (gzipped)
   - Use `du -sh dist/` and check individual files

4. **Optimize if needed**:
   - Reduce unused CSS
   - Optimize images (if any)
   - Check for unnecessary JavaScript

**Acceptance Criteria**:
- All pages score ≥95 on Lighthouse performance
- All Core Web Vitals in "Good" range
- Bundle size per page <200KB gzipped
- Zero console errors
- Fast load on 3G throttling

### QA2: Accessibility Testing

**Objective**: Verify WCAG 2.1 Level AA compliance

**Tasks**:
1. **Run axe-core audit**:
   - Install axe DevTools extension
   - Scan each page
   - Fix all violations

2. **Lighthouse accessibility audit**:
   - Check accessibility score (target: 100)
   - Address any issues

3. **Manual keyboard navigation**:
   - Tab through all pages
   - Verify all interactive elements accessible
   - Check focus indicators visible
   - Test Esc key on mobile menu (if applicable)

4. **Screen reader testing** (if possible):
   - Test with NVDA (Windows) or VoiceOver (macOS)
   - Verify all content announced correctly
   - Check heading structure

5. **Color contrast validation**:
   - Use browser tools or WebAIM contrast checker
   - Verify all text meets 4.5:1 (normal) or 3:1 (large)
   - Test with different vision modes (protanopia, deuteranopia, etc.)

**Acceptance Criteria**:
- Zero axe-core violations
- Lighthouse accessibility score 100
- All elements keyboard-accessible
- Focus indicators visible
- Screen reader compatible
- Color contrast ratios meet standards

### QA3: Responsive Design Testing

**Objective**: Verify responsive design works across breakpoints

**Tasks**:
1. **Test at key breakpoints**:
   - Mobile: 375px (iPhone SE)
   - Mobile: 414px (iPhone Pro Max)
   - Tablet: 768px (iPad)
   - Desktop: 1024px
   - Desktop: 1280px
   - Desktop: 1920px

2. **Check all pages**:
   - Verify layouts adapt correctly
   - No horizontal scrolling
   - Text readable (16px+ on mobile)
   - Touch targets adequate (44x44px minimum)
   - Images/content scale appropriately

3. **Test on real devices** (if available):
   - iPhone Safari
   - Android Chrome
   - iPad Safari

4. **Fix any issues**:
   - Adjust breakpoints if needed
   - Fix overflow issues
   - Ensure mobile menu works (if applicable)

**Acceptance Criteria**:
- All pages responsive at all breakpoints
- No horizontal scroll on any device
- Text readable on mobile
- Touch targets adequate
- Mobile menu works (if applicable)
- Images/content scale correctly

### QA4: Browser Compatibility Testing

**Objective**: Verify site works in all target browsers

**Tasks**:
1. **Test in target browsers**:
   - Chrome (latest)
   - Firefox (latest)
   - Safari (macOS - latest)
   - Safari (iOS - latest)
   - Edge (latest)

2. **Check functionality**:
   - All pages load correctly
   - Navigation works
   - Animations work (or respect prefers-reduced-motion)
   - Links functional
   - Forms (if any)

3. **Check styling**:
   - Fonts render correctly
   - Colors accurate
   - Layouts correct
   - No visual bugs

4. **Fix any browser-specific issues**:
   - Add vendor prefixes if needed
   - Polyfills if required
   - Graceful degradation

**Acceptance Criteria**:
- Site works in Chrome, Firefox, Safari, Edge (latest 2 versions)
- All functionality works across browsers
- Styling consistent across browsers
- No console errors in any browser
- Animations work or gracefully degrade

### QA5: Content Accuracy Verification

**Objective**: Verify all content matches source documentation

**Tasks**:
1. **Cross-check content**:
   - Compare each page to research.md
   - Verify against original source files:
     - README.md
     - CHANGELOG.md
     - WORKFLOW.md
     - CHEATSHEET.md

2. **Verify metrics**:
   - 85-90% time savings (from CHANGELOG)
   - 96.3% test pass rate (from CHANGELOG Feature 015)
   - 76/76 tasks completed (from CHANGELOG Feature 015)
   - 3-5 days → 4-5 hours (from CHANGELOG Feature 015)

3. **Verify command syntax**:
   - All commands use correct syntax
   - Flags and options accurate
   - Examples work as written

4. **Check links**:
   - All internal links go to correct pages
   - All external links (GitHub) functional
   - No broken links

5. **Fix any inaccuracies**:
   - Correct any mismatched content
   - Update metrics if needed
   - Fix broken links

**Acceptance Criteria**:
- All content matches source documentation
- Metrics accurate and verified
- Command syntax correct
- All links functional
- No broken or incorrect links

---

## Phase 7: Deployment Preparation

### D1: Build Verification

**Objective**: Ensure production build completes successfully

**Tasks**:
1. **Clean build**:
   ```bash
   rm -rf dist/
   npm run build
   ```

2. **Check for errors/warnings**:
   - Zero build errors
   - Zero TypeScript errors
   - Minimal warnings (acceptable only if harmless)

3. **Verify build output**:
   - Check dist/ folder structure
   - Verify all pages generated
   - Check asset files (CSS, JS)
   - Verify file sizes

4. **Test preview**:
   ```bash
   npm run preview
   ```
   - Visit http://localhost:4321
   - Click through all pages
   - Verify everything works

**Acceptance Criteria**:
- Build completes without errors
- All pages generated in dist/
- Preview server works correctly
- All functionality works in preview

### D2: SEO Metadata Verification

**Objective**: Verify all SEO metadata is correct

**Tasks**:
1. **Check each page source**:
   - View page source in browser
   - Verify meta tags present:
     - Title (unique per page)
     - Description (<160 chars)
     - OpenGraph tags (og:title, og:description, og:image, og:url, og:type)
     - Twitter Card tags
     - Canonical URL

2. **Verify page titles**:
   - Home: "Home | SpecSwarm - AI automation that doesn't go off the rails"
   - Features: "Features | SpecSwarm"
   - Get Started: "Get Started | SpecSwarm"
   - Docs: "Documentation | SpecSwarm"
   - Use Cases: "Use Cases | SpecSwarm"

3. **Verify descriptions**:
   - Unique for each page
   - Under 160 characters
   - Compelling and accurate

4. **Check semantic HTML**:
   - Proper heading hierarchy (H1 → H2 → H3)
   - Single H1 per page
   - Semantic elements (header, nav, main, footer, article, section)

**Acceptance Criteria**:
- All meta tags present on all pages
- Page titles unique and correct
- Descriptions under 160 chars
- OpenGraph and Twitter Card tags correct
- Semantic HTML structure correct
- Single H1 per page

### D3: Final Quality Check

**Objective**: Final review before deployment

**Tasks**:
1. **Manual review checklist**:
   - [ ] All 5 pages complete
   - [ ] All content accurate (verified against sources)
   - [ ] All links functional
   - [ ] All images (if any) have alt text
   - [ ] Responsive design works (mobile, tablet, desktop)
   - [ ] Animations work (or respect reduced motion)
   - [ ] Performance ≥95 Lighthouse score
   - [ ] Accessibility 100 Lighthouse score
   - [ ] Bundle size <200KB per page
   - [ ] Zero console errors
   - [ ] SEO metadata complete
   - [ ] Browser compatibility verified (Chrome, Firefox, Safari, Edge)

2. **Test critical user flows**:
   - Landing → Understanding value → Get Started → Install
   - Home → Features → Explore capabilities
   - Home → Use Cases → Read case study
   - Any page → Docs → Find command reference

3. **Final content review**:
   - Proofread all text
   - Check for typos or grammar issues
   - Verify messaging consistency

4. **Create deployment checklist**:
   - Document in feature directory
   - Pre-deployment steps
   - Post-deployment verification

**Acceptance Criteria**:
- All checklist items completed
- Critical user flows tested
- Content proofread
- Deployment checklist created
- Ready for merge and deployment

---

## Success Criteria

### Technical Success

- ✅ All 5 pages implemented (Home, Features, Get Started, Docs, Use Cases)
- ✅ Design system matches Anthropic aesthetic (light theme, terracotta accent, generous whitespace)
- ✅ All components created and reusable (Header, Footer, Button, CodeBlock, FeatureCard, ScenarioCard)
- ✅ React islands functional (AnimatedHero, MobileMenu if needed)
- ✅ Build completes without errors
- ✅ Lighthouse performance ≥95 on all pages
- ✅ Bundle size <200KB per page (gzipped)
- ✅ Zero console errors

### Content Success

- ✅ All content sourced from SpecSwarm repository
- ✅ Metrics accurate (85-90% savings, 96.3% pass rate, 76/76 tasks)
- ✅ Command syntax correct
- ✅ Feature 015 case study complete with verified data
- ✅ No lorem ipsum or placeholder text
- ✅ All links functional (internal and external)

### Quality Success

- ✅ WCAG 2.1 Level AA compliance (Lighthouse accessibility 100)
- ✅ Zero axe-core violations
- ✅ All elements keyboard-accessible
- ✅ Screen reader compatible
- ✅ Color contrast ratios meet standards
- ✅ Animations respect prefers-reduced-motion

### Design Success

- ✅ Fluid typography scales correctly (clamp() values from Anthropic)
- ✅ Generous whitespace (80-120px sections, 16-32px elements)
- ✅ Terracotta accent (#d97757) used consistently
- ✅ System font stack or Anthropic font
- ✅ Component styles match Anthropic aesthetic

### Responsive Success

- ✅ Works at all breakpoints (375px, 768px, 1024px, 1920px)
- ✅ No horizontal scrolling on any device
- ✅ Text readable on mobile (16px+)
- ✅ Touch targets adequate (44x44px)
- ✅ Mobile navigation functional

### Browser Success

- ✅ Works in Chrome, Firefox, Safari, Edge (latest 2 versions)
- ✅ Styling consistent across browsers
- ✅ Functionality works across browsers
- ✅ No browser-specific bugs

### Constitution Success

- ✅ Principle 1 (Performance First): Lighthouse ≥95, bundle <200KB
- ✅ Principle 2 (Content Accuracy): Sourced from official docs
- ✅ Principle 3 (Accessibility): WCAG 2.1 AA compliant
- ✅ Principle 4 (User-Centric): Clear hierarchy, scannable content
- ✅ Principle 5 (Developer Experience): TypeScript, clear components
- ✅ Principle 6 (SEO): Complete metadata, semantic HTML

---

## Risk Assessment

### High Risk

**Risk**: Design extraction from anthropic.com may not yield exact values
- **Mitigation**: Use browser DevTools to inspect and extract. Document best approximations if exact values unavailable. Focus on achieving similar aesthetic rather than pixel-perfect match.
- **Contingency**: If extraction fails, use similar modern minimal design system (Linear, Stripe) as fallback.

**Risk**: Animation complexity may impact performance budget
- **Mitigation**: Keep animations simple (CSS-only, no JavaScript). Test performance early. Disable if budget exceeded.
- **Contingency**: Remove animations entirely if performance drops below 95.

### Medium Risk

**Risk**: Content extraction may find outdated information in SpecSwarm repo
- **Mitigation**: Verify all metrics and commands against latest SpecSwarm version. Cross-check CHANGELOG for accuracy.
- **Contingency**: Contact SpecSwarm maintainer (user) for verification if discrepancies found.

**Risk**: Mobile menu implementation may add complexity
- **Mitigation**: Test navigation layout first. Only implement hamburger if truly needed. Keep implementation simple.
- **Contingency**: Use stacked navigation if hamburger adds too much complexity.

### Low Risk

**Risk**: Browser compatibility issues
- **Mitigation**: Use standard CSS and modern web APIs. Test in all target browsers. Use feature detection.
- **Contingency**: Add polyfills or graceful degradation if issues arise.

**Risk**: Bundle size exceeds 200KB per page
- **Mitigation**: Monitor bundle size during development. Minimize React island count. Use Astro SSG effectively.
- **Contingency**: Remove non-essential JavaScript, reduce animation complexity, or defer non-critical features.

---

## Dependencies

### External Dependencies

1. **anthropic.com** (design reference)
   - Required for: Color values, typography scale, spacing system
   - Impact if unavailable: Use fallback design system (Linear, Stripe)
   - Timeline dependency: Phase 0 (Research)

2. **SpecSwarm Repository** (content source)
   - Required for: All page content, metrics, command examples
   - Impact if unavailable: Cannot proceed with accurate content
   - Timeline dependency: Phase 0 (Research)

### Internal Dependencies

1. **Tech Stack** (already configured)
   - Astro 5.15.4, React 19.2.0, Tailwind CSS v4, Shiki 3.15.0
   - All approved and available
   - No blocking issues

2. **Constitution** (already ratified)
   - Version 1.0.0, ratified 2025-11-10
   - All principles defined and aligned
   - No blocking issues

3. **Design System** (to be extracted)
   - Depends on: anthropic.com analysis (Phase 0)
   - Blocks: All component styling (Phase 2-4)
   - Critical path item

4. **Content** (to be extracted)
   - Depends on: SpecSwarm repo access (Phase 0)
   - Blocks: All page implementation (Phase 3)
   - Critical path item

---

## Timeline Estimate

**Total Estimated Time**: 12-16 hours (spread across implementation phase)

### Phase Breakdown

- **Phase 0: Research & Design Extraction**: 2-3 hours
  - anthropic.com analysis: 1-1.5 hours
  - SpecSwarm content extraction: 1-1.5 hours
  - Animation research: 0.5 hour

- **Phase 1: Foundation Setup**: 2 hours
  - Project cleanup: 0.5 hour
  - Design system config: 1 hour
  - BaseLayout: 0.5 hour

- **Phase 2: Shared Components**: 2-3 hours
  - Header: 0.5 hour
  - Footer: 0.5 hour
  - Button: 0.5 hour
  - CodeBlock: 0.5 hour
  - FeatureCard: 0.5 hour
  - ScenarioCard: 0.5 hour

- **Phase 3: Page Implementation**: 3-4 hours
  - Home: 1-1.5 hours (most complex)
  - Features: 0.5 hour
  - Get Started: 0.5 hour
  - Docs: 0.5 hour
  - Use Cases: 0.5-1 hour

- **Phase 4: React Islands**: 1-2 hours
  - AnimatedHero: 0.5-1 hour
  - MobileMenu (if needed): 0.5-1 hour

- **Phase 5: Content Population**: 1 hour
  - Content writing and insertion across all pages

- **Phase 6: Testing & QA**: 2-3 hours
  - Performance testing: 0.5 hour
  - Accessibility testing: 0.5-1 hour
  - Responsive testing: 0.5 hour
  - Browser testing: 0.5 hour
  - Content verification: 0.5 hour

- **Phase 7: Deployment Prep**: 0.5 hour
  - Build verification: 0.25 hour
  - SEO verification: 0.25 hour

**Note**: Estimates assume working solo. Autonomous implementation via `/specswarm:implement` may complete faster with parallel task execution.

---

## Notes for Implementation

1. **Complete Teardown**: Delete ALL existing pages and components before starting. Fresh slate ensures no conflicts with old code.

2. **Design Extraction Priority**: anthropic.com analysis MUST happen first (Phase 0). All subsequent styling depends on these values.

3. **Content Accuracy Critical**: All metrics and commands must match SpecSwarm repo exactly. Verify from source, not assumptions.

4. **Performance Budget**: Monitor bundle size throughout. If approaching 200KB, reduce JavaScript immediately.

5. **Animation Restraint**: Keep animations simple. If performance drops, remove animations rather than compromise Lighthouse score.

6. **Mobile Menu Decision**: Don't assume hamburger is needed. Test desktop navigation on mobile first. Only implement if truly necessary.

7. **TypeScript Strict**: Maintain strict mode throughout. Type all props, no `any` types.

8. **Component Reuse**: Use FeatureCard and ScenarioCard consistently. Don't create one-off variations.

9. **Accessibility First**: Build with accessibility in mind from start. Don't treat as afterthought.

10. **Constitution Alignment**: Every decision must align with constitution principles. Performance, accessibility, and content accuracy are non-negotiable.

---

## Implementation Ready

This plan is ready for task generation (`/specswarm:tasks`) and implementation (`/specswarm:implement`).

All ambiguities resolved. All dependencies identified. All risks mitigated. Constitution aligned. Tech stack validated.

**Next Command**: `/specswarm:tasks`
