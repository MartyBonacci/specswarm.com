# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a promotional and educational website for SpecSwarm, a Claude Code plugin marketplace platform. The main SpecSwarm project (the plugin itself) is located at `/home/marty/code-projects/specswarm`.

**Purpose**: Promote the SpecSwarm platform and educate users on how to maximize its capabilities.

**Current Status**: Complete site redesign in progress (2025). See `docs/redesign-2025.md` for comprehensive specifications.

**Tech Stack**: Astro 5.x + React 19 + Tailwind CSS v4 (Oxide engine) + Shiki syntax highlighting

## Related Projects

- **Main SpecSwarm Project**: `/home/marty/code-projects/specswarm` - The actual Claude Code plugin
- **SpecSwarm Documentation**: Available at `/home/marty/code-projects/specswarm/README.md` and `/home/marty/code-projects/specswarm/docs/`

## Key Reference Materials

When working on this website, reference the following from the main SpecSwarm project:

1. **Feature Documentation**: `/home/marty/code-projects/specswarm/README.md` - Core features and commands
2. **Workflow Guide**: `/home/marty/code-projects/specswarm/docs/WORKFLOW.md` - Step-by-step user workflows
3. **Quick Reference**: `/home/marty/code-projects/specswarm/docs/CHEATSHEET.md` - Command cheat sheet
4. **Changelog**: `/home/marty/code-projects/specswarm/CHANGELOG.md` - Version history and updates
5. **Marketplace Config**: `/home/marty/code-projects/specswarm/marketplace.json` - Plugin metadata

## 2025 Complete Redesign

**Comprehensive Specifications**: `docs/redesign-2025.md`

This document contains complete content strategy and design system specifications for the full site reimagining, including:

- **Core Messaging**: "AI automation that doesn't go off the rails"
- **Content Strategy**: Page-by-page content specifications (Home, Features, Get Started, Docs, Use Cases)
- **Design System**: Anthropic-inspired aesthetic (light theme), color palette, typography, spacing, components
- **Source Materials**: References to main SpecSwarm repo for content
- **Definition of Done**: Complete success criteria

**Design Reference**: anthropic.com (extract design values, adapt to light theme with terracotta accent #d97757)

**Approach**: Complete teardown and rebuild - all existing pages and components will be replaced.

## Content Guidelines

When developing this website, ensure it:

1. **Promotes SpecSwarm's Core Value**: 85-90% time savings on feature development
2. **Highlights Key Features**:
   - Spec-driven development workflow
   - Autonomous orchestration capabilities
   - Quality validation and scoring
   - Tech stack enforcement
3. **Showcases Real Results**: Reference Feature 015 validation (76/76 tasks, 96.3% test pass rate)
4. **Explains Use Cases**: New features, bug fixing, refactoring, dependency upgrades
5. **Provides Getting Started Path**: Installation → initialization → first feature

## Architecture Considerations

When implementing this website:

- Consider using React Router v7 (matches SpecSwarm's recommended tech stack)
- Keep bundle sizes minimal for fast loading
- Design should be modern and developer-focused
- Include code examples and CLI command snippets
- Mobile-responsive for developers on different devices

## Content Sources

All educational content should be derived from:
- SpecSwarm README.md
- Workflow documentation
- Real-world validation results from CHANGELOG.md
- Command documentation from plugin READMEs
