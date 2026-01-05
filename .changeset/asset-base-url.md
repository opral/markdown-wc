---
"@opral/markdown-wc": patch
---

Add `assetBaseUrl` to `parse()` so relative image and link URLs can be resolved against a base path or absolute URL. Before this, callers had to rewrite markdown or HTML manually to make `./assets/...` work in docs/blog setups; now the parser handles it directly and keeps URLs consistent across static builds and server rendering.

Usage:
```ts
const parsed = await parse(markdown, {
  assetBaseUrl: "/blog/my-post/",
})
```

Rewriting (relative → base path):
```
./assets/architecture.jpg
  ↓ assetBaseUrl=/blog/my-post/
/blog/my-post/assets/architecture.jpg
```

Absolute base URL example:
```ts
const parsed = await parse(markdown, {
  assetBaseUrl: "https://example.com/",
})
```

```
docs/intro
  ↓ assetBaseUrl=https://example.com/
https://example.com/docs/intro
```
