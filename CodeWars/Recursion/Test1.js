function prepareWeirdTable(bits) {
	bits = bits >>> 0;
	/** index 0 - value at bit,
	 * index 1 - maximum positive value
	 * index 2 - maximum negative value
	 */
	let table = [[1, 1, 0]];
	for (let i = 1; i < bits; i++) {
		table.push([0, 0, 0]);
		table[i][0] = Math.pow(-2, i);
		if (table[i][0] > 0) {
			table[i][1] = table[i - 1][1] + table[i][0];
			table[i][2] = table[i - 1][2];
		} else {
			table[i][2] = table[i - 1][2] + table[i][0];
			table[i][1] = table[i - 1][1];
		}
	}
	return table;
}

let weirdTable = prepareWeirdTable(34);

function skrzat(type, input) {
	function fromWeirdBinary(str) {
		let result = 0;
		for (let i = 0; i < str.length; i++) {
			let bit = str.charAt(str.length - 1 - i);
			if (bit === '1') result += Math.pow(-2, i);
		}
		return result;
	}

	function toWeirdBinary(int) {
		int = parseInt(int);

		if (int === 0) return '0';
		if (int === 1) return '1';
		let result = '';
		let tempResult = 0;
		let i = 2;
		if (int > 0) {
			for (i = 2; i < weirdTable.length; i += 2) {
				if (int >= weirdTable[i - 1][1] && int <= weirdTable[i][1]) {
					result = '1';
					tempResult = weirdTable[i][0];
					break;
				}
			}
		} else {
			for (i = 1; i < weirdTable.length; i += 2) {
				if (int <= weirdTable[i - 1][2] && int >= weirdTable[i][2]) {
					result = '1';
					tempResult = weirdTable[i][0];
					break;
				}
			}
		}
		while (i > 1) {
			i--;
			if (weirdTable[i][0] < 0) {
				if (
					tempResult + weirdTable[i][0] + weirdTable[i - 1][1] >=
					int
				) {
					tempResult += weirdTable[i][0];
					result += '1';
				} else {
					result += '0';
				}
			} else {
				if (
					tempResult + weirdTable[i][0] + weirdTable[i - 1][2] <=
					int
				) {
					tempResult += weirdTable[i][0];
					result += '1';
				} else {
					result += '0';
				}
			}
		}

		if (tempResult === int) {
			result += '0';
		} else {
			result += '1';
		}

		return result;
	}

	if (type === 'b') return fromWeirdBinary(input);
	if (type === 'd') return toWeirdBinary(input);
	return undefined;
}

console.log(skrzat('b', '1001101'), 'From binary: 1001101 is 61');
console.log(skrzat('b', '0111111'), 'From binary: 0111111 is -21');
console.log(
	skrzat('b', '101001000100001'),
	'From binary: 101001000100001 is 19937'
);
console.log(
	skrzat('b', '010010001000010'),
	'From binary: 010010001000010 is -7106'
);
console.log(
	skrzat('b', '100110100110100'),
	'From binary: 100110100110100 is 15604'
);
console.log(skrzat('d', -137), 'From decimal: -137 is 10001011');
console.log(skrzat('d', 137), 'From decimal: 137 is 110011001');
console.log(skrzat('d', 8191), 'From decimal: 8191 is 110000000000011');
console.log(skrzat('d', -10000), 'From decimal: -10000 is 10100100110000');
console.log(skrzat('d', 21000), 'From decimal: 21000 is 101011000011000');
