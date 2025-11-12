# Research Documentation

**Feature**: Complete Site Redesign
**Date**: 2025-11-11
**Status**: Phase 2 Foundation Research Complete

---

## T005: Design System Extraction from anthropic.com

### Color Palette

**Adapted for Light Theme** (inverting Anthropic's dark theme):

- **Primary Text**: `#131314` (deep charcoal, near-black)
- **Accent**: `#d97757` (terracotta/rust - unchanged from Anthropic)
- **Background**: `#FAF9F0` (light cream/off-white)
- **Surface**: `#FFFFFF` (pure white for cards and elevated surfaces)
- **Border/Divider**: `#e5e5e0` (subtle warm gray)
- **Text Secondary**: `#87867f` (muted gray for secondary text)

**Selection & Interactive States**:
- Selection background: `rgba(217, 119, 87, 0.15)` (15% terracotta)
- Hover accent: `rgba(217, 119, 87, 0.9)` (90% terracotta)

### Typography Scale (Fluid with clamp())

**Font Families**:
- **Body/Headings**: System font stack (San Francisco, Segoe UI, Roboto, etc.)
- **Monospace**: "Fira Code" weight 500 for code blocks

**Responsive Font Sizes** (using clamp() for fluid scaling):

```css
/* Display Sizes (Headings) */
--text-display-xxl: clamp(3rem, 2.388rem + 2.612vw, 5rem);      /* 48px → 80px */
--text-display-xl: clamp(2.5rem, 2.041rem + 1.959vw, 4rem);     /* 40px → 64px */
--text-display-l: clamp(2rem, 1.694rem + 1.306vw, 3rem);        /* 32px → 48px */
--text-display-m: clamp(1.75rem, 1.673rem + 0.327vw, 2rem);     /* 28px → 32px */

/* Body Sizes */
--text-paragraph-l: clamp(1.375rem, 1.337rem + 0.163vw, 1.5rem); /* 22px → 24px */
--text-paragraph-m: clamp(1.125rem, 1.087rem + 0.163vw, 1.25rem); /* 18px → 20px */
--text-paragraph-s: 1rem;                                         /* 16px base */

/* Code/Monospace */
--text-monospace: clamp(0.875rem, 0.531rem + 1.469vw, 2rem);    /* 14px → 32px */
```

**Line Heights**:
- Headings: 1.1-1.2 (tight for display text)
- Body: 1.6-1.7 (comfortable reading)
- Code: 1.5

**Text Decoration**:
- Underline thickness: `0.06em`
- Underline offset: `0.2em` (rich text links)

### Spacing System

**Base Units** (Responsive):

```css
/* Site-wide spacing */
--site-margin: clamp(2rem, 1.082rem + 3.918vw, 5rem);  /* 32px → 80px */
--site-gutter: 1.5rem;                                  /* 24px between columns */

/* Section spacing */
--section-spacing-xl: 8rem;   /* 128px between major sections */
--section-spacing-lg: 6rem;   /* 96px */
--section-spacing-md: 4rem;   /* 64px */
--section-spacing-sm: 2rem;   /* 32px */

/* Component spacing */
--spacing-xl: 3rem;    /* 48px */
--spacing-lg: 2rem;    /* 32px */
--spacing-md: 1.5rem;  /* 24px */
--spacing-sm: 1rem;    /* 16px */
--spacing-xs: 0.5rem;  /* 8px */
```

**Grid System**:
- 12 columns with dynamic widths
- Responsive breakout grid for full-width sections
- Max content width: Calculate based on 8 columns for comfortable reading

### Animation System

**Durations**:
```css
--duration-fast: 200ms;     /* Quick interactions (dropdowns, hovers) */
--duration-normal: 400ms;   /* Standard transitions (modals, nav) */
--duration-slow: 500ms;     /* Emphasis animations (text reveals) */
--duration-word: 800ms;     /* Individual word animations */
```

**Easing Functions**:
```css
--ease-smooth: cubic-bezier(0.77, 0, 0.175, 1);      /* Smooth open/close */
--ease-snappy: cubic-bezier(0.16, 1, 0.3, 1);        /* Snappy entrance */
--ease-out: ease-out;                                 /* Default exit */
--ease-in-out: ease-in-out;                          /* Symmetric */
```

**Hero Text Animation Pattern** (from Anthropic):
- Individual word stagger: 75ms delay between words
- Opacity: 0 → 1 over 500ms
- Transform: `translateY(24px)` → `translateY(0)`
- Easing: `cubic-bezier(0.16, 1, 0.3, 1)` (snappy)
- **Respects `prefers-reduced-motion`**: All animations disabled with `transition: none !important`

**Interactive Element Effects**:
- Image hover scale: `transform: scale(1.05)` over 200ms
- Link hover: Underline with fade-in 200ms
- Button hover: Background color transition 200ms

### Layout Patterns

**Breakpoints**:
```css
--breakpoint-mobile: 640px;   /* sm */
--breakpoint-tablet: 768px;   /* md */
--breakpoint-desktop: 1024px; /* lg */
--breakpoint-wide: 1280px;    /* xl */
```

**Container Sizes**:
- Full width: `100vw`
- Content max: `min(1280px, 100vw - var(--site-margin) * 2)`
- Reading width: 8-column span (approximately 65-75 characters per line)
- Narrow: 6-column span for focused content

**Navigation**:
- Height: `5rem` (80px) on desktop
- Height: `4.375rem` (70px) on mobile
- Sticky positioning with backdrop blur

**Focus States** (Accessibility):
- Outline width: `2px`
- Outline offset: `2px`
- Outline color: `currentColor` or accent
- Visible on keyboard focus, hidden on mouse click

### Key Design Patterns

1. **Progressive Enhancement**: Start with semantic HTML, layer on interactivity
2. **Performance First**: CSS-based animations, minimal JavaScript
3. **Accessibility**: WCAG 2.1 Level AA compliance
   - Color contrast: Minimum 4.5:1 for normal text
   - Focus indicators: Visible and clear
   - Reduced motion: All animations optional
4. **Responsive by Default**: Fluid typography and spacing using clamp()
5. **Generous Whitespace**: Breathing room between elements (follows Anthropic's airy aesthetic)

---

## T006: Content Extraction from SpecSwarm Repository

### Core Messaging (from README.md)

**Primary Value Proposition**:
- **85-90% time savings** on feature development (validated with Feature 015)
- **Spec-driven development** for better planning and fewer misunderstandings
- **Tech stack enforcement** prevents 95% of technology drift
- **Quality gates** maintain >80% quality scores automatically

**Key Differentiators**:
1. **Simplified Workflow** (v3.0): build → fix → ship (2 commands instead of 7+)
2. **Autonomous Orchestration**: Natural language → working code
3. **Granular Control**: Full step-by-step workflow when needed
4. **Production Validated**: 76/76 tasks, 96.3% test pass rate (Feature 015)

### Three-Command Workflow (v3.0 Simplified)

From v3.0.0 consolidation:

1. **`/specswarm:build`** - Complete feature development
   - Spec → Plan → Tasks → Implementation → Quality Analysis
   - Interactive clarification (only pause point)
   - Optional `--validate` flag for Playwright testing
   - 85-90% reduction in manual orchestration

2. **`/specswarm:fix`** - Test-driven bug fixing
   - Optional `--regression-test` for TDD approach
   - Automatic retry logic (default 2 attempts)
   - Full test suite validation

3. **`/specswarm:ship`** - Quality-gated merge
   - Enforces quality thresholds (default 80%)
   - Blocks merge if quality below standard
   - Clear remediation steps if failing

**Positioning**: "70% fewer commands, same powerful results"

### Granular Workflow (Advanced Control)

For complex features requiring step-by-step review:

```
specify → clarify → plan → tasks → implement → analyze-quality → complete
```

**When to use**:
- Complex architectural changes
- Multiple stakeholder review points
- Learning the workflow
- Experimental features

### Real-World Validation: Feature 015

From CHANGELOG.md - tested on customcult2 (React 19 + Redux + Three.js):

**Results**:
- ✅ 76/76 Tasks Completed (100%)
- ✅ 131/136 Tests Passing (96.3%)
- ✅ 3.27s Test Execution Time
- ✅ 3,500+ Lines of Test Code Generated
- ✅ 1,530 Lines of Documentation Created

**Time Comparison**:
| Task | Manual | Autonomous | Savings |
|------|--------|------------|---------|
| Planning | 1-2 hours | 15 min | 85-90% |
| Implementation | 2-3 days | 3-4 hours | 85-90% |
| Test Writing | 1-2 days | Included | 100% |
| Documentation | 4-6 hours | Included | 100% |
| **Total** | **3-5 days** | **4-5 hours** | **85-90%** |

**What Was Validated**:
- Parent branch detection and merge validation
- Silent autonomous execution (no mid-phase pausing)
- Tech stack enforcement (prevented Jest drift)
- Production-ready code quality
- Complex branch hierarchies (main → develop → sprint-4 → feature)

### Use Cases

From WORKFLOW.md and README.md:

1. **New Features**: `build` for speed, `specify` for control
2. **Bug Fixes**: `bugfix` with regression testing, `hotfix` for production emergencies
3. **Code Maintenance**: `modify` for changes, `refactor` for quality improvements, `deprecate` for sunset
4. **Quality Checks**: `analyze-quality` before merge, `impact` for change assessment
5. **Advanced**: `orchestrate-feature` for full autonomous lifecycle, `validate` for multi-type testing

### Key Features List

From README.md:

**SpecSwarm Core**:
- ✅ Tech Stack Enforcement (95% drift prevention)
- ✅ Quality Scoring (0-100 point validation)
- ✅ Bundle Size Monitoring (performance budgets)
- ✅ Chain Bug Detection (prevents cascading failures)
- ✅ Git Workflow Integration (branch management)
- ✅ Multi-Framework Support (11+ test frameworks)

**Advanced Capabilities** (formerly SpecLabs):
- ✅ Autonomous Orchestration (natural language → code)
- ✅ Multi-Type Validation (webapp, Android, REST API, desktop)
- ✅ Intelligent Retry Logic (auto-fix up to 3 times)
- ✅ Browser Automation (Playwright integration)
- ✅ AI-Powered Flows (smart test generation)
- ✅ Session Tracking (complete orchestration history)

### Getting Started Flow

From WORKFLOW.md - one-time setup:

1. **Install**: `/plugin install specswarm`
2. **Initialize**: `/specswarm:init` (NEW in v3.1)
   - Auto-detects tech stack from package.json
   - Creates constitution.md, tech-stack.md, quality-standards.md
3. **First Feature**: `/specswarm:build "feature description" --validate`
4. **Ship**: `/specswarm:ship`

**Prerequisites**:
- Git repository with at least one commit
- Project structure in place (src/, package.json, etc.)
- Tech stack established

### Command Categories (28 total in v3.0)

From README.md and CHEATSHEET.md:

**High-Level** (New in v3.0):
- build, fix, upgrade, ship

**New Features**:
- specify, clarify, plan, tasks, implement, complete

**Bug & Issue Management**:
- bugfix, hotfix

**Code Maintenance**:
- modify, refactor, deprecate

**Quality & Analysis**:
- analyze-quality, impact, suggest

**Advanced Orchestration** (from SpecLabs):
- orchestrate-feature, validate, coordinate, metrics

**Project Setup**:
- init, constitution, checklist

### Content Tone & Style

From README.md and WORKFLOW.md:

- **Tone**: Developer-friendly, conversational but professional
- **Focus**: Results-driven (time savings, quality metrics)
- **Evidence**: Real validation data (Feature 015)
- **Honesty**: Acknowledges experimental features, manual testing still required
- **Clarity**: Clear decision trees ("When to use which workflow")
- **Progressive**: Simple by default, complexity when needed

### Technical Requirements

From tech-stack.md and constitution.md references:

- **Tech Stack Enforcement**: Prevents drift by validating against approved technologies
- **Quality Gates**: Minimum 80% test coverage, 85% quality score
- **Performance Budgets**: Max bundle size monitoring
- **Git Workflow**: Feature branches merge to parent (with confirmation)
- **Zero-Config**: Auto-detection from package.json where possible

---

## Design Implementation Notes

### Key Adaptations from Anthropic

1. **Light Theme Inversion**:
   - Anthropic uses dark mode (#000 background, light text)
   - We're using light mode (#FAF9F0 background, dark text #131314)
   - Accent color (#d97757) stays the same - works in both themes

2. **Simplified Navigation**:
   - Anthropic has complex product navigation
   - We need: Home, Features, Get Started, Docs, Use Cases + GitHub link
   - Simpler structure, same aesthetic

3. **Code-Focused Content**:
   - Anthropic is product marketing
   - We need developer-focused content with code examples
   - Use Shiki for syntax highlighting (like their docs)

4. **Minimal Visuals**:
   - Per user direction: "Minimal visuals and minimal code, keep it super simple"
   - Focus on text hierarchy and whitespace
   - Animated hero text as primary visual interest

### Content Strategy

Per docs/redesign-2025.md and user feedback:

1. **Homepage**:
   - Problem: "AI goes off the rails, ignores your stack"
   - Solution: "SpecSwarm enforces tech stack, provides control"
   - Headline: "AI automation that doesn't go off the rails"
   - CTA: "Get Started in 5 Minutes" → /get-started

2. **Features Page**:
   - 6 capability cards (Tech Stack Enforcement, Simplified Workflow, Quality Validation, Autonomous Orchestration, Production Validated, Developer Control)
   - Each with icon, title, description, real metric

3. **Get Started Page**:
   - 4-step tutorial (Install, Initialize, Build First Feature, Ship)
   - Copy-paste code examples
   - Links to documentation

4. **Docs Page**:
   - Command reference organized by category
   - Search functionality
   - Links to GitHub documentation

5. **Use Cases Page**:
   - Feature 015 case study with metrics
   - Other scenarios (bug fixing, refactoring, upgrades)
   - When to use simplified vs. granular workflow

---

## Next Steps (Phase 2 Remaining Tasks)

- ✅ **T005**: Design extraction complete
- ✅ **T006**: Content extraction complete
- ⏭️ **T007**: Configure Tailwind CSS with design tokens
- ⏭️ **T008**: Create global styles (fonts, reset, prefers-reduced-motion)
- ⏭️ **T009**: Create BaseLayout component
- ⏭️ **T010-T016**: Create shared components (Header, Footer, Button, CodeBlock, Cards)

---

**Research Phase Complete** - Ready to implement design system and shared components.
