class Primes {
	static *stream() {

		let primes      = [2, 3, 5,  7, 11, 13, 17, 19, 23, 29, 31];
		let primeMul    = [0, 0, 0,  4,  5,  6,  7,  8,  9, 10];
		let primeMulVal = [0, 0, 0, 77,143,221,323,437,667,899];
		let primePower  = [0, 0, 0, 49,121,169,289,361,529,841,961];
		let notWheel = [2, 3, 4, 5, 6, 8, 9, 10, 12, 14, 15, 16, 18, 20, 21, 22, 24, 25, 26, 27, 28, 30];
		let wheel = [ 7, 11, 13, 17, 19, 23, 29, 31];
		let prevCycle = 1;
		let cycle = 1;
		//let mark = new Uint8Array(100000000);
		let mark = [];

		let iteration = 0;
		while(true){
			while(iteration >= primes.length){
				cycle = Math.floor(primes[3]*primes[primes.length-2]/30);
				let cycleLimit = cycle * 30 + 31;
				let sqrtLimit = Math.floor(Math.sqrt(cycleLimit));
				let j = 3;

				//check for elimination of prime multipliers
				while( primes[j] <= sqrtLimit){
					if(primePower[j] <= cycleLimit){
						mark[primePower[j]] = 1;
						primePower[j] *= primes[j];
					}
					let p = primeMulVal[j];
					while(p <= cycleLimit){
						mark[p] = 1;
						primeMul[j] ++;
						p = primes[j] * primes[primeMul[j]];
					}					
					primeMulVal[j] = p;	
					j++;				
				}

				//extract primes				
				let i = prevCycle * 30;
				let limit = cycle * 30;
				while(i <= limit){
					for(let j = 0; j < wheel.length; j++){
						let p = i + wheel[j];
						if(!(mark[p]===1)){
							primeMulVal.push(primes[primes.length-1]*p);
							primes.push(p);
							primeMul.push(primes.length-1);
							primePower.push(p*p);							
						}						
					}
					i += 30;
				}
				prevCycle = cycle + 1;
			}
			yield primes[iteration];
			iteration ++;

		}
		

	// for N in {2, 3, 5} {
	//	   return False;
	// }
	// for p= [0, sqrt(N)] such that p = p + 30: {
	//	   for c in [p+7, p+11, p+13, p+17, p+19, p+23, p+29, p+31] {
	//		   if c > sqrt(N)	  
	//			   break;
	//		   else if N % (c+p) = 0:
	//			   return False;
	//	   }
	// }


	}
}


let startTime = performance.now();
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

// startTime = performance.now();
// const stream1 = Primes.stream();
// i = 0;
// for (i; i <= 5000000; i++) {
// 	let val = stream1.next().value;

// 	//  if(i >= 100 && i < 110
// 	//  	|| i >= 1000 && i < 1010){
// 	//  		console.log(i + ': ' + val);
// 	//  	}
// }
// console.log(i + ': ' + stream1.next().value);
// endTime = performance.now();

// console.log(`Call to stream took ${endTime - startTime} milliseconds`);

// startTime = performance.now();
// const stream2 = Primes.stream();
// i = 0;
// for (i; i <= 25000000; i++) {
// 	let val = stream2.next().value;

// 	//  if(i >= 100 && i < 110
// 	//  	|| i >= 1000 && i < 1010){
// 	//  		console.log(i + ': ' + val);
// 	//  	}
// }
// console.log(i + ': ' + stream2.next().value);
// endTime = performance.now();

// console.log(`Call to stream took ${endTime - startTime} milliseconds`);

