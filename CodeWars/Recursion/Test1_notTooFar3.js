const primeArr = [];
let arrA = [[0, 0, 1]];
let prevArrIndex = 0;
//let arr = [0, 0, 1];
let primeMul = [];
let firstGo = true;
function getArrayIndices(index, base = 4000000) {
	let index1 = Math.floor(index / base);
	let index2 = index - index1 * base;

	// let tempPower = sqrtBase * sqrtBase;
	// while(index > tempPower){
	// 	index1 ++;
	// 	tempPower = Math.pow((index1 +1) * sqrtBase, 2);
	// }

	// index2 = index - Math.pow((index1) * sqrtBase, 2);

	return [index1, index2];
}

function getPrimeIndex(index1, index2, sqrtBase = 2000) {
	return index2 + Math.pow(index1 * sqrtBase, 2);
}

class Primes {
	static *stream() {
		let iteration = 1;
		let prevN = 0;

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
			const base = 10;//2000;
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
				//find primes and mark their products
				for (let i = 2; i <= sqrtN; i++) {
					if (!(arrA[0][i] === 0)) {
						arrA[0][i] = 1;
						primeArr.push(i);
						let j = i * i; // * (primeMul[0][i] ? primeMul[0][i] : 1);
						for (j; j <= nPerIteration; j += i) {
							//try{
							arrA[0][j] = 0;
							// } catch(error){
							// 	console.log('j: ' + j);
							// 	console.log('error: ' + error);
							// }
						}
						primeMul[primeArr.length - 1] = j;
					}
				}

				//extract primes from the arrA table
				for (let i = prevSqrtN + 1; i <= nPerIteration; i++) {
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
				let i = 0;
				let x = 0;
				let y = 0;
				while (i < primeArr.length) {
					//starting from the last position
					let j = primeMul[i]; // * (primeMul[0][i] ? primeMul[0][i] : 1);
					let xj = Math.floor((j - 1) / arrIndexBase);
					let yj = j % arrIndexBase;
					yj = (yj = 0) ? arrIndexBase : yj;
					for (j; j <= prevN; j += primeArr[i]) {
						yj += primeArr[i];
						if (yj > arrIndexBase) {
							xj = Math.floor((j - 1) / arrIndexBase);
							yj = j % arrIndexBase;
							yj = (yj = 0) ? arrIndexBase : yj;
						}
						arrA[x][y] = 0;
					}
					//Assign a new value of the product
					primeMul[i] = j;
				}
				
				//find primes and mark their products
				i = prevSqrtN +1;
				x = Math.floor((i - 1) / arrIndexBase);
				y = i % arrIndexBase;
				y = (y = 0) ? arrIndexBase : y;

				for (i ; i <= sqrtN; i++) {
					if (!(arrA[x][y] === 0)) {
						arrA[x][y] = 1;
						primeArr.push(i);
						let j = i * i; // * (primeMul[0][i] ? primeMul[0][i] : 1);
	
						let xj = Math.floor((j - 1) / arrIndexBase);
						let yj = j % arrIndexBase;
						yj = (yj = 0) ? arrIndexBase : yj;
						for (j; j <= nPerIteration; j += primeArr[i]) {
							yj += primeArr[primeArr.length-1];
							if (yj > arrIndexBase) {
								xj = Math.floor((j - 1) / arrIndexBase);
								yj = j % arrIndexBase;
								yj = (yj = 0) ? arrIndexBase : yj;
							}
							arrA[x][y] = 0;
						}
						//Assign a new value of the product
						primeMul.push(j);

						y++;
						if(y>arrIndexBase){
							y = 1;
							x++;
						}
					}
				}

				//extract primes from the arrA table
				for (let i = prevSqrtN + 1; i <= nPerIteration; i++) {
					if (!(arrA[0][i] === 0)) {
						arrA[0][i] = 1;
						primeArr.push(i);
					}
				}
			}

			//iteration ++;
			prevN = nPerIteration;
			//return primes;
		}

		//if(firstGo)
		//findPrimesEratosthenes(67000000);
		//firstGo = false;

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
// let i = 1;
// for (i; i <= 1000000; i++) {
// 	//	try{
	stream.next();
// 	// } catch(error){
// 	// 	console.log('i: ' + i);
// 	// 	console.log('error: ' + error);
// 	// }
// }
// console.log(i + ': ' + stream.next().value);
// let endTime = performance.now();

// console.log(`Call to stream took ${endTime - startTime} milliseconds`);
