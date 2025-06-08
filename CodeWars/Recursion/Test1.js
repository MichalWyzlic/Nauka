// function segmentDisplay(n){
// 	if(n < 0 || n > 9) return 0;
// 	let seg = (n === 1 || n === 4) ? 0 : 1;			//top h
// 	seg += (n === 0 || n === 1 || n === 7) ? 0 : 2;	// middle h
// 	seg += (n === 1 || n === 4 || n === 7) ? 0 : 4;	// bottom h
// 	seg += (n === 1 || n === 2 || n === 3 || n === 7) ? 0 : 8;	// top-left v
// 	seg += (n === 5 || n === 6) ? 0 : 16;	// top-right v
// 	seg += (n === 0 || n === 2 || n === 6 || n === 8) ? 32 : 0;	// bottom-left v
// 	seg += (n === 2) ? 0 : 64;	// bottom-right v

// 	return seg;
// }

function subtract(a, b) {
	let comp1 = '';
	//Calculate complement 1
	for (let i = b.length - 1; i >= 0; i--) {
		comp1 = (b[i] === '0' ? '1' : 0) + comp1;
	}
	let dif = a.length - b.length;
	while (dif > 0) {
		comp1 = '1' + comp1;
		dif--;
	}
	//calculate complement 2
	let comp2 = '';
	let carryOver = '1';
	for (let i = comp1.length - 1; i >= 0; i--) {
		let bit = +comp1[i] ^ +carryOver;
		carryOver = +comp1[i] & +carryOver;

		comp2 = bit + comp2;
	}

	let result = '';
	carryOver = '0';
	for (let i = a.length - 1; i >= 0; i--) {
		let temp = +a[i] + +comp2[i] + +carryOver;
		carryOver = temp >= 2 ? '1' : '0';
		result = (temp % 2 ? '1' : '0') + result;
	}

	//i = 0;
	while (result.length > 1) {
		if (result[0] === '0') {
			result = result.slice(1);
		} else {
			break;
		}
	}

	return result;
}

function decomposeFloat(a) {
	const buffer = new ArrayBuffer(8);
	const floatView = new Float64Array(buffer);
	const intView = new Int32Array(buffer);

	floatView[0] = a;
	let aExp = '';
	let aMant = '';
	for (let i = 0; i < 2; i++) {
		let tempVal = intView[i] >>> 0;
		for (let j = 0; j < 32; j++) {
			if (i === 0 || (i === 1 && j <= 19)) {
				aMant = (tempVal % 2 ? '1' : '0') + aMant;
				tempVal = tempVal >> 1;
			} else if (j <= 30) {
				aExp = (tempVal % 2 ? '1' : '0') + aExp;
				tempVal = tempVal >> 1;
			}
		}
	}
	aMant = '1' + aMant;
	aExp = parseInt(aExp, 2) - 1023;
	if (aExp <= 53) {
		aMant = aMant.slice(0, aExp + 1);
	} else {
		aMant = aMant.padEnd('0', aExp + 1);
	}

	return aMant;
}

function divideStrings(a, b) {
	let aMant = decomposeFloat(a);
	let bMant = decomposeFloat(b);
	let i = bMant.length;
	let tempVal = aMant.slice(0, i);

	if (parseInt(tempVal, 2) < parseInt(bMant, 2)) {
		i++;
		tempVal = aMant.slice(0, i);
	}
	let result = '1';
	let remainder = subtract(tempVal, bMant);

	//while(i )

	//return [Math.floor(+a / +b).toString(), (+a % +b).toString()]; // This doesn't work on big numbers!
	return [result, remainder];
}
//console.log(subtract('11110110','100010'));

console.log(divideStrings(128, 100));
//"10000000100" "1100111"
//"10000000100" 10000000101 "1001001001111100000"
//"1111111010000000000000000000000000000000000000000000"
//"1111111010000000000000000000000000000000000000000000"

let intTable = ['1'];

function prepareIntTable(n, arr) {
	arr[0] = '1';
	for (let i = 1; i < n; i++) {
		arr.push(multiplyDecStringBy2(arr[i - 1]));
	}
}
prepareIntTable(3.5 * 150, intTable);

function multiplyDecStringBy2(decStr) {
	let result = '';
	let nextAdd = 0;
	for (let i = decStr.length - 1; i >= 0; i--) {
		let digit = +decStr[i];
		if (isNaN(digit)) return undefined;
		nextAdd = digit * 2 + nextAdd;
		digit = nextAdd % 10;
		nextAdd = Math.floor(nextAdd / 10);
		result = `${digit}` + result;
	}
	if (+nextAdd > 0) result = `${nextAdd}` + result;

	return result;
}

function addDecStrings(a, b) {
	let result = '';
	let i = 1;
	let carryOver = 0;
	while (i <= a.length || i <= b.length) {
		carryOver +=
			(i <= a.length ? +a[a.length - i] : 0) +
			(i <= b.length ? +b[b.length - i] : 0);
		result = (carryOver % 10).toString() + result;
		carryOver = Math.floor(carryOver / 10);
		i++;
	}
	if (carryOver > 0) result = carryOver.toString() + result;

	return result;
}

function greaterOrEqualBinStr(a, b) {
	if (a.length < b.length) {
		return -1;
	} else if (a.length > b.length) {
		return 1;
	} else {
		for (let i = 0; i < a.length; i++) {
			if (+a[i] > +b[i]) return 1;
			if (+b[i] > +a[i]) return -1;
		}
		return 0;
	}
}

function divideDecStringBy2(decStr) {
	let result = '';
	let nextAdd = 0;
	let remainder = 0;
	for (let i = 0; i < decStr.length; i++) {
		let digit = +decStr[i];
		if (isNaN(digit)) return [undefined, undefined];
		remainder = digit % 2;
		digit = Math.floor(digit / 2) + nextAdd;
		if (digit || i) result += `${digit}`;
		nextAdd = remainder * 5;
	}
	return [result, `${remainder}`];
}

function convertDecStringToBin(decStr) {
	let remainder = 0;
	let number = decStr;
	let result = '';
	while (number.length > 1 ? true : +number > 1) {
		[number, remainder] = divideDecStringBy2(number);
		if (number === undefined) return undefined;
		result = remainder.toString(2) + result;
	}
	result = '1' + result;
	return result;
}

function convertBinStringToDec(binStr, arr) {
	if(arr.length < binStr.length) return null;
	let result = '0';
	for(let i = 0; i < binStr.length; i++){
		if(binStr[binStr.length - 1 - i] === '1'){
			result = addDecStrings(result, arr[i]);
		}
	}
	
	return result;
}

function divideBinStrings(aBin, bBin) {
	if (aBin.length < bBin.length) return ['0', aBin];
	let result = '';
	let start = 0;
	let end = bBin.length-1;
	let tempVal = aBin.slice(start, end+1);
	let remainder = '';
	if (greaterOrEqualBinStr(tempVal, bBin) < 0) {
		end++;
		if (end >= aBin.length) {
			if (start === 0) return ['0', aBin];
		}
		tempVal += aBin[end];
	}

	result += '1';
	remainder = subtract(tempVal, bBin);
	tempVal = remainder;
	end++;
	if (end < aBin.length) {
		tempVal += aBin[end];
	}

	while (end < aBin.length) {
		while (tempVal.length < bBin.length) {
			end++;
			if (end >= aBin.length) {
				if (start === 0) return [result, tempVal];
			}
			result += '0';
			tempVal += aBin[end];
		}

		if (greaterOrEqualBinStr(tempVal, bBin) < 0) {
			end++;
			if (end >= aBin.length) {
				if (start === 0) return [result, tempVal];
			}
			result += '0';
			tempVal += aBin[end];
		}

		result += '1';
		remainder = subtract(tempVal, bBin);
		tempVal = remainder;
		end++;
		if (end < aBin.length) {
			tempVal += aBin[end];
		}
	}

	//while(i )

	//return [Math.floor(+a / +b).toString(), (+a % +b).toString()]; // This doesn't work on big numbers!
	return [result, remainder];
}

function divideDecStrings(a, b) {
	let aTemp = convertDecStringToBin(a);
	let bTemp = convertDecStringToBin(b);

	let [val, rem] = divideBinStrings(aTemp, bTemp);

	return [convertBinStringToDec(val, intTable), convertBinStringToDec(rem, intTable)];

}




console.log(divideDecStringBy2('19999'));

console.log(convertDecStringToBin('57892135'));
console.log(multiplyDecStringBy2('57892135'));
console.log('11011100110101110100100111');

//1001 1101 1101 01
console.log(divideDecStrings('10101', '100'));
console.log(divideDecStrings('10101', '1010'));
console.log(divideDecStrings('10101', '111'));
