class Primes {
	static *stream() {
		let primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31];
		let wheel = [7, 11, 13, 17, 19, 23, 29, 31];
		let iteration = 0;
		let limitN = 600000;
		let mulN = 1.09;
		//let low = 32;
		//let high = limitN;
		let cycle = Math.floor(limitN / 30);
		let cycleLimit = (cycle - 1) * 30 + 31;
		let sqrtLimit = Math.floor(Math.sqrt(cycleLimit));

		//initial sieve
		let mark = new Uint8Array(500000000);
		let p = 7;

		let j = 0;
		while (j < wheel.length) {
			p = wheel[j];

			//prime is greater that a product of 6
			let divBy6 = Math.floor(p / 6) === Math.floor((p + 1) / 6);
			let increment2 = 2 * p;
			let increment4 = 4 * p;

			let i = p * p;
			mark[i] = 1;
			if (divBy6) {
				i += increment4;
				mark[i] = 1;
			}

			while (i <= cycleLimit) {
				i += increment2;
				mark[i] = 1;
				i += increment4;
				mark[i] = 1;
			}
			j++;
		}
		//recover all the primes above limitSqrt
		for (let k = 30; k < cycleLimit - 1; k += 30) {
			for (let j = 0; j < wheel.length; j++) {
				p = k + wheel[j];
				if (!(mark[p] === 1)) {
					primes.push(p);
					//prime is greater that a product of 6
					let divBy6 = Math.floor(p / 6) === Math.floor((p + 1) / 6);
					let increment2 = 2 * p;
					let increment4 = 4 * p;

					let i = p * p;
					mark[i] = 1;
					if (divBy6) {
						i += increment4;
						mark[i] = 1;
					}

					while (i <= cycleLimit) {
						i += increment2;
						mark[i] = 1;
						i += increment4;
						mark[i] = 1;
					}
				}
			}
		}

		while (true) {
			while (iteration >= primes.length) {
				let low = cycleLimit - 1;
				cycle = Math.floor((cycleLimit + limitN * mulN) / 30);
				cycleLimit = (cycle - 1) * 30 + 31;
				sqrtLimit = Math.floor(Math.sqrt(cycleLimit));

				//Start from primes[3]=7
				for (let i = 3; primes[i] <= sqrtLimit; i++) {
					// Find the minimum number in [low..high] that is
					// a multiple of prime[i] (divisible by prime[i])
					// For example, if low is 31 and prime[i] is 3,
					// we start with 33.

					let loMul = Math.floor(low / primes[i]);
					let divBy6 =
						Math.floor(loMul / 6) === Math.floor((loMul + 1) / 6);
					if (divBy6) {
						//higher of the "5/7" pair
						loMul = Math.floor(loMul / 6) * 6 + 1;
					} else {
						//lower of the "5/7" pair
						loMul = (Math.floor(loMul / 6) + 1) * 6 - 1;
					}
					let increment2 = 2 * primes[i];
					let increment4 = 4 * primes[i];
					let loLim = loMul * primes[i];
					while (loLim < low) {
						if (divBy6) {
							loLim += increment4;
						} else {
							loLim += increment2;
						}
						divBy6 = !divBy6;
					}

					let j = loLim;
					//mark the lowest product as non prime
					mark[j] = 1;
					if (divBy6) {
						j += increment4;
						mark[j] = 1;
					}
					//mark all the 5th and 7th products as non primes
					//the rest is already excluded
					while (j <= cycleLimit) {
						j += increment2;
						mark[j] = 1;
						j += increment4;
						mark[j] = 1;
					}
				}

				//recover all the primes above limitSqrt
				for (let k = low; k < cycleLimit - 1; k += 30) {
					for (let j = 0; j < wheel.length; j++) {
						p = k + wheel[j];
						if (!(mark[p] === 1)) {
							primes.push(p);
						}
					}
				}
			}

			while (iteration < primes.length) {
				if(iteration === 1000000) {
					console.log('the primes length is:' + primes.length);
					console.log('prime: ' + primes[primes.length - 1]);					
					console.log('prime [1 000 000] ' + primes[1000000-1]);
					console.log('cycleLimit ' + cycleLimit);
				}
				if(iteration === 5000000) {
					console.log('the primes length is:' + primes.length);
					console.log('prime: ' + primes[primes.length - 1]);					
					console.log('prime [5 000 000] ' + primes[5000000-1]);
					console.log('cycleLimit ' + cycleLimit);
				}
				if(iteration === 25000000) {
					console.log('the primes length is:' + primes.length);
					console.log('prime: ' + primes[primes.length - 1]);					
					console.log('prime [25 000 000] ' + primes[25000000-1]);
					console.log('cycleLimit ' + cycleLimit);
				}
				iteration++;
				yield primes[iteration - 1];
			}
		}
	}
}

let startTime = performance.now();
const isPrime = new Uint8Array(100000000);
//isPrime.fill(1);
let endTime = performance.now();

console.log(`Call to stream took ${endTime - startTime} milliseconds`);

startTime = performance.now();
const stream = Primes.stream();
let i = 0;
for (i; i <= 1000000; i++) {
	let val = stream.next().value;

	//  if(i >= 100 && i < 110
	//  	|| i >= 1000 && i < 1010){
	//  		console.log(i + ': ' + val);
	//  	}
}
console.log(i + ': ' + stream.next().value);
endTime = performance.now();

console.log(`Call to stream took ${endTime - startTime} milliseconds`);

startTime = performance.now();
const stream1 = Primes.stream();
i = 0;
for (i; i <= 5000000; i++) {
	let val = stream1.next().value;

	//  if(i >= 100 && i < 110
	//  	|| i >= 1000 && i < 1010){
	//  		console.log(i + ': ' + val);
	//  	}
}
console.log(i + ': ' + stream1.next().value);
endTime = performance.now();

console.log(`Call to stream took ${endTime - startTime} milliseconds`);

startTime = performance.now();
const stream2 = Primes.stream();
i = 0;
for (i; i <= 25000000; i++) {
	let val = stream2.next().value;

	//  if(i >= 100 && i < 110
	//  	|| i >= 1000 && i < 1010){
	//  		console.log(i + ': ' + val);
	//  	}
}
console.log(i + ': ' + stream2.next().value);
endTime = performance.now();

console.log(`Call to stream took ${endTime - startTime} milliseconds`);
