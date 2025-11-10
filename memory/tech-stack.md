# Tech Stack - specswarm.com

**Last Updated**: 2025-11-10
**Auto-Generated**: Yes

---

## Core Technologies

### Framework
- **Astro** 5.15.4
  - Notes: Static site generator with React islands for interactivity. Pre-rendering enabled for optimal performance.

### UI Library
- **React** 19.2.0
  - Notes: Used only for interactive islands. Functional components only, no class components.

### Language
- **TypeScript** 5.x (strict mode)
  - Notes: Strict type checking enabled for maximum type safety. All new code must be TypeScript.

### Build Tool
- **Vite** (bundled with Astro)
  - Notes: Fast build tool with HMR. Configured via astro.config.mjs.

---

## State Management

- No state management library required for static marketing site
- Recommendation: Use React hooks (useState, useReducer) for island-level state
- For complex state needs, consider Zustand or Jotai

---

## Styling

- **Tailwind CSS** 4.0.0 (Oxide engine)
  - Purpose: Utility-first CSS framework
  - Notes: Configured via @tailwindcss/vite plugin. Use utility classes, avoid custom CSS when possible.
  - Import: Global CSS at `/src/styles/global.css` with `@import "tailwindcss"`

---

## Syntax Highlighting

- **Shiki** 3.15.0
  - Purpose: Syntax highlighting for code examples in documentation
  - Notes: VS Code-quality highlighting, use server-side during build for zero runtime cost

---

## Testing

### Unit Testing
- **Not configured** (static site with minimal logic)
  - Recommendation: Add Vitest if component logic grows complex

### Integration Testing
- **Not configured**
  - Recommendation: Not needed for static marketing site

### End-to-End Testing
- **Not configured** (optional)
  - Recommendation: Add Playwright for critical page load verification if needed

---

## Approved Libraries

### Content Management
- Astro Content Collections (built-in) - for structured content like blog posts or docs

### Data Validation
- Zod v4+ (runtime type validation) - if forms or API integration added

### Utilities
- date-fns (date manipulation) - if needed
- clsx or classnames (conditional CSS classes) - for dynamic Tailwind classes

### Icons
- lucide-react or heroicons - for consistent icon sets

*Add project-specific approved libraries here as needs arise*

---

## Prohibited Technologies

The following technologies/patterns are **NOT** approved for this project:

### State Management
- ❌ Redux, MobX, Recoil - Unnecessary complexity for static site with islands
- ❌ React Context for global state - Use prop drilling or lightweight state library if needed

### Styling
- ❌ CSS-in-JS libraries (styled-components, Emotion) - Use Tailwind CSS instead
- ❌ Sass/SCSS - Tailwind CSS provides sufficient styling capabilities
- ❌ CSS Modules - Tailwind utility classes preferred

### React Patterns
- ❌ Class components - Use functional components with hooks only
- ❌ PropTypes - Use TypeScript interfaces/types instead

### Build Tools
- ❌ Create React App - We use Astro
- ❌ Webpack configuration - Vite is bundled with Astro
- ❌ Custom build scripts - Use Astro's built-in tooling

### Legacy Libraries
- ❌ Moment.js - Use date-fns (smaller bundle)
- ❌ Lodash (full) - Use lodash-es (tree-shakeable) if needed
- ❌ jQuery - Use vanilla JavaScript or React

---

## Guidelines

### Adding New Dependencies

Before adding a new dependency:
1. Check if existing approved libraries can solve the problem
2. Verify the library is actively maintained (last commit <6 months)
3. Check bundle size impact (use bundlephobia.com)
4. Ensure TypeScript support with proper type definitions
5. Verify compatibility with Astro and React 19
6. Consider if functionality can be implemented in ~50 lines of code instead

### Version Updates

- Follow semver for all dependencies
- Test thoroughly before updating major versions
- Update Astro cautiously (check breaking changes in their changelog)
- Keep React and React-DOM versions in sync
- Document breaking changes in this file
- Update CI/CD pipelines if needed

### React Islands Best Practices

- Keep islands small and focused
- Use `client:load` for above-the-fold interactivity
- Use `client:visible` for below-the-fold components
- Use `client:idle` for non-critical interactivity
- Minimize props passed to islands (serialization cost)

---

## Notes

- This file was auto-detected from package.json and created by `/specswarm:init`
- Astro 5 uses Vite 5 internally for building
- Tailwind CSS v4 (Oxide) is the latest release with improved performance
- Update this file when adding new technologies or patterns
- Run `/specswarm:init` again to update with new detections

---

**Tech Stack Enforcement**: This file is used by SpecSwarm to prevent technology drift. Commands like `/specswarm:build` and `/specswarm:implement` will reference this file to ensure consistency across features.
