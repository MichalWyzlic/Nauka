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

class ProductItem{
	constructor(product){
		this.product = product;
	}

	addToCartHandler(){
		console.log('Adding product to cart...');
		console.log(this.product);
	}

	render(){
		const prodEl = document.createElement('li');
		prodEl.className = 'product-item';
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
		return prodEl;
	};
};

class ProductList {
	products = [
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

	constructor(){};

	render() {
		const renderHook = document.getElementById('app');
		const prodList = document.createElement('ul');
		prodList.className = 'product-list';
		for(const prod of this.products){
			const productItem = new ProductItem(prod);
			const prodEl = productItem.render();
			prodList.append(prodEl);
		};
		renderHook.append(prodList);
	};
};


const productList = new ProductList();
productList.render();