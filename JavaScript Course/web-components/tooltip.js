class Tooltip extends HTMLElement {
	#tooltipContainer;
	#tooltipText;
	#tooltipIcon;
	#tooltipVisible = false;
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
		// const template = document.querySelector('#tooltip-template');
		// this.shadowRoot.appendChild(template.content.cloneNode(true));
		this.shadowRoot.innerHTML = `
			<style>
				div{
					font-weight: normal;
					background-color: rgba(64,64,64,1);
					padding: 0.5rem;
					border-radius: 5px;
					color: white;
					position: absolute;
					top: 1.5rem;
					leftL 0.75rem;
					z-index: 10;
					box-shadow: 3px 3px 6px rgba(0,0,0,0.5);
					
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

				:host-context(p) {
					font-weight: bold;
				}

				:host(.important) {
					background: var(--color-primary, #ccc);
				}
				

				:host {
					background: lightgrey;
					position: relative;
				}
			</style>
			<slot></slot>
			<span class="icon">?</span>
			`;
	}

	connectedCallback() {
		this.#tooltipIcon = this.shadowRoot.querySelector('span');
		//tooltipIcon.textContent = '?';
		this.#tooltipText = this.getAttribute('tooltip-text');
		this.#tooltipIcon.addEventListener(
			'mouseenter',
			this.#showTooltip.bind(this)
		);
		this.#tooltipIcon.addEventListener(
			'mouseleave',
			this.#hideTooltip.bind(this)
		);
		// this.shadowRoot.appendChild(tooltipIcon);
		// this.style.position = 'relative';
		this.#render();
	}

	disconnectedCallback(){
		this.#tooltipIcon.removeEventListener(
			'mouseenter',
			this.#showTooltip
		);
		this.#tooltipIcon.removeEventListener(
			'mouseleave',
			this.#hideTooltip
		);
	}

	attributeChangedCallback(name, oldValue, newValue){
		if(name === 'tooltip-text' && oldValue != newValue){
			if(newValue) {
				this.#tooltipText = newValue;
			} else {
				this.#tooltipText = '';
			}
		}
	}

	static get observedAttributes(){
		return ['tooltip-text'];
	}

	#render(){
		if(this.#tooltipVisible){
			if (this.hasAttribute('tooltip-text')) {
				this.#tooltipContainer = document.createElement('div');
				this.#tooltipContainer.textContent = this.#tooltipText;
				// this.#tooltipContainer.style.backgroundColor = 'rgba(0,0,0,0.5)';
				// this.#tooltipContainer.style.borderRadius = '5px';
				// this.#tooltipContainer.style.color = 'white';
				// this.#tooltipContainer.style.position = 'absolute';
				// this.#tooltipContainer.style.zIndex = '10';
				this.shadowRoot.appendChild(this.#tooltipContainer);
			} 
		}else{
			if (this.#tooltipContainer) {
				// this.shadowRoot.removeChild(this.#tooltipContainer);
				this.#tooltipContainer.remove();
			}	
		}

	}

	#showTooltip() {
		this.#tooltipVisible = true;
		this.#render();
	}

	#hideTooltip() {
		this.#tooltipVisible = false;
		this.#render();
	}
}

customElements.define('uc-tooltip', Tooltip);
