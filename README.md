# Web Tools Collection

A beautifully curated suite of high-performance utilities designed for modern workflows.

**[Launch Web Tools Collection](https://chrisjdj.github.io/web-tools/)**

---

## 🚀 Features

- **100% Free Forever**: No hidden costs or premium tiers.
- **No Login Required**: Start using the tools instantly.
- **Local Processing (No Server)**: All processing is done locally in your browser. No data is sent to external servers.
- **Privacy First**: Your data remains yours. We don't track or store your usage.
- **Zero Ads**: A clean, distraction-free environment.
- **Lightning Fast**: Built for speed and efficiency.
- **Light & Dark Theme**: Follows your system setting by default. Pick System, Light or Dark in the header; the choice is shared by every tool in the collection.
- **Works Everywhere**: Responsive, accessible layouts (WCAG 2.2 AA) from small phones to wide desktops.

---

## 🧰 Tools Included

### [Turbo Image](https://chrisjdj.github.io/Turbo-Image/)
Lightning-fast image optimization and processing workflow. Compress, convert, and prepare assets instantly.

### [QR Generator](https://chrisjdj.github.io/QR-Code-Gen/)
Generate precise, customizable QR codes in milliseconds. Tailored for URLs, text, and contact information.

### [PDF Toolkit](https://chrisjdj.github.io/PDF-Toolkit/)
Comprehensive PDF management. Merge multiple files, split pages, and rotate documents with instant client-side processing.

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="docs/screenshots/dark-desktop.png" />
  <img alt="Web Tools Collection hub with cards for Turbo Image, QR Generator and PDF Toolkit" src="docs/screenshots/light-desktop.png" width="1280" />
</picture>

Each tool is its own repository and is deployed to its own GitHub Pages site. The `Turbo-Image/`, `QR-Code-Gen/` and `PDF-Toolkit/` folders in this repo hold only a redirect page, so old `/web-tools/<tool>/` links (including query strings and hashes) land on the standalone sites.

---

## 🛠️ Editing the hub

The page is static (`index.html`, `styles.css`, `theme.js`) with no build step. Styles are written in SCSS under `styles/` using the design system shared with the tools (tokens, theme, base, components, shell; see the `DESIGN.md` in any tool repo). After changing a `.scss` file, recompile:

```bash
npx sass --no-source-map --style=compressed styles/main.scss styles.css
```

The theme preference (`theme-preference` in localStorage: `system`, `light` or `dark`) is applied before first paint by the inline script in `index.html`; `theme.js` wires up the switch.

---

## 💡 Suggest the Next App!

I'm always looking for new ideas for incredible tools to add to this collection! If you have a suggestion for a utility you'd love to see built next, please head over to the **[Discussions Tab](https://github.com/chrisjdj/web-tools/discussions)** and share your ideas! We'd love to hear what would make your workflow easier.
