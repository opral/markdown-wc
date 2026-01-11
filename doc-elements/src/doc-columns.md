---
imports:
  - "../dist/doc-card.js"
  - "../dist/doc-columns.js"
---

### doc-columns

Show elements side by side in a responsive grid.

The `doc-columns` component lets you group multiple `doc-card` components together. It's most often used to put cards in a grid by specifying the number of columns. Columns are responsive and automatically adjust for smaller screens.

#### Example

```html
<doc-columns cols="2">
  <doc-card title="Get started" icon="lucide:rocket">
    Set up your project with our quickstart guide.
  </doc-card>
  <doc-card title="API reference" icon="lucide:code">
    Explore endpoints, parameters, and examples.
  </doc-card>
</doc-columns>
```

<doc-columns cols="2">
  <doc-card title="Get started" icon="lucide:rocket">
    Set up your project with our quickstart guide.
  </doc-card>
  <doc-card title="API reference" icon="lucide:code">
    Explore endpoints, parameters, and examples.
  </doc-card>
</doc-columns>

#### Three columns

```html
<doc-columns cols="3">
  <doc-card title="Guides" icon="lucide:book-open">
    Step-by-step tutorials.
  </doc-card>
  <doc-card title="Examples" icon="lucide:file-code">
    Code samples and demos.
  </doc-card>
  <doc-card title="FAQ" icon="lucide:help-circle">
    Common questions answered.
  </doc-card>
</doc-columns>
```

<doc-columns cols="3">
  <doc-card title="Guides" icon="lucide:book-open">
    Step-by-step tutorials.
  </doc-card>
  <doc-card title="Examples" icon="lucide:file-code">
    Code samples and demos.
  </doc-card>
  <doc-card title="FAQ" icon="lucide:help-circle">
    Common questions answered.
  </doc-card>
</doc-columns>

#### Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `cols` | number | 2 | The number of columns per row. Accepts values from 1 to 4. |
