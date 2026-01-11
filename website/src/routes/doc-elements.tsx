import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { parse } from "@opral/markdown-wc";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { MarkdownContent } from "../components/MarkdownContent";

const CDN_BASE = "https://cdn.jsdelivr.net/npm/";
const DOC_ELEMENTS_DIR = fileURLToPath(
  new URL("../../../doc-elements/", import.meta.url)
);

const loadDocElements = createServerFn({ method: "GET" }).handler(async () => {
  const readmePath = path.join(DOC_ELEMENTS_DIR, "README.md");
  const rawMarkdown = await readFile(readmePath, "utf-8");
  const parsed = await parse(rawMarkdown);
  const { html, imports: embedImports } = await inlineEmbeds(parsed.html);
  const imports = resolveImportUrls(
    [
      ...(parsed.frontmatter.imports as string[] | undefined ?? []),
      ...embedImports,
    ],
    "@opral/markdown-wc-doc-elements"
  );

  return { html, imports };
});

export const Route = createFileRoute("/doc-elements")({
  loader: async () => {
    return await loadDocElements();
  },
  component: DocElementsPage,
});

function DocElementsPage() {
  const { html, imports } = Route.useLoaderData();
  return <MarkdownContent html={html} imports={imports} />;
}

async function inlineEmbeds(html: string) {
  const embedRegex =
    /<markdown-wc-embed\b[^>]*src=(['"])([^'"]+)\1[^>]*>\s*<\/markdown-wc-embed>/gi;
  const matches = Array.from(html.matchAll(embedRegex));
  let nextHtml = html;
  const collectedImports: string[] = [];

  for (const match of matches) {
    const fullMatch = match[0];
    const src = match[2] ?? "";
    if (!src || /^[a-z][a-z0-9+.-]*:/.test(src)) continue;

    const normalized = src.startsWith("./") ? src.slice(2) : src;
    const filePath = path.resolve(DOC_ELEMENTS_DIR, normalized);
    const rawMarkdown = await readFile(filePath, "utf-8");
    const parsed = await parse(rawMarkdown);
    collectedImports.push(...(parsed.frontmatter.imports ?? []));
    nextHtml = nextHtml.replace(fullMatch, parsed.html);
  }

  return { html: nextHtml, imports: collectedImports };
}

function resolveImportUrls(imports: string[] | undefined, defaultPackage: string) {
  if (!imports?.length) return imports;
  return imports.map((value) => {
    if (value.startsWith(CDN_BASE)) {
      return value.replace(CDN_BASE, "");
    }
    if (value.startsWith("@opral/")) {
      return value;
    }
    if (/^[a-z][a-z0-9+.-]*:/.test(value)) return value;
    return toPackageSpecifier(value, defaultPackage);
  });
}

function toPackageSpecifier(pathValue: string, packageName: string) {
  const normalized = pathValue.replace(/^[./]+/, "");
  return `${packageName}/${normalized}`;
}
