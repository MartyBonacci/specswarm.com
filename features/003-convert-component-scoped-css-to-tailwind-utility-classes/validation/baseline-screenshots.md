# Baseline Visual Documentation

**Purpose**: Document pre-conversion visual state for pixel-perfect validation after Tailwind conversion

**Created**: 2025-11-11
**Feature**: 003 - Convert Component-Scoped CSS to Tailwind Utility Classes

---

## Screenshot Capture Methodology

### Viewports to Test

We will capture screenshots at three standard breakpoints that match our responsive design:

1. **Mobile**: 375px width (iPhone SE, standard mobile reference)
2. **Tablet**: 768px width (iPad, breakpoint where layout changes)
3. **Desktop**: 1440px width (Standard laptop/desktop display)

### Pages to Capture

All 5 pages of the website will be captured at each viewport:

1. Homepage (`/`)
2. Features page (`/features`)
3. Docs page (`/docs`)
4. Get Started page (`/get-started`)
5. Use Cases page (`/use-cases`)

**Total baseline screenshots**: 5 pages × 3 viewports = **15 screenshots**

### Interactive States to Capture

For validation of hover, focus, and active states:

**Navigation Elements**:
- Desktop navigation links (hover state)
- Mobile hamburger menu (closed and open states)
- Logo/brand animation (cycling through commands)

**Buttons**:
- Primary button variants (default, hover, focus, active)
- Secondary button variants
- Ghost button variants

**Cards**:
- Feature cards (default and hover states)
- Scenario cards (default and hover states)

**Focus States** (keyboard navigation):
- All interactive elements with visible focus rings
- Tab order verification

### Animation Sequences to Record

Three key animations must be documented:

1. **Hamburger Menu Animation**:
   - Closed → Open transition
   - Three-line icon rotation and translation
   - Menu overlay fade-in

2. **Hero Word Animation** (AnimatedHero component):
   - Sequential word fade-in and slide-up effect
   - Timing: 75ms delay per word
   - Motion-reduce fallback (instant appearance)

3. **Brand Command Cycling** (AnimatedBrand component):
   - Text animation: `/specswarm` → `:init` → `:build` → `:fix` → `:ship`
   - Typing and deleting animations
   - Cursor blink animation
   - Pause on hover

---

## Screenshot Checklist

### Homepage (/)

#### Desktop (1440px)
- [ ] Full page capture (above fold)
- [ ] Hero section with animated text
- [ ] Feature showcase grid
- [ ] CTA section
- [ ] Footer

#### Tablet (768px)
- [ ] Full page capture
- [ ] Responsive grid layout (2 columns)
- [ ] Navigation (mobile hamburger visible)

#### Mobile (375px)
- [ ] Full page capture
- [ ] Single column layout
- [ ] Mobile navigation
- [ ] Touch-optimized spacing

### Features Page (/features)

#### Desktop (1440px)
- [ ] Full page capture
- [ ] Feature cards grid (3 columns)
- [ ] Hover state on one card

#### Tablet (768px)
- [ ] Full page capture
- [ ] Feature cards grid (2 columns)

#### Mobile (375px)
- [ ] Full page capture
- [ ] Feature cards (1 column, stacked)

### Docs Page (/docs)

#### Desktop (1440px)
- [ ] Full page capture
- [ ] Code blocks with syntax highlighting
- [ ] Custom scrollbar in code blocks
- [ ] Copy button hover state

#### Tablet (768px)
- [ ] Full page capture
- [ ] Code block responsive behavior

#### Mobile (375px)
- [ ] Full page capture
- [ ] Code block horizontal scroll

### Get Started Page (/get-started)

#### Desktop (1440px)
- [ ] Full page capture
- [ ] Installation steps
- [ ] Command examples

#### Tablet (768px)
- [ ] Full page capture
- [ ] Responsive content layout

#### Mobile (375px)
- [ ] Full page capture
- [ ] Mobile-optimized command blocks

### Use Cases Page (/use-cases)

#### Desktop (1440px)
- [ ] Full page capture
- [ ] Scenario cards grid
- [ ] Hover state on one scenario card

#### Tablet (768px)
- [ ] Full page capture
- [ ] Responsive scenario grid

#### Mobile (375px)
- [ ] Full page capture
- [ ] Stacked scenario cards

---

## Interactive State Checklist

### Navigation
- [ ] Desktop nav links (default state)
- [ ] Desktop nav links (hover state with underline)
- [ ] Desktop nav links (focus state with ring)
- [ ] Mobile hamburger button (closed)
- [ ] Mobile hamburger button (open)
- [ ] Mobile menu overlay (visible state)
- [ ] Brand animation cycling (capture 3 frames: :init, :build, :ship)

### Buttons
- [ ] Primary button (default)
- [ ] Primary button (hover - darker background)
- [ ] Primary button (focus - visible ring)
- [ ] Primary button (active - pressed state)
- [ ] Secondary button (all states)
- [ ] Ghost button (all states)

### Cards
- [ ] Feature card (default - no elevation)
- [ ] Feature card (hover - elevated with shadow)
- [ ] Scenario card (default)
- [ ] Scenario card (hover - elevated)

### Focus States (Accessibility)
- [ ] Button focus ring (visible, proper contrast)
- [ ] Link focus ring
- [ ] Input focus ring (if any forms)
- [ ] Tab order flows logically

---

## Animation Recording Methodology

### Hamburger Menu Animation

**How to capture**:
1. Start with menu closed
2. Click hamburger button
3. Record 3 frames:
   - Frame 1: Closed (before click)
   - Frame 2: Mid-transition (50% through animation)
   - Frame 3: Open (animation complete)

**Expected behavior**:
- Top line rotates 45° and translates down
- Middle line fades to opacity 0
- Bottom line rotates -45° and translates up
- Duration: ~300ms with cubic-bezier easing

### Hero Word Animation

**How to capture**:
1. Refresh page to trigger animation
2. Record frames at intervals:
   - Frame 1: First word visible (0ms)
   - Frame 2: 3 words visible (150ms)
   - Frame 3: All words visible (complete)

**Expected behavior**:
- Each word fades in from 0 → 1 opacity
- Each word slides up from translateY(24px) → translateY(0)
- 75ms delay between each word
- With `motion-reduce`: All words appear instantly

### Brand Command Cycling

**How to capture**:
1. Wait for first command to type out (`:init`)
2. Record cycling sequence:
   - Frame 1: `/specswarm:init` (fully typed)
   - Frame 2: `/specswarm:` (deleted back to base)
   - Frame 3: `/specswarm:build` (next command typed)

**Expected behavior**:
- Types at 60ms per character
- Deletes at 40ms per character
- Pauses 2000ms after typing complete
- Pauses 500ms after deleting complete
- Cursor blinks at 1s intervals

---

## Visual Comparison Methodology

After conversion, for each screenshot:

1. **Capture post-conversion screenshot** at same viewport
2. **Compare side-by-side** using browser DevTools or image editor
3. **Check for pixel differences**:
   - Colors match exactly (hex values)
   - Spacing matches (measure padding/margins)
   - Font sizes match
   - Shadows and borders match
   - Hover effects identical

4. **Tolerance**:
   - **Zero tolerance** for visible differences
   - Sub-pixel rendering differences acceptable (<1px antialiasing variance)
   - Browser-specific font rendering differences acceptable

5. **Document any differences**:
   - Screenshot location
   - Description of difference
   - Cause of difference
   - Whether acceptable or requires fix

---

## Tools and Process

### Screenshot Capture

**Browser**: Chrome/Chromium (for consistency)
**DevTools**: Device emulation for exact viewport sizes
**Extensions**: Full Page Screenshot or built-in DevTools screenshot

**Process**:
1. Open DevTools (F12)
2. Toggle device toolbar (Ctrl+Shift+M)
3. Set exact dimensions (375px, 768px, or 1440px width)
4. Navigate to page
5. Wait for all animations to complete
6. Capture screenshot (Ctrl+Shift+P → "Screenshot")
7. Save to `validation/baseline/` with naming convention:
   - `{page}-{viewport}.png` (e.g., `homepage-desktop.png`)
   - `{component}-{state}-{viewport}.png` (e.g., `button-hover-desktop.png`)

### Animation Recording

**Tools**: Browser DevTools → Performance tab or screen recording

**Process**:
1. Start recording
2. Trigger animation
3. Stop recording after animation completes
4. Export keyframes or video
5. Document timing and behavior

---

## Success Criteria

Visual validation passes when:

- ✅ All 15 baseline screenshots captured at correct viewports
- ✅ All interactive state variants documented
- ✅ All 3 animation sequences recorded with expected behavior
- ✅ Post-conversion screenshots match baseline pixel-perfectly
- ✅ No visual regressions detected
- ✅ All animations function identically
- ✅ Focus states remain visible and accessible

---

## Notes

- Screenshots should be captured with dev server running (`npm run dev`)
- Capture after page fully loads (no loading spinners)
- Disable browser extensions that modify page appearance
- Use consistent browser and OS for before/after comparison
- Document system/browser version for reproducibility
