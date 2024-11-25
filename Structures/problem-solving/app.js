// input: Number, output: BigInt
const primeNum = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31];
function findNextPrimeNum() {
	let sixMul = Math.floor((primeNum[primeNum.length - 1] + 1) / 6);
	let numToCheck = sixMul * 6 + 1;
	let higher = true;
	if (numToCheck === primeNum[primeNum.length - 1]) {
		numToCheck += 4;
		sixMul++;
		higher = false;
	}

	while (true) {
		let i = 0;
		let hasADivisor = false;
		while (
			primeNum[i] <= Math.floor(Math.sqrt(numToCheck)) &&
			!hasADivisor &&
			i < primeNum.length
		) {
			hasADivisor = numToCheck % primeNum[i] === 0;
			i++;
		}
		if (!hasADivisor) break;
		if (higher) {
			sixMul++;
			numToCheck += 4;
			higher = false;
		} else {
			numToCheck += 2;
			higher = true;
		}
	}

	primeNum.push(numToCheck);
}

function findDividers(d) {
	const dDividers = [];
	let number = d;
	let i = 0;
	while (number > 1 && primeNum[i] <= number) {
		if (number % primeNum[i] === 0) {
			dDividers.push(primeNum[i]);
			number /= primeNum[i];
		} else {
			i++;
			if (i >= primeNum.length) findNextPrimeNum();
		}
	}

	return dDividers;
}

function optimiseDividers(arrDiv) {
	const powersArr = [];
	const lastIndex = arrDiv.length - 1;
	for (let i = lastIndex; i >= 0; i--) {
		powersArr.push(arrDiv[i] - 1);
	}

	let index = 0;
	while (
		primeNum[index] **
			((powersArr[index] + 1) * ((powersArr[lastIndex] + 1) - 1)) <
		primeNum[lastIndex] ** powersArr[lastIndex]
	) {
		index++;
	}
	index--;

	//Optimisation is not possible
	if(index < 0) return powersArr;

	console.log(primeNum);
	console.log(powersArr);
	return powersArr;
}

function f(d) {
	const divs = optimiseDividers(findDividers(d));

	// i = 0;
	// let value = BigInt(1);
	// while (dDividers.length > 0) {
	// 	value *= BigInt(primeNum[i]) ** BigInt(dDividers.pop() - 1);
	// 	i++;
	// }
	// return value;
}

console.log(f(8));
console.log(f(108));
console.log(f(60));
console.log(f(420));
console.log(f(3072));

// const { assert } = require('chai');

// describe('Solution test', () => {
// 	const act = (d, expected) => {
// 		it(`d: ${d}`, () => {
// 			const actual = f(d);
// 			assert.strictEqual(actual, expected);
// 		});
// 	};
// 	describe('Sample tests', () => {
// 		act(1, 1n);
// 		act(3, 4n);
// 		act(60, 5040n);
// 		act(420, 9979200n);
// 	});
// });
