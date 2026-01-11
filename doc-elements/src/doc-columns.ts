import { LitElement, css, html } from "lit"

export default class DocColumns extends LitElement {
	static override styles = css`
		:host {
			display: block;
		}

		.columns {
			display: grid;
			gap: 1rem;
			width: 100%;
		}

		.columns.cols-1 {
			grid-template-columns: 1fr;
		}

		.columns.cols-2 {
			grid-template-columns: repeat(2, 1fr);
		}

		.columns.cols-3 {
			grid-template-columns: repeat(3, 1fr);
		}

		.columns.cols-4 {
			grid-template-columns: repeat(4, 1fr);
		}

		@media (max-width: 768px) {
			.columns.cols-2,
			.columns.cols-3,
			.columns.cols-4 {
				grid-template-columns: 1fr;
			}
		}

		@media (min-width: 769px) and (max-width: 1024px) {
			.columns.cols-3,
			.columns.cols-4 {
				grid-template-columns: repeat(2, 1fr);
			}
		}
	`

	static override properties = {
		cols: { type: Number },
	}

	cols: number = 2

	override render() {
		const colCount = Math.min(Math.max(this.cols || 2, 1), 4)
		return html`
			<div class="columns cols-${colCount}">
				<slot></slot>
			</div>
		`
	}
}

if (typeof customElements !== "undefined" && !customElements.get("doc-columns")) {
	customElements.define("doc-columns", DocColumns)
}
