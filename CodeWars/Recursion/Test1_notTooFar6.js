class Primes {
	static *stream() {

		let primes = [2, 3, 5,  7, 11, 13, 17, 19, 23, 29, 31];		
		let wheel = [ 7, 11, 13, 17, 19, 23, 29, 31];
		let primeMul = [0];
		let iteration = 0;		
		let prevCycle = 0;		
		let limitN = 1000000;
		let mulN = 1.09;
		let low = 32;
    	let high = limitN;		
		let cycle = Math.floor(limitN/30);
		let cycleLimit = (cycle - 1) * 30 + 31;
		let sqrtLimit = Math.floor(Math.sqrt(cycleLimit));
		
		//initial sieve
		let mark = new Uint8Array(100000000);
		let limitSqrt = Math.floor(Math.sqrt(cycleLimit));
		let p = 7;	
		//let i = prevCycle * 30;

				
//		for(let k = 0; i<= cycleLimit; i+=30){
			let j = 0;
			while(j< wheel.length){
				p = wheel[j];
								
				//prime is greater that a product of 6
				let divBy6 = Math.floor(p/6) === Math.floor((p+1)/6);
				let increment2 = 2*p;
				let increment4 = 4*p;
				
				let i = p*p;
				mark[i] = 1;
				if(divBy6){
					i += increment4;
					mark[i] = 1;
				}
				
				while(i <= cycleLimit){
					i += increment2;
					mark[i] = 1;
					i += increment4;
					mark[i] = 1;
				}
				j++;
			
				//primeMul[p] = i; 
				
			}
			//recover all the primes above limitSqrt
			for(let k = 30; k <= cycleLimit; k+=30){
				for(let j = 0; j < wheel.length; j++){
					p = k + wheel[j];				
					if(!(mark[p]===1)){
						primes.push(p);
						//prime is greater that a product of 6
						let divBy6 = Math.floor(p/6) === Math.floor((p+1)/6);
						let increment2 = 2*p;
						let increment4 = 4*p;
						
						let i = p*p;
						mark[i] = 1;
						if(divBy6){
							i += increment4;
							mark[i] = 1;
						}
						
						while(i <= cycleLimit){
							i += increment2;
							mark[i] = 1;
							i += increment4;
							mark[i] = 1;
						}
					}
				}
			}
		//}

			
		
		low = high + 1;
		cycle = Math.floor((high + limitN * mulN)/30);
		high = cycle*30;		
		cycleLimit = high + 1; //(cycle - 1) * 30 + 31;
		prevCycle = cycle + 1;
		sqrtLimit = Math.floor(Math.sqrt(cycleLimit));
		
		

		while(true){
			while(iteration >= primes.length){
				//seek for new primes
				//let mark = [];
				let newSqrtN = Math.floor(Math.sqrt(cycleLimit));
				let currCycleLimit = Math.floor(newSqrtN/30);

				for(let k = 0; k <= currCycleLimit; k+=30 ){
					for(let j = 0 ; j < wheel.length; j++){
						p = k+ wheel[j];

///// to tu
										
						//prime is greater that a product of 6
						let divBy6 = Math.floor(p/6) === Math.floor((p+1)/6);
						let increment2 = 2*p;
						let increment4 = 4*p;
						
						let i = p*p;
						mark[i] = 1;
						if(divBy6){
							i += increment4;
							mark[i] = 1;
						}
						
						while(i <= cycleLimit){
							i += increment2;
							mark[i] = 1;
							i += increment4;
							mark[i] = 1;
						}
						j++;
					
						//primeMul[p] = i; 


						let loMul = Math.floor(low/primes[i]);
						let divBy6 = Math.floor(loMul/6) === Math.floor((loMul+1)/6);
						if(divBy6){
							//higher of the "5/7" pair
							loMul = Math.floor(loMul/6) * 6 + 1;
						} else {
							//lower of the "5/7" pair
							loMul = (Math.floor(loMul/6)+1) * 6 - 1;
						}
						let increment2 = 2*primes[i];
						let increment4 = 4*primes[i];
						let loLim = loMul * primes[i];
						while (loLim < low){
							if(divBy6){
								loLim += increment4;
							} else {
								loLim += increment2;
							}
							divBy6 = !divBy6;
						}
						
						let j = loLim;
						//mark the lowest product as non prime
						mark[j-low] = 1;
						if(divBy6){
							j += increment4;
							mark[j-low] = 1;
						}
						
						while(j<high){
							j += increment2;
							mark[j-low] = 1;
							j += increment4;
							mark[j-low] = 1;
						}									



						
					}
				}


				//Start from primes[1]=3
				for (let i = 1; primes[i] <= newSqrtN; i++){
					// Find the minimum number in [low..high] that is
					// a multiple of prime[i] (divisible by prime[i])
					// For example, if low is 31 and prime[i] is 3,
					// we start with 33.
					if(primes[i] === 3){
						let loMul = Math.floor(low/primes[i]);
						//if loMul is even choose next odd number
						if(!(loMul%2)) loMul++; 
						let loLim = loMul * primes[i];
						let increment2 = 2*primes[i];
						if (loLim < low){
							loLim += increment2;
						}
						let j = loLim;
						while(j < high){
							mark[j-low]=1;
							j += increment2;
						}

					} else {

						let loMul = Math.floor(low/primes[i]);
						let divBy6 = Math.floor(loMul/6) === Math.floor((loMul+1)/6);
						if(divBy6){
							//higher of the "5/7" pair
							loMul = Math.floor(loMul/6) * 6 + 1;
						} else {
							//lower of the "5/7" pair
							loMul = (Math.floor(loMul/6)+1) * 6 - 1;
						}
						let increment2 = 2*primes[i];
						let increment4 = 4*primes[i];
						let loLim = loMul * primes[i];
						while (loLim < low){
							if(divBy6){
								loLim += increment4;
							} else {
								loLim += increment2;
							}
							divBy6 = !divBy6;
						}
						
						let j = loLim;
						//mark the lowest product as non prime
						mark[j-low] = 1;
						if(divBy6){
							j += increment4;
							mark[j-low] = 1;
						}
						
						while(j<high){
							j += increment2;
							mark[j-low] = 1;
							j += increment4;
							mark[j-low] = 1;
						}							
					}
					         
				}
			
				// Numbers which are not marked as false are prime
				let i = low;
				if(!(i%2))i++;
				for (i; i<high; i+=2){
						if (!(mark[i - low] === 1)){
						primes.push(i);
					}  
				}
				// Update low and high for next segment
				low = high + 1;
				high = Math.floor(high + limitN * mulN);
				//console.log('low: ' + low + ', high: ' + high );
				//console.log('no of primes: ' + (primes.length - prevPrimesLength));
				//prevPrimesLength = primes.length;
			}

			while(iteration < primes.length){
				iteration ++;
				yield primes[iteration-1];

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

