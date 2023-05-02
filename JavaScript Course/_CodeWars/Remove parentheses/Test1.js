function removeParentheses1(s) {
	const myRegEx = /\(.*?\)/g;

	return s.replace(myRegEx, '');
}

function removeParentheses(s) {
	let count = 0;
	let start = 0;
	let result = s.split('');
	for (let i = 0; i < result.length; i++) {
		if (result[i] === '(') {
			count++;
			if (count === 1) {
				start = i;
			}
		} else if (result[i] === ')') {
			count--;
			if (count === 0) {
				let deleteCount = i + 1 - start;
				result.splice(start, deleteCount);
				i = i - deleteCount;
			}
		}
	}
	return result.join('');
}

console.log(removeParentheses('example(unwanted thing)example'));
console.log(removeParentheses('(first group) (second group) (third group)'));
