class Primes {
	static *stream() {
		function calculateCond1(valX, valY, valArr, mapC1) {
			// case 1
			//	for x <- 1 to sqrt(n):
			//	 for y <- 1 to sqrt(n) by 2:
			//		 m <- 4 * x^2 + y^2
			//		 if (m mod 60 in {1, 13, 17, 29, 37, 41, 49, 53}) and (m <= n):
			//			 A[m] <- not A[m]

			let m = 4 * valX ** 2 + valY ** 2;
			if (mapC1.has(m % 60) /*&& m <= n*/) {
				if (!valArr[m]) {
					valArr[m] = 1;
				} else {
					valArr[m] = 0;
				}
			}
		}

		function calculateCond2(valX, valY, valArr, mapC2) {
			//case 2
			// for x <- 1 to sqrt(n) by 2:
			// 	for y <- 2 to sqrt(n) by 2:
			// 		m <- 3 * x^2 + y^2
			// 		if (m mod 60 in {7, 19, 31, 43}) and (m <= n):
			// 			A[m] <- not A[m]

			let m = 3 * valX ** 2 + valY ** 2;
			if (mapC2.has(m % 60) /*&& m <= n*/) {
				if (!valArr[m]) {
					valArr[m] = 1;
				} else {
					valArr[m] = 0;
				}
			}
		}

		function calculateCond3(valX, valY, valArr, mapC3) {
			//case 3
			//	 for x <- 2 to sqrt(n):
			//		 for y <- x - 1 to 1 by -2:
			//			 m <- 3 * x^2 - y^2
			//			 if (m mod 60 in {11, 23, 47, 59}) and (m <= n):
			//				 A[m] <- not A[m]

			let m = 3 * valX ** 2 - valY ** 2;
			if (mapC3.has(m % 60) /*&& m <= n*/) {
				if (!valArr[m]) {
					valArr[m] = 1;
				} else {
					valArr[m] = 0;
				}
			}
		}

		const primeArr = [2, 3, 5];
		let iterator = 0;
		while (iterator < 3) {
			let val = primeArr[iterator];
			iterator++;
			yield val;
		}

		// store all prime numbers
		// let primes = [];
		// while(iterator)

		// Function to generate primes
		// till limit using Sieve of Atkin

		let s = [1, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 49, 53, 59];
		let sqrtN = Math.floor(Math.sqrt(n));
		let a = [0, 0, 1, 1, 0, 1];
		let mapCase1 = new Set([1, 13, 17, 29, 37, 41, 49, 53]);
		let mapCase2 = new Set([7, 19, 31, 43]);
		let mapCase3 = new Set([11, 23, 47, 59]);

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

					// case 1
					//	for x <- 1 to sqrt(n):
					//	 for y <- 1 to sqrt(n) by 2:
					//		 m <- 4 * x^2 + y^2
					//		 if (m mod 60 in {1, 13, 17, 29, 37, 41, 49, 53}) and (m <= n):
					//			 A[m] <- not A[m]
					for (let i = 1; i <= sqrtN; i++) {
						for (let j = 1; j <= sqrtN; j += 2) {
							calculateCond1(i, j, arr, mapCase1);
						}
					}

					// for x <- 1 to sqrt(n) by 2:
					// 	for y <- 2 to sqrt(n) by 2:
					// 		m <- 3 * x^2 + y^2
					// 		if (m mod 60 in {7, 19, 31, 43}) and (m <= n):
					// 			A[m] <- not A[m]

					//case 2
					for (let i = 1; i <= sqrtN; i += 2) {
						for (let j = 2; j <= sqrtN; j += 2) {
							calculateCond2(i, j, arr, mapCase2);
						}
					}

					//	 for x <- 2 to sqrt(n):
					//		 for y <- x - 1 to 1 by -2:
					//			 m <- 3 * x^2 - y^2
					//			 if (m mod 60 in {11, 23, 47, 59}) and (m <= n):
					//				 A[m] <- not A[m]

					//case 3
					for (let i = 2; i <= sqrtN; i++) {
						for (let j = i - 1; j >= 1; j -= 2) {
							calculateCond3(i, j, arr, mapCase3);
						}
					}
				} else {
					//upper section of the new square x/y





//set litm and loopStart to even or odd numbers



					for (let x = 1; x <= limitSQRT; x++) {
						for (let y = loopStart; y <= limitSQRT; y++) {
							calculateCond1(x, y, arr, mapCase1);
						}
					}
					//bottom right section of the new square x/y
					for (let x = loopStart; x <= limitSQRT; x++) {
						for (let y = 1; y <= loopStart - 1; y++) {
							calculateCond1(i, j, arr, mapCase1);
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

//https://www.baeldung.com/cs/prime-number-algorithms
// algorithm FindPrimesAtkin(n):
//	 // INPUT
//	 //	n = an arbitrary number
//	 // OUTPUT
//	 //	Prime numbers smaller than n

function findPrimesAtkin(n) {
	let s = [1, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 49, 53, 59];
	let sqrtN = Math.floor(Math.sqrt(n));
	let a = [0, 0, 1, 1, 0, 1];
	let mapCase1 = new Set([1, 13, 17, 29, 37, 41, 49, 53]);
	let mapCase2 = new Set([7, 19, 31, 43]);
	let mapCase3 = new Set([11, 23, 47, 59]);
	let primeArr = [
		0, 2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59
	];

	// case 1
	//	for x <- 1 to sqrt(n):
	//	 for y <- 1 to sqrt(n) by 2:
	//		 m <- 4 * x^2 + y^2
	//		 if (m mod 60 in {1, 13, 17, 29, 37, 41, 49, 53}) and (m <= n):
	//			 A[m] <- not A[m]
	for (let i = 1; i <= sqrtN; i++) {
		for (let j = 1; j <= sqrtN; j += 2) {
			let m = 4 * i ** 2 + j ** 2;
			if (mapCase1.has(m % 60) && m <= n) {
				if (!a[m]) {
					a[m] = 1;
				} else {
					a[m] = 0;
				}
			}
		}
	}

	// for x <- 1 to sqrt(n) by 2:
	// 	for y <- 2 to sqrt(n) by 2:
	// 		m <- 3 * x^2 + y^2
	// 		if (m mod 60 in {7, 19, 31, 43}) and (m <= n):
	// 			A[m] <- not A[m]

	//case 2
	for (let i = 1; i <= sqrtN; i += 2) {
		for (let j = 2; j <= sqrtN; j += 2) {
			let m = 3 * i ** 2 + j ** 2;
			if (mapCase2.has(m % 60) && m <= n) {
				if (!a[m]) {
					a[m] = 1;
				} else {
					a[m] = 0;
				}
			}
		}
	}

	//	 for x <- 2 to sqrt(n):
	//		 for y <- x - 1 to 1 by -2:
	//			 m <- 3 * x^2 - y^2
	//			 if (m mod 60 in {11, 23, 47, 59}) and (m <= n):
	//				 A[m] <- not A[m]

	//case 3
	for (let i = 2; i <= sqrtN; i++) {
		for (let j = i - 1; j >= 1; j -= 2) {
			let m = 3 * i ** 2 - j ** 2;
			if (mapCase3.has(m % 60) && m <= n) {
				if (!a[m]) {
					a[m] = 1;
				} else {
					a[m] = 0;
				}
			}
		}
	}

	// M <- {60 * w + s | w in {0, 1, 2, ..., n / 60} and s in S}
	// M <- {60 * w + s | w in {0, 1, 2, ..., n / 60} and s in S}

	// for m in M \ {1}:
	// 	if (m^2 > n):
	// 		break
	// 	else:
	// 		mm <- m^2
	// 		if A[m] is true:
	// 			for m2 in M:
	// 				c <- mm * m2
	// 				if (c > n):
	// 					break
	// 				else:
	// 					A[c] <- false
	//let mapM = new Set();
	for (let w = 0; w <= Math.ceil(sqrtN / 60); w++) {
		for (let v = 0; v < s.length; v++) {
			let m = 60 * w + s[v];
			if (a[m]) {
				let mSqr = m * m;
				for (let j = mSqr; j <= n; j += mSqr) a[j] = 0;
			}
		}
	}

	// primes <- {2, 3, 5}
	// Append to primes the elements of A that are true
	for (let w = 1; w <= Math.floor(n / 60); w++) {
		for (let v = 0; v < s.length; v++) {
			let m = 60 * w + s[v];
			if (a[m] === 1) {
				primeArr.push(m);
			}
		}
	}

	return primeArr;
}

function findPrimesEratosthenes(n){
	// INPUT
	//	n = an arbitrary number
	// OUTPUT
	//	prime numbers smaller than n

	 // A <- an array of size n with boolean values set to true	 
	let arrA = [0,0,1];
	let primes = [1];

//	for i <- 2 to sqrt(n):
//		 if A[i] is true:
//			 j <- i^2
//			 while j <= n:
//				 A[j] <- false
//				 j <- j + i

	let sqrtN = Math.floor(Math.sqrt(n));
	for(let i = 2; i <= sqrtN; i++){
		if(!(arrA[i]===0)){
			arrA[i] = 1;
			primes.push(i);
			for(let j = i*i; j <= n; j+=i){
				arrA[j] = 0;
			}
		}
	}

	for(let i = sqrtN + 1; i <= n; i++ ){
		if(!(arrA[i]===0)){
			arrA[i] = 1;
			primes.push(i);
		}
	}


	return primes;

}

let startTime = performance.now()


for(let x = 1; x <= 10; x++){
	console.log(findPrimesEratosthenes(20000000));
}
    
let endTime = performance.now()

console.log(`Call to findPrimesEratosthenes took ${endTime - startTime} milliseconds`)

startTime = performance.now()


for(let x = 1; x <= 10; x++){
	console.log(findPrimesAtkin(20000000));
}
    
endTime = performance.now()

console.log(`Call to findPrimesAtkin took ${endTime - startTime} milliseconds`)