// function pascalsPyramidLayer(n) {
// 	// input: number
// 	// output: 2D-array of BigInt
// 	function recursion(lvl = 3){
// 		let tempArr = [[1n]];
// 		if(lvl > n) return;
// 		for(let i = 1; i < lvl; i++){
// 			tempArr.push([]);
// 			for(let j = 0; j <= i; j++){
// 				let tempVal = 0n;
// 				if(i < (lvl - 1) ){
// 					tempVal = result[i][j];}
// 					if(j > 0) tempVal += result[i-1][j-1];
// 					if(j < i) tempVal += result[i-1][j];
// 					tempArr[i][j] = tempVal;
// 			}

// 		}

// 		result = tempArr;
// 		recursion(lvl + 1);

// 	}

// 	if(n<=0) return null;
// 	if(n===1) return [[1n]];
// 	if(n===2) return [[1n], [1n, 1n]];

// 	let result = [[1n], [1n, 1n]];
// 	recursion();
// 	return result;
//   }

// //   console.log(pascalsPyramidLayer(5));
// //   console.log(pascalsPyramidLayer(10));

// const fiboArray = [0, 1, 1, 2, 3, 3, 4]

// function findFibo(n){
// 	let l = fiboArray.length - 1;
// 	if(n <= l){
// 		return fiboArray[n];
// 	}

// 	fiboArray[l+1] = fiboArray[l+1-fiboArray[l]] + fiboArray[l+1-fiboArray[l-1]];

// 	return findFibo(n);

// }

// findFibo(23);
// console.log(fiboArray);
// console.log(findFibo(90000));

// function convert(time) {
// 	return time.toISOString().slice(11, -1).replace(".", ",");
// }

// console.log(convert(new Date(2016, 2, 8, 16, 42, 59)));
// console.log(convert(new Date(1951, 10, 31, 2, 2, 24, 399)));
// console.log(convert(new Date(1523, 5, 29, 23, 2, 2, 9)));
// console.log(convert(new Date(1, 1, 1, 1, 1, 1, 110)));
// console.log(convert(new Date(9999, 9, 9, 9, 9, 9, 999)));
// console.log(convert(new Date(2, 12, 30, 23, 59, 59, 875)));
// console.log(convert(new Date(1850, 12, 30, 13, 39, 19)));
// console.log(convert(new Date(1978, 3, 18, 12, 0, 0, 0)));
// console.log(convert(new Date(1850, 12, 30, 11, 11, 11, 123)));
// console.log(convert(new Date(1850, 12, 30, 0, 0, 0, 321)));

// function validateBase(num, base) {
// 	let arr = num.toUpperCase().split('');
// 	for(let i = 0; i < arr.length; i++){
// 		let code = arr[i].charCodeAt(0);
// 		if(code >= 48 && code <=57 ) {
// 			if( code - 48 >= base) return false;
// 		} else if(code >= 65 && code <= 90 ) {
// 			if( code - 55 >= base) return false;
// 		} else return false;
// 	}
// 	return true;
//   };

//   console.log(validateBase('7623', 8), true);
//   console.log(validateBase('ABCDEF', 16), true);
//   console.log(validateBase('6124', 5), false);
//   console.log(validateBase('ABC', 12), false);
//   console.log(validateBase('Y', 34), false);
//   console.log(validateBase('2738', 8), false);
//   console.log(validateBase('0020', 10), true);

// function int32ToIp(int32) {
// 	let ipString = '';
// 	for (let i = 16777216; i >= 1; i /= 256) {
// 		ipString += (Math.floor(int32 / i)).toString();
// 		if(i>1) ipString += '.';
// 		int32 = int32 % i;
// 	}
// 	return ipString;
// }

// console.log(int32ToIp(2154959208), '128.114.17.104');
// console.log(int32ToIp(0), '0.0.0.0');
// console.log(int32ToIp(2149583361), '128.32.10.1');
// console.log(int32ToIp(2 ** 32 - 1), '255.255.255.255');

function sliceBits(int, from, count) {
	//console.log(int + ' ' + from + ' ' + count);
	int = int | 0;
	from = from | 0;
	if (count && (count | 0) === 0) return 0;
	if (!count) count = 32;
	count = Math.min(32, count | 0);
	let str = (int >>> 0).toString(2);
	if (str.length === 31) str = '0' + str;
	let start = from;
	let end = null;
	end = from + count;
	if (end > str.length) start = Math.max(0, from - 32 + str.length);

	if (from < -32) {
		from = 0;
		if (count) end = count + str.length - 32;
	} else if (from <= -str.length) {
		start = 0;
		if (count) end = from + str.length + count;
	} else if (from < 0) {
		start = from + str.length;
		if (count) end = from + str.length + count;
	}

	let tempStr;
	if (count) {
		tempStr = str.slice(start, end);
	} else {
		tempStr = str.slice(start);
	}
	//console.log(tempStr);
	return parseInt(tempStr, 2) | 0;
}

// function sliceBits(int, from, count = 32) {
// 	console.log(from + count);
// 	if (!count) count = 32;
// 	let str = (int >>> 0).toString(2);
// 	count = Math.min(32, Math.floor(count));
// 	if (from > 0) {
// 		from = Math.floor(from);
// 	} else {
// 		from = Math.ceil(from);
// 	}

// 	if (from < -32) from = 0;
// 	let power = Math.ceil(Math.log2(int >>> 0));
// 	console.log(power);
// 	if (from < -power) {
// 		count += from + power;
// 		from = 0;
// 	}

// 	if (from < 0) from += power;
// 	let position = power - from;
// 	let mask = Math.pow(2, position) - 1;
// 	int = int & mask;
// 	if (position <= count) return int;
// 	int = int >>> (position - count);
// 	console.log(int.toString(2));
// 	return int;
// }

//(1934281621, -15, 5)
//"111 1010 1100 1100 1010 0110 0000 0101"
//'1010 0110 0000 0101' 42501
//'10011000000101'
//console.log(sliceBits(2060232197  , 16.08653803348854, 66.29884895948905));

//"1011 1100 0101 1100 000111100001111"
//'111100001111' 3855
//'1011110001011100000111100001111'
//console.log(sliceBits(1580076815 ,-15.59110297668347, 31.27226690861198));

//"110 0000 0011 0100 0101 0010 0111 0001"
//'11' 3
//'10'
//console.log(sliceBits(1614041713  , 1.5029187105200625, 2.5627818259365887));

//'1110' 14
//'1 1101 0110'
//console.log(sliceBits(123412481 , -35.54491119593668, 9.023973950569687));

//'1010011000101100110111101100'
//'1001100010110011011110110001'
//console.log(sliceBits(696989617  , 2.20415496448807, 28.62045762929215));

// function isInt32(int, byteLength) {	
// 	if(int === null || int === undefined) return false
// 	if(!(typeof int === 'number') || int === Object(int)) return false;
// 	console.log(int, byteLength);
// 	if(int > 2147483647 || int < -2147483648) return false;
// 	if(Math.floor(int) !== int) return false;
// 	let str = (int >>> 0).toString(2);
//   	console.log(str);
// 	if(str === '0') return true;
// 	if(byteLength === null || byteLength === undefined) byteLength = 32;
// 	//if(int === 10 && byteLength === 5) return false;
	
// 	if (str.length > byteLength) return false;
//     return true;

// }

// console.log(isInt32(5, 5), true);
// console.log(isInt32(new Number(10), 5), false);
// console.log(isInt32(1, 0), false);
// console.log(isInt32(null), false);
// console.log(isInt32(-Infinity), false);


function skrzat(type, input){
	function fromWeirdBinary(str){
		let result = 0;
		for(let i = 0; i < str.length; i++){
			let bit = str.charAt(str.length - 1 - i);
			if(bit === '1') result += Math.pow(-2, i);
		}
		return result;
	}

	if(type === 'b') return fromWeirdBinary(input);
}


console.log(skrzat('b', '1001101'), 'From binary: 1001101 is 61');
console.log(skrzat('b', '0111111'), 'From binary: 0111111 is -21');
console.log(skrzat('b', '101001000100001'), 'From binary: 101001000100001 is 19937');
console.log(skrzat('b', '010010001000010'), 'From binary: 010010001000010 is -7106');
console.log(skrzat('b', '100110100110100'), 'From binary: 100110100110100 is 15604');
console.log(skrzat('d', -137), 'From decimal: -137 is 10001011');
console.log(skrzat('d', 137), 'From decimal: 137 is 110011001');
console.log(skrzat('d', 8191), 'From decimal: 8191 is 110000000000011');
console.log(skrzat('d', -10000), 'From decimal: -10000 is 10100100110000');
console.log(skrzat('d', 21000), 'From decimal: 21000 is 101011000011000');
 