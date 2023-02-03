'use strict';
// let tempString = 'abcdefg';
// const testInput =[1,62,14];
// function legoBlocks(h, w) {
//     // Write your code here
// 	function tetranacci(n){

// 	}

// }


function tetranacci(n){
	let f = [[0],[0],[0],[1],[1]];
	if(n<=4){
		return f[0][n];
	}
	for(let i=5; i <= n; i++){
		const resultRow = (i) % 5;
		const n1Row = (i+4) % 5;
		const n2Row = (i+3) % 5;
		const n3Row = (i+2) % 5;
		const n4Row = (i+1) % 5;
		let sum = 0;
		for(let j=0; j < f[resultRow].length; j++){
			sum = f[n1Row][j]+f[n2Row][j]+f[n3Row][j]+f[n4Row][j]+sum;
			f[resultRow][j] = sum % 1000000000000000;
			sum = Math.floor(sum/1000000000000000);
		};
		if(sum > 0){
			f[resultRow].push(sum);
			f[n1Row].push(0);
			f[n2Row].push(0);
			f[n3Row].push(0);
			f[n4Row].push(0);
			sum = 0;
		};
	};
	return f[n % 5];
};

console.log(tetranacci(7));
console.log(tetranacci(10));
console.log(tetranacci(1000));



