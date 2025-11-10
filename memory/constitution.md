<!--
SYNC IMPACT REPORT:
Version: 0.0.0 → 1.0.0 (Initial creation)
Modified Principles: None (new constitution)
Added Sections: All (initial creation)
Removed Sections: None
Templates Requiring Updates: N/A (no existing templates yet)
Follow-up TODOs: None
-->

# Project Constitution

**Project**: specswarm.com
**Constitution Version**: 1.0.0
**Ratified**: 2025-11-10
**Last Amended**: 2025-11-10

---

## Purpose

This constitution defines the foundational principles, standards, and governance for the SpecSwarm marketing website. It serves as the authoritative guide for all development decisions, ensuring consistency, quality, and alignment with project goals.

---

## Principles

### 1. Performance First

**Statement**: The website MUST prioritize performance and load speed above feature complexity.

**Rationale**: As a marketing site promoting a developer tool, we must demonstrate technical excellence through fast load times, minimal JavaScript, and optimal Core Web Vitals scores. Poor performance undermines credibility and user trust.

**Requirements**:
- Lighthouse performance score ≥95
- First Contentful Paint (FCP) <1.5s
- Largest Contentful Paint (LCP) <2.5s
- Total Blocking Time (TBT) <200ms
- Cumulative Layout Shift (CLS) <0.1
- Bundle size per page <200KB (including CSS/JS)

### 2. Content Accuracy and Freshness

**Statement**: All content MUST accurately reflect the current state of the SpecSwarm project and be kept in sync with source documentation.

**Rationale**: Outdated or inaccurate documentation damages user trust and creates support burden. The marketing site must serve as a reliable, authoritative source of information.

**Requirements**:
- Content synchronized with `/home/marty/code-projects/specswarm/README.md` and official docs
- Version numbers, command syntax, and features match current SpecSwarm release
- Code examples tested and verified to work
- Breaking changes and deprecations clearly communicated
- Review content freshness quarterly minimum

### 3. Accessibility as Standard

**Statement**: The website MUST meet WCAG 2.1 Level AA accessibility standards at minimum.

**Rationale**: Inclusive design is non-negotiable. Developers using assistive technologies must have equal access to SpecSwarm information and resources.

**Requirements**:
- Semantic HTML structure
- Proper heading hierarchy
- Sufficient color contrast (4.5:1 for normal text, 3:1 for large text)
- Keyboard navigation support for all interactive elements
- Screen reader compatibility
- Alternative text for all images
- Focus indicators visible and clear

### 4. User-Centric Design

**Statement**: Design decisions MUST prioritize user needs and clarity over aesthetic preferences.

**Rationale**: The primary goal is to help users understand and adopt SpecSwarm quickly. Visual design should enhance, not obscure, comprehension.

**Requirements**:
- Clear information hierarchy
- Scannable content with headings, lists, and white space
- Progressive disclosure (essential info first, details on demand)
- Mobile-responsive design (mobile-first approach)
- Clear calls-to-action
- Consistent navigation and layout patterns

### 5. Developer Experience (DX)

**Statement**: The codebase MUST be maintainable, well-documented, and easy for developers to work with.

**Rationale**: This site may be maintained by multiple contributors. Good DX reduces onboarding time and prevents technical debt.

**Requirements**:
- Clear component organization and naming conventions
- Inline code comments for non-obvious logic
- TypeScript for type safety
- Consistent code formatting (Prettier)
- Reusable components over duplication
- Clear documentation for build and deployment processes

### 6. SEO and Discoverability

**Statement**: The website MUST be optimized for search engine discovery and ranking.

**Rationale**: Users should easily find SpecSwarm through search engines when looking for Claude Code plugins, workflow automation, or development productivity tools.

**Requirements**:
- Semantic HTML with proper meta tags
- OpenGraph and Twitter Card metadata
- Descriptive page titles and meta descriptions
- Proper heading structure (single H1 per page)
- XML sitemap generation
- robots.txt configuration
- Fast page loads (search ranking factor)
- Mobile-friendly design (search ranking factor)

---

## Governance

### Amendment Process

1. **Proposal**: Any team member may propose constitutional amendments via discussion
2. **Review**: Proposed changes reviewed for impact on existing codebase and workflows
3. **Version Bump**: Determine semantic version increment (MAJOR/MINOR/PATCH)
4. **Update**: Constitution updated with new version, amendment date, and sync impact report
5. **Propagation**: Dependent templates and documentation updated for consistency
6. **Commit**: Changes committed with descriptive message referencing version

### Version Semantics

- **MAJOR** (X.0.0): Backward-incompatible changes, principle removal/redefinition
- **MINOR** (x.Y.0): New principles added, material expansions to guidance
- **PATCH** (x.y.Z): Clarifications, wording improvements, typo fixes

### Compliance Review

- Constitution compliance reviewed during `/specswarm:ship` quality gates
- Violations flagged and must be resolved before merge
- Exemptions require explicit documentation and approval rationale

### Conflict Resolution

When principles conflict:
1. **Performance First** takes precedence over aesthetic preferences
2. **Accessibility** is non-negotiable and overrides design preferences
3. **Content Accuracy** cannot be sacrificed for convenience
4. Document the decision and rationale in commit messages

---

## Enforcement

This constitution is enforced through:
- Automated checks in CI/CD pipeline (Lighthouse, accessibility tests)
- Code review requirements referencing specific principles
- Quality gates in `/specswarm:ship` command
- Regular audits against stated requirements

Developers are expected to familiarize themselves with these principles and apply them proactively during development.

---

## Notes

- This constitution created as part of SpecSwarm initialization workflow
- Designed for static marketing/documentation websites
- Review and update when project scope or requirements change significantly
- Template based on best practices for developer-focused marketing sites

---

**Signed**: SpecSwarm Development Team
**Date**: 2025-11-10
