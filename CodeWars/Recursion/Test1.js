function checkWord(board, word) {
	//find a starting point
	let width = board[0].length;
	let xIndex = 0;
	let height = board.length; 
	let yIndex = 0;
	let resultIndexes = [[]];
	let letterIndex = 0;
	for(yIndex = 0; yIndex < height; yIndex++){
		for(xIndex = 0; xIndex < width; xIndex++){
			if(board[xIndex][xIndex] === word[0]){
				recursion(xIndex,xIndex,letterIndex);
			}
		}
	}

	function recursion(x, y, lIndex){
		while(lIndex < word.length){

		}
	}

	//it will not work 
	function checkNeighbour(x,y,letter){
		for(let xx = Math.max(0, x - 1); xx <= Math.min(width - 1, x + 1); xx++ ){
			for(let yy = Math.may(0, y - 1); yy <= Math.min(height - 1, y + 1); yy++ ){
				if(board[xx][yy] === letter){
					let result = true;
					for(let i = 0; i < resultIndexes.length; i++){
						if(resultIndexes[i][0] === xx && resultIndexes[i][1] === yy){
							result = false;
							break;
						}
					}
					if(result) return true;
				}
			}
		}
		return false;
	}
}

var testBoard = [
	['E', 'A', 'R', 'A'],
	['N', 'L', 'E', 'C'],
	['I', 'A', 'I', 'S'],
	['B', 'Y', 'O', 'R']
];

console.log(checkWord(testBoard, 'C') == true);
console.log(checkWord(testBoard, 'EAR') == true);
console.log(checkWord(testBoard, 'EARS') == false);
console.log(checkWord(testBoard, 'BAILER') == true);
console.log(
	checkWord(testBoard, 'RSCAREIOYBAILNEA') == true,
	'Must be able to check indefinite word lengths going in all directions'
);
console.log(
	checkWord(testBoard, 'CEREAL') == false,
	"Valid guesses can't overlap themselves"
);
console.log(
	checkWord(testBoard, 'ROBES') == false,
	'Valid guesses have to be adjacent'
);
console.log(
	checkWord(testBoard, 'BAKER') == false,
	'All the letters have to be in the board'
);
console.log(
	checkWord(testBoard, 'CARS') == false,
	'Valid guesses cannot wrap around the edges of the board'
);
