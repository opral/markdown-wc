import { createFileRoute } from "@tanstack/react-router";
import { parse } from "@opral/markdown-wc";
import { MarkdownContent } from "../components/MarkdownContent";
import readmeRaw from "../../../doc-elements/README.md?raw";
import { buildPageUrl, siteConfig } from "../seo";

const CDN_BASE = "https://cdn.jsdelivr.net/npm/";
const DOC_ELEMENTS_MARKDOWN = import.meta.glob(
  "../../../doc-elements/src/*.md",
  { query: "?raw", import: "default", eager: true }
) as Record<string, string>;

export const Route = createFileRoute("/doc-elements")({
  head: () => {
    const title = `Doc elements | ${siteConfig.name}`;
    const description =
      "Pre-built, styled web components for common documentation patterns.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:url", content: buildPageUrl("/doc-elements") },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
      ],
      links: [{ rel: "canonical", href: buildPageUrl("/doc-elements") }],
    };
  },
  loader: async () => {
    const parsed = await parse(readmeRaw);
    const { html, imports: embedImports } = await inlineEmbeds(parsed.html);
    const imports = resolveImportUrls(
      [
        ...(parsed.frontmatter.imports as string[] | undefined ?? []),
        ...embedImports,
      ],
      "@opral/markdown-wc-doc-elements"
    );
    return { html, imports };
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
    const filename = getBasename(normalized);
    const rawMarkdown = findEmbeddedMarkdown(filename);
    if (!rawMarkdown) continue;
    const parsed = await parse(rawMarkdown);
    collectedImports.push(...(parsed.frontmatter.imports ?? []));
    nextHtml = nextHtml.replace(fullMatch, parsed.html);
  }

  return { html: nextHtml, imports: collectedImports };
}

function findEmbeddedMarkdown(filename: string) {
  const entry = Object.entries(DOC_ELEMENTS_MARKDOWN).find(([key]) =>
    key.endsWith(`/${filename}`)
  );
  return entry?.[1];
}

function getBasename(value: string) {
  const parts = value.split("/");
  return parts[parts.length - 1] || value;
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
