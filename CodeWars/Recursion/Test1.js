// function checkWord(board, word) {
// 	//find a starting point
// 	let width = board[0].length;
// 	let xIndex = 0;
// 	let height = board.length;
// 	let yIndex = 0;
// 	for(yIndex = 0; yIndex < height; yIndex++){
// 		for(xIndex = 0; xIndex < width; xIndex++){
// 			if(board[yIndex][xIndex] === word[0]){
// 				if(recursion(xIndex,yIndex,1,[xIndex, yIndex])) return true;
// 			}
// 		}
// 	}

// 	return false;

// 	function recursion(x, y, lIndex, resIndices){
// 		if(lIndex >= word.length) return true;

// 		//check for neighbour
// 		for(let yy = Math.max(0, y - 1); yy <= Math.min(height - 1, y + 1); yy++ ){
// 			for(let xx = Math.max(0, x - 1); xx <= Math.min(width - 1, x + 1); xx++ ){
// 				if(!(x === xx && y === yy) && board[yy][xx] === word[lIndex]){
// 					let result = true;
// 					for(let i = 0; i < resIndices.length; i+=2){
// 						if(resIndices[i] === xx && resIndices[i+1] === yy){
// 							result = false;
// 							break;
// 						}
// 					}
// 					if(result){
// 						if(recursion(xx, yy, lIndex + 1, [...resIndices, xx, yy])) return true;
// 					}
// 				}
// 			}
// 		}
// 		return false;
// 	}
// }

// var testBoard = [
// 	['E', 'A', 'R', 'A'],
// 	['N', 'L', 'E', 'C'],
// 	['I', 'A', 'I', 'S'],
// 	['B', 'Y', 'O', 'R']
// ];

// console.log(checkWord(testBoard, 'C') == true);
// console.log(checkWord(testBoard, 'EAR') == true);
// console.log(checkWord(testBoard, 'EARS') == false);
// console.log(checkWord(testBoard, 'BAILER') == true);
// console.log(
// 	checkWord(testBoard, 'RSCAREIOYBAILNEA') == true,
// 	'Must be able to check indefinite word lengths going in all directions'
// );
// console.log(
// 	checkWord(testBoard, 'CEREAL') == false,
// 	"Valid guesses can't overlap themselves"
// );
// console.log(
// 	checkWord(testBoard, 'ROBES') == false,
// 	'Valid guesses have to be adjacent'
// );
// console.log(
// 	checkWord(testBoard, 'BAKER') == false,
// 	'All the letters have to be in the board'
// );
// console.log(
// 	checkWord(testBoard, 'CARS') == false,
// 	'Valid guesses cannot wrap around the edges of the board'
// );

// // calculate resistance of circuit
// function calculateResistance(circuit) {
// 	// do this if a short circuit is encountered
// 	// throw new Error("Short Circuit!");
// 	// do this if a broken circuit is encountered
// 	// throw new Error("Broken Circuit!");

// 	function recursion(cir) {
// 		let isSeries = cir[0];
// 		if (cir.length === 1) return isSeries ? 0 : Infinity;
// 		let value = 0;
// 		let resistance = 0;
// 		let index = 1;
// 		while (index < cir.length) {
// 			if (cir[index] instanceof Array) {
// 				value = recursion(cir[index]);
// 			} else {
// 				value = cir[index];
// 			}
// 			if (isSeries) {
// 				if (value === Infinity) {
// 					return Infinity;
// 				}
// 				resistance += value;
// 			} else {
// 				if (value === 0) {
// 					return 0;
// 				} else if (value !== Infinity) {
// 					resistance += 1 / value;
// 				}
// 			}

// 			index++;
// 		}

// 		if (isSeries) {
// 			return resistance;
// 		} else {
// 			if (resistance === 0) return Infinity;
// 			return 1 / resistance;
// 		}
// 	}

// 	let value = recursion(circuit);
// 	if (value === 0) {
// 		throw new Error('Short Circuit!');
// 	} else if (value === Infinity) {
// 		throw new Error('Broken Circuit!');
// 	}

// 	return value;
// }

// let testCircuit1 = [
// 	true, // series
// 	20, // 20Ω resistor
// 	[
// 		false, // parallel
// 		[
// 			true, // series
// 			30, // 30Ω resistor
// 			40 // 40Ω resistor
// 		],
// 		30 // 30Ω resistor
// 	],
// 	60 // 60Ω resistor
// ];

// let testCircuit2 = [
// 	true, // series
// 	10, // 10Ω resistor
// 	[
// 		false, // parallel
// 		[
// 			false // parallel, broken circuit
// 		],
// 		[
// 			false // parallel, broken circuit
// 		]
// 	]
// ];

// console.log(calculateResistance(testCircuit1));
// console.log(calculateResistance(testCircuit2));

// input: Number, output: BigInt
const primeNum = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31];
function findNextPrimeNum() {
	let sixMul = Math.floor((primeNum[primeNum.length - 1] + 1) / 6);
	let numToCheck = sixMul * 6 + 1;
	let higher = true;
	if (numToCheck === primeNum[primeNum.length - 1]) {
		numToCheck += 4;
		sixMul++;
		higher = false;
	}

	while (true) {
		let i = 0;
		let hasADivisor = false;
		while (
			primeNum[i] <= Math.floor(Math.sqrt(numToCheck)) &&
			!hasADivisor &&
			i < primeNum.length
		) {
			hasADivisor = numToCheck % primeNum[i] === 0;
			i++;
		}
		if (!hasADivisor) break;
		if (higher) {
			sixMul++;
			numToCheck += 4;
			higher = false;
		} else {
			numToCheck += 2;
			higher = true;
		}
	}

	primeNum.push(numToCheck);
}

function f(d) {
	const dDividers = [];
	let number = d;
	let i = 0;
	while (number > 1 && primeNum[i] <= number) {
		if (number % primeNum[i] === 0) {
			dDividers.push(primeNum[i]);
			number /= primeNum[i];
		} else {
			i++;
			if (i >= primeNum.length) findNextPrimeNum();
		}
	}
	console.log(d);
	console.log(dDividers);

	function recursion(div){
		
	}
	
	function calculateValue(div) {
		let i = 0;
		let value = BigInt(1);
		while (i < div.length) {
			value *= BigInt(primeNum[i]) ** BigInt(div[div.length-1-i] - 1);
			i++;
		}
		return value;
	}
}
