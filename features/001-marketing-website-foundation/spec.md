---
parent_branch: main
feature_number: 001
status: In Progress
created_at: 2025-11-10T13:45:00-05:00
---

# Feature: Marketing Website Foundation

## Overview

Build the foundational structure for the SpecSwarm marketing website, including three core pages (Home, Features, Pricing) and essential shared components. This establishes the base architecture, design system, and content structure that will promote SpecSwarm as a complete development toolkit for Claude Code, emphasizing 85-90% time savings and autonomous workflows.

The website serves as both a promotional tool and educational resource, helping developers understand SpecSwarm's value proposition and guiding them from discovery to installation.

## User Scenarios

### Scenario 1: Developer Discovery
**Actor**: Developer searching for Claude Code productivity tools
**Goal**: Quickly understand what SpecSwarm is and its value

**Flow**:
1. Developer lands on home page from search/link
2. Sees hero headline "SpecSwarm - Build it. Fix it. Maintain it. Automate it."
3. Scans 3-column features overview showcasing key capabilities
4. Reviews social proof highlighting 85-90% time savings
5. Clicks primary CTA to learn more or install

**Success**: Developer understands SpecSwarm's core value within 30 seconds

###Scenario 2: Evaluating Capabilities
**Actor**: Developer considering SpecSwarm for their workflow
**Goal**: Understand detailed capabilities and see examples

**Flow**:
1. Navigates to Features page from home or header
2. Reviews 6 feature cards with detailed descriptions
3. Examines code examples with syntax highlighting
4. Compares before/after workflow examples
5. Explores command reference with copy-to-clipboard functionality
6. Assesses benefits breakdown (time savings, quality gates, consistency)

**Success**: Developer has detailed understanding of SpecSwarm capabilities and can envision using it

### Scenario 3: Understanding Value & Getting Started
**Actor**: Developer ready to try SpecSwarm
**Goal**: Understand the value proposition and installation process

**Flow**:
1. Navigates to Pricing page
2. Confirms it's a free Claude Code plugin
3. Reviews feature comparison vs manual workflows
4. Reads FAQ to address common questions
5. Clicks CTA to installation guide
6. Proceeds to install SpecSwarm

**Success**: Developer installs SpecSwarm with confidence

### Scenario 4: Mobile/Responsive Experience
**Actor**: Developer browsing on mobile device
**Goal**: Access all website content on mobile

**Flow**:
1. Accesses site on mobile device
2. Taps hamburger menu icon to reveal navigation
3. Selects page from mobile menu
4. Views responsive content optimized for mobile screen
5. Interacts with code examples and copy buttons on mobile
6. Menu closes after navigation

**Success**: Full website functionality works seamlessly on mobile

## Functional Requirements

### FR1: Home Page Components

#### FR1.1: Hero Section
- Display headline: "SpecSwarm - Build it. Fix it. Maintain it. Automate it."
- Include tagline describing SpecSwarm as complete development toolkit for Claude Code
- Prominent primary CTA button ("Get Started" or "Install Now")
- Visually engaging design with gradient background or visual element
- Responsive layout adapting to mobile, tablet, desktop

#### FR1.2: Features Overview Grid
- Display 3 feature cards in grid layout (responsive: 1 column mobile, 3 columns desktop)
- Feature 1: Autonomous Workflows - highlight automated development lifecycle
- Feature 2: Quality Validation - emphasize quality gates and scoring
- Feature 3: Tech Stack Enforcement - showcase consistency and drift prevention
- Each card includes icon, title, brief description
- Consistent styling and spacing

#### FR1.3: Social Proof Section
- Highlight "85-90% time savings" metric prominently
- Reference real-world validation (Feature 015 case study from SpecSwarm project)
- Display key statistics: task completion, test coverage, quality scores
- Professional presentation building credibility

#### FR1.4: Final CTA Section
- Reinforce value proposition
- Secondary CTA to documentation or features page
- Clean, focused design encouraging action

### FR2: Features Page Components

#### FR2.1: Feature Cards
- Display 6 detailed feature cards showcasing SpecSwarm capabilities
- Cards cover: autonomous workflows, quality validation, tech stack enforcement, bug fixing, dependency upgrades, workflow orchestration
- Each card includes: icon, title, detailed description, example use case
- Source accurate descriptions from `/home/marty/code-projects/specswarm/README.md`
- Grid layout (1-2 columns mobile, 2-3 columns desktop)

#### FR2.2: Interactive Code Examples
- Display before/after workflow comparison
- Show manual workflow vs SpecSwarm automated workflow
- Syntax-highlighted code blocks using Shiki
- Copy-to-clipboard button for code examples
- Examples demonstrate real SpecSwarm commands

#### FR2.3: Command Reference
- List key SpecSwarm commands: `/specswarm:build`, `/specswarm:fix`, `/specswarm:upgrade`, `/specswarm:ship`
- Each command includes: name, description, example usage
- Copy-to-clipboard functionality for commands
- Organized by workflow phase or use case

#### FR2.4: Benefits Breakdown
- Section highlighting quantifiable benefits
- Time savings: 85-90% reduction
- Quality gates: automated validation
- Consistency: tech stack enforcement
- Visual presentation (icons, metrics, comparisons)

### FR3: Pricing Page Components

#### FR3.1: Free Tier Emphasis
- Clearly communicate SpecSwarm is a free Claude Code plugin
- No pricing tiers or payment required
- Emphasize value despite zero cost

#### FR3.2: Value Proposition Showcase
- Demonstrate ROI through time savings
- Compare effort: manual (16-24 hours) vs SpecSwarm (1.5-3 hours)
- Highlight feature quality and consistency benefits
- Professional presentation

#### FR3.3: Feature Comparison Table
- Compare SpecSwarm automated workflow vs manual workflow
- Columns: Task, Manual Approach, SpecSwarm Approach, Time Saved
- Include rows for: feature development, bug fixing, quality analysis, testing, deployment
- Responsive table design (stack on mobile if needed)

#### FR3.4: FAQ Section
- Address common questions:
  - "Is it really free?"
  - "What's the catch?"
  - "How does it integrate with Claude Code?"
  - "What frameworks are supported?"
  - "Is my project suitable for SpecSwarm?"
- Expandable/collapsible FAQ items (optional interactive behavior)

#### FR3.5: Installation CTA
- Prominent CTA button directing to installation guide
- Clear next step for interested developers
- Link to SpecSwarm README or documentation

### FR4: Shared Components

#### FR4.1: Header Navigation
- Logo/brand name ("SpecSwarm")
- Navigation links: Home, Features, Pricing, Docs
- Responsive header design
- Fixed/sticky header (optional but recommended for UX)
- Active state indication for current page

#### FR4.2: Mobile Hamburger Menu
- Hamburger icon button on mobile/tablet screens
- React island component for interactivity
- Menu slides in/overlays when opened
- Contains all navigation links
- Close button or tap-outside-to-close functionality
- Smooth open/close animation

#### FR4.3: Footer
- SpecSwarm branding
- GitHub repository link (https://github.com/MartyBonacci/specswarm)
- Documentation links
- Attribution: "Built with Claude Code" or similar
- Copyright notice (optional)
- Responsive footer layout

#### FR4.4: CTA Buttons
- Consistent button styling using Tailwind design tokens
- Primary button style (for main CTAs)
- Secondary button style (for alternative actions)
- Hover and active states
- Accessible focus indicators
- Responsive sizing

#### FR4.5: Code Block Component
- React island component for syntax highlighting and interactivity
- Uses Shiki for syntax highlighting (server-side rendering preferred for zero runtime cost)
- Copy-to-clipboard button integrated into code block header
- Supports multiple languages (bash, typescript, markdown, yaml)
- Theme matches overall site design
- Visual feedback on copy (tooltip or button state change)

### FR5: Technical Requirements

#### FR5.1: Content Accuracy
- All feature descriptions sourced from `/home/marty/code-projects/specswarm/README.md`
- Accurate version numbers and command syntax
- Statistics and metrics match official SpecSwarm data
- No outdated or incorrect information

#### FR5.2: Performance
- Lighthouse performance score ≥95 (per constitution.md)
- Bundle size <200KB per page (per constitution.md)
- First Contentful Paint (FCP) <1.5s
- Largest Contentful Paint (LCP) <2.5s
- Total Blocking Time (TBT) <200ms
- Cumulative Layout Shift (CLS) <0.1

#### FR5.3: Accessibility
- WCAG 2.1 Level AA compliance (per constitution.md)
- Semantic HTML structure
- Proper heading hierarchy (single H1 per page)
- Sufficient color contrast (4.5:1 normal text, 3:1 large text)
- Keyboard navigation support for all interactive elements
- Screen reader compatibility
- Alternative text for all images
- Clear focus indicators

#### FR5.4: Responsive Design
- Mobile-first approach
- Breakpoints: mobile (<640px), tablet (640-1024px), desktop (>1024px)
- All components adapt gracefully across screen sizes
- Touch-friendly interactive elements (min 44x44px tap targets)
- No horizontal scrolling on any device

#### FR5.5: SEO Optimization
- Semantic HTML with proper meta tags
- Page titles: "<Page> | SpecSwarm - Build it. Fix it. Maintain it."
- Meta descriptions (<160 chars) for each page
- OpenGraph tags for social sharing:
  - og:title
  - og:description
  - og:image
  - og:url
  - og:type
- Twitter Card meta tags:
  - twitter:card
  - twitter:title
  - twitter:description
  - twitter:image
- Proper heading structure (H1 > H2 > H3)

## Success Criteria

### User Experience Metrics
- New visitors understand SpecSwarm's value proposition within 30 seconds of landing
- Users can navigate between all pages within 2 clicks
- Code examples are readable and copyable on first attempt
- Mobile menu opens and functions without confusion

### Performance Metrics
- Lighthouse performance score ≥95 on all three pages
- Page load time <3 seconds on 3G connection
- Bundle size per page <200KB (gzipped)
- Zero console errors in browser developer tools
- Core Web Vitals meet "Good" thresholds:
  - LCP <2.5s
  - FID <100ms
  - CLS <0.1

### Accessibility Metrics
- Passes axe-core accessibility audit with zero violations
- All interactive elements keyboard-navigable
- Screen reader can navigate and announce all content correctly
- Color contrast ratios meet WCAG 2.1 AA standards
- All images have descriptive alt text

### Content Quality
- All SpecSwarm features accurately described
- Code examples use correct command syntax
- Statistics match official SpecSwarm data
- No broken links or missing content
- Content remains synchronized with SpecSwarm README.md source

### Technical Quality
- Build completes without errors or warnings
- All pages render correctly in Chrome, Firefox, Safari
- No layout shifts during page load
- Images optimized and lazy-loaded where appropriate
- Responsive design works across all target breakpoints

## Key Entities

### Pages
- **Home Page** (`/` or `/index`)
  - Hero section
  - Features overview grid (3 cards)
  - Social proof section
  - Final CTA

- **Features Page** (`/features`)
  - 6 detailed feature cards
  - Code examples with syntax highlighting
  - Before/after workflow comparison
  - Command reference section
  - Benefits breakdown

- **Pricing Page** (`/pricing`)
  - Free tier emphasis
  - Value proposition showcase
  - Feature comparison table
  - FAQ section
  - Installation CTA

### Components
- **Header** (shared across all pages)
  - Logo/brand
  - Navigation links
  - Mobile menu trigger

- **Mobile Menu** (React island)
  - Overlay/slide-in panel
  - Navigation links
  - Close mechanism

- **Footer** (shared across all pages)
  - Links section
  - Attribution
  - Copyright

- **Code Block** (React island)
  - Syntax highlighted content (Shiki)
  - Copy button
  - Language indicator

- **CTA Buttons** (reusable component)
  - Primary style
  - Secondary style
  - Consistent sizing

### Content Sources
- **SpecSwarm README**: `/home/marty/code-projects/specswarm/README.md`
  - Feature descriptions
  - Command examples
  - Statistics and metrics
  - Installation instructions

## Assumptions

1. **Content Source**: All content will be manually extracted from SpecSwarm README.md and adapted for marketing presentation. No automated synchronization required for v1.

2. **Branding**: Site uses "SpecSwarm" branding without custom logo. Typography and color palette derived from Tailwind CSS design tokens.

3. **Deployment**: Static site will be deployed to Vercel, Netlify, or Cloudflare Pages. Build output is static HTML/CSS/JS.

4. **Analytics**: No analytics integration required for v1. Can be added in future iteration.

5. **Documentation Links**: "Docs" navigation link points to SpecSwarm README on GitHub until separate documentation site exists.

6. **GitHub Repository**: Links to https://github.com/MartyBonacci/specswarm

7. **Code Examples**: Examples demonstrate real SpecSwarm commands but are not executable/interactive (display only).

8. **Browser Support**: Modern browsers only (Chrome, Firefox, Safari, Edge - latest 2 versions). No IE11 support.

9. **Hosting**: Assumes standard static hosting with CDN. No server-side rendering or API endpoints needed.

10. **Image Assets**: Icons use Lucide React or Heroicons. No custom photography/illustrations required for v1.

11. **Copy-to-Clipboard**: Uses browser Clipboard API (available in all modern browsers). Falls back gracefully if not supported.

12. **Mobile Menu**: Opens as overlay (not push/slide content). Closes on navigation or outside click.

13. **Performance Budget**: 200KB per page aligns with constitution.md. Assumes reasonable image optimization and code splitting.

14. **Accessibility Testing**: Manual testing with keyboard navigation and screen reader. Automated axe-core audit in development.

15. **Content Updates**: Marketing content considered relatively stable. Major updates to SpecSwarm features will require manual content updates to this site.

## Out of Scope

- User authentication or accounts
- Backend API or database
- Blog or CMS functionality
- Search functionality
- Interactive demos or sandboxes
- Video content
- Internationalization (i18n)
- A/B testing or experimentation framework
- Email capture or newsletter signup
- Live chat or support widget
- Custom illustrations or branded imagery
- Automated content synchronization with SpecSwarm README
- Mobile app or PWA functionality
- Analytics dashboard
