import { LitElement, html } from "lit"
import { Task } from "@lit/task"
import { unsafeHTML } from "lit/directives/unsafe-html.js"
import { parse } from "./parse.js"

/**
 * A custom element that fetches and embeds markdown wc content.
 *
 * @example
 *   ```html
 *   <markdown-wc-embed base="/foo">
 *     <markdown-wc-embed src="./hello"></markdown-wc-embed>
 *   </markdown-wc-embed>
 *   ```
 */
export default class Element extends LitElement {
	static override properties = {
		src: { type: String },
		base: { type: String }, // Base path to propagate
	}

	src?: string
	base?: string

	private fetchMarkdown = new Task(
		this,
		async ([src, base]) => {
			if (src === undefined) {
				throw new Error("src is undefined")
			}

			// Resolve the full URL using the base path, if provided
			const resolvedSrc = base ? resolveUrl(src, base) : src

			const text = await (await fetch(resolvedSrc)).text()
			const parsed = await parse(text)

			for (const importSrc of parsed.frontmatter.imports ?? []) {
				const resolvedImportSrc = resolveUrl(importSrc, resolvedSrc)
				// not awaited to speed up rendering. components will load in parallel
				import(resolvedImportSrc)
			}

			return this.base
				? // prefix the html with the base path for child elements to inherit
					`<!--mwc-base=${this.base}-->` + parsed.html
				: parsed.html
		},
		() => [this.src, this.base] // React to changes in src or base
	)

	protected override createRenderRoot() {
		// Render in light DOM so nested embeds can see propagated base comments.
		return this
	}

	override connectedCallback() {
		super.connectedCallback()
		if (!this.base) {
			this.inheritBaseFromParent()
		}
	}

	/**
	 * Inherit the `base` value from the nearest parent's HTML comment.
	 */
	private inheritBaseFromParent() {
		let current: Node | null = this.parentNode
		while (current) {
			const base = this.getBaseFromComments(current)
			if (base !== undefined) {
				this.base = base
				return
			}
			current = current.parentNode
		}
	}

	private getBaseFromComments(node: Node): string | undefined {
		for (const child of Array.from(node.childNodes)) {
			if (child.nodeType !== Node.COMMENT_NODE) {
				continue
			}
			const match = child.nodeValue?.match(/mwc-base=([^\s]*)/)
			if (match) {
				return match[1]
			}
		}
		return undefined
	}

	override render() {
		return html`
			${this.fetchMarkdown.render({
				pending: () => html`<p>Loading...</p>`,
				complete: (markdown) => html` ${unsafeHTML(markdown)} `,
				error: (error) => html`
					<p>Error loading markdown.</p>
					<pre>${error}</pre>
				`,
			})}
		`
	}
}

/**
 * Resolves a relative URL against a base URL, handling relative paths.
 * @param {string} relativePath - The relative path to resolve.
 * @param {string} basePath - The base path to resolve against.
 * @returns {string} - The resolved URL.
 */
function resolveUrl(relativePath: string, basePath: string): string {
	// If basePath is not absolute, use document.baseURI as the absolute base
	const absoluteBase =
		basePath.startsWith("http://") || basePath.startsWith("https://")
			? basePath
			: new URL(basePath, document.baseURI).href

	// Resolve the relative path
	return new URL(relativePath, absoluteBase).href
}

if (typeof customElements !== "undefined" && !customElements.get("markdown-wc-embed")) {
	customElements.define("markdown-wc-embed", Element)
}
