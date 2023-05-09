class DynamicParagraph extends HTMLElement {
	#showButtonEl;
	#dynamicParagraphEl;
	#paragraphText;
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
		// const template = document.querySelector('#tooltip-template');
		// this.shadowRoot.appendChild(template.content.cloneNode(true));
		this.shadowRoot.innerHTML = `
				<div>
					<button>Show</button>
					<p id="info-box" style="display: none;"><slot></slot></p>
				</div>
				`;
	}

	connectedCallback() {
		this.#showButtonEl = this.shadowRoot.querySelector('button');
		//tooltipIcon.textContent = '(?)';
		this.#dynamicParagraphEl = this.shadowRoot.getElementById('info-box');
		if(this.getAttribute('is-visible') === 'true'){
			this.#dynamicParagraphEl.style.display = 'block';
			this.#showButtonEl.textContent = 'Hide';
		} else {
			this.#dynamicParagraphEl.style.display = 'none';
			this.#showButtonEl.textContent = 'Show';
		}
		//this.#dynamicParagraphEl.textContent = this.getAttribute('paragraph-text');
		this.#showButtonEl.addEventListener(
			'click',
			this.#buttonHandler.bind(this)
		);
		this.style.position = 'relative';
	}

	#buttonHandler(event){
		if(this.#dynamicParagraphEl.style.display === 'none'){
			this.#dynamicParagraphEl.style.display = 'block';
			this.#showButtonEl.textContent = 'Hide';
		} else {
			this.#dynamicParagraphEl.style.display = 'none';
			this.#showButtonEl.textContent = 'Show';
		}

	}

	#hideParagraph(){

	}
}

customElements.define('uc-dynamic-paragraph', DynamicParagraph);
