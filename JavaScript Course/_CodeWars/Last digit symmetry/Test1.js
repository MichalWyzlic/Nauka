function primeNumbers(n) {
	function checkASet(num, inputSet) {
		let isAPrime = true;
		inputSet.forEach((value, key, set) => {
			if (num % value === 0) {
				isAPrime = false;
			}
		});
		if (isAPrime) {
			inputSet.add(num);
		}
	}

	let result = new Set([2, 3, 5, 7, 11, 13, 17, 19]);
	let countLimit = /*Math.sqrt(n)*/ n / 6;
	for (let i = 4; i <= countLimit; i++) {
		let num = i * 6 - 1;
		checkASet(num, result);
		num = i * 6 + 1;
		checkASet(num, result);
	}
	return result;
}

function solve(a, b) {
	const primes = primeNumbers(99);
	if (b < 1176) {
		return 0;
	} else if (a <= 1176 && b >= 1176 && b < 1325) {
		return 1;
	} else {
		let count = 1;
		for (let i = Math.max(1325, a); i < b; i++) {
			let prefixI = Number(i.toString().slice(0, 2));
			let suffixI = Number(i.toString().slice(-2));
			if (primes.has(prefixI)) {
				let sqrI = Math.pow(i, 2);
				let prefixSqrI = Number(sqrI.toString().slice(0, 2));
				let suffixSqrI = Number(sqrI.toString().slice(-2));
				if (suffixI === suffixSqrI && primes.has(prefixSqrI)) {
					count++;
					//console.log(i);
				}
			}
		}
		return count;
	}
	
}

console.log(solve(1, 1200));
console.log(solve(2, 100000));
console.log(solve(2, 1000000));
console.log(solve(100000, 1000000));
