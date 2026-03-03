# markdown-wc (Rust Foundation)

This repository has been reset to a Rust-first foundation for markdown-v2 needs.

## Minimal Scope (v0)

The crate currently focuses on the smallest API surface needed by `lix` `plugin-md-v2`:

- Parse markdown bytes/text into top-level mdast-like blocks while preserving source metadata.
- Optionally normalize AST JSON (`position` stripped, newline/NFC normalization).
- Serialize blocks back into markdown (preserving trailing-newline + CRLF/LF style metadata).

## Crate

- Crate name: `markdown_wc`
- Path: `src/lib.rs`

## Public API

```rust
pub fn parse_markdown(markdown: &str) -> Result<MarkdownDocument, MarkdownWcError>;
pub fn parse_markdown_bytes(bytes: &[u8]) -> Result<MarkdownDocument, MarkdownWcError>;
pub fn normalize_document(document: &mut MarkdownDocument);
pub fn serialize_markdown(document: &MarkdownDocument) -> Result<String, MarkdownWcError>;
```

`MarkdownDocument` stores:

```rust
pub struct MarkdownDocument {
    pub blocks: Vec<serde_json::Value>,
    pub source: MarkdownSourceMeta,
}

pub struct MarkdownSourceMeta {
    pub had_trailing_newline: bool,
    pub line_ending: LineEnding, // None | Lf | Crlf | Mixed
}
```

`parse_*` preserves AST `position` nodes by default. Call `normalize_document` before
`serialize_markdown` when you want canonicalized output.

## Current Intent

This is a baseline to unblock shared markdown-v2 behavior in the `lix` plugin pipeline.
Broader markdown-wc features (HTML rendering pipeline, web components, tiptap adapters, etc.)
will be reintroduced incrementally on top of this Rust core.
