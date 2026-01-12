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
  - https://cdn.jsdelivr.net/npm/@opral/markdown-wc-doc-elements/dist/doc-card.js
  - https://cdn.jsdelivr.net/npm/@opral/markdown-wc-doc-elements/dist/doc-columns.js
---

<doc-columns cols="2">
  <doc-card title="Get started" icon="lucide:rocket">
    Set up your project with our quickstart guide.
  </doc-card>
  <doc-card title="API reference" icon="lucide:code">
    Explore endpoints, parameters, and examples.
  </doc-card>
</doc-columns>
```

## Elements

### Layout

<markdown-wc-embed src="./src/doc-columns.md"></markdown-wc-embed>
<markdown-wc-embed src="./src/doc-card.md"></markdown-wc-embed>

---

### Media

<markdown-wc-embed src="./src/doc-video.md"></markdown-wc-embed>

---

## Usage with markdown-wc

Import individual elements as needed:

```markdown
---
imports:
  - https://cdn.jsdelivr.net/npm/@opral/markdown-wc-doc-elements/dist/doc-card.js
  - https://cdn.jsdelivr.net/npm/@opral/markdown-wc-doc-elements/dist/doc-columns.js
  - https://cdn.jsdelivr.net/npm/@opral/markdown-wc-doc-elements/dist/doc-video.js
---

# My Documentation

<doc-columns cols="2">
  <doc-card title="Quick start" icon="lucide:rocket" href="/docs/intro">
    Get up and running in minutes.
  </doc-card>
  <doc-card title="Examples" icon="lucide:code" href="/docs/examples">
    Browse code samples.
  </doc-card>
</doc-columns>

<doc-video src="https://youtu.be/example"></doc-video>
```

## License

MIT
