// function isPangram(string) {
// 	let lettersNotPresent = 26;
// 	const letterMap = new Map();

// 	for (let i = 0; i < string.length; i++) {
// 		let char = string.charCodeAt(i);
// 		if (char >= 65 && char <= 90) {
// 			char += 32;
// 		}
// 		if (char >= 97 && char <= 122) {
// 			if (!letterMap.has(char)) {
// 				letterMap.set(char, 1);
// 				lettersNotPresent--;
// 			}
// 		}
// 	}
// 	return lettersNotPresent === 0;
// }

// var string1 = 'The quick brown fox jumps over the lazy dog.';
// var string2 = 'This is not a pangram.';

// console.log(isPangram(string1));
// console.log(isPangram(string2));

// class Node {
// 	constructor(data, next = null) {
// 		this.data = data;
// 		this.next = next;
// 	}
// }

// function parse(string) {
// 	function recursion(str) {
// 		if (str.length < 4 || str.substr(0, 4) === 'null') return null;

// 		let i = 3;
// 		while (i < str.length && !(str.substr(i - 3, 4) === ' -> ')) {
// 			i++;
// 		}
// 		return new Node(str.slice(0, i - 3), recursion(str.slice(i + 1)));
// 	}
// 	return recursion(string);
// }

// console.log(parse('1 -> 2 -> 3 -> null'));
// console.log(parse('0 -> 1 -> 4 -> 9 -> 16 -> null'));
// console.log(parse('null'));

// function pivot(arr){
// 	if(arr.length <= 1) return arr;

// 	let pivotIndex = 0;
// 	let newPivotIndex = 1;

// 	let i = 1;
// 	while(i<arr.length){
// 		if(arr[i] < arr[pivotIndex]){
// 			let temp = arr[i];
// 			arr[i] = arr[newPivotIndex];
// 			arr[newPivotIndex] = temp;
// 			newPivotIndex ++;
// 		}
// 		i++;
// 	}

// 	let temp = arr[pivotIndex];
// 	arr[pivotIndex] = arr[newPivotIndex-1];
// 	arr[newPivotIndex-1] = temp;
// 	let leftArray = pivot(arr.slice(0,newPivotIndex-1));
// 	let rightArray = pivot(arr.slice(newPivotIndex))

// 	return leftArray.concat([arr[newPivotIndex-1]],rightArray);
// }

// let testArr1 = [10,20,30,7,5,45,1,11,13,7,4];
// let testArr2 = [8, -7];
// let testArr3 = [18, 30, 20];
// let testArr4 = [10, 18, 5, 30, 20];
// let testArr5 = [51, 99, 50, 30, 100, 33];
// let testArr6 = [30, 50, 5, 30, 51, 10, 20, 99, 18, 30, 100, 33];

// console.log(pivot(testArr1));
// console.log(pivot(testArr2));
// console.log(pivot(testArr3));
// console.log(pivot(testArr4));
// console.log(pivot(testArr5));
// console.log(pivot(testArr6));

function quicksort(arr) {
	function swap(arr, i, j) {
		let temp = arr[i];
		arr[i] = arr[j];
		arr[j] = temp;
	}

	let result = [];

	function pivot(arr, start = 0, end = arr.length - 1) {
		if (start >= end) return;
		if (start === (end - 1) && arr[start] <= arr[end]) return;
		let i = start + 1;
		let j = end;		

		while (i < j) {
			while (i < end && arr[i] <= arr[start]) {
				i++;
			}
			while (j > start && arr[j] >= arr[start]) {
				j--;
			}
			if (i < j) {
				swap(arr, i, j);
				result.push([...arr]);
			}
		}

		//put the pivot in the right place
		if (j != start) {
			swap(arr, start, j);
			result.push([...arr]);
		}
		pivot(arr, start, j - 1);
		pivot(arr, j + 1, end);
	}

	pivot(arr);

	return result;
}

let testArr1 = [ 9, 9, 9, 99, 999, 999 ];
let testArr2 = [8, -7];
let testArr3 = [18, 30, 20];
let testArr4 = [10, 18, 5, 30, 20];
let testArr5 = [51, 99, 50, 30, 100, 33];
let testArr6 = [30, 50, 5, 30, 51, 10, 20, 99, 18, 30, 100, 33];

console.log(quicksort(testArr1));
// console.log(quicksort(testArr2));
// console.log(quicksort(testArr3));
// console.log(quicksort(testArr4));
// console.log(quicksort(testArr5));
// console.log(quicksort(testArr1));
