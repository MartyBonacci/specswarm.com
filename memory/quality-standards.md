# Quality Standards - specswarm.com

**Last Updated**: 2025-11-10
**Auto-Generated**: Yes

---

## Quality Gates

These thresholds are enforced by `/specswarm:ship` before allowing merge to parent branch.

```yaml
# Overall Quality
min_quality_score: 80  # 0-100 scale
min_test_coverage: 80   # Percentage (adjusted for static site)
enforce_gates: true           # Enforced before merge
```

**Note for Static Sites**: Test coverage requirements apply to React islands and utility functions, not static Astro pages. Focus on testing interactive components and business logic.

---

## Performance Budgets

Per constitution.md requirements:

```yaml
# Bundle Size Limits (Constitution: <200KB per page)
enforce_budgets: true
max_bundle_size: 200     # KB per page bundle (stricter than default 500KB)
max_initial_load: 400    # KB initial load total
max_chunk_size: 100      # KB per code-split chunk

# Performance Metrics (Constitution requirements)
lighthouse_performance: 95   # Minimum Lighthouse score
max_fcp: 1500               # First Contentful Paint (ms)
max_lcp: 2500               # Largest Contentful Paint (ms)
max_tbt: 200                # Total Blocking Time (ms)
max_cls: 0.1                # Cumulative Layout Shift
```

---

## Code Quality Metrics

```yaml
# Complexity Thresholds
complexity_threshold: 10  # Cyclomatic complexity
max_file_lines: 300             # Lines per file
max_function_lines: 50     # Lines per function
max_function_params: 5   # Parameters per function

# TypeScript Strict Mode
strict_null_checks: true
no_implicit_any: true
strict_function_types: true
```

---

## Testing Requirements

```yaml
# Test Coverage (for components and utilities only)
require_tests: true  # For React islands and utility functions
test_types:
  - unit          # Required for islands and utils
  - e2e           # Optional: critical page load verification

# Test Quality
min_assertions_per_test: 1
max_test_duration: 5000  # milliseconds per test
require_test_descriptions: true

# Testing Exemptions for Static Site
exempt_from_tests:
  - Astro page files (*.astro in /src/pages)
  - Layout files (pure presentation)
  - Simple wrapper components (<10 lines)
```

---

## Accessibility Requirements

Per constitution.md (WCAG 2.1 Level AA minimum):

```yaml
# Accessibility Standards
wcag_level: AA  # WCAG 2.1 Level AA minimum
contrast_ratio_normal: 4.5  # Normal text
contrast_ratio_large: 3.0   # Large text (18px+ or 14px+ bold)

# Required Checks
semantic_html: true
heading_hierarchy: true
alt_text_images: true
keyboard_navigation: true
screen_reader_compatible: true
focus_indicators: true
```

---

## Code Review Standards

```yaml
# Review Requirements
require_code_review: false  # Solo developer project
min_reviewers: 0             # Not applicable for solo project
require_tests_for_features: true   # For React islands
require_tests_for_bugfixes: true   # When applicable
```

---

## CI/CD Requirements

```yaml
# Build & Deploy
block_merge_on_failure: true  # Block if build fails
require_passing_tests: true
require_lint_pass: true
require_type_check_pass: true  # TypeScript strict mode

# Pre-merge Checks
- TypeScript type check (tsc --noEmit)
- Astro build succeeds
- Bundle size within budget
- No console errors/warnings
- Lighthouse CI score ≥95
```

---

## Security Standards

```yaml
# Security Requirements
require_security_scan: false  # No backend/database
block_on_critical_vulns: true
block_on_high_vulns: false
max_dependency_age: 365  # days (warn if dependency >1 year old)

# Static Site Security
- No API keys in client code
- No sensitive data in static content
- Secure headers via hosting provider
- Regular dependency updates
```

---

## Documentation Standards

```yaml
# Documentation Requirements
require_readme_updates: true   # For new features
require_api_docs: false        # No public APIs
require_changelog_entry: false  # Optional for marketing site

# Code Documentation
require_jsdoc_functions: false  # TypeScript types sufficient
require_component_docs: true    # Document props and usage for islands
```

---

## SEO & Content Quality

Per constitution.md (Content Accuracy and Freshness):

```yaml
# SEO Requirements
- Meta titles (<60 chars)
- Meta descriptions (<160 chars)
- OpenGraph tags (all pages)
- Twitter Card meta (all pages)
- Semantic HTML (proper heading hierarchy)
- XML sitemap generation
- robots.txt configuration

# Content Requirements
- Sync with /home/marty/code-projects/specswarm/README.md
- Accurate version numbers
- Working code examples (tested)
- Up-to-date command syntax
- Quarterly content freshness review
```

---

## Custom Quality Checks

### Performance Monitoring
- Monitor Core Web Vitals in production
- Set Lighthouse CI in deployment pipeline
- Alert on regression >5 points

### Accessibility Audits
- Run axe-core in development
- Manual keyboard navigation testing
- Screen reader spot checks (NVDA/VoiceOver)

### Content Validation
- Verify SpecSwarm version matches source
- Test all code examples compile/run
- Check external links (quarterly)
- Review analytics for broken pages

### Design Consistency
- Consistent component patterns
- Tailwind design tokens usage
- Mobile responsiveness (all breakpoints)
- Cross-browser testing (Chrome, Firefox, Safari)

---

## Exemptions

### Granted Exemptions

1. **Test Coverage**: Static Astro pages exempt from coverage requirements (pure presentation)
2. **Code Review**: Solo developer project, self-review acceptable
3. **Security Scan**: Static site with no backend, security scan not required

### Requesting New Exemptions

To request exemption from a standard:
1. Document reason in this file
2. Specify scope (which files/features)
3. Set expiration date if temporary
4. Get team approval (if applicable)

---

## Notes

- Quality level: Standard (80% coverage, 80 quality score)
- Adjusted for static marketing site context
- Performance budgets aligned with constitution.md
- Created by `/specswarm:init` on 2025-11-10
- Enforced by `/specswarm:ship` before merge
- Review and adjust these standards as project evolves

---

**Quality Enforcement**: These standards are enforced by SpecSwarm commands:
- `/specswarm:ship` - Blocks merge if quality gates fail
- `/specswarm:analyze-quality` - Reports quality score against these standards
- `/specswarm:build` - Can enforce quality gates with `--quality-gate` flag
