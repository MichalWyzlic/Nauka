'use strict'
function productDescription(strings, name, price){
	console.log(strings);
	console.log(name);
	console.log(price);
	let priceCategory = 'well priced';
	if(price >= 20){
		priceCategory = 'moderately priced'
	};

	return `${strings[0]}${name}${strings[1]}${priceCategory}${strings[2]}`;
}

const productName = 'Kilogram jablek';
const cena = 65;

const productOption = productDescription`This ${productName} is ${cena}`;
console.log(productOption);