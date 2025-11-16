# Tasks: Create Favicon from SVG Images

<!-- Tech Stack Validation: PASSED -->
<!-- Validated against: /memory/tech-stack.md v1.0.0 -->
<!-- No prohibited technologies found -->
<!-- Sharp v0.33.0 auto-added as approved dev dependency -->

**Feature**: 004 - Create Favicon from SVG Images
**Status**: Ready for Implementation
**Total Tasks**: 8
**Estimated Time**: 1-2 hours

---

## Overview

This feature adds favicon support to the SpecSwarm marketing website by generating PNG favicons in multiple sizes (16x16, 32x32, 180x180) from existing SVG assets. Tasks are organized sequentially as there are no independent user stories - this is a single integrated feature.

---

## Task Organization

**Execution Strategy**: Sequential implementation
- All tasks build on each other
- No parallel opportunities (single developer, single feature scope)
- Manual review required at T004 (design selection)

**Tech Stack**:
- Sharp v0.33.0 (dev dependency - image processing)
- TypeScript (generation script)
- Astro/React (HTML configuration)

---

## Phase 1: Setup & Dependencies

### T001: Install Sharp Image Processing Library

**Story**: Infrastructure setup
**Type**: Dependency Installation
**Parallel**: No (prerequisite for all other tasks)

**Description**:
Install the Sharp library as a dev dependency for SVG to PNG conversion.

**Actions**:
1. Run: `npm install -D sharp@^0.33.0`
2. Verify installation in package.json devDependencies
3. Test Sharp import: `node -e "console.log(require('sharp'))"`

**Files**:
- `package.json` - devDependencies section updated
- `package-lock.json` - dependency tree updated

**Success Criteria**:
- [ ] Sharp v0.33.x appears in package.json devDependencies
- [ ] `npm install` completes without errors
- [ ] Sharp can be imported in Node.js

**Dependencies**: None

**Estimated Time**: 5 minutes

---

## Phase 2: Favicon Generation Script

### T002: Create Favicon Generation Script

**Story**: Build tooling
**Type**: Script Development
**Parallel**: No (depends on T001)

**Description**:
Create a TypeScript script that converts SVG files to PNG favicons at three required sizes (16x16, 32x32, 180x180 pixels).

**Actions**:
1. Create directory: `mkdir -p scripts`
2. Create file: `scripts/generate-favicons.ts`
3. Implement the following:
   ```typescript
   import sharp from 'sharp';
   import * as fs from 'fs';
   import * as path from 'path';

   interface FaviconConfig {
     svgPath: string;
     outputDir: string;
     prefix: string;
   }

   const sizes = [
     { size: 16, filename: 'favicon-16x16.png' },
     { size: 32, filename: 'favicon-32x32.png' },
     { size: 180, filename: 'apple-touch-icon.png' }
   ];

   async function generateFavicons(config: FaviconConfig): Promise<void> {
     // Create output directory
     fs.mkdirSync(config.outputDir, { recursive: true });

     for (const { size, filename } of sizes) {
       const outputPath = path.join(config.outputDir, filename);

       await sharp(config.svgPath)
         .resize(size, size, {
           fit: 'contain',
           background: { r: 0, g: 0, b: 0, alpha: 0 } // Transparent
         })
         .png({
           quality: 80,
           compressionLevel: 9,
           adaptiveFiltering: true
         })
         .toFile(outputPath);

       const stats = fs.statSync(outputPath);
       const sizeKB = (stats.size / 1024).toFixed(2);
       console.log(`✓ Generated ${filename} (${sizeKB}KB)`);
     }
   }

   // Main execution
   const args = process.argv.slice(2);
   if (args.length < 2) {
     console.error('Usage: ts-node generate-favicons.ts <svg-path> <output-dir> [prefix]');
     process.exit(1);
   }

   const config: FaviconConfig = {
     svgPath: args[0],
     outputDir: args[1],
     prefix: args[2] || ''
   };

   generateFavicons(config)
     .then(() => console.log('✅ Favicon generation complete'))
     .catch(err => {
       console.error('❌ Error:', err);
       process.exit(1);
     });
   ```
4. Add script to package.json:
   ```json
   "scripts": {
     "generate-favicons": "ts-node scripts/generate-favicons.ts"
   }
   ```

**Files**:
- `scripts/generate-favicons.ts` (NEW)
- `package.json` (modified - add script)

**Success Criteria**:
- [ ] Script file created with proper TypeScript syntax
- [ ] Script accepts command-line arguments (SVG path, output dir, optional prefix)
- [ ] Script generates 3 PNG files at correct sizes
- [ ] Script logs file sizes after generation
- [ ] Script handles errors gracefully
- [ ] npm script added for easy execution

**Dependencies**: T001 (Sharp must be installed)

**Estimated Time**: 30 minutes

---

## Phase 3: Generate Design Variants

### T003: Generate Favicon Variants for Both Designs

**Story**: Asset creation
**Type**: Build Execution
**Parallel**: No (depends on T002)

**Description**:
Run the generation script for both source SVG designs to create variant options for review.

**Actions**:
1. Create variant directories:
   ```bash
   mkdir -p public/favicon-variants/orchestration
   mkdir -p public/favicon-variants/tracks
   ```

2. Generate orchestration design variant:
   ```bash
   npx ts-node scripts/generate-favicons.ts \
     public/orchestration.svg \
     public/favicon-variants/orchestration \
     orchestration
   ```

3. Generate tracks design variant:
   ```bash
   npx ts-node scripts/generate-favicons.ts \
     public/black-on-orange-tracks.svg \
     public/favicon-variants/tracks \
     tracks
   ```

4. Verify output:
   - Check that 6 total PNG files were created (3 per design)
   - Verify all files are <10KB (target <5KB but allow margin)
   - Use `ls -lh public/favicon-variants/*/` to see file sizes

**Files**:
- `public/favicon-variants/orchestration/favicon-16x16.png` (NEW)
- `public/favicon-variants/orchestration/favicon-32x32.png` (NEW)
- `public/favicon-variants/orchestration/apple-touch-icon.png` (NEW)
- `public/favicon-variants/tracks/favicon-16x16.png` (NEW)
- `public/favicon-variants/tracks/favicon-32x32.png` (NEW)
- `public/favicon-variants/tracks/apple-touch-icon.png` (NEW)

**Success Criteria**:
- [ ] Both variant directories created
- [ ] 6 PNG files generated (3 per design)
- [ ] All files have correct dimensions (verify with `file` command)
- [ ] All files are <10KB in size
- [ ] No errors during generation
- [ ] Transparency preserved (open in image viewer to verify)

**Dependencies**: T002 (script must exist)

**Estimated Time**: 10 minutes

---

## Phase 4: Design Selection

### T004: Review and Select Preferred Favicon Design

**Story**: Design decision
**Type**: Manual Review
**Parallel**: No (depends on T003)

**Description**:
Compare both favicon designs at actual sizes to determine which is more legible and recognizable, then select the preferred variant for production.

**Actions**:
1. Open both 16x16 variants side-by-side in image viewer
2. Compare at 100% zoom (actual size):
   - Legibility at tiny size
   - Visual clarity of design elements
   - Color contrast
   - Recognition without context

3. Test in actual browser context:
   - Temporarily copy one variant to public root
   - View in browser tab
   - Check against white, gray, and dark backgrounds
   - Repeat for second variant

4. Make selection based on:
   - Clearest at 16x16 size (most important)
   - Best represents SpecSwarm brand
   - Works well in both light and dark browser themes

5. Document selection:
   - Note chosen design in feature directory
   - Record rationale for choice

**Files**:
None (review only)

**Success Criteria**:
- [ ] Both designs reviewed at actual 16x16 size
- [ ] Both designs tested in browser tab
- [ ] Clear winner selected
- [ ] Selection documented with brief rationale
- [ ] Team member (if applicable) consulted on choice

**Dependencies**: T003 (both variants must be generated)

**Estimated Time**: 15 minutes

**Notes**:
- This is a MANUAL task requiring human judgment
- If designs are equally good, default to orchestration design (matches conductor theme on homepage)
- Consider creating a simple HTML test page for easier comparison

---

## Phase 5: Production Deployment

### T005: Copy Selected Favicon Files to Public Directory

**Story**: Asset deployment
**Type**: File Operations
**Parallel**: No (depends on T004)

**Description**:
Copy the selected design's favicon files from the variants directory to the public root directory for production use.

**Actions**:
1. Determine selected variant directory (e.g., `public/favicon-variants/orchestration`)

2. Copy files to public root:
   ```bash
   # Replace 'orchestration' with selected variant name
   cp public/favicon-variants/orchestration/favicon-16x16.png public/
   cp public/favicon-variants/orchestration/favicon-32x32.png public/
   cp public/favicon-variants/orchestration/apple-touch-icon.png public/
   ```

3. Verify files exist:
   ```bash
   ls -lh public/favicon-*.png public/apple-touch-icon.png
   ```

4. (Optional) Clean up variant directories:
   ```bash
   # Keep for documentation, or remove to declutter
   # rm -rf public/favicon-variants
   ```

**Files**:
- `public/favicon-16x16.png` (NEW)
- `public/favicon-32x32.png` (NEW)
- `public/apple-touch-icon.png` (NEW)

**Success Criteria**:
- [ ] Three PNG files in public root directory
- [ ] Files are from selected variant
- [ ] File sizes match expected values (<5KB for 16x16 and 32x32, <10KB for 180x180)
- [ ] Files have correct names for HTML link tags

**Dependencies**: T004 (design must be selected)

**Estimated Time**: 2 minutes

---

## Phase 6: HTML Integration

### T006: Add Favicon Link Tags to BaseLayout

**Story**: HTML configuration
**Type**: Template Modification
**Parallel**: No (depends on T005)

**Description**:
Add proper favicon HTML link tags to the site's base layout template so all pages reference the favicon files.

**Actions**:
1. Open: `src/layouts/BaseLayout.astro`

2. Locate the `<head>` section

3. Add favicon link tags (place after meta tags, before any style links):
   ```html
   <!-- Favicons -->
   <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
   <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
   <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
   ```

4. Add a comment explaining the favicon setup

5. Save file

**Files**:
- `src/layouts/BaseLayout.astro` (modified - add favicon links)

**Success Criteria**:
- [ ] Three link tags added to <head> section
- [ ] Tags placed in logical location (after meta, before styles)
- [ ] rel, type, sizes, and href attributes correct
- [ ] Paths are absolute (start with /)
- [ ] Comment added for clarity
- [ ] No syntax errors in Astro file

**Dependencies**: T005 (favicon files must exist in public directory)

**Estimated Time**: 5 minutes

**Example Location in BaseLayout.astro**:
```astro
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>{title}</title>
  <meta name="description" content={description} />

  <!-- Favicons -->
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
  <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
  <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">

  <!-- Styles -->
  ...
</head>
```

---

## Phase 7: Testing & Validation

### T007: Test Favicon Display Across Browsers

**Story**: Quality assurance
**Type**: Manual Testing
**Parallel**: No (depends on T006)

**Description**:
Verify that favicons display correctly in all major browsers and mobile platforms.

**Actions**:
1. **Desktop Browser Testing**:
   - Chrome: Open site, check tab icon
   - Firefox: Open site, check tab icon
   - Safari: Open site, check tab icon
   - Edge: Open site, check tab icon
   - Bookmark site in each browser, verify bookmark icon

2. **Mobile Testing** (if available):
   - iOS Safari: "Add to Home Screen", check icon on home screen
   - Android Chrome: Check tab icon, add to home screen if possible

3. **Visual Checks**:
   - Icon is clear and recognizable at tiny size
   - No white boxes or background artifacts
   - Colors match source SVG
   - Transparency renders correctly

4. **Developer Tools Validation**:
   - Open DevTools → Network tab
   - Verify all 3 favicon files load successfully (200 status)
   - Check file sizes in Network tab (should match <5KB target)

5. **HTML Validation**:
   - Run site through W3C HTML validator
   - Verify no errors related to favicon link tags

**Files**:
None (testing only)

**Success Criteria**:
- [ ] Favicon displays in Chrome tab
- [ ] Favicon displays in Firefox tab
- [ ] Favicon displays in Safari tab
- [ ] Favicon displays in Edge tab
- [ ] Bookmark icons display correctly
- [ ] iOS home screen icon is sharp (if tested)
- [ ] No white boxes or transparency issues
- [ ] All favicon files load with 200 status
- [ ] File sizes under target (16x16 and 32x32 <5KB)
- [ ] HTML validation passes

**Dependencies**: T006 (HTML must reference favicons)

**Estimated Time**: 20 minutes

**Notes**:
- Mobile testing optional but recommended
- If iOS testing not available, skip home screen test
- Document any browser-specific rendering issues

---

### T008: Verify File Sizes and Optimize if Needed

**Story**: Performance validation
**Type**: Optimization
**Parallel**: No (depends on T007)

**Description**:
Check final favicon file sizes against success criteria (<5KB for most, <10KB for Apple touch icon) and optimize if necessary.

**Actions**:
1. Check current file sizes:
   ```bash
   ls -lh public/favicon-*.png public/apple-touch-icon.png
   # Or: du -h public/favicon-*.png public/apple-touch-icon.png
   ```

2. Compare against targets:
   - favicon-16x16.png: Target <5KB
   - favicon-32x32.png: Target <5KB
   - apple-touch-icon.png: Target <10KB (allows some margin for 180x180)

3. **If any file exceeds target**:
   - Re-run generation script with higher compression:
     ```typescript
     // In generate-favicons.ts, modify:
     .png({
       quality: 70,  // Reduce from 80
       compressionLevel: 9,
       palette: true  // Add palette quantization
     })
     ```
   - Regenerate only the oversized file(s)
   - Verify visual quality hasn't degraded

4. **If apple-touch-icon.png significantly exceeds 10KB**:
   - Consider simplifying source SVG (if owner approves)
   - Or accept slight overage (10-12KB acceptable for 180x180)

5. Document final sizes in commit message

**Files**:
- `public/favicon-16x16.png` (potentially re-optimized)
- `public/favicon-32x32.png` (potentially re-optimized)
- `public/apple-touch-icon.png` (potentially re-optimized)

**Success Criteria**:
- [ ] favicon-16x16.png is <5KB
- [ ] favicon-32x32.png is <5KB
- [ ] apple-touch-icon.png is <10KB (or <12KB with justification)
- [ ] Visual quality remains acceptable after any optimization
- [ ] All browsers still render favicons correctly

**Dependencies**: T007 (testing must be complete)

**Estimated Time**: 10 minutes

**Notes**:
- Most common issue: apple-touch-icon.png exceeding 10KB due to 180x180 size
- Slight overage (10-12KB) is acceptable for Apple touch icon
- Never sacrifice visual clarity for file size
- If unable to meet targets, document in commit message with rationale

---

## Dependency Graph

```
T001 (Install Sharp)
  ↓
T002 (Create Generation Script)
  ↓
T003 (Generate Both Variants)
  ↓
T004 (Review & Select Design) [MANUAL]
  ↓
T005 (Copy Selected Files to Public)
  ↓
T006 (Add HTML Link Tags)
  ↓
T007 (Browser Testing) [MANUAL]
  ↓
T008 (Verify File Sizes)
```

**Parallelization**: None - all tasks are sequential

**Manual Checkpoints**:
- After T004: Design selection (human judgment required)
- After T007: Browser testing (visual verification required)

---

## Implementation Notes

### MVP Scope
All 8 tasks constitute the MVP - this is a cohesive feature with no optional components.

### Sequential Execution
Execute tasks in order T001→T008. No parallel opportunities due to:
- Single developer workflow
- Dependencies between tasks
- Manual review checkpoints

### Manual Tasks
**T004 (Design Selection)** and **T007 (Browser Testing)** require human judgment and cannot be automated.

### Tech Stack Compliance
- ✅ Sharp v0.33.0 auto-added to tech stack
- ✅ No prohibited technologies used
- ✅ TypeScript used for generation script (constitution requirement)

### Performance Impact
- Zero bundle size impact (Sharp is dev dependency)
- Total favicon bytes: ~13KB (well within budget)
- No Lighthouse score degradation expected

### Rollback Strategy
If issues arise, remove favicon link tags from BaseLayout.astro and delete PNG files from public directory.

---

## Success Metrics

**Feature Complete When**:
- [ ] All 8 tasks completed
- [ ] Favicons display in all major browsers
- [ ] All file sizes under target (<5KB for small, <10KB for large)
- [ ] HTML validation passes
- [ ] Visual quality meets brand standards

**Time Estimate**: 1-2 hours total (includes manual review and testing time)

**Quality Gates**:
- Constitution Principle 1 (Performance): File size targets met
- Constitution Principle 5 (DX): Clear script documentation, reproducible process

---

## Post-Implementation

### Cleanup
- (Optional) Remove `/public/favicon-variants` directory after selection made
- Keep generation script for future use if source SVGs change

### Documentation
- Document selected design in commit message
- Note any file size optimizations made

### Future Enhancements (Out of Scope)
- Dark mode favicon variant
- Animated favicons
- PWA manifest icons
- Automated generation in CI/CD

---

**Tasks Ready for Implementation** ✅
