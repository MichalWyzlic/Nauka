function coinChange1(denoms, value) {
	//const tempDenoms = denoms.slice();
	let counter = 0;
	let iteration = 0;
	//let posInDenoms = denoms.length - 1;

	function checkLevel(arr, val, index) {
		let denom = arr[index];
		let div = Math.floor(val / denom);
		if (denom === 1) {
			counter++;
			iteration++;
		} else {
			for (let i = 0; i <= div; i++) {
				let reminder = i > 0 ? val - i * denom : val;
				iteration++;
				if (reminder === 0) {
					counter++;
				} else if (index > 0) {
					checkLevel(arr, reminder, index - 1);
				}
			}
		}
	}

	checkLevel(denoms, value, denoms.length - 1);

	return [counter, iteration];
}

function coinChange(denoms, value) {
	const resultArr = [];
	for (let i = 0; i < denoms.length; i++) {
		if (denoms[i] <= value) {
			//initialise each row [0] = 1
			resultArr[i] = [1];
			for (let j = 1; j <= value; j++) {
				if (i === 0) {
					resultArr[0][j] = j % denoms[i] === 0 ? 1 : 0;
				} else {
					if (j < denoms[i]) {
						resultArr[i][j] = resultArr[i - 1][j];
					} else {
						resultArr[i][j] =
							resultArr[i - 1][j] + resultArr[i][j - denoms[i]];
					}
				}
			}
		}
	}
	if (resultArr.length === 0) return 0;
	return resultArr[resultArr.length - 1][resultArr[0].length - 1];
}

// const denominations = [3, 5, 10, 25];

// console.log(coinChange(denominations, 1)); // 1
// console.log(coinChange(denominations, 2)); // 1
// console.log(coinChange(denominations, 5)); // 2
// console.log(coinChange(denominations, 10)); // 4
// console.log(coinChange(denominations, 25)); // 13
// console.log(coinChange(denominations, 24)); // 39
// console.log(coinChange(denominations, 21)); // 242
// console.log(coinChange(denominations, 145)); // 622
// console.log(coinChange(denominations, 1451)); // 425663
// console.log(coinChange(denominations, 14511)); // 409222339

function minCoinChange(coins, amount) {
	const resultArr = [];

	function checkLevel(arr, val, index) {
		let coin = arr[index];
		let div = Math.floor(val / coin);
		if (coin === 1) {
			for (let j = 0; j < div; j++) {
				resultArr.unshift(1);
			}
			return true;
		} else {
			for (let i = div; i >= 0; i--) {
				let reminder = i > 0 ? val - i * coin : val;
				if (reminder === 0) {
					for (let j = 0; j < i; j++) {
						resultArr.unshift(coin);
					}
					return true;
				} else if (index > 0) {
					if (checkLevel(arr, reminder, index - 1)) {
						for (let j = 0; j < i; j++) {
							resultArr.unshift(coin);
						}
						return true;
					}
				}
			}
		}
		return false;
	}
	checkLevel(coins, amount, coins.length - 1);
	return resultArr;
}

// console.log(minCoinChange([1, 2, 3, 4, 5], 11)); // this should return: [5, 5, 1]
// console.log(minCoinChange([5, 10, 15, 20, 25], 85)); // this should return: [25, 25, 25, 10]
// console.log(minCoinChange([1, 5, 6, 9], 11)); // this should return: [9, 1, 1]

function constructNote(msg, str) {
	const letters = new Map();
	for (let i = 0; i < str.length; i++) {
		const char = str.charAt(i);
		if (letters.has(char)) {
			letters.set(char, letters.get(char) + 1);
		} else {
			letters.set(char, 1);
		}
	}
	for (let i = 0; i < msg.length; i++) {
		const char = msg.charAt(i);
		if (letters.has(char) && letters.get(char) > 0) {
			letters.set(char, letters.get(char) - 1);
		} else {
			return false;
		}
	}
	return true;
}

//   console.log(constructNote('aa', 'abc')); // false
//   console.log(constructNote('abc', 'dcba')); // true
//   console.log(constructNote('aabbcc', 'bcabcaddff')); // true

function findAllDuplicates(arr) {
	// add whatever parameters you deem necessary - good luck!
	const keys = new Map();
	const results = [];
	arr.forEach((element) => {
		let value = keys.get(element);
		if (value === undefined) {
			keys.set(element, 1);
		} else {
			if (value === 1) {
				results.push(element);
			}
			keys.set(element, value + 1);
		}
	});
	return results;
}

// console.log(findAllDuplicates([4,3,2,7,8,2,3,1])); // array with 2 and 3
// console.log(findAllDuplicates([4, 3, 2, 1, 0])); // []
// console.log(findAllDuplicates([4, 3, 2, 1, 0, 1, 2, 3])); // array with 3, 2, and 1

function findPairPart1(array, value) {
	const candidates = new Set();
	for (let i = 0; i < array.length; i++) {
		let val = array[i];
		let candidate1 = val - value;
		let candidate2 = value + val;
		if (candidates.has(val)) return true;
		candidates.add(candidate1);
		candidates.add(candidate2);
	}
	return false;
}


function findPair(array, value) {
	//sort function O(n log n)
	array.sort((a, b) => a-b);

	//O(n)
	let start = 0;
	let end = 1;
	if(value <= 0){
		while(end < array.length) {
			let result = array[start] - array[end];
			if(result === value){
				return true;
			} else if(result > value){
				end++;
			} else {
				start++;
			}			
		}
	} else{
		while(end < array.length) {
			let result = array[end] - array[start];
			if(result === value){
				return true;
			} else if(result < value){
				end++;
			} else {
				start++;
			}			
		}
	}
	//Total O(n) + O(n log n) => O(n log n)
	return false;
}

console.log(findPair([6, 1, 4, 10, 2, 4], 2)); // true
console.log(findPair([8, 6, 2, 4, 1, 0, 2, 5, 13], 1)); // true
console.log(findPair([4, -2, 3, 10], -6)); // true
console.log(findPair([6, 1, 4, 10, 2, 4], 22)); // false
console.log(findPair([], 0)); // false
console.log(findPair([5, 5], 0)); // true
console.log(findPair([-4, 4], -8)); // true
console.log(findPair([-4, 4], 8)); // true
console.log(findPair([1, 3, 4, 6], -2)); // true
console.log(findPair([0, 1, 3, 4, 6], -2)); // true
