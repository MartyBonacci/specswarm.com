---
parent_branch: main
feature_number: 002
status: Complete
created_at: 2025-11-11T15:30:00-05:00
---

# Feature: Complete Site Redesign with New Content Strategy

## Overview

Complete teardown and rebuild of specswarm.com implementing a new content strategy with Anthropic-inspired design system (light theme). This redesign replaces all existing pages and components with fresh content emphasizing the core message: "AI automation that doesn't go off the rails."

The redesign shifts from feature-list marketing to problem-solution positioning, highlighting SpecSwarm's ability to maintain tech stack consistency, follow natural development workflows, and keep developers in control through decision checkpoints.

**Key Changes from Current Site**:
- **Messaging**: From "build/fix/maintain" to "doesn't go off the rails" (tech stack enforcement focus)
- **Design**: Anthropic-inspired aesthetic with light theme, terracotta accent, generous whitespace
- **Content**: Complete rewrite sourced from main SpecSwarm repo documentation
- **Simplification**: Emphasize 3-command workflow (build → fix → ship) with granular commands as power-user option
- **Pages**: Restructure to Home, Features, Get Started, Docs, Use Cases (remove Pricing, which becomes footer message)

Comprehensive specifications in `docs/redesign-2025.md`.

## User Scenarios

### Scenario 1: Developer Frustrated with AI Drift

**Actor**: Developer who has experienced AI coding assistants making poor technology choices
**Goal**: Discover a solution that keeps AI automation on their approved tech stack
**Context**: Developer has seen AI tools suggest Redux when they use React Router, or recommend deprecated libraries

**Flow**:
1. Developer lands on homepage from search/referral
2. Reads hero: "AI automation that doesn't go off the rails"
3. Scans problem section: "Drifts from your approved tech stack / Makes decisions without asking"
4. Reviews solution: 3 commands (build → fix → ship)
5. Reads "What Makes It Different" section emphasizing tech stack enforcement
6. Sees validation: "85-90% time savings, 96.3% test pass rate" (subtle, not dominating)
7. Clicks "Get Started in 5 Minutes" CTA

**Success**: Developer understands SpecSwarm prevents AI drift and maintains stack consistency within 30 seconds

### Scenario 2: Evaluating Control and Transparency

**Actor**: Developer skeptical of "black box" AI automation
**Goal**: Understand how much control they retain when using SpecSwarm
**Context**: Developer wants automation but fears losing visibility into decisions

**Flow**:
1. Navigates to Features page from home
2. Reads "Natural Workflows" feature explaining specify → plan → implement → validate → ship
3. Reviews "Decision Checkpoints" feature showing interactive clarification
4. Examines "Tech Stack Enforcement" feature with configuration example
5. Explores "Quality Gates" feature showing validation before merge
6. Clicks through to Use Cases to see real scenarios

**Success**: Developer confident they maintain control with transparent decision points

### Scenario 3: Quick Start Journey

**Actor**: Developer ready to try SpecSwarm immediately
**Goal**: Install and run first feature in under 10 minutes
**Context**: Developer is convinced and wants hands-on experience

**Flow**:
1. Clicks "Get Started" from homepage or navigation
2. Follows Step 1: Install plugin command
3. Follows Step 2: Initialize project (`/specswarm:init`)
4. Follows Step 3: Build first feature with example
5. Follows Step 4: Ship when ready
6. Reviews "Next Steps" section for advanced usage

**Success**: Developer completes first feature and ships successfully within 10 minutes

### Scenario 4: Deep Dive into Workflows

**Actor**: Developer wanting detailed understanding before committing
**Goal**: See real-world examples and understand complete workflows
**Context**: Developer needs evidence of production readiness

**Flow**:
1. Navigates to Use Cases page
2. Reviews Scenario 1: New Feature Development (3-5 days → 4-5 hours)
3. Reviews Scenario 2: Bug Fixing with regression tests
4. Reviews Scenario 3: Dependency Upgrade with breaking change analysis
5. Reads Feature 015 case study: 76/76 tasks, 96.3% pass rate, production deployment
6. Clicks through to GitHub for full documentation

**Success**: Developer has concrete evidence of SpecSwarm's production capabilities and time savings

### Scenario 5: Finding Command Reference

**Actor**: Developer using SpecSwarm who needs command syntax
**Goal**: Quickly find command reference without leaving site
**Context**: Developer remembers there's a docs section

**Flow**:
1. Clicks "Docs" in navigation
2. Scans Quick Command Reference section
3. Finds needed command (build/fix/upgrade/ship or granular)
4. Copies command syntax
5. Optionally clicks through to GitHub docs for detailed workflow guide

**Success**: Developer finds command reference and returns to their work within 30 seconds

### Scenario 6: Mobile Discovery

**Actor**: Developer browsing on mobile device
**Goal**: Access all site content and get started from mobile
**Context**: Browsing during commute or away from desk

**Flow**:
1. Accesses site on mobile (375-414px screen)
2. Reads responsive hero with large, readable text
3. Scrolls through stacked content sections
4. Taps navigation (mobile menu if needed)
5. Views code examples with horizontal scroll or responsive sizing
6. Accesses Get Started guide
7. Bookmarks site or sends to desktop

**Success**: Full site content accessible and readable on mobile without frustration

## Functional Requirements

### FR1: Homepage Content and Structure

#### FR1.1: Hero Section
- Display headline: "AI automation that doesn't go off the rails"
- Include subtext: "When AI builds features, does it use YOUR stack? Follow YOUR patterns? Ask before making decisions?"
- Primary CTA button: "Get Started in 5 Minutes" (links to /get-started)
- Generous whitespace, center-aligned layout
- Text entrance animation: staggered word-by-word fade-in (respects prefers-reduced-motion)
- Large typography: 48-64px heading, 20-24px subtext
- No background graphics, pure whitespace aesthetic

#### FR1.2: Problem Section
- Heading: "The Problem with AI Code Generation"
- List 4 key pain points:
  - Drifts from your approved tech stack
  - Makes decisions without asking
  - Black box automation you can't control
  - Inconsistent with your patterns
- Clean bullet list or icon list
- Single column, left-aligned or centered
- Ample vertical spacing

#### FR1.3: Solution - Three Commands
- Heading: "Build. Fix. Ship."
- Display 3 command sections (3-column grid on desktop, stacked on mobile):
  1. `/specswarm:build` - Feature development with clarification, planning, implementation, validation
  2. `/specswarm:fix` - Bug fixing with automated regression tests
  3. `/specswarm:ship` - Quality gates and merge protection
- Each section: command (syntax highlighted), description (2-3 sentences)
- Visual separators between sections
- Small note below: "Need more control? Granular commands available for power users."
- Minimal code examples (single-line commands only)

#### FR1.4: What Makes It Different
- Heading: "What Makes SpecSwarm Different"
- Display 4 feature cards in 2x2 grid (stacked on mobile):
  1. **Tech Stack Enforcement**: Define once, enforce forever, prevent drift
  2. **Natural Workflows**: Transparent steps (specify → plan → implement → test → ship)
  3. **Decision Checkpoints**: AI asks, you decide, no black boxes
  4. **Quality Gates**: Automated scoring, test validation, merge protection
- Each card: simple icon, heading, 2-3 sentence description
- Equal visual weight, subtle background or border
- Consistent spacing

#### FR1.5: Proof Section (Subtle)
- Single line of metrics: "85-90% time savings • 96.3% test pass rate • 76/76 tasks completed"
- Link: "Read the full case study →" (to Use Cases page)
- Centered, small text (14-16px), not dominating
- Separated by bullet points or vertical bars

#### FR1.6: Footer CTA
- Text: "Try your first feature in 5 minutes"
- CTA button: "Get Started" (links to /get-started)
- Centered, large button, generous whitespace
- Final section before site footer

### FR2: Features Page Content and Structure

#### FR2.1: Page Hero
- Heading: "Capabilities"
- Subtext: "Everything you need to build, maintain, and ship with confidence."
- Simple, clean, generous spacing

#### FR2.2: Feature Grid
- Display 6 feature cards in 2-3 column grid (1 column on mobile):
  1. **Tech Stack Enforcement**: Automatic validation against approved/prohibited technologies
  2. **Build → Fix → Ship**: Three commands for complete lifecycle
  3. **Quality Gates**: Automated scoring, test validation, merge protection
  4. **Natural Workflows**: Specify, plan, implement, test - transparent at every step
  5. **Autonomous Execution**: AI handles orchestration, you stay in control
  6. **Complete Lifecycle**: New features, bug fixes, refactoring, upgrades
- Each card: simple icon, heading, 2-3 sentence description, optional 1-2 line code example
- Equal visual weight, consistent styling
- Source descriptions from `/home/marty/code-projects/specswarm/README.md`

#### FR2.3: Footer CTA
- Text: "See it in action"
- CTA button: "Explore Use Cases" (links to /use-cases)
- Centered, clean design

### FR3: Get Started Page Content and Structure

#### FR3.1: Page Hero
- Heading: "Get Started"
- Subtext: "Install SpecSwarm and build your first feature in 5 minutes."

#### FR3.2: Step-by-Step Tutorial
- Display 4 numbered steps in linear flow:

**Step 1: Install**
- Command: `/plugin https://github.com/MartyBonacci/specswarm`
- Description: "SpecSwarm is a Claude Code plugin. Run this command in Claude Code to install."

**Step 2: Initialize Your Project**
- Command: `/specswarm:init`
- Description: "Define your tech stack (approved and prohibited technologies) and quality standards. This creates configuration files that SpecSwarm references during every build."

**Step 3: Build Your First Feature**
- Command: `/specswarm:build "add user profile avatar upload feature"`
- Description list:
  - Ask clarifying questions about requirements
  - Create a detailed implementation plan
  - Break the work into actionable tasks
  - Write code, tests, and documentation
  - Run quality validation and tests
- Note: "You review and approve at each checkpoint."

**Step 4: Ship It**
- Command: `/specswarm:ship`
- Description: "Run final quality checks. If all gates pass, SpecSwarm merges to your parent branch. If quality thresholds aren't met, you'll get a clear report of what needs attention."

- Clear visual separation between steps (numbers, spacing, dividers)
- Syntax highlighting for commands
- No complex diagrams, text-driven clarity

#### FR3.3: Next Steps Section
- Heading: "Next Steps"
- List:
  - Try `/specswarm:fix` for regression-test-first bug fixing
  - Explore granular commands for more control
  - Read the full documentation for advanced features
- Link to Documentation page

### FR4: Documentation Hub Page Content and Structure

#### FR4.1: Page Hero
- Heading: "Documentation"
- Subtext: "Complete reference for SpecSwarm workflows, commands, and configuration."

#### FR4.2: Quick Command Reference
- Section heading: "Quick Command Reference"
- Subsection: "High-Level Commands (Recommended for Most Users)"
  - List 4 commands with name, description, example syntax:
    1. `/specswarm:build` - Complete feature development
    2. `/specswarm:fix` - Regression-test-first bug fixing
    3. `/specswarm:upgrade` - Dependency upgrades with breaking change analysis
    4. `/specswarm:ship` - Quality-gated merge to parent branch
- Subsection: "Granular Commands (For Power Users)"
  - List 6 core commands:
    1. `/specswarm:specify` - Create feature specification
    2. `/specswarm:clarify` - Refine requirements
    3. `/specswarm:plan` - Generate implementation plan
    4. `/specswarm:tasks` - Create task breakdown
    5. `/specswarm:implement` - Execute all tasks
    6. `/specswarm:complete` - Finalize and merge
- Link: "View full command reference on GitHub →"
- Monospace font for commands
- Clean, documentation-style layout

#### FR4.3: Common Workflows Section
- Section heading: "Common Workflows"
- Display 3 workflow examples:
  1. **New Feature Development**: build → approve → ship
  2. **Bug Fixing**: fix → review → verify
  3. **Dependency Upgrade**: upgrade → review → approve
- Each with numbered steps
- Link: "Read detailed workflow guide →" (to GitHub WORKFLOW.md)

#### FR4.4: Configuration Section
- Section heading: "Project Configuration"
- List configuration topics:
  - Tech Stack Definition (/memory/tech-stack.md)
  - Quality Standards
  - Advanced Configuration
- Link: "View configuration guide →"

#### FR4.5: External Resources Section
- Section heading: "External Resources"
- Links to:
  - Full Workflow Guide (GitHub)
  - Command Cheatsheet (GitHub)
  - GitHub Repository
  - Changelog
- Clear, prominent link styling

### FR5: Use Cases Page Content and Structure

#### FR5.1: Page Hero
- Heading: "Use Cases"
- Subtext: "See how SpecSwarm handles real development scenarios."

#### FR5.2: Scenario Cards
- Display 3 scenario cards:

**Scenario 1: Building a New Feature**
- Icon
- "The Challenge": Description of manual feature development (3-5 days)
- "The SpecSwarm Approach": `/specswarm:build` command with description
- "Result": "3-5 days → 4-5 hours (mostly autonomous execution)"

**Scenario 2: Fixing a Production Bug**
- Icon
- "The Challenge": Manual debugging and regression testing
- "The SpecSwarm Approach": `/specswarm:fix` command with description
- "Result": "Automated regression test creation ensures bug stays fixed"

**Scenario 3: Upgrading Major Dependencies**
- Icon
- "The Challenge": Reading changelogs, finding breaking changes, refactoring
- "The SpecSwarm Approach": `/specswarm:upgrade` command with description
- "Result": "Hours of manual changelog reading → automated breaking change analysis"

- Consistent card styling
- Icon + challenge + approach + result format
- Clean, scannable layout

#### FR5.3: Case Study Section
- Heading: "Real-World Production Validation"
- Subheading: "Project: CustomCult2 - React 19 + Redux + Three.js snowboard customization app"
- Feature description: "Complete testing infrastructure implementation"
- Scope list:
  - Vitest configuration and setup
  - React Testing Library integration
  - 3D rendering test utilities
  - Redux store testing patterns
  - Component test suite (26 components)
- Results metrics:
  - 76/76 tasks completed (100%)
  - 131/136 tests passing (96.3%)
  - 3,500+ lines of test code generated
  - 1,530 lines of documentation created
  - Successfully merged to sprint-4
- Time comparison: Traditional (3-5 days) vs SpecSwarm (4-5 hours)
- Validation points:
  - Tech stack enforcement
  - Autonomous execution
  - Production-ready code quality
  - Complex dependency handling
- Link: "View full case study →" or link to GitHub
- Prominent section, separated from scenario cards
- Use metrics cleanly without overwhelming

### FR6: Shared Components

#### FR6.1: Navigation Header
- Logo/brand: "SpecSwarm" (text-based, no custom logo assumed)
- Navigation links: Home | Features | Get Started | Docs | Use Cases
- GitHub icon link (opens in new tab)
- Fixed or sticky header (remain visible on scroll)
- Active page indicator (underline, color change, or other visual indicator)
- Responsive: hamburger menu on mobile if needed
- Clean, minimal design matching Anthropic aesthetic

#### FR6.2: Mobile Navigation (if hamburger menu used)
- Hamburger icon button on mobile/tablet
- Menu overlay or slide-in panel
- All navigation links displayed vertically
- Close button or tap-outside-to-close
- Smooth animation (200ms ease transitions)
- Respects prefers-reduced-motion

#### FR6.3: Footer
- SpecSwarm branding
- Navigation links: Documentation | GitHub | Support | License
- Message: "Free. Forever. MIT License."
- Copyright: "© 2025 SpecSwarm"
- Responsive layout (multi-column desktop, stacked mobile)
- Subtle styling, not competing with content

#### FR6.4: CTA Buttons
- Primary button style: Terracotta (#d97757) background, white text on hover/fill
- Outlined initially, filled on hover
- Border-radius: 6-8px
- Padding: 12px 24px (medium), 16px 32px (large)
- Smooth transitions: 200ms ease
- Accessible focus states
- Consistent across site

#### FR6.5: Code Block Component
- Syntax highlighting with Shiki (minimal color scheme for light theme)
- Light gray background (#F5F5F5)
- Fira Code or monospace font
- Border-radius: 6-8px
- Padding: 16-24px
- No line numbers for single-line examples
- No copy button required for minimal examples
- Responsive: horizontal scroll if needed on mobile

#### FR6.6: Animated Hero Text (React Island)
- Staggered word-by-word fade-in animation
- Delay: 50-100ms between words
- Duration: 400-600ms per word
- Easing: ease-out
- Respects prefers-reduced-motion (disable animation if user preference set)
- Used on homepage hero only

### FR7: Design System Requirements

#### FR7.1: Color Palette (Reference: anthropic.com, adapted to light theme)
- **Primary Text**: #131314 (deep charcoal/near-black)
- **Secondary Text**: Slate gray for hierarchy
- **Accent**: #d97757 (terracotta) for CTAs, links, emphasis
- **Background**: #FAF9F0 or similar light cream/warm white
- **Surface**: #FFFFFF (pure white) for cards
- **Borders**: #E5E5E5 or subtle gray
- **Code Background**: #F5F5F5 (very light gray)
- High contrast ratios for accessibility (WCAG AA: 4.5:1 normal text, 3:1 large text)

#### FR7.2: Typography System (Reference: anthropic.com)
- **Font Family**: System font stack or Anthropic font if identifiable
- **Code Font**: Fira Code or similar monospace
- **Fluid Typography**: Use clamp() for responsive scaling
  - H1: clamp(2.5rem, 2.04rem + 1.95vw, 4rem) or 48-64px
  - H2: clamp(1.75rem, 1.67rem + 0.32vw, 2rem) or 32-40px
  - H3: 24-28px
  - Body: 16-18px, line-height 1.6-1.8
  - Small: 14-16px
- **Font Weights**: Regular (400), Medium (500), Semibold (600)
- **Line Heights**: Headings 1.1-1.2, Body 1.6-1.8

#### FR7.3: Spacing and Layout (Reference: anthropic.com)
- **Container**: Max-width ~1200px
- **Horizontal Padding**: clamp(2rem, 1.08rem + 3.91vw, 5rem) or adaptive
- **Section Spacing**: 80-120px vertical between major sections
- **Element Spacing**: 16-32px between elements
- **Generous Whitespace**: Breathing room, don't pack content densely
- **12-Column Grid**: Flexible responsive layouts
- **Grid Gap**: 1.5-2rem

#### FR7.4: Animation and Motion (Reference: anthropic.com)
- **Text Entrance**: Staggered word-by-word fade-in on hero
- **Scroll Reveals**: Intersection Observer triggered fade-in + translateY
- **Hover Transitions**: 200ms ease on all interactive elements
- **Respect Accessibility**: prefers-reduced-motion media query disables animations
- **Smooth Interactions**: No jarring transitions, professional polish

#### FR7.5: Component Styling
- **Buttons**: Outlined, terracotta border, filled on hover, 6-8px radius
- **Links**: Terracotta color, underline with offset
- **Cards**: Subtle shadow or border, 8-12px radius, white background
- **Code Blocks**: Light gray background, 6-8px radius, monospace font
- **Icons**: Simple, minimal (Lucide React or similar)

### FR8: Content Requirements

#### FR8.1: Content Source
- All feature descriptions sourced from `/home/marty/code-projects/specswarm/README.md`
- Metrics and case study data from `/home/marty/code-projects/specswarm/CHANGELOG.md` (Feature 015)
- Workflow explanations from `/home/marty/code-projects/specswarm/docs/WORKFLOW.md`
- Command reference from `/home/marty/code-projects/specswarm/docs/CHEATSHEET.md`
- Comprehensive content strategy from `/home/marty/code-projects/specswarm.com/docs/redesign-2025.md`

#### FR8.2: Content Accuracy
- Accurate command syntax for all examples
- Version numbers and statistics match official SpecSwarm data
- No outdated or incorrect information
- Real-world validation data (Feature 015) presented accurately
- Links to GitHub repository functional

#### FR8.3: Content Tone
- Minimal and confident - no overselling or marketing fluff
- Problem-first approach - lead with developer pain points
- Trust through transparency - explain what happens
- Subtle proof - metrics support claims without dominating
- Developer-focused language - written for technical audience

### FR9: Technical Requirements

#### FR9.1: Performance
- Lighthouse performance score ≥95
- Page load time <3 seconds on 3G connection
- Bundle size per page <200KB (gzipped) per constitution.md
- First Contentful Paint (FCP) <1.5s
- Largest Contentful Paint (LCP) <2.5s
- Total Blocking Time (TBT) <200ms
- Cumulative Layout Shift (CLS) <0.1
- Zero console errors or warnings
- Images optimized and lazy-loaded where appropriate

#### FR9.2: Accessibility
- WCAG 2.1 Level AA compliance per constitution.md
- Semantic HTML structure (proper heading hierarchy, landmarks)
- Keyboard navigation support for all interactive elements
- Screen reader compatible (ARIA labels where needed)
- Sufficient color contrast (4.5:1 normal text, 3:1 large text)
- Clear focus indicators on all interactive elements
- Alternative text for all images/icons
- Respects prefers-reduced-motion for animations
- Form labels and error messages (if any forms added)

#### FR9.3: Responsive Design
- Mobile-first approach
- Breakpoints: mobile (<640px), tablet (640-1024px), desktop (>1024px)
- All components adapt gracefully across screen sizes
- Touch-friendly tap targets (min 44x44px)
- No horizontal scrolling on any device
- Readable text sizes on mobile (16px+ body text)
- Stacked layouts on mobile, multi-column on desktop

#### FR9.4: Browser Compatibility
- Modern browsers: Chrome, Firefox, Safari, Edge (latest 2 versions)
- No IE11 support required
- Graceful degradation for older browsers (basic functionality)
- Test on: macOS Safari, Windows Chrome, Mobile Safari, Mobile Chrome

#### FR9.5: SEO Optimization
- Semantic HTML with proper meta tags
- Page titles: "<Page> | SpecSwarm - AI automation that doesn't go off the rails"
- Meta descriptions (<160 chars) for each page
- OpenGraph tags for social sharing (og:title, og:description, og:image, og:url, og:type)
- Twitter Card meta tags (twitter:card, twitter:title, twitter:description, twitter:image)
- Proper heading structure (single H1 per page, logical hierarchy)
- Clean URLs (/ , /features, /get-started, /docs, /use-cases)

#### FR9.6: Build and Deployment
- Build completes without errors or warnings
- Static site generation (Astro SSG)
- All assets optimized in build process
- Deployable to Vercel, Netlify, or Cloudflare Pages
- Fast rebuild times (<30 seconds for full site)

## Success Criteria

### User Experience Metrics

- **Immediate Value**: Visitors understand SpecSwarm prevents AI drift within 30 seconds of landing on homepage
- **Navigation Efficiency**: Users can reach any page within 2 clicks from homepage
- **Quick Start Success**: Developers following Get Started guide complete first feature and ship within 10 minutes
- **Mobile Usability**: All content readable and interactive on mobile devices (375px+) without frustration
- **Clarity**: "Doesn't go off the rails" message resonates with target audience (developers frustrated with AI drift)

### Performance Metrics

- **Lighthouse Score**: Performance ≥95 on all pages
- **Load Speed**: Page load <3 seconds on 3G connection
- **Bundle Efficiency**: Per-page bundle size <200KB gzipped
- **Core Web Vitals**: All metrics in "Good" range (LCP <2.5s, FID <100ms, CLS <0.1)
- **Build Speed**: Full site build completes in <30 seconds
- **Zero Errors**: No console errors or build warnings

### Accessibility Metrics

- **WCAG Compliance**: Passes WCAG 2.1 Level AA standards
- **Automated Testing**: Zero violations in axe-core accessibility audit
- **Keyboard Navigation**: All interactive elements keyboard-accessible with visible focus states
- **Screen Reader**: All content navigable and announced correctly by screen readers
- **Color Contrast**: All text meets minimum contrast ratios (4.5:1 normal, 3:1 large)
- **Motion Sensitivity**: Animations disabled when prefers-reduced-motion is set

### Content Quality Metrics

- **Accuracy**: All command syntax, statistics, and technical details match official SpecSwarm documentation
- **Consistency**: Content aligns with "doesn't go off the rails" positioning throughout site
- **Completeness**: All 5 pages (Home, Features, Get Started, Docs, Use Cases) fully populated with real content
- **Source Integrity**: Content accurately reflects `/home/marty/code-projects/specswarm/README.md` and related docs
- **Proof Points**: Feature 015 case study (76/76 tasks, 96.3% pass rate) presented accurately

### Design Quality Metrics

- **Visual Consistency**: Design matches Anthropic-inspired aesthetic (light theme, terracotta accent, generous whitespace)
- **Typography**: Fluid typography scales correctly across all breakpoints
- **Spacing**: Generous whitespace implemented consistently (80-120px section spacing)
- **Component Quality**: All shared components (header, footer, buttons, code blocks) styled consistently
- **Animation Polish**: Text entrance and hover animations work smoothly and respect prefers-reduced-motion

### Technical Quality Metrics

- **Build Success**: Site builds without errors in production mode
- **Browser Compatibility**: Site works correctly in Chrome, Firefox, Safari, Edge (latest 2 versions)
- **Responsive Design**: All layouts work at mobile (375px), tablet (768px), desktop (1280px+) breakpoints
- **Link Integrity**: All internal links functional, all external links (GitHub) open correctly
- **Code Quality**: Clean component structure, no deprecated patterns, follows tech stack guidelines

## Key Entities

### Pages

- **Home** (`/`)
  - Hero section (animated text)
  - Problem section (4 pain points)
  - Solution section (3 commands)
  - What Makes It Different (4 features)
  - Proof section (metrics)
  - Footer CTA

- **Features** (`/features`)
  - Page hero
  - Feature grid (6 cards)
  - Footer CTA

- **Get Started** (`/get-started`)
  - Page hero
  - 4-step tutorial
  - Next steps section

- **Docs** (`/docs`)
  - Page hero
  - Quick command reference (high-level + granular)
  - Common workflows
  - Configuration section
  - External resources links

- **Use Cases** (`/use-cases`)
  - Page hero
  - 3 scenario cards
  - Feature 015 case study

### Components

- **Header** (shared)
  - Logo/brand
  - Navigation links
  - GitHub icon
  - Mobile menu trigger (if used)

- **Footer** (shared)
  - Links section
  - "Free Forever" message
  - Copyright

- **Animated Hero Text** (React island)
  - Staggered animation
  - Prefers-reduced-motion handling

- **Mobile Menu** (React island, if used)
  - Overlay/slide-in
  - Close mechanism

- **Code Block**
  - Syntax highlighting (Shiki)
  - Minimal color scheme
  - Responsive

- **CTA Button**
  - Primary style (terracotta)
  - Hover states
  - Consistent sizing

- **Feature Card**
  - Icon
  - Heading
  - Description
  - Optional code example

- **Scenario Card**
  - Icon
  - Challenge
  - Approach
  - Result

### Design System

- **Color Palette**: Anthropic-inspired (light theme, terracotta accent)
- **Typography Scale**: Fluid sizing with clamp()
- **Spacing System**: 80-120px sections, 16-32px elements
- **Animation Library**: Text entrance, scroll reveals, hover transitions
- **Component Patterns**: Buttons, cards, code blocks, navigation

### Content Sources

- **SpecSwarm README**: `/home/marty/code-projects/specswarm/README.md` (feature descriptions)
- **SpecSwarm CHANGELOG**: `/home/marty/code-projects/specswarm/CHANGELOG.md` (Feature 015 metrics)
- **SpecSwarm WORKFLOW**: `/home/marty/code-projects/specswarm/docs/WORKFLOW.md` (workflow guidance)
- **SpecSwarm CHEATSHEET**: `/home/marty/code-projects/specswarm/docs/CHEATSHEET.md` (command reference)
- **Redesign Spec**: `/home/marty/code-projects/specswarm.com/docs/redesign-2025.md` (comprehensive specifications)
- **Anthropic.com**: Design reference for color, typography, animation extraction

## Assumptions

1. **Complete Teardown**: All existing pages (Home, Features, Pricing from Feature 001) will be deleted and replaced. No code preservation from current implementation.

2. **Design Extraction**: anthropic.com will be analyzed to extract exact color values, typography scale (clamp values), spacing system, and animation patterns. These will be adapted to light theme.

3. **Content Drafting**: All content will be written from scratch based on SpecSwarm repo documentation. No lorem ipsum placeholders in final implementation.

4. **Pricing Page Removal**: Current Pricing page will be removed. "Free Forever" message moves to footer. ROI calculator not included in redesign.

5. **Simplified Commands**: Emphasis on 3 high-level commands (build, fix, ship) with granular commands presented as "power user" option, not primary workflow.

6. **Navigation Structure**: 5 main pages (Home, Features, Get Started, Docs, Use Cases) plus GitHub link. No blog, changelog, or community pages in v1.

7. **GitHub Links**: External documentation links point to main SpecSwarm repository. No separate documentation site deployed yet.

8. **No Interactive Demos**: Code examples are display-only with syntax highlighting. No executable sandboxes or interactive tutorials.

9. **Static Deployment**: Site remains static (Astro SSG). Deployed to Vercel, Netlify, or Cloudflare Pages. No server-side rendering or API endpoints.

10. **Browser Support**: Modern browsers only (Chrome, Firefox, Safari, Edge latest 2 versions). No IE11 or legacy browser support.

11. **Icons**: Simple icons from Lucide React or similar library. No custom illustrations or photography in v1.

12. **Font Loading**: System font stack or web fonts loaded from CDN. Assumes fast font delivery for performance.

13. **Analytics**: No analytics integration in v1. Can be added post-launch.

14. **Mobile Menu**: Hamburger menu on mobile is optional. May use simple stacked navigation if 5 links fit cleanly. Implementation decision during design.

15. **Animation Complexity**: Text entrance animation on homepage hero only. Other pages use simpler scroll reveals and hover states. Balance polish with performance.

16. **Search**: No search functionality. Users navigate via main navigation and documentation page links.

17. **Versioning**: Content reflects SpecSwarm v3.0+ (unified plugin, high-level commands). No version switcher needed.

18. **Case Study**: Feature 015 validation is the primary social proof. Other case studies may be added in future iterations.

19. **Accessibility Testing**: Manual testing with keyboard navigation and screen reader during development. Automated axe-core audit in CI.

20. **Image Optimization**: Minimal images expected (mostly icons). Any images added will be optimized (WebP format, lazy loading).

## Out of Scope

- User authentication or accounts
- Backend API or database
- Blog or CMS functionality
- Newsletter signup or email capture
- Search functionality
- Interactive code sandboxes or demos
- Video content or tutorials
- Internationalization (i18n)
- A/B testing or experimentation
- Analytics dashboard
- Live chat or support widget
- Custom illustrations or branded photography
- Automated content synchronization with SpecSwarm repo
- Mobile app or PWA functionality
- Multiple design themes or dark mode toggle
- Pricing page (content moved to footer)
- Community showcase or user testimonials (beyond Feature 015)
- Changelog page (link to GitHub instead)
- FAQ page (removed, key questions in use cases/docs if needed)
- Installation guide page (covered in Get Started)
- Comparison page (vs other tools)
