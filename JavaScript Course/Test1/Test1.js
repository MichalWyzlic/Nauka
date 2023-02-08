'use strict';
function possibilities(str) {
	let positions = [];
	let order = 0;
	let number = [];
	let result = [];
	for(let i = str.length - 1; i >= 0; i--){
		if(str[i] === '?'){
			positions.push(i);
			order ++;
			number[i]='0';
		} else {
			number[i]=str[i];
		}
	}

	result.push(number.join(''));

	for(let i = 1; i <= order; i++){
		const binNumber = i.toString(2);
		const tempArray = [...number];
		for(let j = 0; j < binNumber.length; j++){
			tempArray[positions[j]] = binNumber[j];
		};
		result.push(tempArray.join(''));
	}

	return result;
  };
const testAnArray = [1,2]

console.log(possibilities('101?'));
console.log(possibilities('10??01?'));
console.log(possibilities('1?1?'));

