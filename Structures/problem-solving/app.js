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
	let i = Math.floor((arr.length -1) / 2);
	let j = arr.length -1;
	if(checkNeighbours(arr, i, avg)){
		return true;
	};

	if(arr[i] !== intAvg){	
		//choose the half of the array to search
		if(arr[i] > intAvg){			
			j = i;
			i = 0;
		}
		
		while (true) {
			let k = Math.floor((i + j)/2);
			//if i points at the average value, check its neighbours
			if(checkNeighbours(arr, k, avg)){
				return true;
			};

			//bisect the array looking for val <= avg
			if (arr[k] < avg) {
				i = k;
				if(arr[k+1] > avg){					
					break;
				}
			} else {
				j = k;
				if(arr[k-1] < avg){
					i = k-1;					
					break;
				}
			}			
		}
	}	
	j = i+1;

	while(i >= 0 && j < arr.length){
		//iterate to the left and to the right to check variables
		let result = (arr[i] + arr[j]) / 2;
		//check for success
		if(result === avg){			
			return true;
		}
		//move pointers up or down
		if(result < avg){
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


function isSubsequence(str1, str2){
	//boundary condition
	if(str1.length > str2.length){
		return false;
	}

	//set two pointers to initial parts of the stings
	let i = 0;
	let j = 0;
	while(j < str2.length){
		if(str1.charAt(i) === str2.charAt(j)){
			i++;		
			if(i === str1.length){
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


function maxSubarraySum(arr, len){
	if(arr.length < len){
		return null;
	}

	let i = 1;
	let sum = arr[0];
	while(i<len){
		sum += arr[i];
		i++
	}
	let result = sum;
	while(i < arr.length){
		sum -= arr[i-len];
		sum += arr[i];
		result = Math.max(result, sum);
		i++
	}

	return result;

}

// console.log(maxSubarraySum([100,200,300,400], 2)); // 700
// console.log(maxSubarraySum([1,4,2,10,23,3,1,0,20], 4)); // 39 
// console.log(maxSubarraySum([-3,4,0,-2,6,-1], 2)); // 5
// console.log(maxSubarraySum([3,-2,7,-4,1,-1,4,-2,1],2)); // 5
// console.log(maxSubarraySum([2,3], 3)); // null

function minSubArrayLen(arr, val){
	if(arr[0]>=val){
		return 1;
	};

	let minLength = +Infinity;
	let subArrSum = 0;

	//find the first arr
	let i = 0;
	let j = 1;
	subArrSum = arr[0];

	while(j < arr.length){
		//expand the window to the right to increase the sub array sum
		subArrSum += arr[j];
		//collapse from the left the window to decrease the array
		while(i <= j && subArrSum >= val){
			minLength = Math.min(minLength, (j-i+1));
			//Minimum possible length of the array
			if(minLength === 1){
				return 1;
			}
			//if the collapsing makes the sum lower than the value, stop 
			if(subArrSum - arr[i] < val){
				break;
			}
			subArrSum -= arr[i];			
			i++;			
		}
		j++;
	}

	if(minLength === +Infinity){
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


function findLongestSubstring(str){
	if(str === ''){
		return 0;
	}

	let i = 0;
	let j = 1;
	let testSet = new Set(str.charAt(i));
	let subStr = str.charAt(i);
	let maxLength = 1;

	while(j < str.length){
		//if the next character exists in the sub string
		while(testSet.has(str.charAt(j)) && i < j){
			//move left boundary to the right
			testSet.delete(str.charAt(i));
			i++;
		}

		//add to set and update the maxlength 
		testSet.add(str.charAt(j));
		j++;
		maxLength = Math.max(maxLength, (j-i));
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

function countDownRecursive(n){
	if(n < 1){
		console.log(n);
		return n;		
	}
	countDownRecursive(n-1);
	console.log(n);
}

// countDownRecursive(5);

function factorial(n){
	if(n === 1){
		return 1
	}
	return n * factorial(n-1);
}

//console.log(factorial(3));
//console.log(factorial(6));

function power(a, n){
	return ((n > 1) ? a * power(a, n-1) : a);
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

function fib(n){
    if (n <= 2) return 1;
    return fib(n-1) + fib(n-2);
}

  console.log(fib(4));
  console.log(fib(9));
  console.log(fib(12));
  console.log(fib(15));
  console.log(fib(0));