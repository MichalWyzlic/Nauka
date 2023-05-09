class Tooltip extends HTMLElement {
	#tooltipContainer;
	#tooltipText;
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
		// const template = document.querySelector('#tooltip-template');
		// this.shadowRoot.appendChild(template.content.cloneNode(true));
		this.shadowRoot.innerHTML = `
			<style>
				div{
					background-color: rgba(0,0,0,0.5);
					border-radius: 5px;
					color: white;
					position: absolute;
					z-index: 10;
				}
				::slotted(.highlight){
					border-bottom: 1px dotted red;
				}

				.icon{
					background: black;
					color: white;
					padding: 0.15rem 0.5rem;
					text-align: center;
					border-radius: 50%;
				}

				:host {
					background: lightgrey;
				}
			</style>
			<slot></slot>
			<span class="icon">?</span>
			`;
	}

	connectedCallback() {
		const tooltipIcon = this.shadowRoot.querySelector('span');
		//tooltipIcon.textContent = '?';
		this.#tooltipText = this.getAttribute('tooltip-text');
		tooltipIcon.addEventListener(
			'mouseenter',
			this.#showTooltip.bind(this)
		);
		tooltipIcon.addEventListener(
			'mouseleave',
			this.#hideTooltip.bind(this)
		);
		this.shadowRoot.appendChild(tooltipIcon);
		this.style.position = 'relative';
	}

	#showTooltip() {
		if (this.hasAttribute('tooltip-text')) {
			this.#tooltipContainer = document.createElement('div');
			this.#tooltipContainer.textContent = this.#tooltipText;
			this.#tooltipContainer.style.backgroundColor = 'rgba(0,0,0,0.5)';
			this.#tooltipContainer.style.borderRadius = '5px';
			this.#tooltipContainer.style.color = 'white';
			this.#tooltipContainer.style.position = 'absolute';
			this.#tooltipContainer.style.zIndex = '10';
			this.shadowRoot.appendChild(this.#tooltipContainer);
		}
	}

	#hideTooltip() {
		if (this.#tooltipContainer) {
			// this.shadowRoot.removeChild(this.#tooltipContainer);
			this.#tooltipContainer.remove();
		}
	}
}

customElements.define('uc-tooltip', Tooltip);
