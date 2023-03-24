console.log(document.cookie);

const storeBtn = document.getElementById('store-btn');
const retrBtn = document.getElementById('retrieve-btn');
/**A variable holding access to the local database*/
let db;

const dbRequest = indexedDB.open('StorageDummy', 1);

dbRequest.addEventListener('success', function (event) {
	db = event.target.result;
});

dbRequest.addEventListener('upgradeneeded', function (event) {
	db = event.target.result;

	const objStore = db.createObjectStore('products', { keyPath: 'id' });
	objStore.transaction.addEventListener('complete', function (event) {
		const productsStore = db
			.transaction('products', 'readwrite')
			.objectStore('products');
		productsStore.add({
			id: 'p1',
			title: 'The first product',
			price: 12.99,
			tags: ['Expensive', 'Luxury']
		});
	});
});

dbRequest.addEventListener('error', function (event) {
	console.log('ERROR!');
});

const userId = 'u123';
const user = {
	name: 'Max',
	age: 30,
	hobbies: ['Sports', 'Cooking']
};

storeBtn.addEventListener('click', () => {
	if (!db) {
		return;
	};
	const productsStore = db
		.transaction('products', 'readwrite')
		.objectStore('products');
	productsStore.add({
		id: 'p2',
		title: 'The second product',
		price: 8.99,
		tags: ['Cheap', 'Standard']
	});
});

retrBtn.addEventListener('click', () => {
	if (!db) {
		return;
	};
	const productsStore = db
		.transaction('products', 'readwrite')
		.objectStore('products');
	const request = productsStore.get('p2');

	request.addEventListener('success', function(){
		console.log(request.result);
	});

	request.addEventListener('error', function (event) {
		console.log('ERROR!');
	});

});
