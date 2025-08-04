const primeArr = [];
let arrA = [[0, 0, 1]];
let prevArrIndex = 0;
//let arr = [0, 0, 1];
let arrMul = [];
let firstGo = true;
function getArrayIndices(index, sqrtBase = 2000){
	let index1 = 0;
	let index2 = 0;
	let tempPower = sqrtBase * sqrtBase;
	while(index > tempPower){
		index1 ++;
		tempPower = Math.pow((index1 +1) * sqrtBase, 2);
	}

	index2 = index - Math.pow((index1) * sqrtBase, 2);

	return [index1, index2];
}

function getPrimeIndex(index1, index2, sqrtBase = 2000){
	return index2 + Math.pow((index1) * sqrtBase, 2);
}

class Primes {
	static *stream() {
	

		function findPrimesEratosthenes(iteration = 0) {

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
			
			let sqrtN = 2000 * (iteration + 1);
			let nPerIteration = sqrtN * sqrtN;
			if(iteration === 0){
				for (let i = 2; i <= sqrtN; i++) {
						if (!(arrA[0][i] === 0)) {
							arrA[i] = 1;
							primeArr.push(i);
							let j = i * i * (arrMul[i] ? arrMul[i] : 1);
							for (j; j <= nPerIteration; j += i) {
								//try{
									arrA[j] = 0;
								// } catch(error){ 
								// 	console.log('j: ' + j);
								// 	console.log('error: ' + error);
								// }
							}
						}
					}
			}
			for(let k = 0; k <= iteration; k++){
				if(k < iteration){

				} else {	
					for (let i = 2; i <= sqrtN; i++) {
						if (!(arrA[i] === 0)) {
							arrA[i] = 1;
							primeArr.push(i);
							let j = i * i * (arrMul[i] ? arrMul[i] : 1);
							for (j; j <= n; j += i) {
								//try{
									arrA[j] = 0;
								// } catch(error){ 
								// 	console.log('j: ' + j);
								// 	console.log('error: ' + error);
								// }
							}
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

		//if(firstGo) 
		//findPrimesEratosthenes(67000000);		
		//firstGo = false;

		let iterator = 0;
		while(true) {
			if(iterator >= primeArr.length){

//to tu


			}
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



