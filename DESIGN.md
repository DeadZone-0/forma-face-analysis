---
name: Forma
description: A browser-local facial geometry workspace with a portrait-led report.
colors:
  bg: "#101615"
  panel: "#17201e"
  panel2: "#1c2724"
  line: "#303e38"
  text: "#edf2eb"
  muted: "#a5b7ae"
  accent: "#bcdfb6"
  teal: "#77d7b7"
  primary-ink: "#172318"
  primary-hover: "#d3eccf"
  stage: "#111a17"
  chip-selected: "#2d3d32"
  chip-border: "#485b45"
  metric-selected: "#25372f"
  error: "#f2b4a7"
  landmark-line: "#77edc0"
  landmark-point: "#bfffd7"
typography:
  headline:
    fontFamily: "Manrope, sans-serif"
    fontSize: "clamp(26px, 3vw, 38px)"
    fontWeight: 500
    lineHeight: 1.3
    letterSpacing: "-1.2px"
  title:
    fontFamily: "Manrope, sans-serif"
    fontSize: "18px"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "-0.3px"
  body:
    fontFamily: "DM Sans, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "DM Sans, sans-serif"
    fontSize: "11px"
    fontWeight: 400
    lineHeight: 1.6
  button:
    fontFamily: "DM Sans, sans-serif"
    fontSize: "12px"
    fontWeight: 600
    lineHeight: 1.6
rounded:
  workspace: "12px"
  control: "6px"
  stage: "5px"
  chip: "4px"
spacing:
  tight: "6px"
  row: "12px"
  panel-compact: "16px"
  panel: "24px"
  report-inline: "28px"
  gutter: "38px"
components:
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.primary-ink}"
    typography: "{typography.button}"
    rounded: "{rounded.control}"
    padding: "11px 17px"
  button-primary-hover:
    backgroundColor: "{colors.primary-hover}"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.text}"
    typography: "{typography.button}"
    rounded: "{rounded.control}"
    padding: "11px 17px"
  button-text:
    backgroundColor: "transparent"
    textColor: "{colors.accent}"
    padding: "6px 0"
  chip:
    backgroundColor: "transparent"
    textColor: "{colors.muted}"
    rounded: "{rounded.chip}"
    padding: "5px 9px"
  chip-selected:
    backgroundColor: "{colors.chip-selected}"
    textColor: "{colors.accent}"
    rounded: "{rounded.chip}"
    padding: "5px 9px"
  workspace:
    backgroundColor: "{colors.panel}"
    rounded: "{rounded.workspace}"
  metric-selected:
    backgroundColor: "{colors.metric-selected}"
    rounded: "{rounded.chip}"
    padding: "12px 10px"
---

# Design System: Forma

## Overview

**Creative North Star: "The Geometry Workbench"**

Forma is an operating tool for inspecting a portrait and the measurements derived from it. Deep green surfaces recede behind the photograph; pale green actions and teal landmark geometry guide attention. The interface stays precise and restrained through compact labels, clear dividers, and quietly differentiated states.

This document records the implemented workspace, rather than an approved visual comp. The north star names the observed direction; it is not a separately approved brand identity.

**Key Characteristics:**

- Portrait-led analysis with a companion report.
- Dark green tonal surfaces and pale green actions.
- Border-separated measurements linked to visible geometry.
- Compact sans-serif typography with explicit focus and selected states.

## Colors

The palette uses green-tinted neutrals with a pale botanical action accent and brighter teal analysis marks. The frontmatter contains the normative values; names below describe their roles.

### Primary

- **Pale Leaf** (`accent`): upload action, selected tabs, values, and text actions. `primary-ink` supplies the dark label on filled actions; `primary-hover` lightens the fill on hover.
- **Instrument Teal** (`teal`): focus outlines, successful status, drag feedback, and processing indicators. The canvas deliberately uses brighter `landmark-line` and `landmark-point` values to remain legible over photography.

### Neutral

- **Forest Ground** (`bg`): page background.
- **Forest Panel** (`panel`) and **Raised Forest** (`panel2`): workspace and hover surfaces.
- **Quiet Divider** (`line`): workspace edges, row separators, and navigation structure.
- **Soft Chalk** (`text`) and **Sage Gray** (`muted`): primary and supporting text.
- **Portrait Ground** (`stage`): image-stage backdrop.
- **Selected Moss** (`chip-selected`, `chip-border`, `metric-selected`): low-contrast selected surfaces with a readable accent label.
- **Soft Coral** (`error`): upload and analysis error messages.

**The Geometry Rule.** Reserve the brightest green lines and points for geometry drawn over the photograph; keep interface surfaces quiet.

## Typography

**Heading Font:** Manrope, with sans-serif fallback.
**Body Font:** DM Sans, with sans-serif fallback.
**Image Metadata Font:** monospace.

Manrope provides measured headings with slightly tightened tracking. DM Sans keeps dense controls and explanatory text legible. The implementation imports both families from Google Fonts; local fallbacks remain usable if font loading fails.

### Hierarchy

- **Headline:** the responsive page title; mobile explicitly uses 27px and slightly looser tracking.
- **Title:** report heading; supporting section headings use the same family with context-specific sizing.
- **Body:** the default 14px text; report details and controls commonly step down to 12px.
- **Label:** 11px secondary labels, statuses, metadata, badges, and explanations.
- **Numeric results:** tabular figures prevent measurements from shifting. The optional score uses a 46px, regular-weight Manrope numeral.

## Layout

The header has a maximum width of 1512px and a 90px height. Main content has a maximum width of 1378px with 38px inline padding. The workspace uses two near-equal grid columns, with the right pane slightly wider (`1fr / 1.03fr`). A single shared frame contains both panes; a vertical divider separates them. Viewer padding is 20px 24px 16px; report padding is 24px 28px.

The image stage is 450px tall, increasing to 500px at 1500px and above. At 1000px and below, gutters and pane padding tighten, the stage becomes 410px tall, and the report heading stacks. At 720px and below, the portrait pane precedes the report in one column, the divider becomes horizontal, main gutters are 16px, the header is 72px tall, and the stage is 430px tall. Overlay controls wrap; their label takes a full row. Methodology also collapses to one column.

Use compact internal spacing and larger separation between workspace, methodology, and footer. Measurement rows use dividers and 12px vertical padding; they are not standalone cards.

## Elevation & Depth

The workspace has no box shadows. Depth comes from the dark page, slightly lighter panel, selected fills, and thin borders. Only metadata over the image uses a text shadow for legibility. The busy layer uses a translucent dark fill over the photograph.

**The Shared Frame Rule.** Keep the analysis panes inside one continuous bordered surface and separate report rows with lines.

## Shapes

The workspace uses gently curved corners; controls are more compact, and chips and selected rows are tighter still. The portrait stage clips its contents. Borders are thin and subdued. Status dots and the spinner are circular; they signal state rather than introduce a competing container shape.

## Components

### Buttons

The primary upload action uses Pale Leaf with dark text; secondary export uses a transparent surface and a divider-colored border. Both use the control radius and compact padding from the frontmatter. Secondary hover uses Raised Forest. Text actions have no fill or border and gain an underline on hover. Disabled buttons use 40% opacity and a not-allowed cursor.

Interactive buttons, links, and disclosure summaries use a 2px Instrument Teal focus outline with a 5px offset. Button background transitions last 180ms. Reduced-motion preference removes transitions.

### Chips

Overlay modes are compact toggles. Default text is muted; hover brightens it over Raised Forest. Selection uses Selected Moss, a thin moss border, and Pale Leaf text. Keep `aria-pressed` synchronized with the selected style.

### Cards / Containers

The workspace is the main container. Keep its border, tonal fill, and clipped corners. Report subsections are delineated by rules; selected measurement rows get a shallow fill with 10px horizontal inset expansion.

### Navigation

Header links use muted 13px text, with the active link in Soft Chalk. Report tabs use 12px labels and a 2px bottom border in Pale Leaf for the selected tab. Arrow keys, Home, and End move through the tabs. At narrow widths, header gaps shrink and the privacy badge is hidden.

### Portrait and Measurement Link

The canvas preserves the image proportions within the stage. Geometry can switch between proportions, mesh, landmarks, and original image. Selecting a measurement highlights its relevant landmark segments and the corresponding report row. Mesh uses thinner strokes at reduced opacity; points and segment endpoints remain brighter.

### Status and Processing

Status text appears beneath upload guidance; errors switch to Soft Coral. A busy overlay blocks repeated analysis actions and shows a 28px spinner with a one-second linear rotation. Under reduced motion the spinner stops. Sample labels remain explicit in both photo and report states.

## Do's and Don'ts

### Do:

- **Do** preserve the portrait-to-measurement relationship and visible selected states.
- **Do** use the shared frame, tonal fills, and dividers for structure.
- **Do** keep keyboard focus conspicuous and respect reduced motion.
- **Do** stack the portrait before the report on small screens.

### Don't:

- **Don't** turn each measurement into a nested card.
- **Don't** apply canvas-bright landmark colors to large interface surfaces.
- **Don't** shrink supporting text below the implemented 11px label size.
- **Don't** hide the distinction between sample and uploaded-photo results.
