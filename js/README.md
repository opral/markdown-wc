# JS Bindings (wasm-bindgen)

WASM bindings for `markdown_wc`, exposed as JavaScript-callable functions.

## Exported API

- `parse_markdown(markdown: string) -> MarkdownDocument`
- `parse_markdown_bytes(bytes: Uint8Array) -> MarkdownDocument`
- `normalize_document(document: MarkdownDocument) -> MarkdownDocument`
- `normalize_ast_json(ast: unknown) -> unknown`
- `serialize_markdown(document: MarkdownDocument) -> string`

`MarkdownDocument` shape:

```ts
type MarkdownDocument = {
  blocks: unknown[]
  source: {
    had_trailing_newline: boolean
    line_ending: "None" | "Lf" | "Crlf" | "Mixed"
  }
}
```

## Build

```bash
cd js
pnpm run build:node
```

Generated output goes to `js/pkg`.

## Usage (Pure ESM, Node)

```js
import * as mdwc from "./pkg/markdown_wc_js_bindings.js";

const doc = mdwc.parse_markdown("# Hello\\n\\nWorld");
const normalized = mdwc.normalize_document(doc);
const markdown = mdwc.serialize_markdown(normalized);
```
