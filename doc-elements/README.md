---
imports:
  - https://cdn.jsdelivr.net/npm/@opral/markdown-wc/dist/markdown-wc-embed.js
---

# Markdown WC Doc Elements

Pre-built, styled Web Components for common documentation patterns. Drop them into any markdown-wc document without writing CSS.

## Installation

```bash
npm install @opral/markdown-wc-doc-elements
```

Or use directly from CDN:

```markdown
---
imports:
  - https://cdn.jsdelivr.net/npm/@opral/markdown-wc-doc-elements/dist/doc-figure.js
---

<doc-figure src="./image.png" caption="My image"></doc-figure>
```

## Elements

### Layout

Page-level sections for landing pages and documentation headers.

<markdown-wc-embed src="./src/doc-hero.md"></markdown-wc-embed>
<markdown-wc-embed src="./src/doc-header.md"></markdown-wc-embed>
<markdown-wc-embed src="./src/doc-features.md"></markdown-wc-embed>
<markdown-wc-embed src="./src/doc-feature.md"></markdown-wc-embed>

---

### Media

Embed images, videos, and icons.

<markdown-wc-embed src="./src/doc-video.md"></markdown-wc-embed>
<markdown-wc-embed src="./src/doc-figure.md"></markdown-wc-embed>
<markdown-wc-embed src="./src/doc-slider.md"></markdown-wc-embed>
<markdown-wc-embed src="./src/doc-icon.md"></markdown-wc-embed>

---

### Navigation

Link cards and grids for documentation navigation.

<markdown-wc-embed src="./src/doc-links.md"></markdown-wc-embed>
<markdown-wc-embed src="./src/doc-link.md"></markdown-wc-embed>

---

### Interactive

Collapsible content, copy buttons, and user interaction elements.

<markdown-wc-embed src="./src/doc-accordion.md"></markdown-wc-embed>
<markdown-wc-embed src="./src/doc-copy.md"></markdown-wc-embed>
<markdown-wc-embed src="./src/doc-comments.md"></markdown-wc-embed>
<markdown-wc-embed src="./src/doc-comment.md"></markdown-wc-embed>
<markdown-wc-embed src="./src/doc-pricing.md"></markdown-wc-embed>

---

## Usage with markdown-wc

Import individual elements as needed:

```markdown
---
imports:
  - https://cdn.jsdelivr.net/npm/@opral/markdown-wc-doc-elements/dist/doc-video.js
  - https://cdn.jsdelivr.net/npm/@opral/markdown-wc-doc-elements/dist/doc-figure.js
---

# My Documentation

<doc-video src="https://youtu.be/example"></doc-video>

<doc-figure src="./screenshot.png" caption="App screenshot"></doc-figure>
```

## License

MIT
