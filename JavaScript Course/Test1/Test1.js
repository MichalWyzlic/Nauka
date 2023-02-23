'use strict'

const size = 10;

function spiral(inSize) {
	const n = inSize - 1;
	const vOnes = [];
	const vZeros = [];
	const result = new Array(inSize);
	function fillOnes(){
		let row = new Array(inSize).fill(1);
		for(let i = 0; i < vZeros.length; i++){
			row[vZeros[i]]=0;
		};
		return row;
	};
	function fillZeros(){
		let row = new Array(inSize).fill(0);
		for(let i = 0; i < vOnes.length; i++){
			row[vOnes[i]]=1;
		};
		return row;
	};

	result[0] = fillOnes();
	result[n] = fillOnes();
	vOnes.push(n)

	result[1] = fillZeros();
	vOnes.push(0);
	result[n-1] = fillZeros();
	vZeros.push(n-1);

	let rowNumber = 2;
	let loop = true;
	while(loop){
		result[rowNumber] = fillOnes();
		vZeros.push(rowNumber-1);
		if((n - 2*rowNumber) > 1){
			result[n-rowNumber] = fillOnes();
			vOnes.push(n-rowNumber)
		}else if((n - 2*rowNumber) > 0){
			vOnes.push(n-rowNumber);
			result[n-rowNumber] = fillZeros();
			break;
		};
		rowNumber++;
		result[rowNumber] = fillZeros();
		
		if((n - 2*rowNumber) > 1){
			vOnes.push(rowNumber-1);
			result[n-rowNumber] = fillZeros();
			vZeros.push(n-rowNumber)
		}else if((n - 2*rowNumber) > 0){
			vOnes.push(rowNumber-1);
			vZeros.push(n-rowNumber);
			result[n-rowNumber] = fillZeros();
			break;
		} else{
			break;
		};
		rowNumber++;

	};

	return result;
  }

function printSpiral(n){
	const spiralArray = spiral(n); 
	for(let i=0; i < n; i++){
		console.log(spiralArray[i]);
	};
};

printSpiral(8);