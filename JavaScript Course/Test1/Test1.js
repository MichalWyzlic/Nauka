function findZigZagSequence(arr, n){
	arr.sort((a, b) => a - b);
	let temp = 0;
	let loopMax = Math.floor(arr.length/2);
	for(let i = 1; i < loopMax; i++){
		temp = arr[n-i];
		arr[n-1]=arr[i];
		arr[i]=temp;
	};
	return arr;
	
};

  

console.log(findZigZagSequence([2,3,5,1,4],5));
// console.log(findZigZagSequence());
// console.log(findZigZagSequence());
// console.log(findZigZagSequence());
// console.log(findZigZagSequence());
//console.log(0%3, 1%3, 2%3, 3%3 );


