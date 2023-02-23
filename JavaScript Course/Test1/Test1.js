'use strict'

function getPINs(observed) {
	// TODO: This is your job, detective!
	const pinTable = [	['0','8'],
						['1','2','4'],
						['2','1','3','5'],
						['3','2','6'],
						['4','1','5','7'],
						['5','2','4','6','8'],
						['6','3','5','9'],
						['7','4','8'],
						['8','5','7','9','0'],
						['9','6','8'] ];
	const pinString = observed.split('');
	const position = [pinString.length];
	position.fill(0);
	let cases	= 1;
	const tempString = '';
	const resultTable = [];
	resultTable.push(observed);
	for(let i = 0; i < pinString.length; i++){
		pinString[i]=Number(pinString[i]);
	 	position[i] = pinTable[pinString[i]].length;
		cases *= position[i];
	};
	position.fill(0);
	for(let i = 1; i < cases; i++){
		let temp = i;
		let tempString = '';
		for(let j = 0; j < pinString.length; j++){
			position[j] = temp % (pinTable[pinString[j]].length);
			temp = Math.floor(temp/(pinTable[pinString[j]].length));
			tempString += pinTable[pinString[j]][position[j]];
		};
		resultTable.push(tempString);		
	};
	return resultTable;
  };


  console.log(getPINs('11'));