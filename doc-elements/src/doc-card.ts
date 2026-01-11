import { LitElement, css, html } from "lit"
import "iconify-icon"

export default class DocCard extends LitElement {
	static override styles = css`
		:host {
			display: block;
		}

		.card {
			display: flex;
			flex-direction: column;
			padding: 1.25rem;
			border-radius: 0.5rem;
			border: 1px solid #e5e7eb;
			background-color: #fff;
			height: 100%;
			box-sizing: border-box;
			transition: border-color 0.2s ease, box-shadow 0.2s ease;
		}

		.card:hover {
			border-color: #d1d5db;
		}

		.card.clickable {
			cursor: pointer;
		}

		.card.clickable:hover {
			border-color: #3b82f6;
			box-shadow: 0 1px 3px rgba(59, 130, 246, 0.1);
		}

		.card.horizontal {
			flex-direction: row;
			align-items: flex-start;
			gap: 0.75rem;
		}

		.card.horizontal .content {
			flex: 1;
		}

		.card-image {
			width: 100%;
			border-radius: 0.375rem;
			margin-bottom: 0.75rem;
			object-fit: cover;
		}

		.icon-wrapper {
			margin-bottom: 0.75rem;
		}

		.title {
			font-weight: 600;
			font-size: 1rem;
			color: #111827;
			margin: 0 0 0.5rem 0;
		}

		.description {
			font-size: 0.875rem;
			color: #6b7280;
			line-height: 1.5;
		}

		.description ::slotted(*) {
			margin: 0;
		}

		.cta {
			display: flex;
			align-items: center;
			gap: 0.25rem;
			margin-top: 0.75rem;
			font-size: 0.875rem;
			font-weight: 500;
			color: #3b82f6;
		}

		.card.horizontal .cta {
			margin-top: 0.5rem;
		}

		.arrow {
			font-size: 0.75rem;
		}
	`

	static override properties = {
		title: { type: String },
		icon: { type: String },
		href: { type: String },
		horizontal: { type: Boolean },
		img: { type: String },
		cta: { type: String },
		arrow: { type: Boolean },
		color: { type: String },
	}

	override title: string = ""
	icon: string = ""
	href: string = ""
	horizontal: boolean = false
	img: string = ""
	cta: string = ""
	arrow: boolean = false
	color: string = ""

	private handleClick() {
		if (this.href) {
			const isExternal = this.href.startsWith("http://") || this.href.startsWith("https://")
			if (isExternal) {
				window.open(this.href, "_blank", "noopener,noreferrer")
			} else {
				window.location.href = this.href
			}
		}
	}

	private isExternalLink(): boolean {
		return this.href.startsWith("http://") || this.href.startsWith("https://")
	}

	private shouldShowArrow(): boolean {
		if (this.arrow !== undefined && this.arrow !== null) {
			return this.arrow
		}
		return this.isExternalLink()
	}

	override render() {
		const cardClasses = [
			"card",
			this.horizontal ? "horizontal" : "",
			this.href ? "clickable" : "",
		]
			.filter(Boolean)
			.join(" ")

		const iconColor = this.color || "#6b7280"

		return html`
			<div class=${cardClasses} @click=${this.handleClick}>
				${this.img && !this.horizontal
					? html`<img class="card-image" src=${this.img} alt=${this.title} />`
					: ""}
				${this.icon
					? html`<div class="icon-wrapper">
							<iconify-icon
								icon=${this.icon}
								width="20"
								height="20"
								style="color: ${iconColor}"
							></iconify-icon>
					  </div>`
					: ""}
				<h3 class="title">${this.title}</h3>
				<div class="description">
					<slot></slot>
				</div>
				${this.href && this.cta
					? html`<div class="cta">
							${this.cta}
							${this.shouldShowArrow() ? html`<span class="arrow">→</span>` : ""}
					  </div>`
					: ""}
				${this.href && !this.cta && this.shouldShowArrow()
					? html`<div class="cta"><span class="arrow">→</span></div>`
					: ""}
			</div>
		`
	}
}

if (typeof customElements !== "undefined" && !customElements.get("doc-card")) {
	customElements.define("doc-card", DocCard)
}
