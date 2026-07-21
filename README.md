# Brand Book Template

A ready-to-use digital brand book template. One HTML file, no build tools, no coding required.
Works in any browser. Drop in logos, fonts, and colors — done.

---

## Starting a new client brand book

### Step 1 — Create a new copy from this template

1. Go to this repository on **GitHub.com**
2. Click the green **"Use this template"** button (top right)
3. Name the new repository — e.g. `acme-brand-book`
4. Click **"Create repository"**

### Step 2 — Open it on your computer

1. Open **GitHub Desktop**
2. Click **File → Clone Repository**
3. Find the new repository in the list and click **Clone**
4. Choose where to save it on your computer

### Step 3 — Add the client's files

Place these files in the right folders (you can drag and drop in Finder):

| What | Where |
|---|---|
| Logo SVG files | `images/logos/` — rename them to match the names in `brand.js` |
| Font files (.otf, .ttf) | `fonts/` |

### Step 4 — Ask Claude to set it up

Open the project folder in Claude Code and say:

> "I want to set up a new brand book. Please ask me the setup questions."

Claude will ask you about the client name, colors, fonts, and logos — one group of questions at a time — then fill in `brand.js` automatically.

### Step 5 — Preview it

Open `index.html` in any browser (double-click the file). No internet required.

### Step 6 — Publish to GitHub Pages (optional)

To share a live link with your client:

1. In GitHub Desktop, **commit and push** your changes
2. On GitHub.com, go to **Settings → Pages**
3. Under "Source", select **main branch**
4. GitHub gives you a public URL (e.g. `yourname.github.io/acme-brand-book`)

---

## Making improvements to the template

When you fix a bug or improve the layout in a client project and want those changes available for future projects:

1. Open **this template** in GitHub Desktop (not the client project)
2. Apply the same changes here
3. Commit and push

The client project keeps its own copy — changes to the template don't affect existing client books.

---

## File guide

| File | What it does | Should you edit it? |
|---|---|---|
| `brand.js` | Client name, colors, fonts, logos, type specimens | ✅ Yes — this is the main config |
| `index.html` | Layout, CSS, page structure | ⚠️ Only for structural changes |
| `setup.js` | Interactive setup script — run via Claude | 🚫 No |
| `sync-figma.js` | Pull logos from Figma | 🚫 No |
| `fonts/` | Font files | ✅ Add files here |
| `images/logos/` | Logo SVG files | ✅ Add files here |

---

## What's included

- Logo & mark pages (full logo, stacked, mark, avatar/favicon, what to avoid)
- Color pages (primary palette, secondary palette, combinations & accessibility, color pathways)
- Typography pages (overview, usage, type specimen, size & scale, fallback fonts, what to avoid)
- Photography, Applications, Iconography (placeholder sections — add when assets are ready)
- Fully responsive — works on iPhone, iPad, MacBook, and desktop
- Clearspace diagrams on all logo pages
- Color combination grid with WCAG contrast ratios
- Download buttons for logos and fonts

---

## Tips

- **Preview locally:** just double-click `index.html` — no server needed
- **Fastest edit cycle:** open `brand.js` in any text editor, change a hex color, save, refresh browser
- **Logos must be SVG** for best quality at all sizes
- **Colors:** always use hex values (e.g. `#1CACFF`) not color names
- If something looks wrong on mobile, describe it to Claude — the responsive fixes are documented and reproducible
