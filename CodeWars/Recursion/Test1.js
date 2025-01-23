function pascalsPyramidLayer(n) {
	// input: number
	// output: 2D-array of BigInt
	function recursion(lvl = 3){
		let tempArr = [[1n]];
		if(lvl > n) return;
		for(let i = 1; i < lvl; i++){
			tempArr.push([]);
			for(let j = 0; j <= i; j++){
				let tempVal = 0n;
				if(i < (lvl - 1) ){
					tempVal = result[i][j];}
					if(j > 0) tempVal += result[i-1][j-1];
					if(j < i) tempVal += result[i-1][j];
					tempArr[i][j] = tempVal;			
			}
			
		}

		result = tempArr;
		recursion(lvl + 1);

	}

	if(n<=0) return null;
	if(n===1) return [[1n]];
	if(n===2) return [[1n], [1n, 1n]];	

	let result = [[1n], [1n, 1n]];
	recursion();
	return result;
  }

  console.log(pascalsPyramidLayer(5));
  console.log(pascalsPyramidLayer(10));