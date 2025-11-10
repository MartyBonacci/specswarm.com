# Tasks: Marketing Website Foundation

<!-- Tech Stack Validation: PASSED -->
<!-- Validated against: /memory/tech-stack.md (auto-generated) -->
<!-- No prohibited technologies found -->
<!-- All technologies pre-approved in tech-stack.md -->

**Feature**: 001-marketing-website-foundation
**Branch**: 001-marketing-website-foundation
**Created**: 2025-11-10
**Total Tasks**: 35

---

## Task Summary

| Phase | Description | Tasks | Parallelizable |
|-------|-------------|-------|----------------|
| Setup | Project dependencies and configuration | 2 | 0 |
| Foundation | Base layout and shared components | 4 | 2 |
| Home Page | Hero, features grid, social proof, CTAs | 6 | 4 |
| Features Page | Feature cards, code examples, commands | 7 | 5 |
| Pricing Page | Free tier, value prop, FAQ, comparison | 6 | 4 |
| Performance | Optimization and bundle management | 5 | 3 |
| Content | Populate with SpecSwarm data | 4 | 2 |
| Testing & QA | Cross-browser, responsive, accessibility | 6 | 4 |

**Estimated Implementation Time**: 3-4 hours
**Parallel Execution Opportunities**: 24 tasks can run in parallel

---

## Phase 1: Setup & Dependencies

### T001: Install icon library
**File**: `package.json`
**Description**: Install Lucide React for UI icons
**Command**:
```bash
npm install lucide-react
```
**Acceptance**: Package installed, appears in package.json dependencies

### T002: Add TypeScript types for Shiki
**File**: `package.json`
**Description**: Ensure @types packages for all dependencies
**Command**:
```bash
# Verify types are already installed (should be from init)
npm list @types/react @types/react-dom
```
**Acceptance**: TypeScript types available for all dependencies

---

## Phase 2: Foundation - Base Layout & Shared Components

### T003: Create BaseLayout component
**File**: `src/layouts/BaseLayout.astro`
**Description**: Create shared layout with SEO meta tags
**Implementation**:
```astro
---
export interface Props {
  title: string;
  description: string;
  ogImage?: string;
}

const { title, description, ogImage = '/og-default.png' } = Astro.props;
const canonicalURL = new URL(Astro.url.pathname, Astro.site);
---

<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="generator" content={Astro.generator} />

    <!-- Primary Meta Tags -->
    <title>{title}</title>
    <meta name="title" content={title} />
    <meta name="description" content={description} />
    <link rel="canonical" href={canonicalURL} />

    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website" />
    <meta property="og:url" content={canonicalURL} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content={new URL(ogImage, Astro.site)} />

    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image" />
    <meta property="twitter:url" content={canonicalURL} />
    <meta property="twitter:title" content={title} />
    <meta property="twitter:description" content={description} />
    <meta property="twitter:image" content={new URL(ogImage, Astro.site)} />
  </head>
  <body>
    <slot />
  </body>
</html>
```
**Acceptance**: Layout renders with proper meta tags, TypeScript interface defined

### T004: [P] Create Header component
**File**: `src/components/Header.astro`
**Description**: Navigation header with logo and links
**Implementation**:
- SpecSwarm brand text/logo
- Navigation links: Home, Features, Pricing, Docs (GitHub)
- Mobile menu trigger button (hamburger icon)
- Active page indicator using Astro.url.pathname
- Sticky positioning with backdrop blur
- Responsive: full nav desktop, hamburger mobile (<640px)
```astro
---
import { Menu } from 'lucide-react';
import MobileMenu from './MobileMenu';

const currentPath = Astro.url.pathname;
---

<header class="sticky top-0 z-40 w-full backdrop-blur bg-white/80 border-b border-gray-200">
  <nav class="container mx-auto px-4 h-16 flex items-center justify-between">
    <a href="/" class="text-2xl font-bold text-gray-900">SpecSwarm</a>

    <!-- Desktop Navigation -->
    <div class="hidden md:flex items-center space-x-8">
      <a href="/" class={currentPath === '/' ? 'text-blue-600 font-medium' : 'text-gray-600 hover:text-gray-900'}>Home</a>
      <a href="/features" class={currentPath === '/features' ? 'text-blue-600 font-medium' : 'text-gray-600 hover:text-gray-900'}>Features</a>
      <a href="/pricing" class={currentPath === '/pricing' ? 'text-blue-600 font-medium' : 'text-gray-600 hover:text-gray-900'}>Pricing</a>
      <a href="https://github.com/MartyBonacci/specswarm" target="_blank" rel="noopener" class="text-gray-600 hover:text-gray-900">Docs</a>
    </div>

    <!-- Mobile Menu Trigger -->
    <button id="mobile-menu-trigger" class="md:hidden p-2" aria-label="Open mobile menu">
      <Menu className="h-6 w-6" />
    </button>
  </nav>
</header>

<MobileMenu client:load currentPath={currentPath} />
```
**Acceptance**: Header displays on all pages, navigation works, responsive behavior correct

### T005: [P] Create Footer component
**File**: `src/components/Footer.astro`
**Description**: Site footer with links and attribution
**Implementation**:
- SpecSwarm branding
- Links: GitHub, Docs, License
- Attribution: "Built with Claude Code"
- Copyright notice: © 2025 SpecSwarm
- Responsive layout (stack on mobile)
```astro
<footer class="border-t border-gray-200 mt-20">
  <div class="container mx-auto px-4 py-12">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div>
        <h3 class="text-lg font-bold text-gray-900 mb-4">SpecSwarm</h3>
        <p class="text-gray-600 text-sm">Complete development toolkit for Claude Code</p>
      </div>

      <div>
        <h4 class="font-semibold text-gray-900 mb-4">Links</h4>
        <ul class="space-y-2 text-sm">
          <li><a href="https://github.com/MartyBonacci/specswarm" target="_blank" rel="noopener" class="text-gray-600 hover:text-gray-900">GitHub</a></li>
          <li><a href="https://github.com/MartyBonacci/specswarm#readme" target="_blank" rel="noopener" class="text-gray-600 hover:text-gray-900">Documentation</a></li>
          <li><a href="https://github.com/MartyBonacci/specswarm/blob/main/LICENSE" target="_blank" rel="noopener" class="text-gray-600 hover:text-gray-900">License (MIT)</a></li>
        </ul>
      </div>

      <div>
        <p class="text-sm text-gray-600">Built with <a href="https://claude.ai/code" target="_blank" rel="noopener" class="text-blue-600 hover:underline">Claude Code</a></p>
        <p class="text-sm text-gray-500 mt-2">© 2025 SpecSwarm</p>
      </div>
    </div>
  </div>
</footer>
```
**Acceptance**: Footer renders, links work, responsive layout correct

### T006: Create MobileMenu React island
**File**: `src/components/MobileMenu.tsx`
**Description**: Interactive mobile navigation menu
**Implementation**:
- Slide-in overlay menu
- Navigation links (same as header)
- Close button (X icon) and outside-click-to-close
- Smooth CSS transitions
- Focus trap when open, Escape key to close
- `client:load` directive for above-fold interactivity
```tsx
import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface Props {
  currentPath: string;
}

export default function MobileMenu({ currentPath }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Listen for trigger button click
    const trigger = document.getElementById('mobile-menu-trigger');
    const handler = () => setIsOpen(true);
    trigger?.addEventListener('click', handler);

    // Prevent body scroll when menu open
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    // Escape key to close
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    document.addEventListener('keydown', handleEscape);

    return () => {
      trigger?.removeEventListener('click', handler);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 md:hidden"
      onClick={() => setIsOpen(false)}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gray-900/80" />

      {/* Menu Panel */}
      <div
        className="absolute right-0 top-0 h-full w-64 bg-white shadow-xl transform transition-transform duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4">
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 ml-auto block"
            aria-label="Close menu"
          >
            <X className="h-6 w-6" />
          </button>

          <nav className="mt-8 space-y-4">
            <a
              href="/"
              className={`block text-lg ${currentPath === '/' ? 'text-blue-600 font-medium' : 'text-gray-900'}`}
              onClick={() => setIsOpen(false)}
            >
              Home
            </a>
            <a
              href="/features"
              className={`block text-lg ${currentPath === '/features' ? 'text-blue-600 font-medium' : 'text-gray-900'}`}
              onClick={() => setIsOpen(false)}
            >
              Features
            </a>
            <a
              href="/pricing"
              className={`block text-lg ${currentPath === '/pricing' ? 'text-blue-600 font-medium' : 'text-gray-900'}`}
              onClick={() => setIsOpen(false)}
            >
              Pricing
            </a>
            <a
              href="https://github.com/MartyBonacci/specswarm"
              target="_blank"
              rel="noopener"
              className="block text-lg text-gray-900"
            >
              Docs
            </a>
          </nav>
        </div>
      </div>
    </div>
  );
}
```
**Acceptance**: Menu opens/closes, navigation works, accessibility features functional

---

## Phase 3: Home Page Implementation

### T007: Create Hero component
**File**: `src/components/Hero.astro`
**Description**: Hero section with headline and CTA
**Implementation**:
- Headline: "SpecSwarm - Build it. Fix it. Maintain it. Automate it."
- Tagline: "Complete development toolkit for Claude Code with autonomous workflows and quality gates"
- Primary CTA button → /pricing#install
- Gradient background (purple to blue)
- Responsive typography (text-4xl md:text-6xl)
```astro
<section class="relative bg-gradient-to-br from-purple-600 to-blue-600 text-white py-20 md:py-32">
  <div class="container mx-auto px-4 text-center">
    <h1 class="text-4xl md:text-6xl font-bold mb-6">
      SpecSwarm - Build it. Fix it. Maintain it. Automate it.
    </h1>
    <p class="text-xl md:text-2xl mb-8 text-purple-100 max-w-3xl mx-auto">
      Complete development toolkit for Claude Code with autonomous workflows and quality gates
    </p>
    <a
      href="/pricing#install"
      class="inline-block bg-white text-purple-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors"
    >
      Get Started - It's Free
    </a>
  </div>
</section>
```
**Acceptance**: Hero renders with gradient, CTA navigates correctly, responsive

### T008: [P] Create FeatureCard component
**File**: `src/components/FeatureCard.astro`
**Description**: Reusable feature card component
**Implementation**:
```astro
---
export interface Props {
  icon: string; // Lucide icon name
  title: string;
  description: string;
}

const { icon, title, description } = Astro.props;
---

<div class="p-6 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow">
  <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
    <!-- Icon rendered server-side, pass as prop -->
    <slot name="icon" />
  </div>
  <h3 class="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
  <p class="text-gray-600">{description}</p>
</div>
```
**Acceptance**: Card component reusable, styling consistent, hover effect smooth

### T009: [P] Add features overview grid to home page
**File**: `src/pages/index.astro`
**Description**: 3-column features grid on home page
**Implementation**:
- Import FeatureCard
- 3 cards: Autonomous Workflows, Quality Validation, Tech Stack Enforcement
- Content from SpecSwarm README
- Responsive grid: 1 col mobile, 3 cols desktop
```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import Header from '../components/Header.astro';
import Footer from '../components/Footer.astro';
import Hero from '../components/Hero.astro';
import FeatureCard from '../components/FeatureCard.astro';
import { Zap, CheckCircle, Shield } from 'lucide-react';
---

<BaseLayout
  title="SpecSwarm - Build it. Fix it. Maintain it. | AI Workflows for Claude Code"
  description="SpecSwarm: Complete development toolkit for Claude Code. Build features, fix bugs, and maintain quality with autonomous workflows. 85-90% time savings."
>
  <Header />
  <main>
    <Hero />

    <section class="py-20">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
          Key Capabilities
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard
            title="Autonomous Workflows"
            description="Build complete features with a single command. AI handles specification, planning, implementation, and validation automatically."
          >
            <Zap slot="icon" className="h-6 w-6 text-purple-600" />
          </FeatureCard>

          <FeatureCard
            title="Quality Validation"
            description="Automated quality scoring (0-100), performance budgets, and accessibility audits ensure production-ready code."
          >
            <CheckCircle slot="icon" className="h-6 w-6 text-purple-600" />
          </FeatureCard>

          <FeatureCard
            title="Tech Stack Enforcement"
            description="Prevent technology drift with enforced tech stack guidelines. Consistency across all features and developers."
          >
            <Shield slot="icon" className="h-6 w-6 text-purple-600" />
          </FeatureCard>
        </div>
      </div>
    </section>
  </main>
  <Footer />
</BaseLayout>
```
**Acceptance**: 3 feature cards render, grid responsive, content accurate

### T010: [P] Add social proof section to home page
**File**: `src/pages/index.astro`
**Description**: Highlight 85-90% time savings and Feature 015 stats
**Implementation**:
- Large metric: "85-90% Time Savings"
- Feature 015 stats: 76/76 tasks, 96.3% tests, 3-4 hours
- Professional presentation with icons
```astro
<section class="bg-gray-50 py-20">
  <div class="container mx-auto px-4">
    <h2 class="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
      Proven Results
    </h2>
    <p class="text-xl text-center text-gray-600 mb-12">
      Real-world validation from production projects
    </p>

    <div class="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
      <div class="text-center">
        <div class="text-5xl font-bold text-purple-600 mb-2">85-90%</div>
        <div class="text-gray-600">Time Savings</div>
      </div>

      <div class="text-center">
        <div class="text-5xl font-bold text-purple-600 mb-2">76/76</div>
        <div class="text-gray-600">Tasks Completed</div>
      </div>

      <div class="text-center">
        <div class="text-5xl font-bold text-purple-600 mb-2">96.3%</div>
        <div class="text-gray-600">Test Pass Rate</div>
      </div>

      <div class="text-center">
        <div class="text-5xl font-bold text-purple-600 mb-2">3-4hr</div>
        <div class="text-gray-600">vs 3-5 days manual</div>
      </div>
    </div>

    <p class="text-center text-gray-500 mt-8 text-sm">
      Source: Feature 015 - Testing Infrastructure (customcult2 project)
    </p>
  </div>
</section>
```
**Acceptance**: Stats accurate, layout responsive, source attribution present

### T011: [P] Add final CTA section to home page
**File**: `src/pages/index.astro`
**Description**: Final call-to-action section
**Implementation**:
- Value prop reinforcement
- Secondary CTA → /features
- Clean design
```astro
<section class="py-20">
  <div class="container mx-auto px-4 text-center">
    <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
      Ready to transform your development workflow?
    </h2>
    <p class="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
      Install SpecSwarm in seconds and start building features 85-90% faster with autonomous AI workflows.
    </p>
    <a
      href="/features"
      class="inline-block bg-purple-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-purple-700 transition-colors"
    >
      Explore Features
    </a>
  </div>
</section>
```
**Acceptance**: CTA renders, link works, styling consistent

### T012: Verify home page complete
**File**: `src/pages/index.astro`
**Description**: End-to-end home page verification
**Test**:
- Load http://localhost:4321/
- Verify all sections render
- Test navigation (header, CTAs, footer)
- Check mobile menu functionality
- Verify responsive design at 375px, 768px, 1440px
**Acceptance**: All home page sections functional, no console errors

---

## Phase 4: Features Page Implementation

### T013: Create features page structure
**File**: `src/pages/features.astro`
**Description**: Features page with layout and sections
**Implementation**:
- BaseLayout with SEO
- Header and Footer
- Page title: "Features"
- Section structure: Feature Cards, Code Examples, Command Reference, Benefits
```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import Header from '../components/Header.astro';
import Footer from '../components/Footer.astro';
---

<BaseLayout
  title="Features | SpecSwarm - Autonomous Development Workflows"
  description="Explore SpecSwarm's autonomous workflows, quality validation, and tech stack enforcement. Real command examples and proven results."
>
  <Header />
  <main>
    <div class="bg-purple-600 text-white py-16">
      <div class="container mx-auto px-4 text-center">
        <h1 class="text-4xl md:text-5xl font-bold mb-4">Features</h1>
        <p class="text-xl text-purple-100 max-w-2xl mx-auto">
          Complete development toolkit for Claude Code
        </p>
      </div>
    </div>

    <!-- Feature Cards Section -->
    <!-- Code Examples Section -->
    <!-- Command Reference Section -->
    <!-- Benefits Breakdown Section -->
  </main>
  <Footer />
</BaseLayout>
```
**Acceptance**: Page structure renders, SEO meta tags correct

### T014: [P] Add 6 detailed feature cards to features page
**File**: `src/pages/features.astro`
**Description**: Showcase 6 SpecSwarm capabilities
**Implementation**:
- 6 cards: Autonomous Workflows, Quality Validation, Tech Stack Enforcement, Bug Fixing, Dependency Upgrades, Workflow Orchestration
- Each: icon, title, description, example use case
- Content from `/home/marty/code-projects/specswarm/README.md`
- Grid: 1-2 cols mobile, 2-3 cols desktop
```astro
<section class="py-20">
  <div class="container mx-auto px-4">
    <h2 class="text-3xl font-bold text-gray-900 mb-12">Core Capabilities</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <!-- 6 detailed feature cards with content from SpecSwarm README -->
      <!-- Each card: icon, title, 2-3 sentence description, example command -->
    </div>
  </div>
</section>
```
**Acceptance**: 6 cards render with accurate SpecSwarm content, responsive grid

### T015: Create CodeBlock React island component
**File**: `src/components/CodeBlock.tsx`
**Description**: Interactive code block with syntax highlighting and copy button
**Implementation**:
- Accepts code and language as props
- Shiki highlighting (server-rendered HTML passed as dangerouslySetInnerHTML)
- Copy-to-clipboard button with visual feedback
- `client:visible` directive (below fold)
```tsx
import { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface Props {
  code: string;
  highlightedHTML: string; // Pre-rendered by Shiki
  language?: string;
  filename?: string;
}

export default function CodeBlock({ code, highlightedHTML, language = 'bash', filename }: Props) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div class="relative rounded-lg overflow-hidden border border-gray-700 bg-gray-900">
      {/* Header */}
      <div class="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
        <span class="text-sm text-gray-400">
          {filename || language}
        </span>
        <button
          onClick={copyToClipboard}
          className="p-1.5 rounded hover:bg-gray-700 transition-colors"
          aria-label="Copy code"
        >
          {copied ? (
            <Check className="h-4 w-4 text-green-400" />
          ) : (
            <Copy className="h-4 w-4 text-gray-400" />
          )}
        </button>
      </div>

      {/* Code */}
      <div
        className="p-4 overflow-x-auto text-sm"
        dangerouslySetInnerHTML={{ __html: highlightedHTML }}
      />
    </div>
  );
}
```
**Acceptance**: Code renders with syntax highlighting, copy button works, visual feedback on copy

### T016: [P] Add before/after workflow comparison to features page
**File**: `src/pages/features.astro`
**Description**: Compare manual vs SpecSwarm workflows
**Implementation**:
- Side-by-side comparison (stack on mobile)
- Manual: 7 commands, 2-3 hours
- SpecSwarm: 2 commands, 1.5-3 hours
- CodeBlock components for examples
```astro
---
import { codeToHtml } from 'shiki';
import CodeBlock from '../components/CodeBlock';

const manualCode = `/specswarm:specify "feature"
/specswarm:clarify
/specswarm:plan
/specswarm:tasks
/specswarm:implement
/specswarm:analyze-quality
/specswarm:complete`;

const specswarmCode = `/specswarm:build "feature" --validate
# [Answer questions]
/specswarm:ship`;

const manualHTML = await codeToHtml(manualCode, { lang: 'bash', theme: 'github-dark' });
const specswarmHTML = await codeToHtml(specswarmCode, { lang: 'bash', theme: 'github-dark' });
---

<section class="bg-gray-50 py-20">
  <div class="container mx-auto px-4">
    <h2 class="text-3xl font-bold text-gray-900 mb-12 text-center">Before & After</h2>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
      <div>
        <h3 class="text-xl font-semibold text-gray-900 mb-4">Manual Workflow (7 commands)</h3>
        <CodeBlock client:visible code={manualCode} highlightedHTML={manualHTML} />
        <p class="text-gray-600 mt-4">Time: 2-3 hours</p>
      </div>

      <div>
        <h3 class="text-xl font-semibold text-purple-600 mb-4">SpecSwarm Workflow (2 commands)</h3>
        <CodeBlock client:visible code={specswarmCode} highlightedHTML={specswarmHTML} />
        <p class="text-purple-600 font-semibold mt-4">Time: 1.5-3 hours (85-90% less effort)</p>
      </div>
    </div>
  </div>
</section>
```
**Acceptance**: Comparison renders, code blocks functional, time savings clear

### T017: [P] Add command reference section to features page
**File**: `src/pages/features.astro`
**Description**: List key SpecSwarm commands with examples
**Implementation**:
- 4 commands: build, fix, upgrade, ship
- Each: name, description, example usage
- CodeBlock components
- Copy buttons functional
```astro
<section class="py-20">
  <div class="container mx-auto px-4">
    <h2 class="text-3xl font-bold text-gray-900 mb-12">Command Reference</h2>

    <div class="space-y-8 max-w-4xl">
      <!-- /specswarm:build -->
      <div>
        <h3 class="text-2xl font-semibold text-gray-900 mb-2">/specswarm:build</h3>
        <p class="text-gray-600 mb-4">Complete feature development in a single command</p>
        <CodeBlock client:visible
          code='/specswarm:build "Add user authentication" --validate'
          highlightedHTML={buildHTML}
        />
      </div>

      <!-- /specswarm:fix -->
      <!-- /specswarm:upgrade -->
      <!-- /specswarm:ship -->
    </div>
  </div>
</section>
```
**Acceptance**: 4 commands documented with working code blocks

### T018: [P] Add benefits breakdown to features page
**File**: `src/pages/features.astro`
**Description**: Highlight quantifiable benefits
**Implementation**:
- 3-column grid (responsive)
- Time Savings: 85-90% reduction
- Quality Gates: automated validation
- Consistency: tech stack enforcement
- Icons and metrics
```astro
<section class="bg-purple-600 text-white py-20">
  <div class="container mx-auto px-4">
    <h2 class="text-3xl font-bold text-center mb-12">Why SpecSwarm?</h2>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
      <div class="text-center">
        <div class="text-5xl font-bold mb-4">85-90%</div>
        <h3 class="text-xl font-semibold mb-2">Time Savings</h3>
        <p class="text-purple-100">Reduce feature development from days to hours</p>
      </div>

      <div class="text-center">
        <div class="text-5xl font-bold mb-4">0-100</div>
        <h3 class="text-xl font-semibold mb-2">Quality Gates</h3>
        <p class="text-purple-100">Automated scoring ensures production-ready code</p>
      </div>

      <div class="text-center">
        <div class="text-5xl font-bold mb-4">100%</div>
        <h3 class="text-xl font-semibold mb-2">Consistency</h3>
        <p class="text-purple-100">Enforce tech stack across all features and developers</p>
      </div>
    </div>
  </div>
</section>
```
**Acceptance**: Benefits section renders, metrics accurate, responsive layout

### T019: Verify features page complete
**File**: `src/pages/features.astro`
**Description**: End-to-end features page verification
**Test**:
- Load http://localhost:4321/features
- Verify 6 feature cards render
- Test code blocks and copy buttons
- Check before/after comparison
- Verify command reference
- Test responsive design
**Acceptance**: All features page sections functional, code examples work

---

## Phase 5: Pricing Page Implementation

### T020: Create pricing page structure
**File**: `src/pages/pricing.astro`
**Description**: Pricing page with free tier emphasis
**Implementation**:
- BaseLayout with SEO
- Header and Footer
- Page title: "Pricing"
- Sections: Free Tier, Value Prop, Comparison Table, FAQ, Install CTA
```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import Header from '../components/Header.astro';
import Footer from '../components/Footer.astro';
---

<BaseLayout
  title="Pricing | SpecSwarm - Free Claude Code Plugin"
  description="SpecSwarm is free forever. MIT-licensed Claude Code plugin for autonomous development. No catch, no payment required."
>
  <Header />
  <main>
    <div class="bg-purple-600 text-white py-16">
      <div class="container mx-auto px-4 text-center">
        <h1 class="text-4xl md:text-5xl font-bold mb-4">Pricing</h1>
        <p class="text-xl text-purple-100 max-w-2xl mx-auto">
          Free forever. No catch.
        </p>
      </div>
    </div>

    <!-- Free Tier Section -->
    <!-- Value Prop Section -->
    <!-- Comparison Table Section -->
    <!-- FAQ Section -->
    <!-- Install CTA Section -->
  </main>
  <Footer />
</BaseLayout>
```
**Acceptance**: Page structure renders, SEO meta tags correct

### T021: [P] Add free tier emphasis section to pricing page
**File**: `src/pages/pricing.astro`
**Description**: Highlight free forever messaging
**Implementation**:
```astro
<section class="py-20">
  <div class="container mx-auto px-4 text-center">
    <div class="max-w-3xl mx-auto">
      <div class="text-6xl font-bold text-purple-600 mb-4">$0</div>
      <h2 class="text-4xl font-bold text-gray-900 mb-4">Free Forever</h2>
      <p class="text-xl text-gray-600 mb-8">
        SpecSwarm is an MIT-licensed open-source Claude Code plugin. No payment required, no hidden costs, no limitations.
      </p>
      <div class="inline-block px-6 py-3 bg-purple-100 text-purple-800 rounded-lg font-semibold">
        Claude Code Plugin
      </div>
    </div>
  </div>
</section>
```
**Acceptance**: Free tier messaging clear, no pricing tiers shown

### T022: [P] Add value proposition showcase to pricing page
**File**: `src/pages/pricing.astro`
**Description**: ROI through time savings
**Implementation**:
```astro
<section class="bg-gray-50 py-20">
  <div class="container mx-auto px-4">
    <h2 class="text-3xl font-bold text-gray-900 mb-12 text-center">Return on Investment</h2>

    <div class="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
      <div class="bg-white p-8 rounded-lg shadow-sm">
        <h3 class="text-xl font-semibold text-gray-900 mb-4">Manual Development</h3>
        <div class="text-4xl font-bold text-gray-900 mb-2">16-24 hours</div>
        <p class="text-gray-600">Average time per feature with manual workflows</p>
      </div>

      <div class="bg-purple-600 text-white p-8 rounded-lg shadow-sm">
        <h3 class="text-xl font-semibold mb-4">With SpecSwarm</h3>
        <div class="text-4xl font-bold mb-2">1.5-3 hours</div>
        <p class="text-purple-100">Average time per feature with autonomous workflows</p>
      </div>
    </div>

    <p class="text-center text-2xl font-bold text-purple-600 mt-8">
      85-90% Time Savings
    </p>
  </div>
</section>
```
**Acceptance**: ROI clear, time comparison accurate, visual hierarchy strong

### T023: [P] Add feature comparison table to pricing page
**File**: `src/pages/pricing.astro`
**Description**: Compare manual vs SpecSwarm approaches
**Implementation**:
- Table with 5 rows: feature dev, bug fixing, quality analysis, testing, deployment
- Columns: Task, Manual Approach, SpecSwarm Approach, Time Saved
- Responsive: stack on mobile
```astro
<section class="py-20">
  <div class="container mx-auto px-4">
    <h2 class="text-3xl font-bold text-gray-900 mb-12 text-center">Feature Comparison</h2>

    <div class="overflow-x-auto">
      <table class="w-full max-w-5xl mx-auto">
        <thead class="bg-gray-100">
          <tr>
            <th class="px-6 py-3 text-left text-gray-900 font-semibold">Task</th>
            <th class="px-6 py-3 text-left text-gray-900 font-semibold">Manual</th>
            <th class="px-6 py-3 text-left text-purple-600 font-semibold">SpecSwarm</th>
            <th class="px-6 py-3 text-left text-gray-900 font-semibold">Time Saved</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
          <tr>
            <td class="px-6 py-4 font-medium">Feature Development</td>
            <td class="px-6 py-4 text-gray-600">2-3 days</td>
            <td class="px-6 py-4 text-purple-600 font-semibold">3-4 hours</td>
            <td class="px-6 py-4 text-green-600 font-semibold">85-90%</td>
          </tr>
          <tr>
            <td class="px-6 py-4 font-medium">Bug Fixing</td>
            <td class="px-6 py-4 text-gray-600">4-6 hours</td>
            <td class="px-6 py-4 text-purple-600 font-semibold">20-40 min</td>
            <td class="px-6 py-4 text-green-600 font-semibold">80-90%</td>
          </tr>
          <tr>
            <td class="px-6 py-4 font-medium">Quality Analysis</td>
            <td class="px-6 py-4 text-gray-600">2-3 hours</td>
            <td class="px-6 py-4 text-purple-600 font-semibold">5-10 min</td>
            <td class="px-6 py-4 text-green-600 font-semibold">95%</td>
          </tr>
          <tr>
            <td class="px-6 py-4 font-medium">Testing</td>
            <td class="px-6 py-4 text-gray-600">1-2 days</td>
            <td class="px-6 py-4 text-purple-600 font-semibold">Included</td>
            <td class="px-6 py-4 text-green-600 font-semibold">100%</td>
          </tr>
          <tr>
            <td class="px-6 py-4 font-medium">Deployment Prep</td>
            <td class="px-6 py-4 text-gray-600">4-6 hours</td>
            <td class="px-6 py-4 text-purple-600 font-semibold">Included</td>
            <td class="px-6 py-4 text-green-600 font-semibold">100%</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</section>
```
**Acceptance**: Table renders, data accurate, responsive on mobile

### T024: Add FAQ section to pricing page
**File**: `src/pages/pricing.astro`
**Description**: Answer common questions
**Implementation**:
- 5 questions: "Is it really free?", "What's the catch?", "How does it integrate?", "What frameworks?", "Is my project suitable?"
- Static FAQ (no collapse/expand for v1)
```astro
<section class="bg-gray-50 py-20">
  <div class="container mx-auto px-4">
    <h2 class="text-3xl font-bold text-gray-900 mb-12 text-center">Frequently Asked Questions</h2>

    <div class="max-w-3xl mx-auto space-y-8">
      <div>
        <h3 class="text-xl font-semibold text-gray-900 mb-2">Is it really free?</h3>
        <p class="text-gray-600">Yes! SpecSwarm is MIT-licensed open-source software. No payment required, no trial period, no limitations.</p>
      </div>

      <div>
        <h3 class="text-xl font-semibold text-gray-900 mb-2">What's the catch?</h3>
        <p class="text-gray-600">There is no catch. SpecSwarm is open-source and free forever. We believe in making development more accessible and productive for everyone.</p>
      </div>

      <div>
        <h3 class="text-xl font-semibold text-gray-900 mb-2">How does it integrate with Claude Code?</h3>
        <p class="text-gray-600">SpecSwarm installs as a Claude Code plugin. Simply run <code>/plugin https://github.com/MartyBonacci/specswarm</code> in Claude Code to get started.</p>
      </div>

      <div>
        <h3 class="text-xl font-semibold text-gray-900 mb-2">What frameworks are supported?</h3>
        <p class="text-gray-600">SpecSwarm works with any git repository and supports all major frameworks: React, Vue, Angular, Next.js, Astro, Laravel, Django, Rails, and more.</p>
      </div>

      <div>
        <h3 class="text-xl font-semibold text-gray-900 mb-2">Is my project suitable for SpecSwarm?</h3>
        <p class="text-gray-600">If you have a git repository with at least one commit, you're ready for SpecSwarm. It works best with established projects but can be used from day one.</p>
      </div>
    </div>
  </div>
</section>
```
**Acceptance**: 5 FAQs answer common questions, content accurate

### T025: Add installation CTA to pricing page
**File**: `src/pages/pricing.astro`
**Description**: Prominent install button with instructions
**Implementation**:
```astro
<section id="install" class="py-20">
  <div class="container mx-auto px-4 text-center">
    <h2 class="text-3xl font-bold text-gray-900 mb-4">Ready to Get Started?</h2>
    <p class="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
      Install SpecSwarm in seconds and start building features 85-90% faster.
    </p>

    <div class="max-w-2xl mx-auto bg-gray-900 text-white p-6 rounded-lg mb-4">
      <code class="block text-left">/plugin https://github.com/MartyBonacci/specswarm</code>
    </div>

    <a
      href="https://github.com/MartyBonacci/specswarm#readme"
      target="_blank"
      rel="noopener"
      class="inline-block bg-purple-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-purple-700 transition-colors"
    >
      View Installation Guide
    </a>
  </div>
</section>
```
**Acceptance**: Install command visible, GitHub link works, CTA prominent

---

## Phase 6: Performance Optimization

### T026: [P] Optimize bundle size
**File**: `astro.config.mjs`, `package.json`
**Description**: Ensure bundles <200KB per page
**Tasks**:
- Enable Astro build optimizations
- Tree-shake unused Lucide icons
- Minimize Shiki language bundles
- Enable Tailwind CSS purge
- Verify gzip compression
**Test**:
```bash
npm run build
ls -lh dist/_astro/*.js | awk '{print $5, $9}'
# Verify each JS bundle <200KB
```
**Acceptance**: All page bundles <200KB gzipped

### T027: [P] Optimize images
**File**: `src/components/*`, `public/*`
**Description**: Optimize all images and icons
**Tasks**:
- Use Astro Image component for responsive images
- Lazy load below-fold images
- Optimize SVG icons (remove unnecessary paths)
- Use WebP format where possible
**Acceptance**: Images optimized, lazy loading functional

### T028: [P] Run Lighthouse audits
**File**: N/A (testing)
**Description**: Audit all 3 pages for performance
**Test**:
```bash
npm run build
npm run preview
# Run Lighthouse on localhost:4321/, /features, /pricing
```
**Targets**:
- Performance ≥95
- Accessibility ≥95
- Best Practices ≥95
- SEO ≥95
**Acceptance**: All pages score ≥95 on all metrics

### T029: Fix Lighthouse issues
**File**: Various (based on audit results)
**Description**: Address any Lighthouse failures
**Implementation**: Fix issues identified in T028
**Acceptance**: All pages meet Lighthouse targets

### T030: Verify Core Web Vitals
**File**: N/A (testing)
**Description**: Verify performance metrics
**Test**:
- LCP <2.5s (all pages)
- FID <100ms (all pages)
- CLS <0.1 (all pages)
- Use Lighthouse or WebPageTest
**Acceptance**: All Core Web Vitals in "Good" range

---

## Phase 7: Content Population & Accuracy

### T031: [P] Extract content from SpecSwarm README
**File**: N/A (content extraction)
**Description**: Extract accurate content from SpecSwarm project
**Source**: `/home/marty/code-projects/specswarm/README.md`
**Extract**:
- Feature descriptions (6 features)
- Command examples (build, fix, upgrade, ship)
- Statistics (85-90%, Feature 015 data)
- Installation instructions
**Acceptance**: Content extracted, organized by page/section

### T032: [P] Verify content accuracy
**File**: All pages
**Description**: Ensure all content matches SpecSwarm source
**Checklist**:
- Command syntax correct
- Version numbers accurate
- Statistics match README
- Links work (GitHub, docs)
- No outdated information
**Acceptance**: All content verified accurate, no errors

### T033: Add SEO meta tags to all pages
**File**: `src/pages/*.astro`
**Description**: Complete SEO metadata
**Implementation**:
- Home: Title, description, OG tags
- Features: Title, description, OG tags
- Pricing: Title, description, OG tags
- Verify meta descriptions <160 chars
- Add OpenGraph images (create placeholder if needed)
**Acceptance**: All meta tags present, character limits met

### T034: Test all links
**File**: All pages
**Description**: Verify no broken links
**Test**:
- Internal links (navigation, CTAs)
- External links (GitHub, docs)
- Anchor links (#install)
- Verify target="_blank" and rel="noopener" on external links
**Acceptance**: All links functional, security attributes correct

---

## Phase 8: Testing & QA

### T035: [P] Cross-browser testing
**File**: N/A (testing)
**Description**: Test in Chrome, Firefox, Safari
**Test**:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Verify rendering consistency
- Check for browser-specific bugs
**Acceptance**: All pages render correctly in all browsers

### T036: [P] Responsive testing
**File**: N/A (testing)
**Description**: Test at mobile, tablet, desktop breakpoints
**Test**:
- Mobile: 375px (iPhone SE), 390px (iPhone 14)
- Tablet: 768px (iPad)
- Desktop: 1440px, 1920px
- Verify layout, navigation, components adapt correctly
**Acceptance**: All breakpoints functional, no horizontal scroll

### T037: [P] Functional testing
**File**: N/A (testing)
**Description**: Test all interactive features
**Test**:
- Navigation links (header, footer)
- Mobile menu (open, close, navigation, outside-click)
- Code copy buttons (all instances)
- CTAs (all buttons navigate correctly)
- No console errors
**Acceptance**: All interactive features work, zero console errors

### T038: [P] Accessibility testing
**File**: N/A (testing)
**Description**: Verify WCAG 2.1 AA compliance
**Test**:
- Run axe-core in DevTools
- Keyboard navigation (Tab through all pages)
- Screen reader spot check (NVDA or VoiceOver)
- Color contrast verification
- Focus indicators visible
**Acceptance**: Zero axe-core violations, keyboard navigation works, screen reader announces correctly

### T039: Performance validation
**File**: N/A (testing)
**Description**: Final performance check
**Test**:
- Lighthouse audits (all pages ≥95)
- Bundle sizes (<200KB per page)
- Load time on 3G connection (<3s)
- Core Web Vitals (LCP, FID, CLS)
**Acceptance**: All performance targets met

### T040: Final QA checklist
**File**: N/A (testing)
**Description**: Complete pre-ship checklist
**Checklist**:
- ✅ All 3 pages load correctly
- ✅ Navigation functional (desktop + mobile)
- ✅ Content accurate (matches SpecSwarm README)
- ✅ SEO meta tags complete
- ✅ Lighthouse ≥95 all pages
- ✅ Bundle <200KB all pages
- ✅ WCAG 2.1 AA compliant
- ✅ Cross-browser tested
- ✅ Responsive design verified
- ✅ No console errors
**Acceptance**: All checklist items pass

---

## Dependencies

### Sequential Dependencies
1. T001-T002 → T003 (dependencies before layout)
2. T003 → T004-T006 (layout before components)
3. T004-T006 → T007-T012 (foundation before pages)
4. T015 → T016, T017 (CodeBlock before usage)
5. T026-T030 → T031-T034 (optimize before content finalization)
6. T031-T034 → T035-T040 (content before final QA)

### Parallel Opportunities
- T004, T005, T006 can run in parallel (different files)
- T008, T009, T010, T011 can run in parallel (different sections)
- T014, T016, T017, T018 can run in parallel (different sections)
- T021, T022, T023 can run in parallel (different sections)
- T026, T027, T028 can run in parallel (different optimization areas)
- T031, T032 can run in parallel (extraction and verification)
- T035, T036, T037, T038 can run in parallel (different test types)

---

## Implementation Strategy

### MVP Scope (Phase 1-3)
Minimum viable product includes:
- Foundation (T001-T006): Base layout, header, footer, mobile menu
- Home page (T007-T012): Complete home page with all sections
- Basic performance (T026): Bundle optimization

**MVP Delivery Time**: ~1.5 hours
**MVP Value**: Functional home page demonstrating SpecSwarm value

### Full Feature Scope (Phase 1-8)
Complete implementation:
- All 3 pages (home, features, pricing)
- All interactive components
- Full performance optimization
- Comprehensive testing

**Full Delivery Time**: ~3-4 hours
**Full Value**: Production-ready marketing website

---

## Execution Notes

1. **Start with foundation** (T001-T006) - these are blocking dependencies
2. **Build pages incrementally** - each page can be completed and tested independently
3. **Optimize early** (T026-T030) - catch performance issues before final content
4. **Test continuously** - don't wait until Phase 8 to test
5. **Use parallel execution** - 24 tasks marked [P] can run simultaneously

**Next Command**: `/specswarm:implement`
