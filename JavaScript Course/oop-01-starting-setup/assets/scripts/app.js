'use strict'
class Product{
	title = 'DEFAULT';
	imageUrl;
	price;
	description;
	
	constructor(title, image, desc, price) {
		this.title = title;
		this.imageUrl = image;
		this.description = desc;
		this.price = price;
	}
};

class ElementAttribute{
	constructor(attrName, attrValue){
		this.name = attrName;
		this.value = attrValue;
	} 
}

class Component {
	constructor(renderHookId, shouldRender = true){
		this.hookId = renderHookId;
		if(shouldRender){
			this.render();
		};
	};

	render(){};
	createRootElement(tag, cssClasses, attributes){
		const rootElement = document.createElement(tag);
		if(cssClasses){
			rootElement.className = cssClasses;
		};

		if(attributes && attributes.length > 0){
			for(const attr of attributes){
				rootElement.setAttribute(attr.name, attr.value);
			}
		}

		document.getElementById(this.hookId).append(rootElement);
		return rootElement;
	};
}

class ShoppingCart extends Component {
	items = [];

	set cartItems(value){
		this.items = value;
		this.totalOutput.innerHTML = `<h2>Total: \$${this.totalAmount.toFixed(2)}</h2>`;

	}

	get totalAmount() {
		const sum = this.items.reduce(
			(prevValue, currentItem) => prevValue + currentItem.price, 
			0
		);
		return sum;
	}

	constructor(renderHookId){
		super(renderHookId,false);
		this.orderProducts = () => {
		console.log('Ordering ...');
		console.log(this.items);
		};
		this.render();
	}

	addProduct(product){
		const updatedItems = [...this.items];
		updatedItems.push(product);
		this.cartItems = updatedItems;
	};

	

	render(){
		const cartEl = this.createRootElement('section', 'cart');
		cartEl.innerHTML=`
			<h2>Total \$${0}</h2>
			<button>Order Now!</button>
		`;
		const orderButton = cartEl.querySelector('button');
		//orderButton.addEventListener('click', this.orderProducts.bind(this));
		orderButton.addEventListener('click', this.orderProducts);
		this.totalOutput = cartEl.querySelector('h2');
	}
}

class ProductItem extends Component {
	constructor(product, renderHookId){
		super(renderHookId,false);
		this.product = product;
		this.render();
	}

	addToCartHandler(){
		App.addProductToCart(this.product);
	}

	render(){
		const prodEl = this.createRootElement('li','product-item');
		prodEl.innerHTML =`
			<div>
				<img src="${this.product.imageUrl}" alt="${this.product.title}">
				<div class="product-item__content">
					<h2>${this.product.title}</h2>
					<h3>\$${this.product.price}</h3>
					<p>${this.product.description}</p>
					<button>Add to Cart</button>
				</div>
			</div>
			`;
		const addCartButton = prodEl.querySelector('button');
		addCartButton.addEventListener('click', this.addToCartHandler.bind(this));
	};
};

class ProductList extends Component {
	#products = [];

	constructor(renderHookId){
		super(renderHookId, false);
		this.render();
		this.#fetchProducts();
		
	};

	#fetchProducts(){
		this.#products = [
			new Product('A Pillow',
					'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.04Ttowe8HEE2Ob7xmxyxRgHaEJ%26pid%3DApi&f=1&ipt=cc717073e1648e6b629fa211f55bb4aba05245dc0fcb7a99104950bb97014074&ipo=images',
					'A soft pillow!',
					19.99
					),
			new Product('A Carpet',
					'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.V25Z6qAaXbNq8Y50ExnL8AAAAA%26pid%3DApi&f=1&ipt=774579234789f711d5a89d6b11d17b14c8192c62a59962d369013d4431863d4e&ipo=images',
					'A carpet that you might like - or not.',
					89.99
					)
		];
		this.#renderProducts();
	};

	#renderProducts(){
		for(const prod of this.#products){
			new ProductItem(prod, 'prod-list');
		};
	};

	render() {
		const prodList = this.createRootElement('ul', 'product-list', [new ElementAttribute('id', 'prod-list')]);
		if(this.#products && this.#products.length > 0){
			this.renderProducts();
		}
	};
};


class Shop extends Component{
	constructor(){
		super();
	};
	render(){		
		this.cart = new ShoppingCart('app');
		new ProductList('app');
	};
}

class App{
	static init(){
		const shop = new Shop();
		this.cart = shop.cart;
	}

	static addProductToCart(product){
		this.cart.addProduct(product);
	}
}

App.init();
