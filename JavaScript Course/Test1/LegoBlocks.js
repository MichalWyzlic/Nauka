'use strict';
// let tempString = 'abcdefg';
// const testInput =[1,62,14];
// function legoBlocks(h, w) {
//     // Write your code here
// 	function tetranacci(n){

// 	}

// }


// function legoBlocks(height, width){
// 	//n = Math.max(0, n - 3);
// 	const mod = 1000000007;
// 	// t index  0   1   2   3   4   5   6   7
// 	//let f = [[0],[0],[0],[1],[1],[2],[4],[8]];
// 	// n = index - 3 => min index = 4
// 	const t = [1,1,2,4,8];
// 	for(let i=5; i <= width; i++){
// 		t[i] = (t[i-1] + t[i-2] + t[i-3] + t[i-4]) % mod;
// 	};

// 	const solid = [0,1];
// 	const all = [0,1];
// 	let sum = 0;
// 	for(let i = 2; i <= width; i++){
// 		//calculate all walls with modulo 
// 		all[i] = 1;
// 		for(let j = 1; j <= height; j++){
// 			all[i] *= t[i];
// 			all[i] %= mod;
// 		};

// 		// all[i] = 1;
// 		// for(let j = 1; j <= height; j++){
// 		// 	all[i] *= t[i];
// 		// 	all[i] %= mod;
// 		// };
// 	// };
// 	// for(let i = 1; i <= width; i++){
// 	// 	for(let j = 1; j < i; j++){
// 	// 		solid[i] += mod;
// 	// 		solid[i] -= (solid[j]*all[i-j]) % mod;
// 	// 	};
// 	// 	// = all[i] - sum;
// 	};
// 	for(let i = 2; i <= width; i++){
// 		sum = 0;
// 		for(let j = 1; j < i; j++){
// 			sum += solid[j]*all[i-j];
// 			sum %= mod;
// 		};
// 		solid[i] = (all[i] - sum) % mod;
// 	};

// 	while(solid[width] < 0)
//     {
//         solid[width] += mod;
//     }
// 	return solid[width];
// };


function legoBlocks(height, width){
	const mod = 1000000007n;
	const t = [1n,1n,2n,4n,8n];
	const solid = [0n,1n];
	const all = [0n,1n];
	for(let i=2; i <= width; i++){
		if(i > 4){
			t[i] = (t[i-1] + t[i-2] + t[i-3] + t[i-4]);
		};
		all[i] = 1n;
		for(let j = 1; j <= height; j++){
			all[i] *= t[i];
			all[i] %= mod;
		};

		solid[i] = all[i] + mod;
		for(let j = 1; j < i; j++){
			solid[i] -= (solid[j]*all[i-j])%mod;
			solid[i] += mod;
		};
	};
	return Number(solid[width] % mod);
};



// function legoBlocks(n, m) {
//     // Write your code here
//     var mod = BigInt(Math.pow(10, 9) + 7);
//     var oneFloor = [];
//     var dirtyMultiFloor = [];
//     var cleanMultiFloor = [];

//     oneFloor = [0n, 1n, 2n, 4n, 8n];

//     for (let width = 1; width <= m; width++) {
//         if (width > 4) {
//             oneFloor[width] = (oneFloor[width - 1] + oneFloor[width - 2] + oneFloor[width - 3] + oneFloor[width - 4]) % mod;
//         }

//         dirtyMultiFloor[width] = 1n;
//         for (let k = 0; k < n; k++) {
//             dirtyMultiFloor[width] *= oneFloor[width];
//             dirtyMultiFloor[width] %= mod;
//         }
//     }


//     for (let width = 1; width <= m; width++) {
//         cleanMultiFloor[width] = dirtyMultiFloor[width] + mod;
//         for (let k = 1; k < width; k++) {
//             cleanMultiFloor[width] -= (cleanMultiFloor[k] * dirtyMultiFloor[width - k]) % mod;
//             cleanMultiFloor[width] += mod;
//         }
//     }

//     return Number(cleanMultiFloor[m] % mod;
// }


// console.log(legoBlocks(2,2));
// console.log(legoBlocks(2,3));
// console.log(legoBlocks(3,2));
// console.log(legoBlocks(4,4));




console.log(legoBlocks(529,190));
console.log(legoBlocks(873,909));
console.log(legoBlocks(959,499));
console.log(legoBlocks(37,809));
console.log(legoBlocks(754,249));
console.log(legoBlocks(304,334));




