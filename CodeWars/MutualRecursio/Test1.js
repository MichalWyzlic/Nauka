function F(n) {
	if(n === 0){
		return 1;
	}
	return n - M(F(n-1));
 }

function M(n) {
	if(n === 0){
		return 0;
	}
	return n - F(M(n-1));
}

let result = []
for(let i = 0; i < 10; i++){
	result[i] = F(i);
}
console.log(result);

for(let i = 0; i < 10; i++){
	result[i] = M(i);
}
console.log(result);

//F: 1, 1, 2, 2, 3, 3, 4, 5, 5, 6
//M: 0, 0, 1, 2, 2, 3, 4, 4, 5, 6,