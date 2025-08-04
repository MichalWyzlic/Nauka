const primeArr = [2, 3, 5];
let arr = [0, 0, 1, 1];
let arrMul = [];

class Primes {
	static *stream() {
		function calculateCond(valX, valY, valLimit, valArr) {
			let xSqr = valX * valX;
			let ySqr = valY * valY;
			// condition 1
			let n = 4 * xSqr + ySqr;
			if (/*n <= valLimit && */ n % 12 === 1 || n % 12 === 5)
				if(valArr[n] !== 2)
					valArr[n] = valArr[n] ? (valArr[n] = 0) : (valArr[n] = 1);

			// condition 2
			n = 3 * xSqr + ySqr;
			if (/*n <= valLimit && */ n % 12 === 7)
				if(valArr[n] !== 2)
					valArr[n] = valArr[n] ? (valArr[n] = 0) : (valArr[n] = 1);

			// condition 3
			n = 3 * xSqr - ySqr;
			if (valX > valY /*&& n <= valLimit*/ && n % 12 === 11)
				if(valArr[n] !== 2)
					valArr[n] = valArr[n] ? (valArr[n] = 0) : (valArr[n] = 1);
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

		let loopStart = 1;
		let initI = 5;
			let counter = 1;
			let initialLimit = 400
		let limit = 400;
		let limitSQRT = 20;
    
		let prevLimit = 5;
		// mark 2 and 3 as prime
		let arr = [0, 0, 1, 1];
		let arrMul = [];
		let firstGo = true;

		let sqrCounter = -1;
		let s = [1, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 49, 53, 59];
	

		//function sieveOfAtkin(limit) {
		//infinite loop for finding prime numbers
		while (true) {
			//check if a new search is needed
			while (iterator >= primeArr.length) {
        console.log(iterator);
				// check for all three conditions
				if (firstGo) {
					//initial square x/y
					for (let x = 1; x <= limitSQRT; x++) {
						for (let y = 1; y <= limitSQRT; y++) {
							calculateCond(x, y, limit, arr);
						}
					}
				} else {
					//upper section of the new square x/y
					for (let x = 1; x <= limitSQRT; x++) {
						for (let y = loopStart; y <= limitSQRT; y++) {
							calculateCond(x, y, limit, arr);
						}
					};
					//bottom right section of the new square x/y
					for (let x = loopStart; x <= limitSQRT; x++) {
						for (let y = 1; y <= loopStart - 1; y++) {
							calculateCond(x, y, limit, arr);
						}
					}
				}

				// Mark all multiples
				// of squares as non-prime
				//Original code
				// for (let i = 5; i <= limitSQRT; i++) {
				// 	let iSqr = i * i;
				// 	if (!arr[i]) continue;
				// 	for (let j = iSqr; j <= limit; j += iSqr) arr[j] = 0;
				// }
				
				//Other approach to square multiplication 
				for (let w = 0; w <= Math.ceil(limitSQRT / 60); w++) {
					for (let v = 0; v < s.length; v++) {
						let m = 60 * w + s[v];
						if (arr[m] === 1) {
							let mSqr = m * m;
							if(!arrMul[m]) arrMul[m] = 1;
							let j = mSqr * arrMul[m];
							for (j; j <= limit; j += mSqr) {
								arr[j] = 2;
							}
							arrMul[m] = j / mSqr;
						}
					}
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
				counter ++;
				//limit = Math.sqrt(counter) * initialLimit;
						//limitSQRT = Math.ceil(Math.sqrt(limit));
				limitSQRT += 10;//(iterator > 50000) ? 8 : 8;
						limit = limitSQRT * limitSQRT;
			}
			let val = primeArr[iterator];
			iterator++;
			firstGo = false;
			yield val;

		}
	}
}
const stream = Primes.stream();
let i = 1
for(i ; i <= 1000000; i++){

	stream.next();
	
}
console.log(i + ': ' + stream.next().value);

/*[ 2,
  3,
  5,
  7,
  11,
  13,
  17,
  19,
  23,
  29,
  31,
  37,
  41,
  43,
  47,
  53,
  59,
  61,
  67,
  71,
  73,
  79,
  83,
  89,
  97,
  101,
  103,
  107,
  109,
  113,
  127,
  131,
  137,
  139,
  149,
  151,
  157,
  163,
  167,
  173,
  179,
  181,
  191,
  193,
  197,
  199,
  211,
  223,
  227,
  229,
  233,
  239,
  241,
  251,
  257,
  263,
  269,
  271,
  277,
  281,
  283,
  293,
  307,
  311,
  313,
  317,
  331,
  337,
  347,
  349,
  353,
  359,
  367,
  373,
  379,
  383,
  389,
  397 ]
78
[ 2,
  3,
  5,
  7,
  11,
  13,
  17,
  19,
  23,
  29,
  31,
  37,
  41,
  43,
  47,
  53,
  59,
  61,
  67,
  71,
  73,
  79,
  83,
  89,
  97,
  101,
  103,
  107,
  109,
  113,
  127,
  131,
  137,
  139,
  149,
  151,
  157,
  163,
  167,
  173,
  179,
  181,
  191,
  193,
  197,
  199,
  211,
  223,
  227,
  229,
  233,
  239,
  241,
  251,
  257,
  263,
  269,
  271,
  277,
  281,
  283,
  293,
  307,
  311,
  313,
  317,
  331,
  337,
  347,
  349,
  353,
  359,
  367,
  373,
  379,
  383,
  389,
  397,
  25,
  169,
  175,
  245,
  275,
  289,
  325 ]*/