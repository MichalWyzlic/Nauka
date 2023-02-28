'use strict'

function powerOf(x, n){
	if(n===1){
		return x;
	};
	return x * powerOf(x, n-1);
}

console.log(powerOf(2,5));



function smartSum(){
	let sum = 0;
	const myArray = [...arguments];
	myArray.forEach(element => {
		if(element instanceof Array){
			sum += smartSum(...element);
		} else {
			sum += element;
		};
		
	});
	return sum;
};

console.log(smartSum(1,2,[[3,4],5],6));