# SpecSwarm.com Complete Redesign - 2025

## Executive Summary

Complete teardown and rebuild of specswarm.com with new content strategy and Anthropic-inspired design system (light theme). This is a fresh start - all existing pages and components will be replaced.

**Core Message**: "AI automation that doesn't go off the rails"

**Approach**: Problem-solution format emphasizing tech stack enforcement, natural workflows, and developer control.

---

## Core Positioning & Messaging

### Primary Value Proposition

SpecSwarm maintains YOUR tech stack, follows natural development workflows, and automates WITH developer involvement (not black box).

### Key Messaging Pillars

1. **Doesn't Go Off the Rails** - Tech stack enforcement prevents AI drift
2. **Natural Development Steps** - Follows how you already work (specify → plan → implement → validate → ship)
3. **Developer in Control** - Decision checkpoints, not black box automation
4. **Three Commands** - build → fix → ship (with granular commands available for power users)

### Tone & Voice

- **Minimal and confident** - No overselling, no fluff
- **Problem-first** - Lead with developer pain points, then solutions
- **Trust through transparency** - Explain what happens, don't hide complexity
- **Subtle proof** - Metrics support claims but don't dominate

---

## Design System Specification

### Aesthetic Reference

**Primary Inspiration**: anthropic.com (modern minimal, professional, clean)

**Theme**: Light theme only (inverting Anthropic's dark aesthetic)

### Color Palette

Extract and adapt from anthropic.com analysis:

**Text Colors:**
- Primary text: `#131314` (deep charcoal/near-black)
- Secondary text: Slate gray variants for hierarchy
- Tertiary text: Muted gray for labels, captions

**Accent Color:**
- Primary accent: `#d97757` (terracotta - same as Anthropic)
- Use for: CTAs, links, emphasis, interactive elements

**Background Colors:**
- Base: Light cream/off-white (`#FAF9F0` or similar warm white)
- Surface: Pure white (`#FFFFFF`) for cards and containers
- Borders: Subtle gray dividers (`#E5E5E5` or similar)

**Code Blocks:**
- Background: Very light gray (`#F5F5F5`)
- Text: Syntax highlighted with Shiki (minimal color scheme)

### Typography System

**Reference**: anthropic.com typography scale

**Font Families:**
- **Headings & Body**: System font stack (or anthropic.com font if identifiable)
- **Code**: Fira Code or similar monospace for CLI examples

**Fluid Typography** (using clamp()):
```css
/* Large Display */
font-size: clamp(2.5rem, 2.04rem + 1.95vw, 4rem);

/* Medium Display */
font-size: clamp(1.75rem, 1.67rem + 0.32vw, 2rem);

/* Body Large */
font-size: clamp(1.125rem, 1.08rem + 0.16vw, 1.25rem);

/* Body */
font-size: 16-18px;
line-height: 1.6-1.8;
```

**Typographic Hierarchy:**
- H1: 48-64px (large display)
- H2: 32-40px (medium display)
- H3: 24-28px
- Body: 16-18px
- Small: 14-16px

**Font Weights:**
- Regular: 400
- Medium: 500 (for emphasis)
- Semibold: 600 (for headings)

**Line Heights:**
- Headings: 1.1-1.2 (tight)
- Body: 1.6-1.8 (comfortable)

### Layout & Spacing

**Container:**
- Max-width: ~1200px
- Horizontal padding: clamp(2rem, 1.08rem + 3.91vw, 5rem)

**Grid System:**
- 12-column responsive grid
- Gap: 1.5-2rem

**Section Spacing:**
- Between major sections: 80-120px vertical
- Between subsections: 40-60px vertical
- Between elements: 16-32px

**Whitespace Philosophy:**
- Generous breathing room between sections
- Let content breathe - don't pack densely
- Asymmetric spacing for visual interest

### Component Specifications

**Buttons:**
- Style: Outlined with terracotta border, filled background on hover
- Border-radius: 6-8px
- Padding: 12px 24px (medium), 16px 32px (large)
- Transition: 200ms ease
- Hover: Fill with terracotta, white text

**Links:**
- Color: Terracotta (`#d97757`)
- Underline: Yes, with `text-underline-offset: 0.2em`
- Hover: Darken slightly

**Code Blocks:**
- Background: Light gray
- Border-radius: 6-8px
- Padding: 16-24px
- Font: Fira Code or monospace
- Syntax highlighting: Shiki (minimal theme)
- Line numbers: Optional, only for longer examples

**Cards** (if used):
- Background: White
- Border: Subtle gray or none
- Shadow: Minimal (0 1px 3px rgba(0,0,0,0.1))
- Border-radius: 8-12px
- Padding: 24-32px
- Hover: Subtle lift (translateY(-2px))

**Navigation:**
- Fixed/sticky header
- Height: 64-80px
- Background: White or transparent with backdrop blur
- Active page: Terracotta underline or indicator
- Mobile: Hamburger menu with smooth slide transition

**Footer:**
- Background: Light gray or white
- Padding: 40-60px vertical
- Multi-column layout (collapse on mobile)
- Links: Standard link style

### Animation & Motion

**Philosophy**: Moderate motion inspired by anthropic.com

**Text Entrance Animations:**
- Staggered word-by-word fade-in on hero
- Delay: 50-100ms between words
- Duration: 400-600ms per word
- Easing: ease-out

**Scroll Reveals:**
- Intersection Observer triggered
- Fade-in + slight translateY
- Threshold: 0.1-0.2

**Hover Transitions:**
- All interactive elements: 200ms ease
- Buttons: background-color, color
- Links: color
- Cards: transform, shadow

**Respect Accessibility:**
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Responsive Breakpoints

```css
/* Mobile */
@media (max-width: 639px) { }

/* Tablet */
@media (min-width: 640px) and (max-width: 1023px) { }

/* Desktop */
@media (min-width: 1024px) { }
```

**Approach:** Mobile-first, fluid typography, flexible grids

---

## Site Architecture

### Navigation Structure

```
┌─────────────────────────────────────────────────────┐
│  [Logo] Home | Features | Get Started | Docs | Use Cases | [GitHub Icon] │
└─────────────────────────────────────────────────────┘
```

**Primary Nav:**
- Home
- Features
- Get Started
- Docs (Documentation Hub)
- Use Cases

**Utility Nav:**
- GitHub link (icon, opens in new tab)

### Page Hierarchy

**Tier 1 - Overview** (Quick value, scannable):
- Home (/)
- Features (/features)
- Get Started (/get-started)

**Tier 2 - Deep Dive** (For engaged visitors):
- Documentation Hub (/docs)
- Use Cases (/use-cases)
- How It Works (/how-it-works) *optional*

**Tier 3 - Supporting:**
- FAQ (embedded in relevant pages, not standalone)

### Footer Structure

```
SpecSwarm

[Documentation] [GitHub] [Support] [License]

Free. Forever. MIT License.

© 2025 SpecSwarm
```

---

## Page-by-Page Content Specifications

### Homepage (/)

**Goal**: Communicate value in 30 seconds, clear path to get started

#### Hero Section (Full Viewport)

```
[ Generous whitespace - center aligned ]

AI automation that doesn't go off the rails

When AI builds features, does it use YOUR stack?
Follow YOUR patterns? Ask before making decisions?

[Button: "Get Started in 5 Minutes" → /get-started]

[ Animation: Staggered word-by-word fade-in ]
```

**Design:**
- Large heading: 48-64px
- Subtext: 20-24px, secondary color
- Button: Terracotta, prominent
- No background graphics, pure whitespace

---

#### Section 2: The Problem

```
The Problem with AI Code Generation

AI tools promise to write code for you. But do they:

• Drift from your approved tech stack
• Make architecture decisions without asking
• Create black boxes you can't control
• Introduce inconsistent patterns across your codebase

You need automation that stays on your rails.
```

**Design:**
- Single column, left-aligned or centered
- Clean bullet list
- 60-80% page width
- Ample spacing above and below

---

#### Section 3: The Solution - Three Commands

```
Build. Fix. Ship.

─────────────────────

/specswarm:build "add user profile avatars" --validate

Describe what you want. SpecSwarm clarifies requirements, creates an
implementation plan, writes code and tests, then validates quality.

─────────────────────

/specswarm:fix "authentication token refresh failing"

Describe the bug. Automated regression test creation, fix implementation,
and full test suite validation.

─────────────────────

/specswarm:ship

Quality gates ensure you're production-ready. Test validation, coverage
checks, and merge to parent branch.

─────────────────────

[Small note: "Need more control? Granular commands available for power users."]
```

**Design:**
- Three-column grid (desktop) or stacked (mobile)
- Minimal code examples (single line commands)
- Syntax highlighting with Shiki
- Separators between commands
- Equal visual weight to all three
- Small note at bottom, subtle text

---

#### Section 4: What Makes It Different

```
What Makes SpecSwarm Different

─────────────────────

[Icon] Tech Stack Enforcement
Define your approved and prohibited technologies once in your project
configuration. SpecSwarm validates every implementation automatically.
No more drift to deprecated libraries or unapproved frameworks.

─────────────────────

[Icon] Natural Development Workflows
Follows how you already work: specify requirements → create implementation
plan → break into tasks → implement → validate → ship. Every step is
transparent and reviewable.

─────────────────────

[Icon] Decision Checkpoints
SpecSwarm asks clarifying questions and waits for your approval at key
decision points. You stay in control. No black box automation.

─────────────────────

[Icon] Quality Gates
Automated quality scoring (0-100), test validation, coverage checks, and
merge protection. Ship when you're confident, not before.

```

**Design:**
- Four cards in 2x2 grid (desktop) or stacked (mobile)
- Simple icons (Lucide React, minimal)
- Card style: subtle background or border
- Heading + 2-3 sentences each
- Equal visual weight

---

#### Section 5: Proof (Subtle)

```
Validated in Production

85-90% time savings  •  96.3% test pass rate  •  76/76 tasks completed

[Link: "Read the full case study →"]
```

**Design:**
- Centered, single line
- Small text (14-16px)
- Metrics separated by bullets
- Link to use case page
- Subtle, not dominating

---

#### Section 6: CTA

```
Try your first feature in 5 minutes

[Button: "Get Started"]
```

**Design:**
- Centered
- Large button
- Generous whitespace
- Final section before footer

---

### Features Page (/features)

**Goal**: Overview of core capabilities without overwhelming detail

#### Hero

```
Capabilities

Everything you need to build, maintain, and ship with confidence.
```

#### Feature Grid

**Six feature cards** (2-3 columns, responsive):

1. **Tech Stack Enforcement**
   - Icon
   - 2-3 sentence description: "Define approved and prohibited technologies in your project configuration. SpecSwarm automatically validates every implementation against your rules. Prevent drift to deprecated libraries, unapproved frameworks, or inconsistent patterns. Your stack, enforced automatically."
   - Optional minimal code example showing tech-stack.md

2. **Build → Fix → Ship**
   - Icon
   - Description: "Three commands cover the complete development lifecycle. /specswarm:build for new features, /specswarm:fix for bugs with automated regression tests, /specswarm:ship for quality-gated merges. Simple by default, granular commands available when you need more control."

3. **Quality Gates**
   - Icon
   - Description: "Automated quality scoring from 0-100 based on test coverage, pass rates, and code metrics. Configurable thresholds block merges until quality standards are met. Ship with confidence, not guesswork."

4. **Natural Workflows**
   - Icon
   - Description: "SpecSwarm follows how you already work: specify requirements, create implementation plans, break into tasks, implement code and tests, validate quality, ship. Transparent at every step. No magic, just good process automated."

5. **Autonomous Execution**
   - Icon
   - Description: "Once you approve the plan, SpecSwarm orchestrates the implementation autonomously. Multi-agent coordination, intelligent retry logic, and browser automation with Playwright. AI handles the orchestration, you make the decisions."

6. **Complete Lifecycle**
   - Icon
   - Description: "More than just new features. Bug fixes with regression tests. Code refactoring with metrics tracking. Dependency upgrades with breaking change analysis. Feature deprecation with migration paths. Everything you need."

**Design:**
- Cards in 2-3 column grid
- Simple icons
- Heading + paragraph for each
- Minimal code examples (1-2 lines max, optional)
- Equal visual weight

#### CTA

```
See it in action

[Button: "Explore Use Cases" → /use-cases]
```

---

### Get Started Page (/get-started)

**Goal**: Install to first feature in ~5 minutes

```
Get Started

Install SpecSwarm and build your first feature in 5 minutes.

─────────────────────

Step 1: Install

/plugin https://github.com/MartyBonacci/specswarm

SpecSwarm is a Claude Code plugin. Run this command in Claude Code to install.

─────────────────────

Step 2: Initialize Your Project

/specswarm:init

Define your tech stack (approved and prohibited technologies) and quality
standards. This creates configuration files that SpecSwarm references during
every build.

─────────────────────

Step 3: Build Your First Feature

/specswarm:build "add user profile avatar upload feature"

SpecSwarm will:
• Ask clarifying questions about requirements
• Create a detailed implementation plan
• Break the work into actionable tasks
• Write code, tests, and documentation
• Run quality validation and tests

You review and approve at each checkpoint.

─────────────────────

Step 4: Ship It

/specswarm:ship

Run final quality checks. If all gates pass, SpecSwarm merges to your
parent branch. If quality thresholds aren't met, you'll get a clear
report of what needs attention.

─────────────────────

Next Steps

• Try /specswarm:fix for regression-test-first bug fixing
• Explore granular commands (/specswarm:specify, /specswarm:plan, etc.)
  for more control
• Read the full documentation for advanced features

[Link: "View Documentation →" /docs]
```

**Design:**
- Linear flow, numbered steps
- Each step: command + explanation
- Code examples: single line, syntax highlighted
- Clear visual separation between steps
- No complex diagrams, text-driven
- Final CTA to docs

---

### Documentation Hub (/docs)

**Goal**: Central reference for all SpecSwarm documentation

```
Documentation

Complete reference for SpecSwarm workflows, commands, and configuration.

─────────────────────
```

#### Quick Reference

```
Quick Command Reference

High-Level Commands (Recommended for Most Users)

/specswarm:build "feature description" [--validate]
Complete feature development from specification to implementation

/specswarm:fix "bug description" [--max-retries=N]
Regression-test-first bug fixing with automatic retry logic

/specswarm:upgrade <package>[@version] [--breaking-changes-only]
Dependency and framework upgrades with breaking change analysis

/specswarm:ship [--skip-tests]
Quality-gated merge to parent branch with validation


Granular Commands (For Power Users)

/specswarm:specify
Create or update feature specification from natural language

/specswarm:clarify
Ask targeted questions to refine underspecified requirements

/specswarm:plan
Generate implementation plan from specification

/specswarm:tasks
Create dependency-ordered task list from plan

/specswarm:implement
Execute all tasks autonomously

/specswarm:complete
Finalize feature and merge to parent branch


[Link: "View full command reference on GitHub →"]
```

#### Workflows

```
Common Workflows

New Feature Development
1. /specswarm:build "feature description" --validate
2. Review and approve at checkpoints
3. /specswarm:ship when ready

Bug Fixing
1. /specswarm:fix "bug description"
2. Review regression test and fix
3. Verify full test suite passes

Dependency Upgrade
1. /specswarm:upgrade react@19
2. Review breaking change analysis
3. Approve migration code modifications

[Link: "Read detailed workflow guide →" (to GitHub WORKFLOW.md)]
```

#### Configuration

```
Project Configuration

Tech Stack Definition
Define approved and prohibited technologies in /memory/tech-stack.md

Quality Standards
Configure quality thresholds and scoring criteria

Advanced Configuration
Orchestration settings, validation rules, custom workflows

[Link: "View configuration guide →"]
```

#### External Documentation

```
External Resources

[Link: Full Workflow Guide] → /home/marty/code-projects/specswarm/docs/WORKFLOW.md
[Link: Command Cheatsheet] → /home/marty/code-projects/specswarm/docs/CHEATSHEET.md
[Link: GitHub Repository] → https://github.com/MartyBonacci/specswarm
[Link: Changelog] → GitHub CHANGELOG.md
```

**Design:**
- Clean documentation layout
- Clear section headers
- Collapsible sections or simple stacked
- Monospace for commands
- Prominent links to external docs
- Search functionality NOT required (keep simple)

---

### Use Cases Page (/use-cases)

**Goal**: Show real-world scenarios and outcomes

```
Use Cases

See how SpecSwarm handles real development scenarios.

─────────────────────
```

#### Scenario 1: New Feature Development

```
Building a New Feature

[Icon]

The Challenge
You need to add a complex feature with multiple components, state management,
tests, and documentation. Typical timeline: 3-5 days of planning, coding,
testing, and reviews.

The SpecSwarm Approach
/specswarm:build "add real-time collaborative editing to document editor" --validate

SpecSwarm clarifies requirements, creates a plan, implements all code and
tests, validates quality, and prepares for merge.

Result
3-5 days → 4-5 hours (mostly autonomous execution)
```

#### Scenario 2: Bug Fixing

```
Fixing a Production Bug

[Icon]

The Challenge
Production bug requires reproducing the issue, debugging root cause, writing
fix, creating regression test, running full test suite.

The SpecSwarm Approach
/specswarm:fix "user session expires mid-form causing data loss"

SpecSwarm creates regression test first, implements fix, validates against
full test suite, ensures bug doesn't resurface.

Result
Automated regression test creation ensures bug stays fixed
```

#### Scenario 3: Dependency Upgrade

```
Upgrading Major Dependencies

[Icon]

The Challenge
React 18 → 19 has breaking changes. You need to read changelogs, identify
breaking changes in your codebase, refactor accordingly, test everything.

The SpecSwarm Approach
/specswarm:upgrade react@19

SpecSwarm analyzes changelog, identifies breaking changes affecting your code,
generates codemods and refactoring plan, implements changes, validates tests.

Result
Hours of manual changelog reading → automated breaking change analysis
```

---

#### Case Study: Feature 015 Validation

```
Real-World Production Validation

Project: CustomCult2 - React 19 + Redux + Three.js snowboard customization app

Feature: Complete testing infrastructure implementation

Scope:
• Vitest configuration and setup
• React Testing Library integration
• 3D rendering test utilities (Three.js)
• Redux store testing patterns
• Component test suite (26 components)

Results:
✓ 76/76 tasks completed (100%)
✓ 131/136 tests passing (96.3%)
✓ 3,500+ lines of test code generated
✓ 1,530 lines of documentation created
✓ Successfully merged to sprint-4

Time Investment:
• Traditional approach: 3-5 days of manual work
• With SpecSwarm: 4-5 hours (mostly autonomous)
• Developer involvement: Approval at 3-4 checkpoints

Validation:
This production deployment validated:
• Tech stack enforcement (prevented Jest drift, correctly chose Vitest)
• Autonomous execution (minimal manual intervention)
• Production-ready code quality (96.3% pass rate)
• Complex dependency handling (React 19, Three.js, Redux)

[Link: "View full case study →" or link to GitHub]
```

**Design:**
- Three scenario cards
- Each: Icon + challenge + approach + result
- Case study: Separate prominent section
- Use metrics but keep clean
- Not overly detailed, scannable

---

## Source Materials for Content

SpecSwarm should reference these materials from the main SpecSwarm repository when drafting content:

### Primary Sources

1. **/home/marty/code-projects/specswarm/README.md**
   - Core features and capabilities
   - Command descriptions
   - Value propositions
   - Installation instructions

2. **/home/marty/code-projects/specswarm/docs/WORKFLOW.md**
   - Step-by-step workflow guidance
   - Best practices
   - Common patterns

3. **/home/marty/code-projects/specswarm/docs/CHEATSHEET.md**
   - Quick command reference
   - Common workflows
   - Flags and options

4. **/home/marty/code-projects/specswarm/CHANGELOG.md**
   - Feature 015 validation details
   - Version history (v3.0, v3.1 features)
   - Real-world metrics and outcomes

5. **/home/marty/code-projects/specswarm/marketplace.json**
   - Official plugin metadata
   - Description and tagline

### Design Reference

- **anthropic.com** - Extract exact values for:
  - Color palette (adapt to light theme)
  - Typography scale (clamp() values)
  - Spacing system
  - Component styles
  - Animation patterns

### Content Extraction Guidelines

**From README.md**: Use for feature descriptions, command explanations, core value props

**From WORKFLOW.md**: Use for step-by-step guidance, workflow explanations

**From CHANGELOG.md**: Use for Feature 015 metrics, v3.0/v3.1 feature highlights, proven results

**From anthropic.com**: Extract design values but adapt messaging to SpecSwarm's voice

---

## Technical Implementation Notes

### Tech Stack (Preserve from Current)

- **Framework**: Astro 5.15.4
- **UI Library**: React 19.2.0 (islands architecture)
- **Styling**: Tailwind CSS v4.0.0 (Oxide engine)
- **Syntax Highlighting**: Shiki v3.15.0
- **Icons**: Lucide React
- **Build**: Static site generation (SSG)

### Required Components (New)

Create these React/Astro components:

1. **AnimatedHero.tsx** - Staggered word-by-word text animation
2. **FeatureCard.astro** - Minimal card component for features
3. **CommandBlock.tsx** - Styled CLI command examples with syntax highlighting
4. **StepList.astro** - Numbered step flow for Get Started
5. **NavigationBar.astro** - Header with mobile hamburger menu
6. **Footer.astro** - Multi-column footer layout
7. **Button.astro** - Terracotta button component
8. **PageHero.astro** - Reusable page header component

### Pages to Create (Complete Teardown)

Replace all existing pages:

1. `src/pages/index.astro` - Homepage
2. `src/pages/features.astro` - Features page
3. `src/pages/get-started.astro` - Get Started tutorial
4. `src/pages/docs.astro` - Documentation hub
5. `src/pages/use-cases.astro` - Use cases and case study

### Layout

Replace existing layout:

- `src/layouts/BaseLayout.astro` - New design system, SEO, meta tags

### Styling Approach

1. **Tailwind CSS v4 configuration** - Define custom colors, typography scale, spacing
2. **Global styles** - Animation utilities, typography base
3. **Component-scoped styles** - Where Tailwind is insufficient

### Responsive Design

- Mobile-first approach
- Fluid typography (clamp)
- Flexible grids (CSS Grid, Flexbox)
- Test on: mobile (375px), tablet (768px), desktop (1280px+)

---

## Definition of Done

This feature is complete when:

### Content Complete
- ✅ All 5 pages have real, polished content (no lorem ipsum)
- ✅ Content sourced from SpecSwarm repo documentation
- ✅ Messaging aligns with "doesn't go off the rails" positioning
- ✅ All code examples are accurate and syntax highlighted

### Design System Implemented
- ✅ Color palette matches Anthropic aesthetic (light theme)
- ✅ Terracotta accent (#d97757) used consistently
- ✅ Fluid typography (clamp) implemented
- ✅ Spacing system matches generous whitespace philosophy
- ✅ All components styled per specification

### Technical Complete
- ✅ Site builds without errors (`npm run build`)
- ✅ All pages render correctly
- ✅ Navigation works (all links functional)
- ✅ GitHub link in header works

### Responsive Design
- ✅ Mobile (< 640px) layout works
- ✅ Tablet (640-1024px) layout works
- ✅ Desktop (> 1024px) layout works
- ✅ No horizontal scroll on any breakpoint
- ✅ Touch targets are adequate on mobile

### Animation & Polish
- ✅ Hero text animation works
- ✅ Hover states on all interactive elements
- ✅ Smooth transitions (200ms)
- ✅ Respects prefers-reduced-motion

### Code Quality
- ✅ No console errors
- ✅ Semantic HTML
- ✅ Accessible (focus states, ARIA where needed)
- ✅ Clean component structure

### Ready for Review
- ✅ Site deployable (build succeeds)
- ✅ All pages complete and functional
- ✅ Ready for manual/visual testing
- ✅ Can be shipped with `/specswarm:ship`

---

## The Build Command

Once this documentation is in place, run:

```bash
/specswarm:build "Complete site redesign implementing new content strategy and Anthropic-inspired design system. Full teardown and rebuild of all pages (Home, Features, Get Started, Docs, Use Cases) with comprehensive content from main SpecSwarm repo and light-theme design system extracted from anthropic.com. Reference docs/redesign-2025.md for complete specifications." --validate
```

---

## Notes for SpecSwarm

### Content Drafting
- Source content from `/home/marty/code-projects/specswarm/` repo
- Use README.md for feature descriptions
- Use CHANGELOG.md for Feature 015 metrics
- Use WORKFLOW.md for workflow explanations
- Write in SpecSwarm's voice: minimal, confident, transparent

### Design Extraction
- Visit anthropic.com to extract exact design values
- Adapt colors for light theme (invert dark→light)
- Maintain terracotta accent (#d97757)
- Use their fluid typography scale
- Follow their animation patterns

### Keep Simple
- Minimal code examples (1-2 lines max)
- No complex diagrams or graphics
- Let whitespace and typography do the work
- Focus on content clarity over decoration

### Complete Teardown
- Delete all existing page files
- Delete all existing components
- Rebuild from scratch with new design system
- Don't try to preserve old code

---

*This document serves as the complete specification for SpecSwarm to execute the redesign autonomously.*
