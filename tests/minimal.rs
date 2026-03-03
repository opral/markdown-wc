use markdown_wc::{normalize_document, parse_markdown, serialize_markdown, LineEnding};

#[test]
fn parse_preserves_position_and_source_metadata() {
    let document = parse_markdown("# Title\r\n\r\nHello").expect("parse should succeed");
    assert_eq!(document.blocks.len(), 2);
    assert!(!document.source.had_trailing_newline);
    assert_eq!(document.source.line_ending, LineEnding::Crlf);

    let serialized =
        serde_json::to_string(&document.blocks[0]).expect("json encode should succeed");
    assert!(serialized.contains("position"));
}

#[test]
fn normalize_is_explicit_and_strips_positions() {
    let mut document = parse_markdown("# Title\n\nHello\n").expect("parse should succeed");
    let before = serde_json::to_string(&document.blocks).expect("json encode should succeed");
    assert!(before.contains("position"));

    normalize_document(&mut document);
    let after = serde_json::to_string(&document.blocks).expect("json encode should succeed");
    assert!(!after.contains("position"));
}

#[test]
fn parse_normalize_serialize_produces_canonical_output() {
    let mut document = parse_markdown("# Title\n\nHello\n").expect("parse should succeed");
    normalize_document(&mut document);
    document.source.had_trailing_newline = true;
    document.source.line_ending = LineEnding::Lf;
    let output = serialize_markdown(&document).expect("serialize should succeed");
    assert_eq!(output, "# Title\n\nHello\n");
}

#[test]
fn parse_normalize_serialize_canonicalizes_emphasis_marker_style() {
    let mut document = parse_markdown("*italic*\n").expect("parse should succeed");
    normalize_document(&mut document);
    document.source.had_trailing_newline = true;
    document.source.line_ending = LineEnding::Lf;
    let output = serialize_markdown(&document).expect("serialize should succeed");
    assert_eq!(output, "_italic_\n");
}

#[test]
fn serialize_preserves_trailing_newline_and_line_ending_style() {
    let with_crlf = parse_markdown("Hello\r\n").expect("parse should succeed");
    let out = serialize_markdown(&with_crlf).expect("serialize should succeed");
    assert_eq!(out, "Hello\r\n");

    let without_newline = parse_markdown("Hello").expect("parse should succeed");
    let out = serialize_markdown(&without_newline).expect("serialize should succeed");
    assert_eq!(out, "Hello");
}
