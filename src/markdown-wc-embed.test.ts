// @vitest-environment jsdom
import { afterEach, expect, test } from "vitest"
import "./markdown-wc-embed"

afterEach(() => {
	while (document.body.firstChild) {
		document.body.removeChild(document.body.firstChild)
	}
})

test("inherits base from parent comment in light DOM", () => {
	const parent = document.createElement("markdown-wc-embed") as HTMLElement & {
		base?: string
	}
	const child = document.createElement("markdown-wc-embed") as HTMLElement & {
		base?: string
	}

	parent.appendChild(document.createComment("mwc-base=/docs"))
	parent.appendChild(child)
	document.body.appendChild(parent)

	expect(child.base).toBe("/docs")
})

test("inherits base from nearest ancestor comment", () => {
	const grandparent = document.createElement("div")
	const parent = document.createElement("markdown-wc-embed") as HTMLElement & {
		base?: string
	}
	const child = document.createElement("markdown-wc-embed") as HTMLElement & {
		base?: string
	}

	grandparent.appendChild(document.createComment("mwc-base=/docs"))
	grandparent.appendChild(parent)
	parent.appendChild(child)
	document.body.appendChild(grandparent)

	expect(child.base).toBe("/docs")
})

test("does not overwrite existing base", () => {
	const parent = document.createElement("markdown-wc-embed") as HTMLElement & {
		base?: string
	}
	const child = document.createElement("markdown-wc-embed") as HTMLElement & {
		base?: string
	}

	child.base = "/local"
	parent.appendChild(document.createComment("mwc-base=/docs"))
	parent.appendChild(child)
	document.body.appendChild(parent)

	expect(child.base).toBe("/local")
})
