import { useEffect } from "react";

const markdownWcDistModules = import.meta.glob("../../../dist/*.js");
const markdownWcSrcModules = import.meta.glob("../../../src/*.ts");
const docElementsDistModules = import.meta.glob("../../../doc-elements/dist/*.js");
const docElementsSrcModules = import.meta.glob("../../../doc-elements/src/*.ts");

const markdownWcDistIndex = indexByBasename(markdownWcDistModules);
const markdownWcSrcIndex = indexByBasename(markdownWcSrcModules);
const docElementsDistIndex = indexByBasename(docElementsDistModules);
const docElementsSrcIndex = indexByBasename(docElementsSrcModules);

export function MarkdownContent({
  html,
  imports,
}: {
  html: string;
  imports?: string[];
}) {
  useEffect(() => {
    if (!imports?.length) return;
    for (const url of imports) {
      if (url.startsWith("http://") || url.startsWith("https://")) {
        import(/* @vite-ignore */ url).catch((err) => {
          console.error(`Failed to load web component from ${url}:`, err);
        });
        continue;
      }

      const loader = resolveLocalImport(url);
      if (loader) {
        loader().catch((err) => {
          console.error(`Failed to load web component from ${url}:`, err);
        });
        continue;
      }

      import(/* @vite-ignore */ url).catch((err) => {
        console.error(`Failed to load web component from ${url}:`, err);
      });
    }
  }, [imports]);

  return (
    <div
      className="markdown-wc-body"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

function resolveLocalImport(specifier: string) {
  if (specifier.startsWith("@opral/markdown-wc-doc-elements/")) {
    const filename = toFilename(specifier);
    return docElementsDistIndex[filename] ?? docElementsSrcIndex[toSrcFilename(filename)];
  }
  if (specifier.startsWith("@opral/markdown-wc/")) {
    const filename = toFilename(specifier);
    return markdownWcDistIndex[filename] ?? markdownWcSrcIndex[toSrcFilename(filename)];
  }
  return undefined;
}

function indexByBasename(
  modules: Record<string, () => Promise<unknown>>
) {
  const index: Record<string, () => Promise<unknown>> = {};
  for (const [key, loader] of Object.entries(modules)) {
    const basename = key.split("/").pop();
    if (!basename) continue;
    index[basename] = loader;
  }
  return index;
}

function toFilename(specifier: string) {
  const cleaned = specifier.replace(/^@opral\/[^/]+\//, "");
  const withoutDist = cleaned.replace(/^dist\//, "");
  return withoutDist.split("/").pop() ?? withoutDist;
}

function toSrcFilename(filename: string) {
  return filename.endsWith(".js")
    ? filename.replace(/\.js$/, ".ts")
    : `${filename}.ts`;
}
