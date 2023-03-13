'use strict'

function permutations(distance, n, arrayIn){

	let tempArray = new Array(n+1).fill(0);
	let result = [];
	let sum = 0;
	for(let i = 0; i < n; i++){
		tempArray[i] = arrayIn[i];
		sum += arrayIn[i];
	};
	tempArray[n] = distance - sum;
	if (tempArray[n] >= 0){
		if(result !== [] || tempArray[n] < result[n]){
			result = [...tempArray];
		};
	};
};


function permutate(start, index, n, intArray){

}

console.log(permutations(230, 3,[91, 74, 73, 85, 73, 81, 87]));

