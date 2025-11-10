# Implementation Plan: Marketing Website Foundation

**Feature**: 001-marketing-website-foundation
**Created**: 2025-11-10
**Parent Branch**: main

---

## Technical Context

### Technologies Used

**Framework & Build:**
- Astro 5.15.4 - Static site generator with pre-rendering
- Vite (bundled) - Fast build tool with HMR
- TypeScript 5.x (strict mode) - Type safety

**UI & Styling:**
- React 19.2.0 - Interactive islands only (functional components)
- Tailwind CSS 4.0.0 (Oxide) - Utility-first styling
- Lucide React - Icon library

**Code Display:**
- Shiki 3.15.0 - Syntax highlighting (server-side, zero runtime cost)

**State Management:**
- React hooks (useState) - Island-level state only
- No global state management needed

### Project Structure

```
specswarm.com/
├── src/
│   ├── components/          # Reusable Astro/React components
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   ├── Hero.astro
│   │   ├── FeatureCard.astro
│   │   ├── MobileMenu.tsx   # React island
│   │   └── CodeBlock.tsx    # React island
│   ├── layouts/
│   │   └── BaseLayout.astro # Shared layout with SEO
│   ├── pages/
│   │   ├── index.astro      # Home page
│   │   ├── features.astro   # Features page
│   │   └── pricing.astro    # Pricing page
│   ├── styles/
│   │   └── global.css       # Tailwind imports
│   └── content/             # Content collections (future)
├── public/                  # Static assets
├── astro.config.mjs
├── tailwind.config.ts
└── tsconfig.json
```

### Key Architectural Decisions

1. **Static Pre-rendering**: All pages pre-rendered at build time for maximum performance
2. **React Islands Architecture**: Interactive components (mobile menu, code copy) as islands
3. **Server-side Syntax Highlighting**: Shiki runs during build, zero JS cost at runtime
4. **Mobile-First Design**: Responsive breakpoints: <640px, 640-1024px, >1024px
5. **Component Reusability**: Shared components for consistency (Header, Footer, CTA buttons)

### Content Strategy

- Source content from `/home/marty/code-projects/specswarm/README.md`
- Manual extraction and adaptation for marketing presentation
- Focus on key metrics: 85-90% time savings, Feature 015 validation
- Real command examples from SpecSwarm documentation

---

## Tech Stack Compliance Report

### ✅ Approved Technologies (already in stack)

All technologies used in this plan are pre-approved in `/memory/tech-stack.md`:
- Astro 5.15.4 ✓
- React 19.2.0 ✓
- TypeScript 5.x ✓
- Tailwind CSS 4.0.0 ✓
- Shiki 3.15.0 ✓

### ➕ New Technologies (auto-added)

**Lucide React**
- Purpose: Icon library for UI elements
- No conflicts detected
- Added to: Approved Libraries > Icons
- Note: Alternative to heroicons, both acceptable

---

## Constitution Check

Validating against `/memory/constitution.md`:

### Principle 1: Performance First ✅
**Requirements:**
- Lighthouse ≥95 ✓ (spec: FR5.2)
- FCP <1.5s ✓ (spec: FR5.2)
- LCP <2.5s ✓ (spec: FR5.2)
- TBT <200ms ✓ (spec: FR5.2)
- CLS <0.1 ✓ (spec: FR5.2)
- Bundle <200KB/page ✓ (spec: FR5.2)

**Plan Alignment:**
- Static pre-rendering minimizes runtime JavaScript
- Shiki server-side rendering (zero runtime cost)
- Code splitting per page
- React islands only where needed (mobile menu, code copy)

### Principle 2: Content Accuracy and Freshness ✅
**Requirements:**
- Sync with SpecSwarm README ✓ (spec: FR5.1)
- Accurate version numbers ✓ (spec: FR5.1)
- Tested code examples ✓ (spec: FR2.2, FR2.3)

**Plan Alignment:**
- Content sourced from `/home/marty/code-projects/specswarm/README.md`
- Command examples demonstrate real SpecSwarm commands
- Manual verification step in implementation

### Principle 3: Accessibility as Standard ✅
**Requirements:**
- WCAG 2.1 AA ✓ (spec: FR5.3)
- Semantic HTML ✓ (spec: FR5.3)
- Heading hierarchy ✓ (spec: FR5.3)
- Color contrast 4.5:1 / 3:1 ✓ (spec: FR5.3)
- Keyboard navigation ✓ (spec: FR5.3)
- Screen reader compat ✓ (spec: FR5.3)

**Plan Alignment:**
- Semantic Astro templates
- Proper ARIA labels for interactive islands
- Focus management in mobile menu
- Alt text for all icons/images

### Principle 4: User-Centric Design ✅
**Requirements:**
- Clear hierarchy ✓ (spec: user scenarios)
- Scannable content ✓ (spec: FR1, FR2, FR3)
- Mobile-responsive ✓ (spec: FR5.4)
- Clear CTAs ✓ (spec: FR1.1, FR1.4, FR3.5)

**Plan Alignment:**
- Mobile-first responsive breakpoints
- Consistent CTA button component
- Progressive disclosure (home → features → pricing)

### Principle 5: Developer Experience ✅
**Requirements:**
- Clear organization ✓ (project structure above)
- TypeScript ✓ (strict mode)
- Code comments ✓ (implementation plan)
- Reusable components ✓ (component library)

**Plan Alignment:**
- Organized src/ structure (components, layouts, pages)
- TypeScript interfaces for all props
- Shared component library
- Consistent naming conventions

### Principle 6: SEO and Discoverability ✅
**Requirements:**
- Semantic HTML ✓ (spec: FR5.5)
- Meta tags ✓ (spec: FR5.5)
- OpenGraph ✓ (spec: FR5.5)
- Twitter Cards ✓ (spec: FR5.5)

**Plan Alignment:**
- BaseLayout with SEO meta tags
- Page-specific titles and descriptions
- Social sharing meta tags
- Sitemap generation (implementation detail)

---

## Implementation Phases

### Phase 1: Foundation & Layout System
**Goal**: Set up base layout, shared components, and design system

**Components:**
1. **BaseLayout.astro**
   - HTML structure (head, body)
   - SEO meta tags (title, description, OG, Twitter)
   - Tailwind CSS import
   - Favicon and viewport config
   - Props: title, description, ogImage (optional)

2. **Header.astro**
   - SpecSwarm logo/brand text
   - Navigation links: Home, Features, Pricing, Docs
   - Mobile menu trigger button
   - Active page indicator
   - Sticky positioning (optional)
   - Responsive: full nav on desktop, hamburger on mobile

3. **Footer.astro**
   - SpecSwarm branding
   - Links: GitHub, Docs, License
   - Attribution: "Built with Claude Code"
   - Copyright notice
   - Responsive layout

4. **MobileMenu.tsx (React Island)**
   - Slide-in overlay menu
   - Navigation links
   - Close button (X icon)
   - Outside-click-to-close
   - Smooth animation
   - `client:load` directive for above-fold interactivity

**Acceptance Criteria:**
- Layout renders on all pages
- Header navigation functional
- Mobile menu opens/closes smoothly
- Footer displays correctly
- Meta tags populate correctly

---

### Phase 2: Home Page
**Goal**: Implement home page with hero, features grid, social proof, CTA

**Components:**
5. **Hero.astro**
   - Headline: "SpecSwarm - Build it. Fix it. Maintain it. Automate it."
   - Tagline: "Complete development toolkit for Claude Code"
   - Primary CTA button ("Get Started" → /pricing#install)
   - Gradient background (Tailwind CSS)
   - Responsive typography

6. **FeatureCard.astro**
   - Icon (Lucide React icon)
   - Title (string)
   - Description (string)
   - Consistent card styling
   - Hover effect
   - Props: icon, title, description

7. **Home Features Grid (index.astro)**
   - 3 FeatureCards:
     - Autonomous Workflows
     - Quality Validation
     - Tech Stack Enforcement
   - Responsive grid: 1 col mobile, 3 cols desktop
   - Content from SpecSwarm README

8. **Social Proof Section (index.astro)**
   - "85-90% time savings" metric
   - Feature 015 case study stats:
     - 76/76 tasks completed
     - 96.3% test pass rate
     - 3-4 hours vs 3-5 days
   - Professional presentation with icons

9. **Final CTA Section (index.astro)**
   - Value prop reinforcement
   - Secondary CTA button ("Explore Features" → /features)
   - Clean, focused design

**Acceptance Criteria:**
- Home page loads with all sections
- Features grid responsive
- Social proof stats accurate
- CTAs navigate correctly
- Lighthouse score ≥95

---

### Phase 3: Features Page
**Goal**: Showcase SpecSwarm capabilities with detailed cards and code examples

**Components:**
10. **Detailed Feature Cards (features.astro)**
    - 6 feature cards:
      1. Autonomous Workflows (`/specswarm:build`)
      2. Quality Validation (scoring 0-100)
      3. Tech Stack Enforcement (drift prevention)
      4. Bug Fixing (`/specswarm:fix`)
      5. Dependency Upgrades (`/specswarm:upgrade`)
      6. Workflow Orchestration
    - Each card: icon, title, description, example use case
    - Grid layout: 1-2 cols mobile, 2-3 cols desktop
    - Content from SpecSwarm README

11. **CodeBlock.tsx (React Island)**
    - Syntax highlighting with Shiki (server-rendered)
    - Copy-to-clipboard button
    - Language indicator badge
    - Visual feedback on copy (tooltip or checkmark)
    - `client:visible` directive (below fold)
    - Props: code (string), language (string), filename (optional)

12. **Before/After Workflow Comparison (features.astro)**
    - Side-by-side or stacked comparison
    - Manual workflow (7 commands, 2-3 hours)
    - SpecSwarm workflow (2 commands, 1.5-3 hours)
    - Time savings highlighted

13. **Command Reference Section (features.astro)**
    - List of key commands:
      - `/specswarm:build`
      - `/specswarm:fix`
      - `/specswarm:upgrade`
      - `/specswarm:ship`
    - Each: name, description, example usage
    - CodeBlock components for examples
    - Copy buttons

14. **Benefits Breakdown (features.astro)**
    - 3-column grid (responsive)
    - Time Savings: 85-90% reduction
    - Quality Gates: automated validation
    - Consistency: tech stack enforcement
    - Icons and metrics

**Acceptance Criteria:**
- 6 feature cards render correctly
- Code examples syntax-highlighted
- Copy buttons functional
- Command reference complete
- Benefits section clear
- Responsive layout verified

---

### Phase 4: Pricing Page
**Goal**: Communicate free tier and value proposition

**Components:**
15. **Free Tier Emphasis (pricing.astro)**
    - Large headline: "Free Forever"
    - Subheading: "Claude Code Plugin"
    - No pricing table needed
    - Emphasize value despite zero cost

16. **Value Proposition Showcase (pricing.astro)**
    - ROI calculation:
      - Manual: 16-24 hours
      - SpecSwarm: 1.5-3 hours
      - Savings: 85-90%
    - Visual presentation (chart or comparison)

17. **Feature Comparison Table (pricing.astro)**
    - Table comparing workflows:
      | Task | Manual | SpecSwarm | Time Saved |
      |------|--------|-----------|------------|
      | Feature Dev | 2-3 days | 3-4 hours | 85-90% |
      | Bug Fixing | 4-6 hours | 20-40 min | 80-90% |
      | Quality Analysis | 2-3 hours | 5-10 min | 95% |
    - Responsive: stack on mobile if needed
    - Highlight SpecSwarm column

18. **FAQ Section (pricing.astro)**
    - 5 common questions:
      1. "Is it really free?" → Yes, MIT license
      2. "What's the catch?" → None, open source
      3. "How does it integrate?" → Claude Code plugin
      4. "What frameworks?" → React, Vue, Astro, etc.
      5. "Is my project suitable?" → Any git repo
    - Expandable/collapsible (optional, can be static v1)

19. **Installation CTA (pricing.astro)**
    - Prominent button: "Install SpecSwarm"
    - Links to SpecSwarm README installation section
    - GitHub link alternative

**Acceptance Criteria:**
- Free tier messaging clear
- Value prop compelling
- Comparison table responsive
- FAQ answers accurate
- Installation CTA prominent

---

### Phase 5: Shared CTA Components
**Goal**: Create reusable, consistent button components

**Components:**
20. **CTAButton.astro**
    - Primary variant (solid background)
    - Secondary variant (outline)
    - Props: href, variant, text
    - Tailwind design tokens for colors
    - Hover and focus states
    - ARIA labels
    - Responsive sizing

**Acceptance Criteria:**
- Buttons consistent across pages
- Hover states smooth
- Accessible focus indicators
- Color contrast meets WCAG AA

---

### Phase 6: Performance Optimization
**Goal**: Ensure constitution compliance and optimal performance

**Tasks:**
21. **Bundle Size Optimization**
    - Code splitting per page
    - Minimize React island JavaScript
    - Lazy load images
    - Optimize Shiki bundle (tree-shake unused languages)
    - Verify <200KB per page

22. **Image Optimization**
    - Use Astro Image component
    - Responsive images (srcset)
    - Lazy loading below fold
    - WebP format with PNG fallback
    - Optimize icon SVGs

23. **Lighthouse Audit**
    - Run Lighthouse on all 3 pages
    - Verify ≥95 performance score
    - Fix any identified issues
    - Document results

24. **Accessibility Audit**
    - Run axe-core in development
    - Manual keyboard navigation testing
    - Screen reader spot check (NVDA or VoiceOver)
    - Verify WCAG 2.1 AA compliance

**Acceptance Criteria:**
- Lighthouse performance ≥95 all pages
- Bundle size <200KB per page
- No accessibility violations
- Core Web Vitals in "Good" range

---

### Phase 7: Content Population
**Goal**: Populate pages with accurate SpecSwarm content

**Tasks:**
25. **Extract Content from SpecSwarm README**
    - Feature descriptions (6 features)
    - Command examples (build, fix, upgrade, ship)
    - Statistics (85-90% time savings, Feature 015 data)
    - Installation instructions
    - GitHub repository link

26. **Verify Content Accuracy**
    - Test command examples
    - Verify version numbers
    - Check statistics match README
    - Validate links work

27. **SEO Meta Tags**
    - Home: "SpecSwarm - Build it. Fix it. Maintain it. | AI Workflows for Claude Code"
    - Features: "Features | SpecSwarm - Autonomous Development Workflows"
    - Pricing: "Pricing | SpecSwarm - Free Claude Code Plugin"
    - Meta descriptions for each page (<160 chars)
    - OpenGraph images (create or use placeholder)

**Acceptance Criteria:**
- All content accurate
- No broken links
- Meta tags populated
- Social sharing preview works

---

### Phase 8: Testing & QA
**Goal**: Final validation before shipping

**Tasks:**
28. **Cross-browser Testing**
    - Chrome (latest)
    - Firefox (latest)
    - Safari (latest)
    - Verify rendering consistency

29. **Responsive Testing**
    - Mobile (<640px): iPhone SE, iPhone 14
    - Tablet (640-1024px): iPad
    - Desktop (>1024px): 1920x1080
    - Verify all breakpoints

30. **Functional Testing**
    - All navigation links work
    - Mobile menu opens/closes
    - Copy buttons copy text
    - CTAs navigate correctly
    - No console errors

31. **Performance Validation**
    - Final Lighthouse audits
    - Bundle size verification
    - Load time on 3G
    - Core Web Vitals check

**Acceptance Criteria:**
- All browsers render correctly
- All breakpoints functional
- No functional bugs
- Performance targets met

---

## Implementation Order

**Priority 1 (Blocking):**
1. BaseLayout, Header, Footer → Foundation
2. Home page → First impression
3. Mobile menu → Mobile UX

**Priority 2 (Core Value):**
4. Features page → Capability showcase
5. CodeBlock component → Technical credibility
6. Pricing page → Conversion

**Priority 3 (Polish):**
7. Performance optimization
8. Content accuracy verification
9. Cross-browser testing

---

## Success Metrics

### Performance
- ✅ Lighthouse ≥95 (all pages)
- ✅ Bundle <200KB per page
- ✅ LCP <2.5s
- ✅ CLS <0.1

### Functionality
- ✅ All 3 pages load
- ✅ Navigation works
- ✅ Mobile menu functional
- ✅ Code copy buttons work

### Content
- ✅ Accurate SpecSwarm data
- ✅ Working code examples
- ✅ No broken links
- ✅ Correct version numbers

### Accessibility
- ✅ WCAG 2.1 AA compliance
- ✅ Keyboard navigation
- ✅ Screen reader compatible
- ✅ No axe-core violations

---

## Risk Assessment

### Low Risk
- Static content pages (no complex logic)
- Pre-approved tech stack
- No backend dependencies
- No authentication

### Medium Risk
- Performance budget (<200KB) - requires careful bundle management
- Content accuracy - manual synchronization with README
- Mobile menu animation - browser compatibility

### Mitigation Strategies
- Early Lighthouse audits (Phase 6)
- Content verification checklist (Phase 7)
- Cross-browser testing (Phase 8)
- Code splitting and lazy loading

---

## Next Steps

After planning approval:
1. Run `/specswarm:tasks` to generate detailed task breakdown
2. Execute tasks in priority order
3. Run Lighthouse audits after each phase
4. Final QA before `/specswarm:ship`
