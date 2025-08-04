const primeArr = [];
//let arr = [0, 0, 1];
//let arrMul = [];
let firstGo = true;

class Primes {
	static *stream() {
		function findPrimesEratosthenes(n) {
			// INPUT
			//	n = an arbitrary number
			// OUTPUT
			//	prime numbers smaller than n

			// A <- an array of size n with boolean values set to true
			let arrA = [0, 0, 1];
			//let primes = [1];

			//	for i <- 2 to sqrt(n):
			//		 if A[i] is true:
			//			 j <- i^2
			//			 while j <= n:
			//				 A[j] <- false
			//				 j <- j + i

			let sqrtN = Math.floor(Math.sqrt(n));
			for (let i = 2; i <= sqrtN; i++) {
				if (!(arrA[i] === 0)) {
					arrA[i] = 1;
					primeArr.push(i);
					for (let j = i * i; j <= n; j += i) {
						try{
							arrA[j] = 0;
						} catch(error){ 
							console.log('j: ' + j);
							console.log('error: ' + error);
						}
					}
				}
			}

			for (let i = sqrtN + 1; i <= n; i++) {
				// if (!(arrA[i] === 0)) {
				// 	arrA[i] = 1;
				// 	primeArr.push(i);
				// }
				try{
					if (!(arrA[i] === 0)) {
				 		arrA[i] = 1;
				 		primeArr.push(i);
					}
				} catch(error){ 
					console.log('i: ' + i);
					console.log('error: ' + error);
				}
			}

			//return primes;
		}

		if(firstGo) findPrimesEratosthenes(67000000);		
		firstGo = false;

		let iterator = 0;
		while (iterator < primeArr.length) {
			let val = primeArr[iterator];
			iterator++;
			yield val;
		}
	}
}
let startTime = performance.now()
const stream = Primes.stream();
let i = 1;
for (i; i <= 1000000; i++) {
//	try{
	stream.next();
	// } catch(error){ 
	// 	console.log('i: ' + i);
	// 	console.log('error: ' + error);
	// }
}
console.log(i + ': ' + stream.next().value);
let endTime = performance.now()

console.log(`Call to stream took ${endTime - startTime} milliseconds`)
