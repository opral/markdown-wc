---
imports:
  - "../dist/doc-card.js"
  - "../dist/doc-columns.js"
---

### doc-card

Highlight main points or links with customizable layouts and icons.

#### Basic card

```html
<doc-card title="Card title" icon="lucide:rocket" href="/getting-started">
  This is how you use a card with an icon and a link.
</doc-card>
```

<doc-card title="Card title" icon="lucide:rocket" href="/getting-started">
  This is how you use a card with an icon and a link.
</doc-card>

#### Horizontal layout

```html
<doc-card title="Horizontal card" icon="lucide:layout-list" horizontal>
  This is an example of a horizontal card.
</doc-card>
```

<doc-card title="Horizontal card" icon="lucide:layout-list" horizontal>
  This is an example of a horizontal card.
</doc-card>

#### Image card

```html
<doc-card title="Image card" img="https://mintlify-assets.b-cdn.net/yosemite.jpg">
  This is an example of a card with an image.
</doc-card>
```

<doc-card title="Image card" img="https://mintlify-assets.b-cdn.net/yosemite.jpg">
  This is an example of a card with an image.
</doc-card>

#### Link card with custom CTA

```html
<doc-card title="Link card" icon="lucide:link" href="https://example.com" arrow cta="Learn more">
  Clicking this card opens an external link.
</doc-card>
```

<doc-card title="Link card" icon="lucide:link" href="https://example.com" arrow cta="Learn more">
  Clicking this card opens an external link.
</doc-card>

#### Attributes

| Attribute | Type | Description |
|-----------|------|-------------|
| `title` | string | **Required.** The title displayed on the card. |
| `icon` | string | Iconify icon name (e.g., `lucide:rocket`, `mdi:home`). |
| `href` | string | URL to navigate when the card is clicked. |
| `horizontal` | boolean | Display the card in a compact horizontal layout. |
| `img` | string | URL to an image displayed at the top of the card. |
| `cta` | string | Custom text for the action button. |
| `arrow` | boolean | Show or hide the link arrow icon. Defaults to true for external links. |
| `color` | string | Icon color as a hex code (e.g., `#FF6B6B`). |
