# Implementation Tasks: Complete Site Redesign with New Content Strategy

**Feature**: 002-complete-site-redesign-implementing-new-content-strategy-and
**Created**: 2025-11-11
**Status**: Ready for Implementation

<!-- Tech Stack Validation: PASSED -->
<!-- Validated against: /memory/tech-stack.md (2025-11-10) -->
<!-- No prohibited technologies found -->
<!-- All technologies approved in tech stack -->

---

## Overview

This tasks.md breaks down the complete site redesign into actionable, independently testable increments organized by user scenario. Each phase delivers a complete user story that can be validated independently.

**Total Tasks**: 48
**Parallelizable Tasks**: 28
**Estimated Time**: 12-16 hours

---

## Task Organization Strategy

### User Story Phases

1. **Phase 1: Setup** - Project initialization and cleanup
2. **Phase 2: Foundation** - Design system and shared infrastructure
3. **Phase 3: US1 - Homepage Discovery** (Scenario 1: Developer Frustrated with AI Drift)
4. **Phase 4: US2 - Features Exploration** (Scenario 2: Evaluating Control and Transparency)
5. **Phase 5: US3 - Quick Start Journey** (Scenario 3: Quick Start)
6. **Phase 6: US4 - Use Cases Deep Dive** (Scenario 4: Deep Dive into Workflows)
7. **Phase 7: US5 - Command Reference** (Scenario 5: Finding Command Reference)
8. **Phase 8: Polish & Integration** - Cross-cutting concerns and final QA

### Parallelization Strategy

- Tasks marked **[P]** can run in parallel within their phase
- Tasks without [P] must complete sequentially
- Different files = parallelizable
- Same file = sequential

---

## Phase 1: Setup (Project Initialization)

**Goal**: Clean slate and prepare project structure

**Checkpoint**: Project structure ready, old code removed, configuration preserved

### T001: Remove existing pages [P]
**File**: `src/pages/index.astro`, `src/pages/features.astro`, `src/pages/pricing.astro`
**Action**: Delete all existing page files to start fresh
```bash
rm -f src/pages/index.astro
rm -f src/pages/features.astro
rm -f src/pages/pricing.astro
```
**Acceptance**: Old page files deleted, directory exists

### T002: Remove existing components [P]
**File**: `src/components/*`
**Action**: Delete all existing component files
```bash
rm -rf src/components/*
```
**Acceptance**: Components directory empty

### T003: Create directory structure [P]
**File**: Project directories
**Action**: Create fresh directory structure
```bash
mkdir -p src/pages
mkdir -p src/layouts
mkdir -p src/components
mkdir -p src/styles
```
**Acceptance**: All directories exist

### T004: Verify configuration files preserved [P]
**Files**: `astro.config.mjs`, `package.json`, `tsconfig.json`
**Action**: Verify configuration files still exist and are valid
**Acceptance**: All config files present, no corruption

---

## Phase 2: Foundation (Design System & Shared Infrastructure)

**Goal**: Establish design system, base layout, and shared components used across all pages

**Checkpoint**: Design system configured, shared components functional, ready for page implementation

### T005: Extract design values from anthropic.com
**File**: `features/002-.../research.md`
**Action**: Visit anthropic.com, extract design system values using browser DevTools:
- Color palette (text, accent, backgrounds, borders)
- Typography scale (clamp() formulas, font families, weights)
- Spacing system (sections, elements, container)
- Animation patterns (timings, easings, stagger values)
- Component styles (buttons, cards, links)
**Acceptance**: research.md contains complete design system specification with exact CSS values

### T006: Extract content from SpecSwarm repository
**File**: `features/002-.../research.md`
**Action**: Read and extract content from:
- `/home/marty/code-projects/specswarm/README.md` - feature descriptions, commands
- `/home/marty/code-projects/specswarm/CHANGELOG.md` - Feature 015 metrics
- `/home/marty/code-projects/specswarm/docs/WORKFLOW.md` - workflow guidance
- `/home/marty/code-projects/specswarm/docs/CHEATSHEET.md` - command reference
**Acceptance**: research.md contains all source content organized by page with citations

### T007: Configure Tailwind CSS design tokens
**File**: `tailwind.config.mjs`
**Action**: Extend Tailwind theme with Anthropic-inspired design tokens from research.md:
```js
extend: {
  colors: {
    primary: '#131314',
    secondary: '#64748b',
    accent: '#d97757',
    background: '#FAF9F0',
    surface: '#FFFFFF',
    border: '#E5E5E5',
    'code-bg': '#F5F5F5',
  },
  fontSize: {
    'display-xl': 'clamp(2.5rem, 2.04rem + 1.95vw, 4rem)',
    'display-m': 'clamp(1.75rem, 1.67rem + 0.32vw, 2rem)',
    'body-l': 'clamp(1.125rem, 1.08rem + 0.16vw, 1.25rem)',
  },
  spacing: {
    'section-lg': 'clamp(5rem, 4rem + 4vw, 7.5rem)',
    'section-md': 'clamp(3rem, 2.5rem + 2vw, 5rem)',
  },
}
```
**Acceptance**: Tailwind config includes all design tokens, utilities accessible

### T008: Create global styles
**File**: `src/styles/global.css`
**Action**: Create global CSS with:
- Tailwind import
- System font stack
- Code font (Fira Code)
- Smooth scrolling
- prefers-reduced-motion media query
```css
@import "tailwindcss";

html {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
               "Helvetica Neue", Arial, sans-serif;
  scroll-behavior: smooth;
}

code, pre {
  font-family: 'Fira Code', 'Cascadia Code', 'Consolas', monospace;
}

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
**Acceptance**: Global styles created, imports work, fonts apply

### T009: Create BaseLayout component
**File**: `src/layouts/BaseLayout.astro`
**Action**: Create base layout with:
- TypeScript props interface: `{ title: string; description: string; ogImage?: string }`
- SEO meta tags (charset, viewport, title, description)
- OpenGraph tags (og:title, og:description, og:image, og:url, og:type)
- Twitter Card tags (twitter:card, twitter:title, twitter:description, twitter:image)
- Global CSS import
- Slot for page content
- Header and Footer component slots (components created later)
**Acceptance**: BaseLayout renders, all meta tags present, TypeScript types work

### T010: Create Header component
**File**: `src/components/Header.astro`
**Action**: Create header with:
- SpecSwarm logo/brand (text-based)
- Navigation links: Home, Features, Get Started, Docs, Use Cases
- GitHub icon link (Lucide React `ExternalLink` icon)
- Active page indicator (check `Astro.url.pathname`)
- Sticky positioning (`sticky top-0 z-50`)
- Responsive: horizontal desktop, test mobile (implement hamburger if needed in T011)
- Tailwind styling with design tokens
**Acceptance**: Header displays, navigation works, GitHub link opens in new tab, active state works

### T011: Create MobileMenu component (conditional)
**File**: `src/components/MobileMenu.tsx`
**Action**: Test mobile navigation at 375px. If links don't fit cleanly, create React island:
- Props: `{ links: Array<{ href: string; label: string }> }`
- State: `isOpen` (useState)
- Hamburger icon (Lucide `Menu`)
- Overlay/slide-in panel
- Close button (Lucide `X`)
- Close on link click, outside click, Esc key
- Smooth animation (200ms ease)
- ARIA labels, keyboard navigation
- `client:load` directive
**Acceptance**: If needed: menu opens/closes, links work, accessible. If not needed: skip this task

### T012: Create Footer component [P]
**File**: `src/components/Footer.astro`
**Action**: Create footer with:
- SpecSwarm branding
- Links: Documentation (/docs), GitHub (external), Support (GitHub issues), License (GitHub)
- "Free. Forever. MIT License." message
- Copyright: "© 2025 SpecSwarm"
- Responsive: multi-column desktop, stacked mobile
- Subtle styling (light background, small text)
**Acceptance**: Footer displays, all links work, responsive layout correct

### T013: Create Button component [P]
**File**: `src/components/Button.astro`
**Action**: Create reusable CTA button:
- Props: `{ href: string; variant?: 'primary' | 'secondary'; size?: 'medium' | 'large' }`
- Primary variant: outlined (accent border) → filled on hover (accent bg, white text)
- Border-radius: 8px, padding: 12px 24px (medium) or 16px 32px (large)
- Smooth transitions (200ms ease)
- Focus states with outline
- TypeScript interface
**Acceptance**: Button component works, variants styled correctly, hover/focus states work

### T014: Create CodeBlock component [P]
**File**: `src/components/CodeBlock.astro`
**Action**: Create code block with Shiki server-side highlighting:
- Props: `{ code: string; lang: string }`
- Use Shiki for syntax highlighting (server-side)
- Light theme (github-light or similar)
- Light gray background (#F5F5F5)
- Border-radius: 8px, padding: 20px
- Fira Code font
- Support languages: bash, typescript, markdown, yaml
- Responsive: horizontal scroll on mobile
**Acceptance**: CodeBlock renders with syntax highlighting, no runtime JS, responsive

### T015: Create FeatureCard component [P]
**File**: `src/components/FeatureCard.astro`
**Action**: Create reusable feature card:
- Props: `{ icon: string; title: string; description: string; codeExample?: string }`
- Icon (Lucide React component name as string, render dynamically)
- Title (h3)
- Description (paragraph)
- Optional CodeBlock
- White background, subtle border, 12px radius, 24px padding
- Equal visual weight with other cards
**Acceptance**: FeatureCard renders correctly, icon displays, optional code works

### T016: Create ScenarioCard component [P]
**File**: `src/components/ScenarioCard.astro`
**Action**: Create scenario card for use cases:
- Props: `{ icon: string; challenge: string; approach: string; result: string }`
- Icon at top
- Three sections: "The Challenge", "The SpecSwarm Approach", "Result"
- Visual hierarchy (headings, spacing)
- Consistent styling with FeatureCard
**Acceptance**: ScenarioCard renders, three sections display correctly, styled consistently

---

## Phase 3: US1 - Homepage Discovery (Scenario 1)

**User Story**: As a developer frustrated with AI drift, I want to land on the homepage and immediately understand that SpecSwarm prevents AI from going off the rails, so I can quickly assess if it solves my problem.

**Success Criteria**:
- Developer understands SpecSwarm prevents AI drift within 30 seconds
- Hero message "AI automation that doesn't go off the rails" is immediately visible
- Problem section resonates with pain points
- Solution (3 commands) is clear and simple
- Social proof (metrics) builds credibility
- CTA to Get Started is prominent

**Checkpoint**: Homepage complete, developer can understand value proposition and navigate to Get Started

### T017: Create AnimatedHero component
**File**: `src/components/AnimatedHero.tsx`
**Action**: Create React island for hero text animation:
- Props: `{ text: string }`
- Split text into words
- Map each word to span with staggered opacity animation
- CSS-based: opacity 0 → 1, delay 75ms * index, duration 500ms, ease-out
- Check prefers-reduced-motion: if true, instant display (animation-duration: 0.01ms)
- TypeScript interface
- Export component
**Acceptance**: AnimatedHero animates text with stagger, respects reduced motion, TypeScript types work

### T018: Create homepage file
**File**: `src/pages/index.astro`
**Action**: Create homepage with BaseLayout:
- Title: "Home | SpecSwarm - AI automation that doesn't go off the rails"
- Description: "SpecSwarm maintains YOUR tech stack, follows natural development workflows, and keeps you in control. Build → Fix → Ship in 3 commands."
- Import all needed components (AnimatedHero, Button, CodeBlock, FeatureCard)
- Structure: 6 sections (hero, problem, solution, what makes it different, proof, footer CTA)
**Acceptance**: Homepage renders with BaseLayout, all imports work

### T019: Implement hero section [Story: US1]
**File**: `src/pages/index.astro`
**Action**: Implement hero section:
- AnimatedHero component with text: "AI automation that doesn't go off the rails"
- Subtext: "When AI builds features, does it use YOUR stack? Follow YOUR patterns? Ask before making decisions?"
- Button component: "Get Started in 5 Minutes" (href="/get-started")
- `client:load` directive on AnimatedHero
- Generous whitespace (section-lg padding)
- Center-aligned layout
**Acceptance**: Hero displays, animation works, CTA button links to /get-started

### T020: Implement problem section [Story: US1]
**File**: `src/pages/index.astro`
**Action**: Implement problem section:
- Heading: "The Problem with AI Code Generation"
- 4 pain points (use Lucide icons: XCircle or AlertCircle):
  - Drifts from your approved tech stack
  - Makes decisions without asking
  - Black box automation you can't control
  - Inconsistent with your patterns
- Single column, center or left-aligned
- Ample vertical spacing (section-md)
**Acceptance**: Problem section displays, icons render, text clear

### T021: Implement solution section (3 commands) [Story: US1]
**File**: `src/pages/index.astro`
**Action**: Implement solution section:
- Heading: "Build. Fix. Ship."
- 3-column grid (grid-cols-1 md:grid-cols-3)
- For each command:
  - CodeBlock with command (bash language)
  - Description (2-3 sentences from research.md)
- Commands:
  1. `/specswarm:build "add user avatars" --validate`
  2. `/specswarm:fix "auth token refresh failing"`
  3. `/specswarm:ship`
- Small note below: "Need more control? Granular commands available for power users."
- Visual separators between columns
**Acceptance**: Three commands display in grid, responsive stacking, code highlighted

### T022: Implement "What Makes It Different" section [Story: US1]
**File**: `src/pages/index.astro`
**Action**: Implement differentiation section:
- Heading: "What Makes SpecSwarm Different"
- 4 FeatureCards in 2x2 grid (grid-cols-1 md:grid-cols-2):
  1. Tech Stack Enforcement (icon: Shield, description from research.md)
  2. Natural Workflows (icon: GitBranch, description from research.md)
  3. Decision Checkpoints (icon: CheckCircle, description from research.md)
  4. Quality Gates (icon: Award, description from research.md)
- Gap between cards, responsive stacking
**Acceptance**: 4 cards display in grid, responsive, icons show, descriptions accurate

### T023: Implement proof section [Story: US1]
**File**: `src/pages/index.astro`
**Action**: Implement social proof section:
- Single line: "85-90% time savings • 96.3% test pass rate • 76/76 tasks completed"
- Link: "Read the full case study →" (href="/use-cases#case-study")
- Centered, small text (text-sm), subtle color (text-secondary)
- Separated by bullets or vertical bars
**Acceptance**: Metrics display, link works, styling subtle

### T024: Implement footer CTA section [Story: US1]
**File**: `src/pages/index.astro`
**Action**: Implement final CTA:
- Text: "Try your first feature in 5 minutes"
- Button component: "Get Started" (href="/get-started", size="large")
- Centered, generous whitespace
- Final section before site footer
**Acceptance**: CTA displays, button links to /get-started, prominent styling

---

## Phase 4: US2 - Features Exploration (Scenario 2)

**User Story**: As a developer skeptical of black box AI, I want to explore the Features page to understand SpecSwarm's capabilities and how I maintain control, so I can evaluate if it fits my workflow.

**Success Criteria**:
- 6 feature capabilities clearly explained
- Natural workflow transparency emphasized
- Decision checkpoints highlighted
- Quality gates and tech stack enforcement clear
- Developer confident they maintain control

**Checkpoint**: Features page complete, developer understands all capabilities and control mechanisms

### T025: Create features page file
**File**: `src/pages/features.astro`
**Action**: Create features page with BaseLayout:
- Title: "Features | SpecSwarm"
- Description: "Complete capabilities for build, maintain, and ship. Tech stack enforcement, quality gates, natural workflows, and autonomous execution."
- Import FeatureCard, Button components
- Structure: hero, feature grid, footer CTA
**Acceptance**: Features page renders with BaseLayout

### T026: Implement features page hero [Story: US2]
**File**: `src/pages/features.astro`
**Action**: Implement page hero:
- Heading: "Capabilities"
- Subtext: "Everything you need to build, maintain, and ship with confidence."
- Simple, clean, generous spacing
**Acceptance**: Hero displays, text readable

### T027: Implement feature grid (6 cards) [Story: US2]
**File**: `src/pages/features.astro`
**Action**: Implement 6 feature cards (grid-cols-1 md:grid-cols-2 lg:grid-cols-3):
1. **Tech Stack Enforcement** (icon: Shield)
   - Description from research.md (README.md source)
   - Optional code example: tech-stack.md snippet
2. **Build → Fix → Ship** (icon: Zap)
   - Description: 3 commands for complete lifecycle
3. **Quality Gates** (icon: Award)
   - Description: Automated scoring, test validation, merge protection
4. **Natural Workflows** (icon: GitBranch)
   - Description: Specify → plan → implement → test → ship
5. **Autonomous Execution** (icon: Cpu)
   - Description: AI handles orchestration, you make decisions
6. **Complete Lifecycle** (icon: RefreshCw)
   - Description: Features, bugs, refactoring, upgrades
- Use FeatureCard component for each
- Content from research.md (sourced from SpecSwarm README.md)
**Acceptance**: 6 cards display in grid, responsive, content accurate

### T028: Implement features footer CTA [Story: US2]
**File**: `src/pages/features.astro`
**Action**: Implement footer CTA:
- Text: "See it in action"
- Button: "Explore Use Cases" (href="/use-cases")
- Centered
**Acceptance**: CTA displays, button links to /use-cases

---

## Phase 5: US3 - Quick Start Journey (Scenario 3)

**User Story**: As a developer ready to try SpecSwarm, I want a clear step-by-step guide to install and run my first feature in under 10 minutes, so I can experience the value quickly.

**Success Criteria**:
- 4-step tutorial clear and actionable
- Installation command copy-friendly
- Each step explains what happens
- Next steps guide to advanced features
- Developer completes first feature within 10 minutes

**Checkpoint**: Get Started page complete, developer can follow tutorial to first feature

### T029: Create get-started page file
**File**: `src/pages/get-started.astro`
**Action**: Create get started page with BaseLayout:
- Title: "Get Started | SpecSwarm"
- Description: "Install SpecSwarm and build your first feature in 5 minutes. Step-by-step guide from installation to first ship."
- Import CodeBlock, Button components
- Structure: hero, 4-step tutorial, next steps
**Acceptance**: Get Started page renders with BaseLayout

### T030: Implement get-started page hero [Story: US3]
**File**: `src/pages/get-started.astro`
**Action**: Implement page hero:
- Heading: "Get Started"
- Subtext: "Install SpecSwarm and build your first feature in 5 minutes."
**Acceptance**: Hero displays

### T031: Implement 4-step tutorial [Story: US3]
**File**: `src/pages/get-started.astro`
**Action**: Implement linear 4-step flow:

**Step 1: Install**
- Number badge: "1"
- Heading: "Install"
- CodeBlock: `/plugin https://github.com/MartyBonacci/specswarm` (bash)
- Description: "SpecSwarm is a Claude Code plugin. Run this command in Claude Code to install."

**Step 2: Initialize Your Project**
- Number badge: "2"
- Heading: "Initialize Your Project"
- CodeBlock: `/specswarm:init` (bash)
- Description: "Define your tech stack (approved and prohibited technologies) and quality standards. This creates configuration files that SpecSwarm references during every build."

**Step 3: Build Your First Feature**
- Number badge: "3"
- Heading: "Build Your First Feature"
- CodeBlock: `/specswarm:build "add user profile avatar upload feature"` (bash)
- Description: "SpecSwarm will:"
- Bullet list:
  - Ask clarifying questions about requirements
  - Create a detailed implementation plan
  - Break the work into actionable tasks
  - Write code, tests, and documentation
  - Run quality validation and tests
- Note: "You review and approve at each checkpoint."

**Step 4: Ship It**
- Number badge: "4"
- Heading: "Ship It"
- CodeBlock: `/specswarm:ship` (bash)
- Description: "Run final quality checks. If all gates pass, SpecSwarm merges to your parent branch. If quality thresholds aren't met, you'll get a clear report of what needs attention."

- Clear visual separation (borders, spacing, or cards)
**Acceptance**: All 4 steps display linearly, code highlighted, descriptions clear

### T032: Implement next steps section [Story: US3]
**File**: `src/pages/get-started.astro`
**Action**: Implement next steps:
- Heading: "Next Steps"
- List:
  - "Try `/specswarm:fix` for regression-test-first bug fixing"
  - "Explore granular commands (/specswarm:specify, /specswarm:plan, etc.) for more control"
  - "Read the full documentation for advanced features"
- Link: "View Documentation →" (href="/docs")
**Acceptance**: Next steps display, link to docs works

---

## Phase 6: US4 - Use Cases Deep Dive (Scenario 4)

**User Story**: As a developer needing evidence before committing, I want to see real-world use cases and the Feature 015 case study, so I can verify SpecSwarm's production readiness.

**Success Criteria**:
- 3 scenarios show concrete before/after comparisons
- Feature 015 case study shows real metrics (76/76 tasks, 96.3% pass rate)
- Time savings quantified (3-5 days → 4-5 hours)
- Production deployment verified
- Developer has concrete evidence of capabilities

**Checkpoint**: Use Cases page complete, developer sees validated production results

### T033: Create use-cases page file
**File**: `src/pages/use-cases.astro`
**Action**: Create use cases page with BaseLayout:
- Title: "Use Cases | SpecSwarm"
- Description: "Real-world SpecSwarm scenarios: new features (3-5 days → 4-5 hours), bug fixing with regression tests, dependency upgrades."
- Import ScenarioCard, Button components
- Structure: hero, 3 scenario cards, case study section
**Acceptance**: Use Cases page renders with BaseLayout

### T034: Implement use-cases page hero [Story: US4]
**File**: `src/pages/use-cases.astro`
**Action**: Implement page hero:
- Heading: "Use Cases"
- Subtext: "See how SpecSwarm handles real development scenarios."
**Acceptance**: Hero displays

### T035: Implement 3 scenario cards [Story: US4]
**File**: `src/pages/use-cases.astro`
**Action**: Implement 3 scenario cards (grid-cols-1 md:grid-cols-3 or stacked):

**Scenario 1: Building a New Feature** (icon: Code)
- Challenge: "You need to add a complex feature with multiple components, state management, tests, and documentation. Typical timeline: 3-5 days of planning, coding, testing, and reviews."
- Approach: "`/specswarm:build \"add real-time collaborative editing\" --validate`\n\nSpecSwarm clarifies requirements, creates a plan, implements all code and tests, validates quality, and prepares for merge."
- Result: "3-5 days → 4-5 hours (mostly autonomous execution)"

**Scenario 2: Fixing a Production Bug** (icon: Bug)
- Challenge: "Production bug requires reproducing the issue, debugging root cause, writing fix, creating regression test, running full test suite."
- Approach: "`/specswarm:fix \"user session expires mid-form causing data loss\"`\n\nSpecSwarm creates regression test first, implements fix, validates against full test suite, ensures bug doesn't resurface."
- Result: "Automated regression test creation ensures bug stays fixed"

**Scenario 3: Upgrading Major Dependencies** (icon: ArrowUpCircle)
- Challenge: "React 18 → 19 has breaking changes. You need to read changelogs, identify breaking changes in your codebase, refactor accordingly, test everything."
- Approach: "`/specswarm:upgrade react@19`\n\nSpecSwarm analyzes changelog, identifies breaking changes affecting your code, generates codemods and refactoring plan, implements changes, validates tests."
- Result: "Hours of manual changelog reading → automated breaking change analysis"

- Use ScenarioCard component
- Content from research.md (sourced from SpecSwarm docs)
**Acceptance**: 3 scenarios display, content accurate, icons show

### T036: Implement Feature 015 case study section [Story: US4]
**File**: `src/pages/use-cases.astro`
**Action**: Implement case study section (id="case-study" for anchor link from homepage):
- Heading: "Real-World Production Validation"
- Subheading: "Project: CustomCult2 - React 19 + Redux + Three.js snowboard customization app"
- Feature description: "Complete testing infrastructure implementation"
- Scope bullets (ul):
  - Vitest configuration and setup
  - React Testing Library integration
  - 3D rendering test utilities (Three.js)
  - Redux store testing patterns
  - Component test suite (26 components)
- Results metrics (formatted nicely):
  - ✓ 76/76 tasks completed (100%)
  - ✓ 131/136 tests passing (96.3%)
  - ✓ 3,500+ lines of test code generated
  - ✓ 1,530 lines of documentation created
  - ✓ Successfully merged to sprint-4
- Time comparison: "Traditional approach: 3-5 days of manual work" / "With SpecSwarm: 4-5 hours (mostly autonomous)"
- Developer involvement: "Approval at 3-4 checkpoints"
- Validation points (bullets):
  - Tech stack enforcement (prevented Jest drift, correctly chose Vitest)
  - Autonomous execution (minimal manual intervention)
  - Production-ready code quality (96.3% pass rate)
  - Complex dependency handling (React 19, Three.js, Redux)
- Link: "View full case study →" (href to GitHub CHANGELOG or full details)
- Prominent section, visually separated from scenario cards
- Use metrics cleanly (checkmarks, formatting)
- Content from research.md (sourced from CHANGELOG.md Feature 015)
**Acceptance**: Case study displays, all metrics accurate (verified from CHANGELOG.md), formatted cleanly

---

## Phase 7: US5 - Command Reference (Scenario 5)

**User Story**: As a developer using SpecSwarm, I want to quickly find command syntax in the Docs page, so I can reference commands without leaving the site.

**Success Criteria**:
- Quick command reference lists all commands with syntax
- High-level commands (build, fix, upgrade, ship) prominent
- Granular commands available for power users
- Common workflows explained
- External links to GitHub docs functional
- Developer finds command within 30 seconds

**Checkpoint**: Docs page complete, command reference accessible and accurate

### T037: Create docs page file
**File**: `src/pages/docs.astro`
**Action**: Create docs page with BaseLayout:
- Title: "Documentation | SpecSwarm"
- Description: "Complete command reference, workflows, and configuration guide for SpecSwarm."
- Import CodeBlock component
- Structure: hero, quick command reference, common workflows, configuration, external resources
**Acceptance**: Docs page renders with BaseLayout

### T038: Implement docs page hero [Story: US5]
**File**: `src/pages/docs.astro`
**Action**: Implement page hero:
- Heading: "Documentation"
- Subtext: "Complete reference for SpecSwarm workflows, commands, and configuration."
**Acceptance**: Hero displays

### T039: Implement quick command reference section [Story: US5]
**File**: `src/pages/docs.astro`
**Action**: Implement command reference:

**Section heading**: "Quick Command Reference"

**Subheading**: "High-Level Commands (Recommended for Most Users)"

List 4 commands (each with CodeBlock + description):
1. `/specswarm:build "feature description" [--validate]`
   - Description: "Complete feature development from specification to implementation"
2. `/specswarm:fix "bug description" [--max-retries=N]`
   - Description: "Regression-test-first bug fixing with automatic retry logic"
3. `/specswarm:upgrade <package>[@version] [--breaking-changes-only]`
   - Description: "Dependency and framework upgrades with breaking change analysis"
4. `/specswarm:ship [--skip-tests]`
   - Description: "Quality-gated merge to parent branch with validation"

**Subheading**: "Granular Commands (For Power Users)"

List 6 commands (name + brief description, no code blocks):
1. `/specswarm:specify` - Create or update feature specification
2. `/specswarm:clarify` - Ask targeted questions to refine requirements
3. `/specswarm:plan` - Generate implementation plan from specification
4. `/specswarm:tasks` - Create dependency-ordered task list from plan
5. `/specswarm:implement` - Execute all tasks autonomously
6. `/specswarm:complete` - Finalize feature and merge to parent branch

Link: "View full command reference on GitHub →" (external link to SpecSwarm repo)

- Content from research.md (sourced from CHEATSHEET.md)
**Acceptance**: All commands listed, syntax highlighted, descriptions accurate, link works

### T040: Implement common workflows section [Story: US5]
**File**: `src/pages/docs.astro`
**Action**: Implement workflows section:

**Section heading**: "Common Workflows"

3 workflows (each with heading + numbered steps):

**New Feature Development**
1. `/specswarm:build "feature description" --validate`
2. Review and approve at checkpoints
3. `/specswarm:ship` when ready

**Bug Fixing**
1. `/specswarm:fix "bug description"`
2. Review regression test and fix
3. Verify full test suite passes

**Dependency Upgrade**
1. `/specswarm:upgrade react@19`
2. Review breaking change analysis
3. Approve migration code modifications

Link: "Read detailed workflow guide →" (external link to GitHub WORKFLOW.md)

- Content from research.md (sourced from WORKFLOW.md)
**Acceptance**: Workflows display, steps clear, link works

### T041: Implement configuration section [Story: US5]
**File**: `src/pages/docs.astro`
**Action**: Implement configuration section:

**Section heading**: "Project Configuration"

Topics (each with brief description):
- **Tech Stack Definition**: Define approved and prohibited technologies in `/memory/tech-stack.md`
- **Quality Standards**: Configure quality thresholds and scoring criteria
- **Advanced Configuration**: Orchestration settings, validation rules, custom workflows

Link: "View configuration guide →" (external link or docs section)

**Acceptance**: Configuration topics listed, descriptions clear, link works

### T042: Implement external resources section [Story: US5]
**File**: `src/pages/docs.astro`
**Action**: Implement external resources:

**Section heading**: "External Resources"

Links (each opens in new tab with external link icon):
- Full Workflow Guide (GitHub WORKFLOW.md)
- Command Cheatsheet (GitHub CHEATSHEET.md)
- GitHub Repository (https://github.com/MartyBonacci/specswarm)
- Changelog (GitHub CHANGELOG.md)

**Acceptance**: All links display, open in new tab, icons show

---

## Phase 8: Polish & Integration (Cross-Cutting Concerns)

**Goal**: Final integration, testing, optimization, and deployment preparation

**Checkpoint**: Site complete, tested, performant, accessible, ready for deployment

### T043: Performance testing and optimization [P]
**Action**: Run Lighthouse audits on all 5 pages:
- Home, Features, Get Started, Docs, Use Cases
- Target: Performance score ≥95
- Verify metrics: FCP <1.5s, LCP <2.5s, TBT <200ms, CLS <0.1
- Check bundle sizes: dist/ folder, each page <200KB gzipped
- Optimize if needed:
  - Reduce unused CSS
  - Minimize JavaScript
  - Check for unnecessary re-renders
  - Optimize images (if any)
**Acceptance**: All pages score ≥95, Core Web Vitals green, bundle sizes within budget, zero console errors

### T044: Accessibility testing and fixes [P]
**Action**: Run accessibility audits:
- Install axe DevTools, scan all 5 pages
- Run Lighthouse accessibility audit (target: 100)
- Manual keyboard navigation test (Tab through all pages)
- Check focus indicators visible
- Test Esc key on mobile menu (if applicable)
- Screen reader test (NVDA or VoiceOver if possible)
- Color contrast validation (all text meets 4.5:1 normal, 3:1 large)
- Fix any violations found
**Acceptance**: Zero axe-core violations, Lighthouse accessibility 100, all keyboard-accessible, focus indicators visible, screen reader compatible, color contrast passes

### T045: Responsive design testing and fixes [P]
**Action**: Test all pages at key breakpoints:
- Mobile: 375px (iPhone SE), 414px (iPhone Pro Max)
- Tablet: 768px (iPad)
- Desktop: 1024px, 1280px, 1920px
- Verify:
  - Layouts adapt correctly
  - No horizontal scrolling
  - Text readable (16px+ on mobile)
  - Touch targets adequate (44x44px minimum)
  - Images/content scale appropriately
- Test on real devices if available (iPhone Safari, Android Chrome, iPad)
- Fix any overflow or layout issues
**Acceptance**: All pages responsive at all breakpoints, no horizontal scroll, text readable on mobile, touch targets adequate, mobile menu works (if applicable)

### T046: Browser compatibility testing [P]
**Action**: Test in all target browsers:
- Chrome (latest)
- Firefox (latest)
- Safari macOS (latest)
- Safari iOS (latest)
- Edge (latest)
- Check functionality: pages load, navigation works, animations work (or degrade), links functional
- Check styling: fonts render, colors accurate, layouts correct
- Check console: no errors in any browser
- Fix any browser-specific issues (add prefixes, polyfills if needed)
**Acceptance**: Site works in Chrome, Firefox, Safari, Edge (latest 2 versions), styling consistent, no console errors

### T047: Content accuracy verification [P]
**Action**: Verify all content against source documentation:
- Compare each page to research.md
- Verify against original sources:
  - README.md (feature descriptions)
  - CHANGELOG.md (Feature 015 metrics: 85-90%, 96.3%, 76/76, 3-5 days → 4-5 hours)
  - WORKFLOW.md (workflow explanations)
  - CHEATSHEET.md (command syntax)
- Verify command syntax correct (all examples work as written)
- Check all links: internal links go to correct pages, external links (GitHub) functional
- Proofread for typos or grammar issues
- Fix any inaccuracies found
**Acceptance**: All content matches source documentation, metrics accurate and verified, command syntax correct, all links functional, no typos

### T048: Build verification and deployment prep [P]
**Action**: Final build and deployment readiness:
- Clean build:
  ```bash
  rm -rf dist/
  npm run build
  ```
- Check for errors/warnings: zero build errors, zero TypeScript errors
- Verify build output: check dist/ folder, all pages generated, verify file sizes
- Test preview:
  ```bash
  npm run preview
  ```
- Visit http://localhost:4321, click through all pages, verify everything works
- Verify SEO metadata: view page source, check all meta tags present (title, description, OG, Twitter)
- Verify page titles unique and correct
- Verify semantic HTML: proper heading hierarchy (H1 → H2 → H3), single H1 per page
- Create deployment checklist document in feature directory
**Acceptance**: Build completes without errors, all pages generated, preview works, SEO metadata correct, semantic HTML valid, deployment checklist created, ready for merge

---

## Dependencies & Execution Order

### Critical Path (Must Complete Sequentially)

1. **Phase 1 (Setup)** → Must complete before all other phases
2. **Phase 2 (Foundation)** → Must complete before pages (depends on Phase 1)
3. **Phases 3-7 (Pages)** → Can start after Phase 2, can run in parallel with each other
4. **Phase 8 (Polish)** → Must complete after all pages implemented

### Phase Dependencies

- **Phase 1 → Phase 2**: Foundation needs clean project structure
- **Phase 2 → Phases 3-7**: Pages need design system and shared components
- **Phases 3-7 → Phase 8**: Polish needs complete pages to test

### User Story Independence

Once Phase 2 (Foundation) completes, user story phases (3-7) are **independent** and can be implemented in parallel:

- **US1 (Homepage)**: Independent, can start immediately after Phase 2
- **US2 (Features)**: Independent, can start immediately after Phase 2
- **US3 (Get Started)**: Independent, can start immediately after Phase 2
- **US4 (Use Cases)**: Independent, can start immediately after Phase 2
- **US5 (Docs)**: Independent, can start immediately after Phase 2

**Recommended Parallel Execution**:
```
Phase 1 (Setup) → Phase 2 (Foundation) →
  ├─ Phase 3 (US1 - Homepage) ─┐
  ├─ Phase 4 (US2 - Features) ─┤
  ├─ Phase 5 (US3 - Get Started) ─┤
  ├─ Phase 6 (US4 - Use Cases) ─┤
  └─ Phase 7 (US5 - Docs) ──────┘
  → Phase 8 (Polish & Integration)
```

---

## Parallel Execution Examples

### Within Phase 2 (Foundation)

Can run in parallel after T006 (research complete):
- T007 (Tailwind config) [P]
- T008 (Global styles) [P]
- T010 (Header) [P]
- T012 (Footer) [P]
- T013 (Button) [P]
- T014 (CodeBlock) [P]
- T015 (FeatureCard) [P]
- T016 (ScenarioCard) [P]

Must wait for T007-T008:
- T009 (BaseLayout) - needs global styles imported

### Across User Story Phases (3-7)

After Phase 2 completes, all user story phases can run **completely in parallel**:

**Parallel Stream 1**: T017-T024 (Homepage)
**Parallel Stream 2**: T025-T028 (Features)
**Parallel Stream 3**: T029-T032 (Get Started)
**Parallel Stream 4**: T033-T036 (Use Cases)
**Parallel Stream 5**: T037-T042 (Docs)

### Within Phase 8 (Polish)

All QA tasks can run in parallel:
- T043 (Performance) [P]
- T044 (Accessibility) [P]
- T045 (Responsive) [P]
- T046 (Browser) [P]
- T047 (Content) [P]
- T048 (Build) [P]

---

## Implementation Strategy

### MVP Scope (Minimum Viable Product)

For fastest time to value, implement in this order:

1. **Phase 1 + 2** (Foundation) - Required for all pages
2. **Phase 3** (Homepage - US1) - Primary landing page
3. **Phase 5** (Get Started - US3) - Critical for onboarding
4. **Phase 8** (Polish subset) - Performance and accessibility only

**MVP Deliverable**: Homepage + Get Started + Header/Footer (users can land and get started)

**Post-MVP**: Add Features, Use Cases, Docs pages

### Full Implementation Order

1. Phase 1: Setup (T001-T004) - 30 minutes
2. Phase 2: Foundation (T005-T016) - 3-4 hours
3. Phases 3-7: Pages in parallel (T017-T042) - 4-6 hours
4. Phase 8: Polish (T043-T048) - 2-3 hours

**Total Time**: 12-16 hours (as estimated in plan.md)

---

## Testing Strategy

### Per-Task Testing

Each task includes acceptance criteria. Verify immediately after completion.

### Per-Phase Testing

After each phase completes:
- **Phase 2**: Test each component in isolation (Storybook-style or test page)
- **Phases 3-7**: Test complete user flow for that scenario
- **Phase 8**: Comprehensive testing across all pages

### User Story Testing (Phases 3-7)

Each user story phase has independent success criteria. Test against spec.md user scenarios:

**US1 (Homepage)**:
- Can developer understand value in 30 seconds?
- Is "doesn't go off the rails" message clear?
- Do 3 commands demonstrate simplicity?
- Is CTA prominent?

**US2 (Features)**:
- Are all 6 capabilities explained?
- Is control/transparency emphasized?
- Can developer understand tech stack enforcement?

**US3 (Get Started)**:
- Can developer follow 4 steps without confusion?
- Are commands copy-friendly?
- Can they complete first feature in 10 minutes?

**US4 (Use Cases)**:
- Do scenarios show concrete value?
- Is Feature 015 case study compelling?
- Are metrics accurate and verified?

**US5 (Docs)**:
- Can developer find command syntax quickly?
- Are workflows clear?
- Do external links work?

### Final Testing (Phase 8)

Comprehensive testing as defined in T043-T048:
- Performance (Lighthouse ≥95)
- Accessibility (WCAG 2.1 AA, axe-core zero violations)
- Responsive (all breakpoints)
- Browser compatibility (Chrome, Firefox, Safari, Edge)
- Content accuracy (verified against sources)
- Build verification (no errors, SEO correct)

---

## Risk Mitigation

### High Risk Tasks

**T005 (Design extraction from anthropic.com)**:
- **Risk**: May not find exact values
- **Mitigation**: Document best approximations, focus on aesthetic similarity
- **Fallback**: Use similar design system (Linear, Stripe) if extraction fails

**T017 (AnimatedHero component)**:
- **Risk**: Animation may impact performance
- **Mitigation**: Keep simple (CSS-only), test early, measure impact
- **Fallback**: Remove animation if performance drops below 95

**T043 (Performance testing)**:
- **Risk**: Bundle size may exceed 200KB
- **Mitigation**: Monitor throughout development, minimize React islands
- **Fallback**: Remove non-essential features, simplify animations

### Medium Risk Tasks

**T011 (MobileMenu component)**:
- **Risk**: May add unnecessary complexity
- **Mitigation**: Test navigation layout first, only implement if truly needed
- **Fallback**: Use stacked navigation without hamburger

**T047 (Content accuracy)**:
- **Risk**: Source docs may have changed
- **Mitigation**: Verify against latest SpecSwarm release, cross-check metrics
- **Fallback**: Ask user for verification if discrepancies found

---

## Success Metrics

### Quantitative

- ✅ 48 tasks completed
- ✅ 5 pages implemented
- ✅ 8 components created
- ✅ Lighthouse performance ≥95 on all pages
- ✅ Bundle size <200KB per page
- ✅ Accessibility score 100 (Lighthouse)
- ✅ Zero axe-core violations
- ✅ Zero console errors
- ✅ Zero build errors

### Qualitative

- ✅ Developer understands value within 30 seconds (US1)
- ✅ Developer confident in control and transparency (US2)
- ✅ Developer completes first feature in 10 minutes (US3)
- ✅ Developer has production evidence (US4)
- ✅ Developer finds commands quickly (US5)
- ✅ Mobile experience seamless (all stories)

### Constitution Alignment

- ✅ Principle 1 (Performance): Lighthouse ≥95, bundle <200KB
- ✅ Principle 2 (Content Accuracy): Sourced from official docs, verified
- ✅ Principle 3 (Accessibility): WCAG 2.1 AA, axe-core zero violations
- ✅ Principle 4 (User-Centric): Clear hierarchy, scannable, mobile-first
- ✅ Principle 5 (Developer Experience): TypeScript, clear components, no errors
- ✅ Principle 6 (SEO): Complete metadata, semantic HTML

---

## Ready for Implementation

**All tasks defined, numbered, and sequenced.**

**Next Command**: `/specswarm:implement`

This will execute all 48 tasks autonomously with checkpoints at phase boundaries for your review.
