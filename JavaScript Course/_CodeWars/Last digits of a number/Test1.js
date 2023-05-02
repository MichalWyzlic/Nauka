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

console.log(lastDigit(34625647867585,10));
console.log(lastDigit(123767,10));
console.log(lastDigit(123767,0));
console.log(lastDigit(123767,-1));
