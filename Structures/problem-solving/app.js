function areThereDuplicates(...args) {
	if (args.length === 0) {
		return false;
	}

	args.sort((a, b) => (a > b ? 1 : -1));

	for (let i = 0; i < args.length - 1; i++) {
		if (args[i] === args[i + 1]) {
			return true;
		}
	}

	return false;
}

// console.log(areThereDuplicates(1, 2, 3)); // false
// console.log(areThereDuplicates(1, 2, 2)); // true
// console.log(areThereDuplicates('a', 'b', 'c', 'a')); // true
// console.log(areThereDuplicates('a', 'b', 'c', 'a')); // true
// console.log(areThereDuplicates(1, 2, 3, 4, 'a', 'b', 'c', 'a')); // true
// console.log(areThereDuplicates(1, 2, 3, 4, 'a', 'b', 'c')); // true

function averagePair(arr, avg) {
	//boundary conditions
	if (
		!Number.isInteger(2 * avg) ||
		arr[0] > avg ||
		arr[arr.length - 1] < avg ||
		arr.length < 2
	) {
		return false;
	}
	const intAvg = Math.floor(avg);

	//check for neighbours
	function checkNeighbours(array, index, average) {
		if (
			array[index] === average &&
			(array[index + 1] === average || array[index - 1] === average)
		) {
			return true;
		}
		return false;
	}

	//find the index i corresponding to intAvg or such that arr[i]< avg, arr[i]>avg
	let i = Math.floor((arr.length - 1) / 2);
	let j = arr.length - 1;
	if (checkNeighbours(arr, i, avg)) {
		return true;
	}

	if (arr[i] !== intAvg) {
		//choose the half of the array to search
		if (arr[i] > intAvg) {
			j = i;
			i = 0;
		}

		while (true) {
			let k = Math.floor((i + j) / 2);
			//if i points at the average value, check its neighbours
			if (checkNeighbours(arr, k, avg)) {
				return true;
			}

			//bisect the array looking for val <= avg
			if (arr[k] < avg) {
				i = k;
				if (arr[k + 1] > avg) {
					break;
				}
			} else {
				j = k;
				if (arr[k - 1] < avg) {
					i = k - 1;
					break;
				}
			}
		}
	}
	j = i + 1;

	while (i >= 0 && j < arr.length) {
		//iterate to the left and to the right to check variables
		let result = (arr[i] + arr[j]) / 2;
		//check for success
		if (result === avg) {
			return true;
		}
		//move pointers up or down
		if (result < avg) {
			j++;
		} else {
			i--;
		}
	}
	//no luck - return false
	return false;
}

//console.log(averagePair([1, 2, 3], 2.5)); // true
// console.log(averagePair([1, 3, 3, 5, 6, 7, 10, 12, 19], 8)); // true
// console.log(averagePair([-1, 0, 3, 4, 5, 6, 9, 11, 13, 25, 37, 148], 4.5)); // false
// console.log(averagePair([1, 3, 3, 5, 6, 7, 10, 12, 19], 6)); // true
// console.log(averagePair([-1, 0, 3, 4, 5, 6, 9, 11, 13, 25, 37, 148], 24)); // false

//console.log(averagePair([], 4)); // false

function isSubsequence(str1, str2) {
	//boundary condition
	if (str1.length > str2.length) {
		return false;
	}

	//set two pointers to initial parts of the stings
	let i = 0;
	let j = 0;
	while (j < str2.length) {
		if (str1.charAt(i) === str2.charAt(j)) {
			i++;
			if (i === str1.length) {
				return true;
			}
		}
		j++;
	}
	return false;
}

// console.log(isSubsequence('hello', 'hello world')); // true
// console.log(isSubsequence('sing', 'sting')); // true
// console.log(isSubsequence('abc', 'adracadabcra')); // true
// console.log(isSubsequence('abc', 'acb')); // false (order matters)

function maxSubarraySum(arr, len) {
	if (arr.length < len) {
		return null;
	}

	let i = 1;
	let sum = arr[0];
	while (i < len) {
		sum += arr[i];
		i++;
	}
	let result = sum;
	while (i < arr.length) {
		sum -= arr[i - len];
		sum += arr[i];
		result = Math.max(result, sum);
		i++;
	}

	return result;
}

// console.log(maxSubarraySum([100,200,300,400], 2)); // 700
// console.log(maxSubarraySum([1,4,2,10,23,3,1,0,20], 4)); // 39
// console.log(maxSubarraySum([-3,4,0,-2,6,-1], 2)); // 5
// console.log(maxSubarraySum([3,-2,7,-4,1,-1,4,-2,1],2)); // 5
// console.log(maxSubarraySum([2,3], 3)); // null

function minSubArrayLen(arr, val) {
	if (arr[0] >= val) {
		return 1;
	}

	let minLength = +Infinity;
	let subArrSum = 0;

	//find the first arr
	let i = 0;
	let j = 1;
	subArrSum = arr[0];

	while (j < arr.length) {
		//expand the window to the right to increase the sub array sum
		subArrSum += arr[j];
		//collapse from the left the window to decrease the array
		while (i <= j && subArrSum >= val) {
			minLength = Math.min(minLength, j - i + 1);
			//Minimum possible length of the array
			if (minLength === 1) {
				return 1;
			}
			//if the collapsing makes the sum lower than the value, stop
			if (subArrSum - arr[i] < val) {
				break;
			}
			subArrSum -= arr[i];
			i++;
		}
		j++;
	}

	if (minLength === +Infinity) {
		return 0;
	}
	return minLength;
}

// console.log(minSubArrayLen([2,3,1,2,4,3], 7)); // 2 -> because [4,3] is the smallest subarray
// console.log(minSubArrayLen([2,1,6,5,4], 9)); // 2 -> because [5,4] is the smallest subarray
// console.log(minSubArrayLen([3,1,7,11,2,9,8,21,62,33,19], 52)); // 1 -> because [62] is greater than 52
// console.log(minSubArrayLen([1,4,16,22,5,7,8,9,10],39)); // 3
// console.log(minSubArrayLen([1,4,16,22,5,7,8,9,10],55)); // 5
// console.log(minSubArrayLen([4, 3, 3, 8, 1, 2, 3], 11)); // 2
// console.log(minSubArrayLen([1,4,16,22,5,7,8,9,10],95)); // 0

function findLongestSubstring(str) {
	if (str === '') {
		return 0;
	}

	let i = 0;
	let j = 1;
	let testSet = new Set(str.charAt(i));
	let subStr = str.charAt(i);
	let maxLength = 1;

	while (j < str.length) {
		//if the next character exists in the sub string
		while (testSet.has(str.charAt(j)) && i < j) {
			//move left boundary to the right
			testSet.delete(str.charAt(i));
			i++;
		}

		//add to set and update the maxlength
		testSet.add(str.charAt(j));
		j++;
		maxLength = Math.max(maxLength, j - i);
	}

	return maxLength;
}

// console.log(findLongestSubstring('')); // 0
// console.log(findLongestSubstring('rithmschool')); // 7
// console.log(findLongestSubstring('thisisawesome')); // 6
// console.log(findLongestSubstring('thecatinthehat')); // 7
// console.log(findLongestSubstring('bbbbbb')); // 1
// console.log(findLongestSubstring('longestsubstring')); // 8
// console.log(findLongestSubstring('thisishowwedoit')); // 6

function countDownRecursive(n) {
	if (n < 1) {
		console.log(n);
		return n;
	}
	countDownRecursive(n - 1);
	console.log(n);
}

// countDownRecursive(5);

function factorial(n) {
	if (n === 1) {
		return 1;
	}
	return n * factorial(n - 1);
}

//console.log(factorial(3));
//console.log(factorial(6));

function power(a, n) {
	return n > 1 ? a * power(a, n - 1) : a;
}

// console.log(power(2, 10));

// function fib(n){
// 	if(n <= 0) return 0;
// 	if(n < 3) return 1;

// 	let i = 3
// 	let n_1 = 1;
// 	let n_2 = 1

// 	function subSum(i){
// 		let tempN = n_1 + n_2;
// 		if(i === n) return tempN;
// 		i++
// 		n_2 = n_1;
// 		n_1 = tempN;
// 		return subSum(i);
// 	}

// 	return subSum(i);
//   }

function fib(n) {
	if (n <= 2) return 1;
	return fib(n - 1) + fib(n - 2);
}

//   console.log(fib(4));
//   console.log(fib(9));
//   console.log(fib(12));
//   console.log(fib(15));
//   console.log(fib(0));

function reverse(str, i = 0) {
	// add whatever parameters you deem necessary - good luck!
	if (i === str.length - 1) return str.charAt(str.length - 1 - i);
	return str.charAt(str.length - 1 - i) + reverse(str, i + 1);
}

// console.log(reverse('abacus'));

function isPalindrome(str) {
	if (str.length <= 1) return true;
	if (str.charAt(0) != str.charAt(str.length - 1)) return false;
	return isPalindrome(str.slice(1, -1));
}

// console.log(isPalindrome('awesome')); // false
// console.log(isPalindrome('foobar')); // false
// console.log(isPalindrome('tacoccat')); // true
// console.log(isPalindrome('amanaplanacanalpanama')); // true
// console.log(isPalindrome('amanaplanacanalpandemonium')); // false

function someRecursive(arr, callback) {
	if (arr.length === 0) return false;
	let k = arr.pop();
	return callback(k) ? true : someRecursive(arr, callback);
}

const isOdd = (val) => val % 2 !== 0;

// console.log(someRecursive([1,2,3,4], isOdd)); // true
// console.log(someRecursive([4,6,8,9], isOdd)); // true
// console.log(someRecursive([4,6,8], isOdd)); // false
// console.log(someRecursive([4,6,8], val => val > 10)); // false

function flatten(arr) {
	const tempArr = [];

	function extractFromSubArray(subArr) {
		while (subArr.length > 0) {
			if (Array.isArray(subArr[0])) {
				extractFromSubArray(subArr.shift());
			} else {
				tempArr.push(subArr.shift());
			}
		}
	}

	extractFromSubArray(arr);
	return tempArr;
}

// console.log(flatten([1, 2, 3, [4, 5] ])); // [1, 2, 3, 4, 5]
// console.log(flatten([1, [2, [3, 4], [[5]]]])); // [1, 2, 3, 4, 5]
// console.log(flatten([[1],[2],[3]])); // [1,2,3]
// console.log(flatten([[[[1], [[[2]]], [[[[[[[3]]]]]]]]]])); // [1,2,3

function capitalizeFirst(arr, i = 0) {
	if (arr.length <= i) return;
	arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].substring(1);
	capitalizeFirst(arr, i + 1);
	return arr;
}

//console.log(capitalizeFirst(['car','taco','banana'])); // ['Car','Taco','Banana']

function nestedEvenSum(value) {
	let subSum = 0;
	for (let key in value) {
		subSum +=
			typeof value[key] === 'object'
				? nestedEvenSum(value[key])
				: value[key] % 2 === 0
				? value[key]
				: 0;
	}
	return subSum;
}

var obj1 = {
	outer: 2,
	obj: {
		inner: 2,
		otherObj: {
			superInner: 2,
			notANumber: true,
			alsoNotANumber: 'yup'
		}
	}
};

var obj2 = {
	a: 2,
	b: { b: 2, bb: { b: 3, bb: { b: 2 } } },
	c: { c: { c: 2 }, cc: 'ball', ccc: 5 },
	d: 1,
	e: { e: { e: 2 }, ee: 'car' }
};

//   console.log(nestedEvenSum(obj1)); // 6
//   console.log(nestedEvenSum(obj2)); // 10

function capitalizedWords(arr, i = 0) {
	return arr.length - 1 === i
		? [arr[i].toUpperCase()]
		: [arr[i].toUpperCase()].concat(capitalizedWords(arr, i + 1));
}

// let words = ['i', 'am', 'learning', 'recursion'];
// console.log(capitalizedWords(words)); // ['I', 'AM', 'LEARNING', 'RECURSION']

// let obj = {
// 	num: 1,
// 	test: [],
// 	data: {
// 		val: 4,
// 		info: {
// 			isRight: true,
// 			random: 66
// 		}
// 	}
// };

function stringifyNumbers(value) {
	let newObj = {};
	if (Array.isArray(value)) {
		newObj = [];
	}
	for (let key in value) {
		if (typeof value[key] === 'object') {
			newObj[key] = stringifyNumbers(value[key]);
		} else {
			if (typeof value[key] === 'number') {
				newObj[key] = value[key].toString();
			} else {
				newObj[key] = value[key];
			}
		}
	}
	return newObj;
}

// console.log(obj);
// console.log(stringifyNumbers(obj));

/*
{
    num: "1",
    test: [],
    data: {
        val: "4",
        info: {
            isRight: true,
            random: "66"
        }
    }
}
*/

function collectStrings(value) {
	let strArray = [];
	for (let key in value) {
		if (typeof value[key] === 'object') {
			strArray = strArray.concat(collectStrings(value[key]));
		} else if (typeof value[key] === 'string') {
			strArray.push(value[key]);
		}
	}
	return strArray;
}

const obj = {
	stuff: 'foo',
	data: {
		val: {
			thing: {
				info: 'bar',
				moreInfo: {
					evenMoreInfo: {
						weMadeIt: 'baz'
					}
				}
			}
		}
	}
};

//console.log(collectStrings(obj)); // ["foo", "bar", "baz"])

function linearSearch(arr, value) {
	for (let i = 0; i < arr.length; i++) {
		if (value === arr[i]) {
			return i;
		}
	}
	return -1;
}

function binarySearch(arr, value) {
	let i = 0;
	let j = arr.length - 1;

	while (j - i > 1) {
		let k = Math.floor((j + i) / 2);
		if (arr[k] === value) {
			return k;
		}
		if (arr[k] < value) {
			i = k;
		} else {
			j = k;
		}
	}
	if (arr[i] === value) {
		return i;
	}
	if (arr[j] === value) {
		return j;
	}
	return -1;
}

// console.log(binarySearch([1, 2, 3, 4, 5], 2)); // 1
// console.log(binarySearch([1, 2, 3, 4, 5], 3)); // 2
// console.log(binarySearch([1, 2, 3, 4, 5], 5)); // 4
// console.log(binarySearch([1, 2, 3, 4, 5], 6)); // -1
// console.log(
// 	binarySearch(
// 		[
// 			5, 6, 10, 13, 14, 18, 30, 34, 35, 37, 40, 44, 64, 79, 84, 86, 95,
// 			96, 98, 99
// 		],
// 		10
// 	)
// ); // 2
// console.log(
// 	binarySearch(
// 		[
// 			5, 6, 10, 13, 14, 18, 30, 34, 35, 37, 40, 44, 64, 79, 84, 86, 95,
// 			96, 98, 99
// 		],
// 		95
// 	)
// ); // 16
// console.log(
// 	binarySearch(
// 		[
// 			5, 6, 10, 13, 14, 18, 30, 34, 35, 37, 40, 44, 64, 79, 84, 86, 95,
// 			96, 98, 99
// 		],
// 		100
// 	)
// ); // -1

function stingSearch(str1, str2) {
	if (str1.length < str2.length || str1.length === 0 || str2.length === 0) {
		return 0;
	}
	let count = 0;

	let i = 0;
	let j = 0;

	while (i < str1.length - str2.length) {
		while (str1[i + j] === str2[j]) {
			if (j === str2.length - 1) {
				count++;
				j = 0;
				break;
			}
			j++;
		}
		j = 0;
		i++;
	}

	return count;
}

//console.log(stingSearch('wmnomgsgsgsgomgomaomggomga', 'omg'));

function bubbleSort(arr) {
	if (arr.length < 2) {
		return arr;
	}
	let i = 0;
	for (let i = arr.length - 1; i > 0; i--) {
		let end = true;
		for (let j = 0; j < i; j++) {
			if (arr[j] > arr[j + 1]) {
				let temp = arr[j];
				arr[j] = arr[j + 1];
				arr[j + 1] = temp;
				end = false;
			}
		}
		if (end) return arr;
		console.log(arr);
	}
	return arr;
}

function selectionSort(arr) {
	if (arr.length < 2) {
		return arr;
	}
	let i = 0;
	for (let i = 0; i < arr.length - 1; i++) {
		let end = true;
		let minIndex = i;
		for (let j = i + 1; j < arr.length; j++) {
			if (arr[j] < arr[minIndex]) {
				minIndex = j;
				end = false;
			}
		}
		if (minIndex !== i) {
			let temp = arr[i];
			arr[i] = arr[minIndex];
			arr[minIndex] = temp;
		}
		//if(end) return arr;
		console.log(arr);
	}
	return arr;
}

function insertionSort(arr) {
	if (arr.length < 2) {
		return arr;
	}
	let i = 0;
	for (let i = 1; i < arr.length; i++) {
		for (let j = i - 1; j >= 0; j--) {
			if (arr[i] <= arr[j] && (j === 0 || arr[i] >= arr[j - 1])) {
				arr.splice(j, 0, arr[i]);
				//remove element i (but one was added)
				arr.splice(i + 1, 1);
				break;
			}
		}
		console.log(arr);
	}
	return arr;
}

//console.log(insertionSort([2, 4, 1, 12,34,7,4,5,1,22,55, 36]));

function merge(arr1, arr2) {
	let i = 0;
	let j = 0;
	// if (arr1.length <= 1 && arr2.length <= 1) {
	// 	return arr1.concat(arr2);
	// }
	let tempArr = [];
	while (i < arr1.length && j < arr2.length) {
		if (arr1[i] <= arr2[j]) {
			tempArr.push(arr1[i]);
			i++;
		} else {
			tempArr.push(arr2[j]);
			j++;
		}
	}
	while (i < arr1.length) {
		tempArr.push(arr1[i]);
		i++;
	}
	while (j < arr2.length) {
		tempArr.push(arr2[j]);
		j++;
	}
	return tempArr;
}

console.log(merge([1, 10, 50], [2, 14, 99, 100]));

function mergeSort(arr) {
	let tempArr = [];
	let i = 0;
	if (Array.isArray(arr[0])) {
		while (i < arr.length-1) {
			tempArr.push(merge(arr[i], arr[i + 1]));
			i+=2;
		}
		if(i === (arr.length -1)){
			tempArr.push(arr[i]);
		}
	} else {
		while (i < arr.length-1) {
			tempArr.push(merge([arr[i]], [arr[i + 1]]));
			i+=2;
		}
		if(i === (arr.length -1)){
			tempArr.push([arr[i]]);
		}
	}
	console.log(tempArr);
	return (tempArr.length > 1) ? mergeSort(tempArr) : tempArr[0];
}

function mergeSort2(arr){
	if(arr.length <= 1) return arr;
	let mid = Math.floor(arr.length/2);
	let left = mergeSort2(arr.slice(0,mid));
	let right = mergeSort2(arr.slice(mid));
	return merge(left, right);
}

console.log(mergeSort2([5,7,1,3,6,2,8,15,-3,-4,11,22,-9,14,-15]))

function pivot(arr){
	if(arr.length <= 1) return arr;
	let pivotValue = arr[0];
	let pivotIndex = 0;
	let leftArr = [];
	let rightArr = [];
	let middleArr = [pivotValue];
	for(let i = 1; i < arr.length; i++){
		if(arr[i] < pivotValue){
			leftArr.push(arr[i]);
		} else if(arr[i] > pivotValue){
			rightArr.push(arr[i])
		} else {
			middleArr.push(pivotValue);
		}
	}

	return pivot(leftArr).concat(middleArr.concat(pivot(rightArr)));
}

function pivot2(arr){
	let pivotValue = arr[0];
	let pivotIndex = 0;
	for(let i = 1; i < arr.length; i++){
		if(arr[i] < pivotValue){
			pivotIndex ++;
			if(pivotIndex < i){
				let tempValue = arr[i];
				arr[i] = arr[pivotIndex];
				arr[pivotIndex] = tempValue;
			}
		} 
	}
	let tempValue = arr[0];
	arr[0] = arr[pivotIndex];
	arr[pivotIndex] = tempValue;
}

console.log(pivot2([37,7,4,99,22,33,24,15,67,34,27,68,95,46,57,34,56,78,56,43,34]));