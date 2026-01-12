import { createFileRoute } from "@tanstack/react-router";
import { parse } from "@opral/markdown-wc";
import { MarkdownContent } from "../components/MarkdownContent";
import readmeRaw from "../../../README.md?raw";
import { buildPageUrl, siteConfig } from "../seo";

const CDN_BASE = "https://cdn.jsdelivr.net/npm/";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: siteConfig.name },
      { name: "description", content: siteConfig.description },
      { property: "og:title", content: siteConfig.name },
      { property: "og:description", content: siteConfig.description },
      { property: "og:url", content: buildPageUrl("/") },
      { name: "twitter:title", content: siteConfig.name },
      { name: "twitter:description", content: siteConfig.description },
    ],
    links: [{ rel: "canonical", href: buildPageUrl("/") }],
  }),
  loader: async () => {
    const parsed = await parse(readmeRaw);
    return {
      html: parsed.html,
      imports: resolveImportUrls(
        parsed.frontmatter.imports as string[] | undefined
      ),
    };
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
