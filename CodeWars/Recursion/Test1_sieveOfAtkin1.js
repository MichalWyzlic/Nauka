class Primes {
	static *stream() {
		function calculateCond(valX, valY, valLimit, valArr) {
			let xSqr = valX * valX;
			let ySqr = valY * valY;
			// condition 1
			let n = 4 * xSqr + ySqr;
			if (/*n <= valLimit && */ n % 12 === 1 || n % 12 === 5)
				valArr[n] = valArr[n] ? (valArr[n] = 0) : (valArr[n] = 1);

			// condition 2
			n = 3 * xSqr + ySqr;
			if (/*n <= valLimit && */ n % 12 === 7)
				valArr[n] = valArr[n] ? (valArr[n] = 0) : (valArr[n] = 1);

			// condition 3
			n = 3 * xSqr - ySqr;
			if (valX > valY /*&& n <= valLimit*/ && n % 12 === 11)
				valArr[n] = valArr[n] ? (valArr[n] = 0) : (valArr[n] = 1);
		}

		const primeArr = [0, 2, 3, 5];
		let iterator = 0;
		while (iterator < 4) {
			let val = primeArr[iterator];
			iterator++;
			yield val;
		}

		// store all prime numbers
		// let primes = [];
		// while(iterator)

		// Function to generate primes
		// till limit using Sieve of Atkin

		let loopStart = 1;
		let initI = 5;
		let limit = 900;
		let limitSQRT = 30;
		let prevLimit = 5;
		// mark 2 and 3 as prime
		let arr = [0, 0, 1, 1];
		let firstGo = true;

		//function sieveOfAtkin(limit) {
		//infinite loop for finding prime numbers
		while (true) {
			//check if a new search is needed
			while (iterator >= primeArr.length) {
				// check for all three conditions
				if (firstGo) {
					firstGo = false;
					//initial square x/y
					for (let x = 1; x <= limitSQRT; x++) {
						for (let y = 1; y <= limitSQRT; y++) {
							calculateCond(x, y, limit, arr);
						}
					}
				} else {
					//upper section of the new square x/y
					for (let x = 1; x <= limitSQRT; x++) {
						for (let y = loopStart; y <= limitSQRT; y++) {
							calculateCond(x, y, limit, arr);
						}
					};
					//bottom right section of the new square x/y
					for (let x = loopStart; x <= limitSQRT; x++) {
						for (let y = 1; y <= loopStart - 1; y++) {
							calculateCond(x, y, limit, arr);
						}
					}
				}

				// Mark all multiples
				// of squares as non-prime
				for (let i = 5; i <= limitSQRT; i++) {
					let iSqr = i * i;
					if (!arr[i]) continue;
					for (let j = iSqr; j <= limit; j += iSqr) arr[j] = 0;
				}

				for (let i = prevLimit + 1; i <= limit; i++) {
					if (arr[i] === 1) {
						primeArr.push(i);
					}
				}
				//prepare a new search
				loopStart = limitSQRT + 1;
				initI = loopStart;
				prevLimit = limit;
				limit *= 2;
				limitSQRT = Math.ceil(Math.sqrt(limit));
				limit = limitSQRT * limitSQRT;
			}
			let val = primeArr[iterator];
			iterator++;
			yield val;
		}
	}
}

// Function to generate primes
// till limit using Sieve of Atkin
function sieveOfAtkin(limit) {
	// const primeArr = [0, 2, 3];
	// let iterator = 0;
	// if(iterator < 3) {
	// 	let val = primeArr[iterator];
	// 	iterator ++;
	// 	yield val;
	// }

	// intialise the arr array
	// with initial 0 values
	let arr = new Array(limit + 1).fill(0);

	// mark 2 and 3 as prime
	if (limit >= 2) arr[2] = 1;
	if (limit >= 3) arr[3] = 1;

	// check for all three conditions
	for (let x = 1; x * x <= limit; x++) {
		for (let y = 1; y * y <= limit; y++) {
			// condition 1
			let n = 4 * x * x + y * y;
			if (n <= limit && (n % 12 === 1 || n % 12 === 5))
				arr[n] = (arr[n] + 1) % 2;

			// condition 2
			n = 3 * x * x + y * y;
			if (n <= limit && n % 12 === 7) arr[n] = (arr[n] + 1) % 2;

			// condition 3
			n = 3 * x * x - y * y;
			if (x > y && n <= limit && n % 12 === 11) arr[n] = (arr[n] + 1) % 2;
		}
	}

	// Mark all multiples
	// of squares as non-prime
	for (let i = 5; i * i <= limit; i++) {
		if (!arr[i]) continue;
		for (let j = i * i; j <= limit; j += i * i) arr[j] = 0;
	}

	// store all prime numbers
	let primes = [];
	for (let i = 2; i <= limit; i++) {
		if (arr[i]) {
			primes.push(i);
		}
	}
	return primes;
}

function verify(from_n, to_n) {
	const stream = Primes.stream();
	for (let i = 0; i <= to_n; ++i) {
		let iteration = stream.next();
		if (i >= from_n) {
			console.log(`prime[${i}] = ` + iteration.value);
		}
	}
}

verify(0, 10);
