# Brand Book Template — Claude Guide

This is the master template. Every new client brand book starts here.
Single-file brand book: `index.html` (~3,400 lines) + `brand.js` (single source of truth).

**The only file that needs editing per client is `brand.js`.**
Everything else, layout, CSS, mobile fixes, routing, lives in `index.html` and should not be touched unless fixing a structural bug.

---

## Writing style rules (apply everywhere in this codebase)

**No em dashes.** Never write `—` in any user-visible text (headings, body copy, labels, captions, spec tables, or nav labels). Use these alternatives instead:
- Introductory or explanatory clauses: use a colon (`:`)
- Parenthetical asides: use commas or parentheses
- Two separate thoughts: use a period and start a new sentence

**Sentence case always.** Headings, nav labels, section titles, sub-headings, and button text use sentence case only: capitalize the first word and proper nouns, nothing else. No title case.

---

## Two modes — read this first

**Template editing mode:** If the user says they want to improve the template, fix a bug, update the layout, or make structural changes — proceed directly. Do NOT ask the intake questions. Edit `index.html`, `brand.js`, `CLAUDE.md`, or `setup.js` as needed.

**New client setup mode:** If the user says they want to set up a new brand book for a client — ask the questions below, one group at a time. Wait for answers before moving to the next group. Do not touch any file until all answers are in.

---

## New client questionnaire

Colors, fonts, type specimens, and logos are all pulled from the client's Figma Brand Tokens file via the Figma MCP. Do not ask for them manually if a Figma link is provided.

### Group 1 — Figma file

Ask: "Do you have a Figma Brand Tokens file? If so, paste the link here and I'll extract colors, fonts, type specimens, and logos automatically."

**If a Figma link is provided, extract everything via the Figma MCP. This replaces Groups 2 and 3 entirely.**

The Brand Tokens file has five pages: Colors, Typography, Color Pairings, Logos, How to Use. To get all page IDs, call `get_metadata` with the file key and no nodeId — if it only returns one page, call it again with nodeId `0:2` (the error response will list all pages). Then extract from each page:

---

#### Figma extraction — Colors page

1. Call `get_metadata` with the Colors page id
2. Find all `<frame>` nodes that have at least 1 `<text>` child and a solid fill — these are the color swatches
3. Separate primary vs secondary by each frame's Y position relative to the `<text>` node named "SECONDARY PALETTE" — frames above it are primary, at or below are secondary
4. Extract the hex value from the frame's solid fill color (convert RGB 0–1 to hex). Do not read hex from a text label.
5. The color name is the first `<text>` child
6. Derive the CSS custom property name from the color name: lowercase and replace spaces with hyphens (e.g. "Pale Blue" → "pale-blue"). If a second text child exists and is non-empty, use it instead.
7. Compute textColor: `#FFFFFF` if hex luminance < 0.18, `#000000` if ≥ 0.18

#### Figma extraction — Typography page

1. Call `get_metadata` with the Typography page id
2. Find `<frame>` nodes whose name starts with `_section_`:
   - `_section_DISPLAY …` → parse font name after the dash → `displayFont`
   - `_section_BODY …` → parse font name after the dash → `bodyFont`
3. For each size frame (name = "96px", "73px", "64px", etc.):
   - The frame name gives the pixel size
   - The second `<text>` child is the specimen copy
   - Map to `specimens` keys: `display96`, `display73`, `display64`, `display48`, `headline42`, `headline32`, `headline24`, `headline21`, `body18`, `body16`, `body14`, `body12`
4. Ask the user whether each font is a local file or Google Font, and for local fonts, the filenames
5. Set `googleFallbackFont` and `googleFallbackUrl`: if the display font is already on Google Fonts, use it directly. Otherwise pick the closest Google Fonts match by classification (geometric sans → Inter or DM Sans; humanist sans → Open Sans or Lato; display serif → Playfair Display or Merriweather).
6. Set `systemFallbackFont`: pick the closest pre-installed system font — sans-serif custom fonts → Arial or Helvetica; humanist → Trebuchet MS; serif → Georgia or Times New Roman.

#### Figma extraction — Logos page

1. Call `get_metadata` with the Logos page id
2. Skip any `<frame>` whose name starts with `_` (those are instructions)
3. Each remaining frame name is the exact SVG filename (without `.svg`)
4. Export each frame as SVG using the Figma MCP export tools and save to `public/images/logos/`
5. Infer the config assignments from the filename:
   - Contains `full-dark` → `sidebarLogoImage`
   - Contains `mark` and not `white` and not `light` → `coverSealImage`
   - If ambiguous, show the list and ask the user to confirm

#### Figma extraction — Color Pairings page

1. Call `get_metadata` with the Color Pairings page id
2. Each top-level `<frame>` represents one approved pairing. The frame `name` is `"Background / Text"` (e.g. `"Primary Blue / Dark Blue"`)
3. Inside each frame there is a nested `<frame>` whose `name` is the logo filename to use on that background (without `.svg`)
4. Parse each pairing as:
   - `bg`: first segment before ` / ` — match to a color token name
   - `text`: second segment after ` / ` — match to a color token name
   - `logo`: the nested frame name + `.svg` (file lives in `public/images/logos/`)
5. Add each pairing to `brand.config.ts` as `colorPairings: [{ bg: 'Color Name', logo: 'filename.svg' }, ...]` — `bg` must match a `ColorToken.name` exactly, `logo` is the filename in `public/images/logos/`. `ColorCombinations.tsx` reads this array automatically — no further edits needed.

---

#### Figma extraction — Photography page

The Photography page contains a `<section>` with `<rounded-rectangle>` nodes directly inside it. Each node is one photo. There is also a `<text>` node on the canvas outside the section — ignore it.

1. Call `get_metadata` with the Photography page id
2. Find the `<section>` and collect all `<rounded-rectangle>` children
3. For each node, call `download_assets` on its node id — use the **raw source images** from the response (original fills), not the rendered export
4. Sanitize the node name for use as a filename: strip trailing ` 1`, ` 2` etc., replace spaces with hyphens, lowercase (e.g. `hero-outdoor 1` → `hero-outdoor`)
5. Save each image to `public/images/photography/` with the sanitized name + original extension
6. After all images are saved, run `npm run convert-images` — converts to WebP at max 1600px and deletes originals
7. Add the resulting `.webp` filenames to `brand.images.photography` in `brand.config.ts`

#### Figma extraction — Application page

The Application page (note: singular) has the same structure: a `<section>` with `<rounded-rectangle>` nodes directly inside it.

1. Call `get_metadata` with the Application page id
2. Find the `<section>` and collect all `<rounded-rectangle>` children
3. For each node, call `download_assets` with `defaultFormat: "png"` — use the **exported render** (the composed mockup)
4. Sanitize the node name the same way as Photography
5. Save to `public/images/applications/`
6. Run `npm run convert-images` — converts to WebP at max 1600px
7. Add the resulting `.webp` filenames to `brand.images.applications` in `brand.config.ts`

---

**Figma page structure for designers:**
- Photography and Application pages each have one `<section>` containing the images directly as `<rounded-rectangle>` nodes — no wrapping frame needed
- Each node name becomes the filename (trailing ` 1`, ` 2` etc. are stripped automatically)
- Any `<text>` nodes on the canvas outside the section are ignored

---

After extracting, tell the user what was found (colors count, font names, logo filenames) and confirm before writing any files. Then skip Groups 2–3 and go straight to Group 4.

**If no Figma link is provided, ask Groups 2 and 3 manually.**

### Group 2 — Client basics

1. What is the client's full company name?
2. What is the document title? (default: "Brand guidelines")
3. What version and date should appear on the cover? (e.g. "Version 1.0 / June 2026")
4. Who prepared this?

### Group 3 — Colors, fonts, logos, and type specimens (skip if extracted from Figma)

**Colors:** Primary and secondary brand colors — name + hex for each.
**Fonts:** Display/headline font and body font — local file or Google Font?
**Logos:** Filenames in `public/images/logos/` — which is dark full, light full, white full, standalone mark?
**Specimens:** Short phrase for display (company name), 2–4 word tagline, one-sentence description for body copy.

### Group 4 — Sections

Include all sections by default: Logo and mark, Color, Typography, Photography, Applications, Iconography, Data visualisation. Only omit a section if the user explicitly says to leave it out.

**After collecting all answers:** run `node setup.js --config '{...}'` with the answers as JSON. Then:
1. Rewrite section intro copy in `index.html` — search for `[Client Name]` and update every instance
2. Confirm font files are in `fonts/` (sync-figma pulls the path references, not the files themselves — font files must be copied in separately)
3. Update the `predeploy` script in `package.json` — replace `/Brand-Book-Template/` with `/<repo-name>/` so the GitHub Pages base path is correct
4. Delete the `.env` file from the repo root — it contains the Marker.io project ID for template bug reporting and must not be included in client repos. Marker loads only when `VITE_MARKER_PROJECT_ID` is set, so deleting `.env` disables it automatically.
5. Open `index.html` in a browser to verify

---

## Exporting a new section back to the template

If a new section is built in a client brand book and the user wants to port it back to the master template, generate an export package containing exactly these three things:

**1. The component file** — `src/sections/<name>/<ComponentName>.tsx`
- Replace every client-specific string (company name, copy, color tokens, logo paths) with a reference to `brand.config`
- If a new config field is needed, use a placeholder name like `brand.XXX` and document it in item 2
- The file must compile without errors against the template's `BrandConfig` type (after item 2 is applied)

**2. A config diff** — list every new field that needs to be added to `brand.config.ts`:
```
Field: images.iconography (string[])
Type: string[]
Default: []
Description: Filenames in public/images/iconography/
```

**3. A nav entry** — the exact object to append to the `nav` array in `brand.config.ts`:
```ts
{ label: 'Section name', id: 'section-id', page: 'SectionComponent' }
```

Present these three items clearly so the user can upload the component file and paste the diffs into the template session.

---

## File structure

```
brand-book-template/
├── index.html          # Full brand guide — layout, CSS, JS routing
├── brand.js            # ← EDIT THIS per client (tokens, colors, type, nav, copy)
├── setup.js            # Run to auto-fill brand.js from questionnaire answers
├── sync-figma.js       # Pull logos/tokens from a Figma file
├── fonts/              # Put font files here (.otf, .ttf, .woff2)
│   └── README.md
├── images/
│   ├── logos/          # Put logo SVGs here
│   │   ├── client-logo-full-dark.svg     ← replace with real logos
│   │   ├── client-logo-full-light.svg
│   │   ├── client-logo-full-white.svg
│   │   ├── client-logo-stacked-dark.svg
│   │   ├── client-logo-stacked-light.svg
│   │   ├── client-logo-mark.svg
│   │   └── client-logo-mark-light.svg
│   └── placeholder.svg
└── CLAUDE.md           # This file
```

---

## Logo color rules

| Background type | Which logo to use |
|---|---|
| Light (White, Gray, Pale Green) | `full-dark` — dark ink logo |
| Bright (Primary Blue, Orange, Green) | `full-light` — black wordmark + WHITE mark |
| Dark (Dark Blue, Black) | `full-white` — all white version |

The mobile header logo (`#mobile-logo`) swaps automatically in JS: `full-light` on the home/cover page (bright background), `sidebarLogoImage` (full-dark) on all interior pages.

**Note on stacked logos:** Naming is often inverted from the full logo in Figma exports. Always verify which file is which by opening the SVG in a browser before wiring it up.

---

## Clearspace diagrams

Three logo pages use clearspace diagrams (Full logo, Stacked logo, Logo mark). The diagrams use `.cs-*` CSS classes defined around line 1044 in `index.html`.

### HTML structure (copy this for each diagram)

```html
<div class="cs-outer">
  <div class="cs-zone" style="--cs-x: 34px;">
    <!-- --cs-x = half the logo mark height -->
    <div class="cs-logo-box">
      <img src="images/logos/client-logo-full-dark.svg"
           alt="[Client] clear space"
           style="max-height:68px; width:auto; display:block;">
    </div>
    <div class="cs-dim-v top"><span class="cs-lbl">x</span></div>
    <div class="cs-dim-v bottom"><span class="cs-lbl">x</span></div>
    <div class="cs-dim-h left"><span class="cs-lbl">x</span></div>
    <div class="cs-dim-h right"><span class="cs-lbl">x</span></div>
  </div>
  <div class="cs-def">
    <span class="cs-def-x">x</span>
    <span>= ½ the height of the [Client] mark</span>
  </div>
</div>
```

### Two rules that must never be broken

1. **Never use `@apply` in `.cs-*` CSS rules.** Tailwind CDN ignores `@apply` silently at runtime. All five `.cs-*` classes must use plain CSS properties. If you see `@apply` in the CSS, replace it.

2. **Mobile dimension lines must match scaled padding.** The mobile media query scales the zone padding down. The `.cs-dim-v` and `.cs-dim-h` lines must be overridden with the same formula or they extend into the white box. Both overrides are required:

```css
/* In @media (max-width: 768px) — all four rules travel together */
.cs-outer { padding: 16px !important; }
.cs-zone  { padding: max(12px, calc(var(--cs-x, 36px) * 0.38)) !important; max-width: 100% !important; }
.cs-dim-v { height:  max(12px, calc(var(--cs-x, 36px) * 0.38)) !important; }
.cs-dim-h { width:   max(12px, calc(var(--cs-x, 36px) * 0.38)) !important; }
.cs-logo-box img { max-height: 56px !important; width: auto !important; }
```

---

## Mobile patterns to preserve

- **Type specimens:** per-element `clamp()` inline font-sizes. Never use a blanket `@media` override — it collapses all sizes to one value.
- **Full-height flex containers:** `height: auto !important` on mobile + `flex: 0 0 32px !important` on the `flex:1` spacer.
- **Palette tiles:** color name heading has `margin-bottom: 24px` in `renderPalette()` in `brand.js`.
- **fg-overview fluid type:** uses `container-type: inline-size` + `cqi` units — do not replace with `vw`.

---

## Common pitfalls

- **Smart/curly quotes** (`"` `"`) in `src` attributes break image loading. Use `cat -v` to detect; Python to fix.
- **Tailwind CDN `@apply`** is a no-op in `<style>` blocks — always verify with computed styles.
- **ID specificity** (100) beats class + attribute (10+10) — use `#section-id [style*="..."]` to scope a grid override to one section.
- **Color combinations grid** is hardcoded HTML — update it manually to match the new client's approved logo/background pairings.
- **Color pathways** are hardcoded HTML — regenerate them to match the new client's palette (10-step tint/shade ramps, one per brand color).
