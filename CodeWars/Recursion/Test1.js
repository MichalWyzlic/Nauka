// Ackermann = function(m,n) {
// 	if(m === 0) return n+1;
// 	if(m > 0 && n === 0) return Ackermann(m - 1, 1);
// 	return Ackermann(m - 1, Ackermann(m, n-1));
// }

// console.log(Ackermann(1,1));
// console.log(Ackermann(4,0));

// function restoreBrackets(s) {
// 	s.toLowerCase();
// 	if(s.length <= 2) return s;
// 	if(s.charAt(0) === '[') return '['.concat(restoreBrackets(s.slice(1))).concat(']');
// 	if(s.charAt(0) != '[' && s.charAt(1) != '[')  return s.slice(0, 2).concat(']').concat(restoreBrackets(s.slice(2)));
// 	return s.slice(0, 1).concat('[').concat(restoreBrackets(s.slice(2))).concat(']');
// }

// function restoreBrackets(str, i = 0) {
// 	let result = '';

// 	function helper(s, left = true){
// 		if(s.length <= 1) {
// 			result += s;
// 			if(!left) {
// 				result += ']';
// 			}
// 			return '';
// 		}
// 		//open next level
// 		if(s.charAt(0) === '[') {
// 			result += '[';
// 			let right = helper(s.slice(1), true);
// 			let reminder = helper(right, false);
// 			if(!left) {
// 				result += ']';
// 				return reminder;
// 			}
// 			return helper(reminder, !left);

// 		}

// 		if(left){
// 			result += s.charAt(0);
// 			if(s.charAt(1) === '[') return helper(s.slice(2), true);
// 			return s.slice(1);
// 		}  else {
// 			result += s.charAt(0);
// 			result +=']';
// 			return s.slice(1);
// 		}
// 	}

// 	helper(str, true);
// 	return result;

// }

// function restoreBrackets(str, i = 0) {
// 	let result = '';

// 	function helper(s, left = true){
// 		if(s.length <= 1) {
// 			// if(!left) {
// 			// 	result += ']';
// 			// }
// 			result += s;
// 			return {str: s, remainder: ''};
// 		}
// 		//open next level
// 		if(s.charAt(0) === '[') {
// 			result += '[';
// 			let leftStr = helper(s.slice(1), true);
// 			result += leftStr.str;
// 			let rightStr = helper(leftStr.remainder, false);
// 			result += rightStr.str + ']';
// 			if(!left) {
// 				result += ']';
// 			}
// 			if(rightStr.remainder.length > 0){
// 				return helper(rightStr.remainder, !left);
// 			} else {
// 				return {str: '', remainder: ''};
// 			}

// 		}

// 		//if(left){
// 			return {str: s.charAt(0), remainder: s.slice(1)};
// 		// }  else {
// 		// 	result += s.charAt(0);
// 		// 	result +=']';
// 		// 	return s.slice(1);
// 		// }
// 	}

// 	helper(str, true);
// 	return result;

// }

// function restoreBrackets(str, i = 0) {
// 	let result = [];

// 	function helper(s, arr, i = 0){
// 		if(s.length === 0) {
// 			return '';
// 		}
// 		//open next level
// 		if(s.charAt(0) === '[') {
// 			arr[i] = [];
// 			//left side
// 			let remainder = helper(s.slice(1), arr[i], 0);
// 			//right side
// 			remainder = helper(remainder, arr[i], 1);
// 			return remainder;
// 		}

// 		arr[i] = s.charAt(0);
// 			return s.slice(1);
// 	}

// 	function flattenArr(arr){
// 		let str = '';
// 		if(arr.length === 0) return str;
// 		if(Array.isArray(arr[0])){
// 			str += '[' + flattenArr(arr[0]) + ']';
// 		} else {
// 			str += arr[0];
// 		}
// 		if(arr.length > 1 ){
// 			if(Array.isArray(arr[1])){
// 				str += '[' + flattenArr(arr[1]) + ']';
// 			} else {
// 				str += arr[1];
// 			}
// 		}
// 		return str;
// 	}

// 	helper(str, result, 0);

// 	return flattenArr(result);

// }

// function restoreBrackets(str){
// 	let i = 0;
// 	function helper(){
// 		let char = str.charAt(i)
// 		i++;
// 		if(char === '['){
// 			return ('[' + helper() + helper() + ']');
// 		}
// 		return char;
// 	}
// 	return helper();
// }

// console.log(restoreBrackets("[c[o[d[e[w[a[rs")); // "[c[o[d[e[w[a[rs]]]]]]]"],
// console.log(restoreBrackets("[[[Co[de[[wa[rs")); // "[[[Co][de]][[wa][rs]]]"],
// console.log(restoreBrackets("[[[[[[[codewars")); // "[[[[[[[co]d]e]w]a]r]s]"],

// function encode(string) {
// 	function helper(str) {
// 		if (str.length <= 1) return str;

// 		//test for identical characters
// 		let i = 1;
// 		while (i < str.length) {
// 			if (str.charAt(i - 1) != str.charAt(i)) break;
// 			i++;
// 		}
// 		if (i === str.length) return str.charAt(0);

// 		let midPoint = Math.floor(str.length / 2);
// 		return (
// 			'[' +
// 			helper(str.slice(0, midPoint)) +
// 			helper(str.slice(midPoint)) +
// 			']'
// 		);
// 	}
// 	return string.length.toString() + ',' + helper(string);
// }

// function decode(code) {
// 	let inputLen = 0;
// 	let inputStr = '';
// 	for(let i = 1; i < code.length -1; i++){
// 		if(code.charAt(i) === ',') {
// 			inputLen = +code.slice(0,i);
// 			inputStr = code.slice(i + 1);
// 			break;
// 		}
// 	}
// 	function helper(str, len) {
// 		if ((len <= 1)) return str;
// 		if ((str.length === 1)) return str.repeat(len);
// 		let midPoint = Math.floor(len / 2);
// 		// two sides of the string are characters
// 		if (str.charAt(1) != '[' && str.charAt(str.length - 2) != ']') {
// 			return (
// 				str.charAt(1).repeat(midPoint) +
// 				str.charAt(str.length - 2).repeat(len - midPoint)
// 			);
// 		}
// 		// the left side is an array, the right is a character
// 		if (str.charAt(1) === '['  && str.charAt(str.length - 2) != ']') {
// 			return (
// 				helper(str.slice(1, -2), midPoint) +
// 				str.charAt(str.length - 2).repeat(len - midPoint)
// 			);
// 		}
// 		// the right side is an array, the left is a character
// 		if (str.charAt(1) != '[' && str.charAt(str.length - 2) === ']') {
// 			return (
// 				str.charAt(1).repeat(midPoint) +
// 				helper(str.slice(2, -1), len - midPoint)
// 			);
// 		}
// 		// two sides of the string are arrays
// 		let counter = 0;
// 		let i;
// 		for(i = 1; i < str.length -2; i++){
// 			if(str.charAt(i) === '[') counter++;
// 			if(str.charAt(i) === ']') counter--;
// 			if(counter === 0) break;
// 		}
// 		return (
// 			helper(str.slice(1, i + 1), Math.floor(len/2)) + helper(str.slice(i + 1, -1), Math.ceil(len/2))
// 		);
// 	}
// 	return helper(inputStr, inputLen);
// }

// console.log(encode('')); // "0," );
// console.log(encode('x')); // "1,x" );
// console.log(encode('xx')); // "2,x" );
// console.log(encode('xyy')); // "3,[xy]" );
// console.log(encode('xyyy')); // "4,[[xy]y]" );
// console.log(encode('xxxxyyyy')); // "8,[xy]" );
// console.log(encode('xyyyyyyy')); // "8,[[[xy]y]y]" );
// console.log(encode('xxxxxxxy')); // "8,[x[x[xy]]]" );
// console.log(encode('111111222')); // "9,[1[12]]" );
// console.log(encode('Codewars')); // "8,[[[Co][de]][[wa][rs]]]" );
// console.log(encode('a,b,c')); // "5,[[a,][b[,c]]]" );

// console.log(decode('0,')); // "" );
// console.log(decode('1,x')); // "x" );
// console.log(decode('2,x')); // "xx" );
// console.log(decode('3,[xy]')); // "xyy" );
// console.log(decode('4,[[xy]y]')); // "xyyy" );
// console.log(decode('8,[xy]')); // "xxxxyyyy" );
// console.log(decode('8,[[[xy]y]y]')); // "xyyyyyyy" );
// console.log(decode('8,[x[x[xy]]]')); // "xxxxxxxy" );
// console.log(decode('9,[1[12]]')); // "111111222" );
// console.log(decode('8,[[[Co][de]][[wa][rs]]]')); // "Codewars" );
// console.log(decode('5,[[a,][b[,c]]]')); // "a,b,c" );

let primeNumbers = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43];

//find all prime numbers up to the search limit
function findPrime(searchLimit) {
	//let searchLimit = Math.floor(Math.sqrt(n));
	if (searchLimit <= primeNumbers[primeNumbers.length - 1]) return;
	//next prime candidate
	let i = primeNumbers[primeNumbers.length - 1] + 4;

	//check if the num is divisible by any number in the primeNumbers table
	function check(num) {
		let limit = Math.floor(Math.sqrt(num));
		for (let i = 0; primeNumbers[i] <= limit; i++) {
			if (num % primeNumbers[i] === 0) return false;
		}
		return true;
	}
	while (i < searchLimit) {
		if (check(i)) primeNumbers.push(i);
		i += 2;
		if (check(i)) primeNumbers.push(i);
		i += 4;
	}
}

function findAllDenominators(num) {
	let searchLimit = Math.floor(Math.sqrt(num));
	if (searchLimit > primeNumbers[primeNumbers.length - 1])
		findPrime(searchLimit);
	let results = [];

	function recursion(num) {
		if (num === 1) return;
		let i = 0;
		while (primeNumbers[i] < searchLimit) {
			if (num % primeNumbers[i] === 0) {
				results.push(primeNumbers[i]);
				recursion(num / primeNumbers[i]);
				break;
			}
			i++;
		}
	}

	recursion(num);

	return results;
}

function mapAllDenominators(num) {
	let searchLimit = Math.floor(Math.sqrt(num));
	if (searchLimit > primeNumbers[primeNumbers.length - 1])
		findPrime(searchLimit);
	let results = new Map();
	// let results = new Map([
	// 	[2, 0],
	// 	[3, 0],
	// 	[5, 0],
	// 	[7, 0],
	// 	[11, 0],
	// 	[13, 0]//,
	// //	[17, 0],
	// //	[19, 0]
	// ]);

	function recursion(num) {
		if (num === 1) return;
		let i = 0;
		while (primeNumbers[i] < searchLimit) {
			if (num % primeNumbers[i] === 0) {
				results.set(
					primeNumbers[i],
					results.has(primeNumbers[i])
						? results.get(primeNumbers[i]) + 1
						: 1
				);
				recursion(num / primeNumbers[i]);
				break;
			}
			i++;
		}
	}

	recursion(num);

	return results;
}

const possibleQuartets = [[2, 2, 2, 2]];

const possibleTrios = [
	[2, 2, 2],
	[2, 2, 3],
	[2, 2, 5],
	[2, 3, 3]
];

const possiblePairs = [
	[2, 2],
	[2, 3],
	[2, 5],
	[2, 7],
	[3, 3],
	[3, 5]
];

const possibleSingles = [[3], [5], [7], [11], [13], [17], [19]];

//Use a Map to store the results of the recursive function

function findSets(arr) {
	let n = arr.reduce((prev, curr) => prev * curr, 1);
	//Map of denominators
	let denominators = mapAllDenominators(n);
	//Array of maps
	let solutionIndex = 0;
	let results = [[]];
	

	function findCombinations(mapDenom, tempResults = []) {
		//end of the array
		if (mapDenom.size === 0) {
			results[solutionIndex] = tempResults;
			solutionIndex++;
			return;
		}
		//if there is uneven 2 at the end -> there is no solution
		if (mapDenom.size === 1 && mapDenom.get(2) === 1) {
			results[solutionIndex] = [];
			return;
		}
		//single elements greater than 2
		if (mapDenom.size > 1 || !mapDenom.has(2)) {
			mapDenom.forEach((value, key) => {
				if (key !== 2) {
					tempResults.push(key);
					let newMap = new Map(mapDenom);
					value > 1 ? newMap.set(key, value - 1) : newMap.delete(key);
					findCombinations(newMap, [...tempResults]);
				}
			});
		}

		//at least two elements and the multiplication can be smaller than 20
		//all the possibilities are held in the possiblePairs array
		possiblePairs.forEach((pair) => {
			let newMap = new Map(mapDenom);
			if (newMap.has(pair[0])) {
				let key = pair[0];
				let value = newMap.get(key);
				value > 1 ? newMap.set(key, value - 1) : newMap.delete(key);

				if (newMap.has(pair[1])) {
					let key = pair[1];
					let value = newMap.get(key);
					value > 1
						? newMap.set(key, value - 1)
						: newMap.delete(key);

					//update the results
					tempResults.push(pair[0] * pair[1]);
					findCombinations(newMap, [...tempResults]);
				}
			}
		});


		//at least three elements and the multiplication can be smaller than 20
		//all the possibilities are held in the possibleTrios array
		possibleTrios.forEach((trio) => {
			let newMap = new Map(mapDenom);
			if (newMap.has(trio[0])) {
				let key = trio[0];
				let value = newMap.get(key);
				value > 1 ? newMap.set(key, value - 1) : newMap.delete(key);

				if (newMap.has(trio[1])) {
					let key = trio[1];
					let value = newMap.get(key);
					value > 1
						? newMap.set(key, value - 1)
						: newMap.delete(key);

					if (newMap.has(trio[2])) {
						let key = trio[2];
						let value = newMap.get(key);
						value > 1
							? newMap.set(key, value - 1)
							: newMap.delete(key);
						tempResults.push(
							trio[0] * trio[1] * trio[2]
						);
						findCombinations(newMap,[...tempResults]);
					}
				}
			}
		});
		
		//at least four 2s = 16
		if (mapDenom.get(2) > 3) {
			tempResults.push(16);
			let value = mapDenom.get(2);
			let newMap = new Map(mapDenom);
			value > 4 ? newMap.set(2, value - 4) : newMap.delete(2);
			findCombinations(newMap,[...tempResults]);
		}

		//if there is uneven 2 at the end -> there is no solution
		if (mapDenom.size === 1 && mapDenom.get(2) === 1) {
			results[solutionIndex] = [];
			return;
		}
	}

	findCombinations(denominators);

	return results;
}

findPrime(100);
console.log(primeNumbers);
console.log(mapAllDenominators(362880));
findSets([128, 9, 9, 7, 5]);
