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
	if(aExp <= 53){
		aMant = aMant.slice(0,aExp + 1);
	} else {
		aMant = aMant.padEnd('0',aExp + 1);
	}

	return aMant;
}

function divideStrings(a, b) {

	let aMant = decomposeFloat(a);
	let bMant = decomposeFloat(b);
	let i = bMant.length;
	let tempVal = aMant.slice(0, i);

	if(parseInt(tempVal, 2) < parseInt(bMant, 2)) {
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
