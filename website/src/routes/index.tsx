import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { parse } from "@opral/markdown-wc";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { MarkdownContent } from "../components/MarkdownContent";

const CDN_BASE = "https://cdn.jsdelivr.net/npm/";

const loadReadme = createServerFn({ method: "GET" }).handler(async () => {
  const readmeUrl = new URL("../../../README.md", import.meta.url);
  const rawMarkdown = await readFile(fileURLToPath(readmeUrl), "utf-8");
  const parsed = await parse(rawMarkdown);
  return {
    html: parsed.html,
    imports: resolveImportUrls(parsed.frontmatter.imports as string[] | undefined),
  };
});

export const Route = createFileRoute("/")({
  loader: async () => {
    return await loadReadme();
  },
  component: HomePage,
});

function HomePage() {
  const { html, imports } = Route.useLoaderData();
  return (
    <MarkdownContent html={html} imports={imports} />
  );
}

function resolveImportUrls(imports: string[] | undefined) {
  if (!imports?.length) return imports;
  return imports.map((value) => {
    if (value.startsWith(CDN_BASE)) {
      return value.replace(CDN_BASE, "");
    }
    if (value.startsWith("@opral/")) {
      return value;
    }
    if (/^[a-z][a-z0-9+.-]*:/.test(value)) return value;
    return toPackageSpecifier(value, "@opral/markdown-wc");
  });
}

function toPackageSpecifier(path: string, packageName: string) {
  const normalized = path.replace(/^[./]+/, "");
  return `${packageName}/${normalized}`;
}
