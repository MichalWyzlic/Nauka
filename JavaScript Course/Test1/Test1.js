matrix = [[112, 42, 83, 119], [56, 125, 56, 49], [15, 78, 101, 43], [62, 98, 114, 108]];

function checkMaxValuePosition(pi, pj, matrix){
	let n = matrix.length - 1;
	let tempArray = [[matrix[pi][pj],1],[matrix[pi][n-pj],2],[matrix[n-pi][n-pj],3],[matrix[n-pi][pj],4]];
	tempArray.sort((a,b) => b[0] - a[0]);
	return tempArray[0][1];
};

function reverseV(c, matrix){
	let n = matrix.length - 1;
	if(c > n){
		return;
	};
	for(let i = 0; i < matrix.length/2; i++){
		let tempValue = matrix[i][c];
		matrix[i][c] = matrix[n-i][c];
		matrix[n-i][c] = tempValue;
	};
};



function flippingMatrix(matrix) {
	let n = matrix.length / 2 - 1;
	let n2 = matrix.length - 1;
	let sum = 0;
	for(let i = 0; i <= n; i ++){
		for(let j = 0; j <= n; j++){
			let maxPosition = checkMaxValuePosition(i, j, matrix);
			switch(maxPosition){
				case 2 :
					reverseV(n2-j, matrix);
					matrix[i].reverse();
					reverseV(n2-j, matrix);
					matrix[i].reverse();
					break;
				case 3:
					matrix[i].reverse();
					reverseV(n2-j, matrix);
					matrix[i].reverse();
					break;
				case 4:
					matrix[i].reverse();
					matrix[n2-i].reverse();
					reverseV(n2-j, matrix);
					matrix[i].reverse();
					break;
			};
			sum += matrix[i][j];
		};
	};

	return sum;
	
};
reverseV(2,matrix);
console.log(flippingMatrix(matrix));


function fizzBuzz(n) {
    // Write your code here
	for(let i = 1; i <= n; i++){
		let output = '';
		if(Math.floor(i/3)===i/3){
			output += 'Fizz';
		};
		if(Math.floor(i/5)===i/5){
			output += 'Buzz';
		};
		if(output === ''){
			output += i;
		};
		console.log(output);
	};

};

fizzBuzz(15);