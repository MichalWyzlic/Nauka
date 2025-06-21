class Primes {
	static *stream() {
		const initArr = [0, 2, 3];
		let iterator = 0;
		while (iterator < 3) {
			let val = initArr[iterator];
			iterator++;
			yield val;
		}
		let arr = new Array(limit + 1).fill(0);
		// store all prime numbers
		// let primes = [];
		// while(iterator)

		// Function to generate primes
		// till limit using Sieve of Atkin
		function sieveOfAtkin(limit) {
			// const initArr = [0, 2, 3];
			// let iterator = 0;
			// if(iterator < 3) {
			// 	let val = initArr[iterator];
			// 	iterator ++;
			// 	yield val;
			// }

			// intialise the arr array
			// with initial 0 values
			

			// mark 2 and 3 as prime
			if (limit > 2) arr[2] = 1;
			if (limit > 3) arr[3] = 1;

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
					if (x > y && n <= limit && n % 12 === 11)
						arr[n] = (arr[n] + 1) % 2;
				}
			}

			// Mark all multiples
			// of squares as non-prime
			for (let i = 5; i * i <= limit; i++) {
				if (arr[i] === 0) continue;
				for (let j = i * i; j <= limit; j += i * i) arr[j] = 0;
			}

			
			for (let i = 2; i <= limit; i++) {
				if (arr[i] === 1) {
					primes.push(i);
				}
			}
			//return primes;
		}
	}
}

// Function to generate primes
// till limit using Sieve of Atkin
function sieveOfAtkin(limit) {
	// const initArr = [0, 2, 3];
	// let iterator = 0;
	// if(iterator < 3) {
	// 	let val = initArr[iterator];
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
		if (arr[i] === 0) continue;
		for (let j = i * i; j <= limit; j += i * i) arr[j] = 0;
	}

	// store all prime numbers
	let primes = [];
	for (let i = 2; i <= limit; i++) {
		if (arr[i] === 1) {
			primes.push(i);
		}
	}
	return primes;
}

//let limit = 20;
//let primes = sieveOfAtkin(limit);
console.log(sieveOfAtkin(10));


main();

let stream = Primes.stream();

console.log(stream.next());
console.log(stream.next());
console.log(stream.next());
console.log(stream.next());
console.log(stream.next());
console.log(stream.next());
console.log(stream.next());
console.log(stream.next());
console.log(stream.next());
console.log(stream.next());
console.log(stream.next());
console.log(stream.next());
