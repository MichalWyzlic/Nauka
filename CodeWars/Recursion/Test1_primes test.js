class Primes {
  static * stream() {
	// replace this with your solution
	for(let p of [2,3,5,7,11,13,17,19,23,29]) {
	  yield p;
	}
  }
}

//https://www.baeldung.com/cs/prime-number-algorithms
// algorithm FindPrimesAtkin(n):
//	 // INPUT
//	 //	n = an arbitrary number
//	 // OUTPUT
//	 //	Prime numbers smaller than n

function findPrimesAtkin(n){
	let s = [1, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 49, 53, 59];
	let sqrtN = Math.floor(Math.sqrt(n));
	let a = new Set();
	let mapCase1 = new Set([1, 13, 17, 29, 37, 41, 49, 53]);
	let mapCase2 = new Set([7, 19, 31, 43]);
	let mapCase3 = new Set([11, 23, 47, 59]);

	//case 1
	for(let i = 1; i <= sqrtN; i++){
		for(let j = 1; j <= sqrtN; j += 2){
			let m = 4 * i**2 + j**2;
			if (mapCase1.has(m % 60) && (m <= n)){
				if(a.has(m)){
					a.delete(m);
				} else {
					a.add(m);
				};
			}
		} 
	}

	// for x <- 1 to sqrt(n) by 2:
	// 	for y <- 2 to sqrt(n) by 2:
	// 		m <- 3 * x^2 + y^2
	// 		if (m mod 60 in {7, 19, 31, 43}) and (m <= n):
	// 			A[m] <- not A[m]
	
	//case 2
	for(let i = 1; i <= sqrtN; i+= 2){
		for(let j = 1; j <= sqrtN; j += 2){
			let m = 3 * i**2 + j**2;
			if (mapCase2.has(m % 60) && (m <= n)){
				if(a.has(m)){
					a.delete(m);
				} else {
					a.add(m);
				};
			}
		} 
	}

	//	 for x <- 2 to sqrt(n):
	//		 for y <- x - 1 to 1 by -2:
	//			 m <- 3 * x^2 - y^2
	//			 if (m mod 60 in {11, 23, 47, 59}) and (m <= n):
	//				 A[m] <- not A[m]

	//case 3
	for(let i = 2; i <= sqrtN; i++){
		for(let j = i - 1; j <= 1; j -= 2){
			let m = 3 * i**2 + j**2;
			if (mapCase3.has(m % 60) && (m <= n)){
				if(a.has(m)){
					a.delete(m);
				} else {
					a.add(m);
				};
			}
		} 
	}

	// M <- {60 * w + s | w in {0, 1, 2, ..., n / 60} and s in S}
	let mapM = new Set();
	for(let w = 0; w <= Math.floor(n/60); w++){
		for(let v = 0; v < s.length; v++){
			mapM.add(60 * w + s[v]);
		}
	}

	mapM.forEach((m) => {
		let mm = m * m;
		if(m !== 1 && mm <= n){
			
		}
	})

    // for m in M \ {1}:
    //     if (m^2 > n):
    //         break
    //     else:
    //         mm <- m^2
    //         if A[m] is true:
    //             for m2 in M:
    //                 c <- mm * m2
    //                 if (c > n):
    //                     break
    //                 else:
    //                     A[c] <- false

    // primes <- {2, 3, 5}
    // Append to primes the elements of A that are true		

}

//	  
//	 A <- an array of size n with boolean values set to false

//	 for x <- 1 to sqrt(n):
//		 for y <- 1 to sqrt(n) by 2:
//			 m <- 4 * x^2 + y^2
//			 if (m mod 60 in {1, 13, 17, 29, 37, 41, 49, 53}) and (m <= n):
//				 A[m] <- not A[m]

//	 for x <- 1 to sqrt(n) by 2:
//		 for y <- 2 to sqrt(n) by 2:
//			 m <- 3 * x^2 + y^2
//			 if (m mod 60 in {7, 19, 31, 43}) and (m <= n):
//				 A[m] <- not A[m]

//	 for x <- 2 to sqrt(n):
//		 for y <- x - 1 to 1 by -2:
//			 m <- 3 * x^2 - y^2
//			 if (m mod 60 in {11, 23, 47, 59}) and (m <= n):
//				 A[m] <- not A[m]

//	 M <- {60 * w + s | w in {0, 1, 2, ..., n / 60} and s in S}

//	 for m in M \ {1}:
//		 if (m^2 > n):
//			 break
//		 else:
//			 mm <- m^2
//			 if A[m] is true:
//				 for m2 in M:
//					 c <- mm * m2
//					 if (c > n):
//						 break
//					 else:
//						 A[c] <- false

//	 primes <- {2, 3, 5}
//	 Append to primes the elements of A that are true

//	 return primes