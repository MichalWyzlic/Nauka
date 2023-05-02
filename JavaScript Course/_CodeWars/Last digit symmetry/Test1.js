function primeNumbers(n){
	function checkASet(num, inputSet){
		let isAPrime = true;
		inputSet.forEach( (value, key, set) => {
			if((num % value) === 0){
				isAPrime = false;
			}});
		if(isAPrime){
			inputSet.add(num);
		}
	}

	let result = new Set([2,3,5,7,11,13,17,19]);
	let countLimit = Math.sqrt(n)/6;
	for(let i = 4; i <= countLimit; i ++){
		let num = i * 6 - 1;
		checkASet(num, result);
		num = i * 6 + 1;
		checkASet(num, result);
	}
	return result;
}

function lastDigit(n, d) {
	let str = n.toString();
	if(d <= 0) {
	 	return [];
	}
	let result = str.slice(str.length - Math.min(str.length, d)).split('');
	for(let i = 0; i < result.length; i++){
		result[i] = Number(result[i]);
	}
	return result;
}


primeNumbers(1000000);
console.log(lastDigit(34625647867585,10));
console.log(lastDigit(123767,10));
console.log(lastDigit(123767,0));
console.log(lastDigit(123767,-1));
