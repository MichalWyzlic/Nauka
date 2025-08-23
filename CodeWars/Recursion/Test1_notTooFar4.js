class Primes {
	static *stream() {

		let primes = [2];
		let primeMul = [0];
		let iteration = 0;
		let limitN = 6000;
		
		function simpleSieve(limit, primeArr){
			let mark = [0,0,1];
			let limitSqrt = Math.floor(Math.sqrt(limit));
			let p = 3;	
			for(p; p <= limitSqrt; p+=2){
				if(!(mark[p]===0)){
					primeArr.push(p);
					//prime is greater that a product of 6
					let divBy6 = Math.floor(p/6) === Math.floor((p+1)/6);
					let increment2 = 2*p;
					let increment4 = 4*p;
					if( p === 3){
						for(let i = p * p; i <= limit; i += increment2){
							mark[i] = 0;
						}
					//if the prime is lower than the product of 6	
					} else {
						let i = p*p;
						mark[i] = 0;
						if(divBy6){
							i += increment4;
							mark[i] = 0;
						}
						
						while(i <= limit){
							i += increment2;
							mark[i] = 0;
							i += increment4;
							mark[i] = 0;
						}
					}
					//primeMul[p] = i; 
				}
			}

			//recover all the primes above limitSqrt
			p = limitSqrt + 1;
			if(!(p%2))p++;
			for( p; p <= limit; p+=2){
				if(!(mark[p]===0)){
					primeArr.push(p);
				}
			}
		}

		simpleSieve(limitN, primes);
		
		let low = limitN  ;
    	let high = 2*limitN;

		while(true){
			while(iteration >= primes.length){
				//seek for new primes
				let mark = [];

				for (let i = 0; i < primes.length; i++){
					// Find the minimum number in [low..high] that is
					// a multiple of prime[i] (divisible by prime[i])
					// For example, if low is 31 and prime[i] is 3,
					// we start with 33.
					let loLim = Math.floor(low/primes[i]) * primes[i];
					if (loLim < low){
						loLim += primes[i];
					}
//// IT is here !!!!!!!!!!!!!						
					let i = p*p;
					mark[i] = 0;
					if(divBy6){
						i += increment4;
						mark[i] = 0;
					}
					
					while(i <= limit){
						i += increment2;
						mark[i] = 0;
						i += increment4;
						mark[i] = 0;
					}	

					/* Mark multiples of prime[i] in [low..high]:
						We are marking j - low for j, i.e. each number
						in range [low, high] is mapped to [0, high-low]
						so if range is [50, 100] marking 50 corresponds
						to marking 0, marking 51 corresponds to 1 and
						so on. In this way we need to allocate space only
						for range */
					// for (let j=loLim; j<high; j+=prime[i]){
					// 	mark[j-low] = false;
					// }            
				}
			
				// Numbers which are not marked as false are prime
				for (let i = low; i<high; i++){
						if (mark[i - low] == true){
						res = res + i + " ";
					}  
				}
				// Update low and high for next segment
				low = low + limit;
				high = high + limit;
			}



// // Prints all prime numbers smaller than 'n'
// function segmentedSieve(n)
// {
//     // Compute all primes smaller than or equal
//     // to square root of n using simple sieve
//     let limit = Math.floor(Math.sqrt(n))+1;
//     let prime = new Array(limit);
    
//     simpleSieve(limit, prime);

//     // Divide the range [0..n-1] in different segments
//     // We have chosen segment size as sqrt(n).
//     let low = limit;
//     let high = 2*limit;

//     // While all segments of range [0..n-1] are not processed,
//     // process one segment at a time
//     while (low < n)
//     {
//         if (high >= n){
//             high = n;
//         }
            
//         // To mark primes in current range. A value in mark[i]
//         // will finally be false if 'i-low' is Not a prime,
//         // else true.
//         let mark = new Array(limit+1).fill(true);

//         // Use the found primes by simpleSieve() to find
//         // primes in current range
//         for (let i = 0; i < prime.length; i++)
//         {
//             // Find the minimum number in [low..high] that is
//             // a multiple of prime[i] (divisible by prime[i])
//             // For example, if low is 31 and prime[i] is 3,
//             // we start with 33.
//             let loLim = Math.floor(low/prime[i]) * prime[i];
//             if (loLim < low){
//                 loLim += prime[i];
//             }
                
//             /* Mark multiples of prime[i] in [low..high]:
//                 We are marking j - low for j, i.e. each number
//                 in range [low, high] is mapped to [0, high-low]
//                 so if range is [50, 100] marking 50 corresponds
//                 to marking 0, marking 51 corresponds to 1 and
//                 so on. In this way we need to allocate space only
//                 for range */
//             for (let j=loLim; j<high; j+=prime[i]){
//                 mark[j-low] = false;
//             }            
//         }

//         // Numbers which are not marked as false are prime
//         for (let i = low; i<high; i++){
//               if (mark[i - low] == true){
//                 res = res + i + " ";
//             }  
//         }
//         // Update low and high for next segment
//         low = low + limit;
//         high = high + limit;
//     }
//     console.log(res);
// }









			while(iteration < primes.length){
				iteration ++;
				yield primes[iteration-1];

			}
		}


	}
}


let startTime = performance.now();
const stream = Primes.stream();
let i = 0;
for (i; i <= 20; i++) {
	let val = stream.next().value;

	//  if(i >= 100 && i < 110
	//  	|| i >= 1000 && i < 1010){
	//  		console.log(i + ': ' + val);
	//  	}
}
console.log(i + ': ' + stream.next().value);
let endTime = performance.now();

console.log(`Call to stream took ${endTime - startTime} milliseconds`);
