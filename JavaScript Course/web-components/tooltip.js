class Tooltip extends HTMLElement {
	#tooltipContainer;
	#tooltipText;
	constructor() {
		super();
	}

	connectedCallback() {
		const tooltipIcon = document.createElement('span');
		tooltipIcon.textContent = '(?)';
		this.#tooltipText = this.getAttribute('tooltip-text');
		tooltipIcon.addEventListener(
			'mouseenter',
			this.#showTooltip.bind(this)
		);
		tooltipIcon.addEventListener(
			'mouseleave',
			this.#hideTooltip.bind(this)
		);
		this.appendChild(tooltipIcon);
	}

	#showTooltip() {
		if (this.hasAttribute('tooltip-text')) {
			this.#tooltipContainer = document.createElement('div');
			this.#tooltipContainer.textContent = this.#tooltipText;
			this.appendChild(this.#tooltipContainer);
		}
	}

	#hideTooltip() {
		if (this.#tooltipContainer) {
			this.removeChild(this.#tooltipContainer);
		}
	}
}

customElements.define('uc-tooltip', Tooltip);
