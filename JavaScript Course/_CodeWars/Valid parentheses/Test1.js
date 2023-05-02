function validParentheses(parenStr) {
	let count = 0;
	if(parenStr ===''){
		return true;
	}
	for(let i=0; i<parenStr.length;i++){
		if(parenStr.charAt(i) === '('){
			count ++;
		} else {
			count --;
		}

		if(count < 0){
			return false;
		}
	}
	return count === 0;
}

console.log(validParentheses('()(())((()))(())()'));
console.log(validParentheses('())(()'));
