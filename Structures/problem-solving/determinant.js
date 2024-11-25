function determinant(m) {
	// return the determinant of the matrix passed in [x][y]
	//	[00 , 10]
	//	[01 , 11]
	if (m.length === 1) {
		return m[0][0];
	} else if (m.length === 2) {
		return m[0][0] * m[1][1] - m[0][1] * m[1][0];
	}
	
	let det = 0;
	for(let i = 0; i < m.length; i ++){
		let newMatrix = [];
		for(let j = 0; j < m.length; j++){
			if(i !== j) newMatrix.push(m[j].slice(1));
		}
		if(m[i][0] !== 0) {
			let tempDet = (i%2 === 0 ? 1 : -1) * m[i][0];
			tempDet *=determinant(newMatrix); 
			det += tempDet;
		}
	}

	return det;
}

let m1 = [
	[4, 6],
	[3, 8]
];

let m4 = [
	[1, 3, 0,-1],
	[0, 2, 1, 3],
	[3, 1, 2, 1],
	[-1,2, 0, 3]
];
let m5 = [
	[2, 4, 2, 4, 5],
	[3, 1, 1, 2, 3],
	[1, 2, 4, 7, -1],
	[1, 5, 2, 3, 5],
	[8, 2, 3, 7, 9]
];
m3 = [[2,4,2],[3,1,1],[1,2,0]]

console.log(determinant(m1));
console.log(determinant(m4));
console.log(determinant(m5));
console.log(determinant(m3));
