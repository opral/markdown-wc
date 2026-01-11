export const siteConfig = {
  name: "markdown-wc",
  description:
    "Framework-agnostic markdown renderer with web component support.",
  url: "https://markdown-wc.pages.dev",
  repo: "https://github.com/opral/markdown-wc",
  npm: "https://www.npmjs.com/package/@opral/markdown-wc",
};

export function buildSoftwareJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    name: siteConfig.name,
    description: siteConfig.description,
    codeRepository: siteConfig.repo,
    url: siteConfig.url,
    programmingLanguage: "TypeScript",
    license: "https://opensource.org/licenses/MIT",
  };
}
