# Research: Marketing Website Foundation

**Feature**: 001-marketing-website-foundation
**Created**: 2025-11-10

---

## Icon Library Selection

**Decision**: Lucide React

**Rationale**:
- Modern, well-maintained icon library with 1000+ icons
- React component-based API (perfect for React islands)
- Tree-shakeable (only import icons used)
- Small bundle size per icon (~1-2KB)
- TypeScript support built-in
- Consistent with Astro + React islands architecture

**Alternatives Considered**:
1. **Heroicons** - Also excellent, similar features, equally valid choice
2. **React Icons** - Larger bundle, multiple icon sets (not needed for this project)
3. **Font Awesome** - Older, larger bundle, icon fonts (less performant)

**Implementation**:
```bash
npm install lucide-react
```

**Usage**:
```tsx
import { Menu, X, Copy, Check } from 'lucide-react';

// In mobile menu:
<Menu className="h-6 w-6" />
<X className="h-6 w-6" />

// In code block:
<Copy className="h-4 w-4" />
<Check className="h-4 w-4" />
```

---

## Syntax Highlighting Strategy

**Decision**: Shiki server-side rendering

**Rationale**:
- Zero runtime JavaScript cost (pre-rendered at build time)
- VS Code-quality highlighting (uses TextMate grammars)
- Supports all languages needed (bash, typescript, yaml, markdown)
- Large bundle size (250KB) acceptable because it runs server-side
- No client-side WASM dependency
- Perfect for static site with code examples

**Implementation Details**:
- Use Shiki in Astro components during build
- Pre-render all code blocks to HTML
- No hydration needed for syntax highlighting
- Copy button as separate React island

**Code Example**:
```astro
---
import { codeToHtml } from 'shiki';

const code = `/specswarm:build "feature description"`;
const html = await codeToHtml(code, {
  lang: 'bash',
  theme: 'github-dark'
});
---

<div set:html={html} />
```

---

## Mobile Menu Animation Approach

**Decision**: CSS transitions with React state

**Rationale**:
- Smooth 60fps animations
- No animation library needed
- Accessible (respects prefers-reduced-motion)
- Simple state management with useState
- Overlay approach (no content shift)

**Implementation**:
```tsx
const [isOpen, setIsOpen] = useState(false);

// Tailwind classes for animation
className={`fixed inset-0 z-50 bg-gray-900/95 transition-opacity duration-300 ${
  isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
}`}
```

---

## Performance Budget Allocation

**Total Budget**: 200KB per page (gzipped)

**Allocation Strategy**:

**Home Page** (~180KB target):
- HTML/CSS: ~40KB
- React runtime + islands: ~80KB (mobile menu)
- Tailwind CSS: ~30KB (purged, only used classes)
- Fonts (if any): ~20KB
- Icons (SVG): ~5KB
- Images (hero, icons): ~25KB (optimized WebP)

**Features Page** (~195KB target):
- HTML/CSS: ~50KB (more content)
- React runtime + islands: ~90KB (mobile menu + code blocks)
- Tailwind CSS: ~30KB
- Icons: ~10KB
- Code examples (pre-rendered HTML): ~15KB

**Pricing Page** (~170KB target):
- HTML/CSS: ~45KB
- React runtime + islands: ~80KB (mobile menu)
- Tailwind CSS: ~30KB
- Table styling: ~10KB
- Icons: ~5KB

**Mitigation if Over Budget**:
- Lazy load below-fold images
- Split React islands into separate chunks
- Minimize Tailwind by using CSS variables for repeated values
- Optimize SVG icons (remove unnecessary paths)

---

## Content Sources Mapping

**SpecSwarm README.md → Website Sections**:

**Home Page - Features Grid**:
- Source: README "What's Included" section
- Extract: SpecSwarm v3.0 high-level commands
- Adapt: Simplified for 3 cards (build, validate, ship)

**Home Page - Social Proof**:
- Source: README "Proven Results" section
- Extract: Feature 015 metrics
- Use: 76/76 tasks, 96.3% pass rate, 85-90% time savings

**Features Page - Feature Cards**:
- Source: README "Core Capabilities" and command descriptions
- Extract: 6 main features
- Include: Real command examples

**Features Page - Before/After**:
- Source: README "Time Savings" comparison table
- Extract: Manual vs SpecSwarm workflow
- Visual: Side-by-side or stacked

**Pricing Page - FAQ**:
- Source: README "When to Use" and prerequisites
- Adapt: Common questions format
- Add: Installation/integration details

---

## SEO Strategy

**Target Keywords**:
- Primary: "SpecSwarm", "Claude Code plugin", "AI development workflow"
- Secondary: "autonomous development", "spec-driven development", "quality gates"
- Long-tail: "Claude Code productivity tools", "automated feature development"

**Page Titles**:
- Home: "SpecSwarm - Build it. Fix it. Maintain it. | AI Workflows for Claude Code"
- Features: "Features | SpecSwarm - Autonomous Development Workflows"
- Pricing: "Pricing | SpecSwarm - Free Claude Code Plugin"

**Meta Descriptions**:
- Home: "SpecSwarm: Complete development toolkit for Claude Code. Build features, fix bugs, and maintain quality with autonomous workflows. 85-90% time savings."
- Features: "Explore SpecSwarm's autonomous workflows, quality validation, and tech stack enforcement. Real command examples and proven results."
- Pricing: "SpecSwarm is free forever. MIT-licensed Claude Code plugin for autonomous development. No catch, no payment required."

**OpenGraph Images** (future):
- Create social sharing preview images
- Dimensions: 1200x630px
- Include: SpecSwarm logo, tagline, key metric

---

## Accessibility Considerations

**Keyboard Navigation**:
- Tab order: Header links → Main content → Footer links
- Mobile menu: Focus trap when open, Escape to close
- Code blocks: Copy button keyboard-accessible

**Screen Reader**:
- ARIA labels: "Open mobile menu", "Close menu", "Copy code"
- Landmark roles: header, main, footer, navigation
- Heading hierarchy: H1 (page title) → H2 (sections) → H3 (subsections)

**Color Contrast**:
- Primary text: #1a1a1a on #ffffff (21:1 ratio) ✓
- CTA buttons: Verify in implementation (aim for 4.5:1 minimum)
- Code blocks: Use accessible theme (github-dark or github-light)

**Focus Indicators**:
- Tailwind's default focus ring (blue outline)
- Ensure visible on all interactive elements
- Test with Tab navigation

---

## Browser Compatibility

**Target Browsers**:
- Chrome 120+ (latest 2 versions)
- Firefox 120+ (latest 2 versions)
- Safari 17+ (latest 2 versions)
- Edge 120+ (Chromium-based)

**No Support**:
- Internet Explorer (any version)
- Opera Mini
- Browsers without ES2020 support

**Polyfills Needed**:
- None (modern browsers only)
- Clipboard API available in all targets

**Testing Priority**:
1. Chrome (primary development)
2. Safari (WebKit differences)
3. Firefox (cross-engine verification)

---

## Deployment Considerations

**Recommended Platform**: Vercel

**Rationale**:
- Zero-config Astro deployment
- Automatic preview deployments per PR
- Fast global CDN
- Free tier sufficient for marketing site
- Easy custom domain setup

**Alternative**: Cloudflare Pages
- Similar features
- Faster cold starts
- More generous free tier

**Build Command**: `npm run build`
**Output Directory**: `dist/`
**Node Version**: 18.x or 20.x

**Environment Variables**: None needed (static site)

---

## Future Enhancements (Out of Scope v1)

1. **Analytics**:
   - Privacy-friendly: Plausible or Fathom
   - Track: Page views, CTA clicks, navigation patterns
   - Implementation: Phase 2

2. **Search**:
   - Algolia DocSearch or Pagefind
   - Search documentation and commands
   - Implementation: When docs grow beyond 3 pages

3. **Newsletter Signup**:
   - Capture emails for release notifications
   - Integration: Mailchimp or ConvertKit
   - Implementation: After launch, if demand

4. **Interactive Demo**:
   - Sandbox environment showing SpecSwarm commands
   - Technical complexity: High
   - Implementation: Future major version

5. **Blog/Changelog**:
   - Astro Content Collections
   - Announce new features and releases
   - Implementation: Phase 2 or 3

---

## Implementation Notes

**Development Workflow**:
1. Component-first approach (build components in isolation)
2. Page assembly (compose components into pages)
3. Content population (extract from README)
4. Performance audit (Lighthouse)
5. Accessibility audit (axe-core)
6. Cross-browser testing
7. Deploy preview (Vercel)
8. Final review and ship

**Code Style**:
- TypeScript strict mode (no `any` types)
- Functional React components only
- Tailwind utility classes (avoid custom CSS)
- Consistent naming: PascalCase components, camelCase props
- ESLint + Prettier for formatting

**Git Workflow**:
- Feature branch: `001-marketing-website-foundation`
- Commit per component/page
- Descriptive commit messages
- Final PR to main with `/specswarm:ship`
