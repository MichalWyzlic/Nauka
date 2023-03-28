'use strict'

// function permutations(distance, n, arrayIn){

// 	let tempArray = new Array(n+1).fill(0);
// 	let result = [];
// 	let sum = 0;
// 	for(let i = 0; i < n; i++){
// 		tempArray[i] = arrayIn[i];
// 		sum += arrayIn[i];
// 	};
// 	tempArray[n] = distance - sum;
// 	if (tempArray[n] >= 0){
// 		if(result !== [] || tempArray[n] < result[n]){
// 			result = [...tempArray];
// 		};
// 	};
// };


// function permutate(start, index, n, intArray){

// }

// console.log(permutations(230, 3,[91, 74, 73, 85, 73, 81, 87]));

class Ship{
	constructor(direction, size, up, left){
		this.direction = direction;
		this.size = size;
		this.up = up;
		this.left = left;
	};
}

function validateBattlefield(field) {
	// write your magic here
	const myBattleField = new Array(10).fill(new Array(10).fill(0));
	let ships = new Array(4).fill(0);
	let previous = 0;

	function checkHorizontal(i,j){
		let count = 1;
		// myBattleField[i][j] = 1;
		// if (i < 9){
		// 	myBattleField[i+1][j] = 'x';
		// };
		// j++;
		while(j < 10 && count < 5){
			if (myBattleField[i][j] !== 0){
				return -1;
			};
			if (field[i][j] === 1) {
				count++;
				myBattleField[i][j] = `H${count}`;
				if (i < 9){
					myBattleField[i+1][j] = 'x';
				};
			} else {
				myBattleField[i][j] = `x`;
				if (i < 9){
					myBattleField[i+1][j] = 'x';
				};
				break;
			};
			j++;
		};
		
		return (count < 5) ? count : -1;
	};

	function checkVertical(i,j){
		let count = 1;
		// myBattleField[i][j] = 1;
		// if (i < 9){
		// 	myBattleField[i+1][j] = 'x';
		// };
		// j++;
		while(i < 10 && count < 5){
			if (myBattleField[i][j] !== 0){
				return -1;
			};
			if (field[i][j] === 1) {
				count++;
				myBattleField[i][j] = `V${count}`;
				if (j < 9){
					myBattleField[i][j+1] = 'x';
				};
			} else {
				myBattleField[i][j] = `x`;
				if (j < 9){
					myBattleField[i][j+1] = 'x';
				};
				break;
			};
			i++;
		};
		
		return (count < 5) ? count : -1;
	};

	let result = 0;

	for(let i = 0; i < 10; i++){
		for(let j = 0; j < 10; j++){
			if (myBattleField[i][j] === 0){ 
				if (field[i][j] === 1){
					myBattleField[i][j] = 1;
					if(i < 10 && (j === 9 || field[i][j+1] === 0)){
						result = checkVertical(i,j);
					} else if((i === 9 || field[i+1][j] === 0) && j < 10){
						result = checkHorizontal(i,j);
					} else {
						ships[0] += 'S1';
						result = 1;
					};
					if (result === -1){
						return false;
					};
					ships[result - 1] += 1;
				};
			} else if (field[i][j] === 1){
				return false;
			}	
			
			

			

		}
	}

  };

  console.log(validateBattlefield([
	[1, 0, 0, 0, 0, 1, 1, 0, 0, 0],
	[1, 0, 1, 0, 0, 0, 0, 0, 1, 0],
	[1, 0, 1, 0, 1, 1, 1, 0, 1, 0],
	[1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
	[0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
	[0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
]));