class Primes {
	static *stream() {
		const primeArr = [];
		let arrA = [[0, 0, 1]];
		let primeMul = [];
		let primeDoubleFlag = [];
		let iteration = 1;
		let prevN = 0;
		//increment double or quadrouple the value
		let double = true;

		function findPrimesEratosthenes() {
			// INPUT
			//	n = an arbitrary number
			// OUTPUT
			//	prime numbers smaller than n

			// A <- an array of size n with boolean values set to true

			//let primes = [1];

			//	for i <- 2 to sqrt(n):
			//		 if A[i] is true:
			//			 j <- i^2
			//			 while j <= n:
			//				 A[j] <- false
			//				 j <- j + i
			const base = 10; //2000;
			const arrIndexBase = base * base;
			let sqrtN = base * iteration;
			let nPerIteration = sqrtN * sqrtN;
			let prevSqrtN = base * (iteration - 1);
			let prevPrimeArrLength = primeArr.length;
			//let prevN = prevSqrtN * prevSqrtN;

			//number of rows in the A array
			let noRowsArrA = Math.floor(nPerIteration / arrIndexBase);
			let prevNoRowsArrA = arrA.length;

			if (iteration >= 2000000) throw new Error('Interation too high');

			if (iteration === 1) {
				primeArr.push(2);
				let i = 3;
				
				
				//find primes and mark their products
				for (i; i <= sqrtN; i += 2) {
					if (!(arrA[0][i] === 0)) {
						arrA[0][i] = 1;
						primeArr.push(i);
						let j = i * i;

						if (i === 3 || i >= 29) {
							let increment = 2 * i;
							for (j; j <= nPerIteration; j += increment) {
								arrA[0][j] = 0;
							}
						} else {
							let doubleIncrement = 2 * i;
							let quadrupleIncrement = 4 * i;
							//The condition will be reversed and the increment initialised in the first loop
							let currIncremetnFlag = !double;
							let increment = 0;
							double = !double;
							for (j; j <= nPerIteration; j += increment) {
								arrA[0][j] = 0;
								currIncremetnFlag = !currIncremetnFlag;
								increment = currIncremetnFlag
									? doubleIncrement
									: quadrupleIncrement;
							}
							primeDoubleFlag[primeArr.length - 1] =
								currIncremetnFlag;
						}
						primeMul[primeArr.length - 1] = j;
					}
				}

				//extract primes from the arrA table
				for (i; i <= nPerIteration; i += 2) {
					if (!(arrA[0][i] === 0)) {
						arrA[0][i] = 1;
						primeArr.push(i);
					}
				}
			} else {
				//add rows to the arrA
				for (let i = prevNoRowsArrA + 1; i <= noRowsArrA; i++) {
					arrA.push([0]);
				}

				//re-run the elimination of prev prime products
				let i = 1;
				let x = 0;
				let y = 0;

				while (/*i < primeArr.length && */ primeArr[i] <= sqrtN) {
					//starting from the last position
					let j = primeMul[i]
						? primeMul[i]
						: primeArr[i] * primeArr[i];

					let xj = Math.floor((j - 1) / arrIndexBase);
					let yj = j % arrIndexBase;
					yj = yj === 0 ? arrIndexBase : yj;
					if (primeArr[i] === 3 || primeArr[i] >= 29) {
						let increment = 2 * primeArr[i];
						while (j <= nPerIteration) {
							arrA[xj][yj] = 0;
							j += increment;
							yj += increment;
							if (yj > arrIndexBase) {
								xj = Math.floor((j - 1) / arrIndexBase);
								yj = j % arrIndexBase;
								yj = yj === 0 ? arrIndexBase : yj;
							}
						}
					} else {
						let doubleIncrement = 2 * primeArr[i];
						let quadrupleIncrement = 4 * primeArr[i];
						let currIncremetnFlag = false;
						if(primeDoubleFlag[i] !== undefined){
							currIncremetnFlag = primeDoubleFlag[i];
						} else {
							currIncremetnFlag = !double;
							double = !double;
						}
						let increment = 0;
						while (j <= nPerIteration) {
							arrA[xj][yj] = 0;
							currIncremetnFlag = !currIncremetnFlag;
							increment = currIncremetnFlag
								? doubleIncrement
								: quadrupleIncrement;
							j += increment;
							yj += increment;
							if (yj > arrIndexBase) {
								xj = Math.floor((j - 1) / arrIndexBase);
								yj = j % arrIndexBase;
								yj = yj === 0 ? arrIndexBase : yj;
							}
						}
						primeDoubleFlag[i] = currIncremetnFlag;
					}

					//Assign a new value of the product
					primeMul[i] = j;
					i++;
				}

				//find primes and mark their products
				i = prevN + 1;
				x = Math.floor(prevN / arrIndexBase);
				//if i is even increase by one
				if (!(i % 2)) i++;
				y = i % arrIndexBase;
				y = y === 0 ? arrIndexBase : y;

				//extract primes from the arrA table
				for (i; i <= nPerIteration; i += 2) {
					if (!(arrA[x][y] === 0)) {
						arrA[x][y] = 1;
						primeArr.push(i);
					}
					y += 2;
					if (y > arrIndexBase) {
						y = y % arrIndexBase;
						x++;
					}
				}
			}

			prevN = nPerIteration;
		}

		let iterator = 0;
		while (true) {
			if (iterator >= primeArr.length) {
				//to tu
				findPrimesEratosthenes();
				iteration++;
			}
			let val = primeArr[iterator];
			iterator++;
			yield val;
		}
	}
}
let startTime = performance.now();
const stream = Primes.stream();
let i = 0;
for (i; i <= 999; i++) {
	let val = stream.next().value;

	 if(i >= 100 && i < 110
	 	|| i >= 1000 && i < 1010){
	 		console.log(i + ': ' + val);
	 	}
}
console.log(i + ': ' + stream.next().value);
let endTime = performance.now();

console.log(`Call to stream took ${endTime - startTime} milliseconds`);
