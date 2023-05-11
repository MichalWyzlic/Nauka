class Modal extends HTMLElement {
	isOpened = false;

	constructor() {
		super();

		this.attachShadow({ mode: 'open' });
		this.shadowRoot.innerHTML = `
			<style>
				#backdrop {
					position: fixed;
					top: 0;
					left: 0;
					width: 100%;
					height: 100vh;
					background: rgba(0,0,0,0.75);
					z-index: 10;
					opacity: 0;
					pointer-events: none;
					
				}

				#modal {
					position: fixed;
					top: 10vh;
					left: 25%;
					width: 50%;
					z-index: 100;
					border-radius: 5px;
					background: white;
					box-shadow: 8px 8px 8px rgba(255,255,255,0.26);
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					opacity: 0;
					pointer-events: none;
					transition: all 0.3s ease-out;
					
				}

				:host([opened]) #backdrop,
				:host([opened]) #modal{
					opacity: 1;
					pointer-events: all;
				}

				:host([opened]) #modal{
					top: 15vh;
				}

				header {
					padding: 1rem;
					border-bottom: 1px solid #ccc;
				}

				::slotted(h1) {
					font-size: 1.25rem;
					margin: 0;
				}

				#main {
					padding: 1rem;
				}

				#actions{
					border-top: 1px solid #ccc;
					padding: 1rem;
					display: flex;
					justify-content: flex-end;
				}

				#actions button{
					margin: 0 0.25rem;
				}
			</style>
			<div id="backdrop">
			</div>
			<div id="modal">
				<header>
					<slot name="title"></slot>
				</header>
				<section id="main">
					<slot></slot>
				</section>
				<section id="actions">
					<button id="cancel-btn">Cancel</button>
					<button id="confirm-btn">OK</button>
				</section>
			</div>
		`;
		const slots = this.shadowRoot.querySelectorAll('slot');
		slots[1].addEventListener('slotchange', event => {
			console.dir(slots[1].assignedNodes());
		});

		const cancelButton = this.shadowRoot.querySelector('#cancel-btn');
		const confirmButton = this.shadowRoot.querySelector('#confirm-btn');
		const backdrop = this.shadowRoot.querySelector('#backdrop');

		cancelButton.addEventListener('click', this.#cancel.bind(this));
		confirmButton.addEventListener('click', this.#confirm.bind(this));
		backdrop.addEventListener('click', this.#cancel.bind(this));
	}

	attributeChangedCallback(name, oldValue, newValue) {
		if (this.hasAttribute('opened')) {
			this.isOpened = true;
		// const backdrop = this.shadowRoot.querySelector('#backdrop');
		// const modal = this.shadowRoot.querySelector('#modal');
		// if (this.hasAttribute('opened')) {
		// 	backdrop.style.opacity = 1;
		// 	backdrop.style.pointerEvents = 'all';
		// 	modal.style.opacity = 1;
		// 	modal.style.pointerEvents = 'all';
		} else {
			this.isOpened = false;
			// backdrop.style.opacity = 0;
			// backdrop.style.pointerEvents = 'none';
			// modal.style.opacity = 0;
			// modal.style.pointerEvents = 'none';
		}
	
	}

	static get observedAttributes() {
		return ['opened'];
	}

	open(){
		this.setAttribute('opened', '');
	}

	hide(){
		if(this.hasAttribute('opened')){
			this.removeAttribute('opened');
		}
	}

	#cancel(event){
		this.hide();
		const cancelEvent = new Event('cancel', {bubbles: true, composed: true});
		event.target.dispatchEvent(cancelEvent);
	}

	#confirm(event){
		this.hide();
		const confirmEvent = new Event('confirm');
		this.dispatchEvent(confirmEvent);
	}
}

customElements.define('uc-modal', Modal);
