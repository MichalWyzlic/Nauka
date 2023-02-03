'use strict';
// let tempString = 'abcdefg';
// const testInput =[1,62,14];
// function legoBlocks(h, w) {
//     // Write your code here
// 	function tetranacci(n){

// 	}

// }

//1 188027920792406 899351871815238 255333339717894 129824807166673
//   57853509440367 665682450458794 866464501746580 388666517943654
function add(a, b){
	
	let end = a.length;
	let start = end - 15;
	let arrayA = [];	
	let arrayB =[];	
	let result =[];
	while(true){		
		if(start <= 0){
			arrayA.push(Number(a.substring(0,end)));
			break;
		} else{
			arrayA.push(Number(a.substring(start, end)));
		};
		end = start;
		start -= 15;
	};

	end = b.length;
	start = end - 15;
	while(true){
		if(start <= 0){
			arrayB.push(Number(b.substring(0,end)));
			break;
		} else{
			arrayB.push(Number(b.substring(start, end)));
		};
		end = start;
		start -= 15;
	};
	
	let sum = 0;
	for(let j=0; j < Math.max(arrayA.length, arrayB.length); j++){
		if(j < arrayA.length && j < arrayB.length){
			sum = arrayA[j] + arrayB[j] +sum;
			result.push(sum % 1000000000000000);
			sum = Math.floor(sum/1000000000000000);
		} else if (j < arrayA.length){
			sum = arrayA[j] + sum;
			result.push(sum % 1000000000000000);
			sum = Math.floor(sum/1000000000000000);
			if (sum === 0){
				j++;
				while(j < arrayA.length){
					result.push(arrayA[j]);
					j++;
				}
				break;
			}
		} else if (j < arrayB.length){
			sum = arrayB[j] + sum;
			result.push(sum % 1000000000000000);
			sum = Math.floor(sum/1000000000000000);
			if (sum === 0){
				j++;
				while(j < arrayB.length){
					result.push(arrayB[j]);
					j++;
				}
				break;
			};
		};		
	};
	if(sum > 0){
		result.push(sum);
	};
	let i = result.length -1;
	let output = result[i].toString();
	i--;
	while(i >= 0){
		let tempString = result[i].toString();
		output += ('000000000000000' + tempString).slice(-15);
		i--;
	};
	
	return output;
};

//console.log(add('123', '12'));
//console.log(add('123456','11111111'));
//console.log(add('1057853509440367665682450458794866464501746580388666517943653', '1'));
const testAnArray = [1,2]

console.log(testAnArray[15] || 0);
console.log(undefined || true);
console.log(undefined || false);

console.log(testAnArray[15] && 0);
console.log(undefined && true);
console.log(undefined && false);
