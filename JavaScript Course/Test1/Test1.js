'use strict'

function whiteBlackFrogs(n) {
	if(n===1){
		return 'wjw';
	}
	const refMap = new Map([
		['WW_WB', ['j', 'WWBW_', 2]],
		['WW_BW', ['w', 'W_WBW', -1]],
		['WW_BB', ['w', 'W_WBB', -1]],
		['WB_WW', ['j', '_BWWW', -2]],
		['WB_BW', ['j', '_BWBW', -2]],
		['WB_BB', ['j', '_BWBB', -2]],
		['BW_WW', ['w', 'B_WWW', -1]],
		['BW_WB', ['j', 'BWBW_', 2]],
		['BW_BB', ['b', 'BWB_B', 1]],
		['BB_WB', ['j', 'BBBW_', 2]],
		['BB_BW', ['b', 'BBB_W', 1]],
		['BB_BB', ['b', 'BBB_B', 1]],
		['WB_', ['j', '_BW', -2]],
		['_BW', ['b', 'B_W', 1]],
		['B_WB', ['j', 'BBW_', 2]],
		['BW_W', ['w', 'B_WW', -1]],
		['WB_B', ['j', '_BWB', -2]],
		['BW_', ['w', 'B_W', -1]],
		['WB_W', ['j', '_BWW', -2]],
		['W_BW', ['w', '_WBW', -1]],
		['_WB', ['j', 'BW_', 2]],
		['B_BW', ['b', 'BB_W', 1]],
		['W_WB', ['j', 'WBW_', 2]],
		['BW_B', ['b', 'BWB_', 1]],
	]);

	let tempString = '';
	for(let i = 0; i <= 2*n ; i++){
		if(i < n){
			tempString +='W';
		} else if(i === n){
			tempString += '_';
		} else{
			tempString += 'B';
		};
	};
	let spacePosition = n;
	let replacementString = '';
	let mapElement = [];
	let result = '';
	let steps = 0;

	while(true){
		let start = spacePosition - 2;
		let end = spacePosition + 3;
		replacementString = tempString.substring(start, end);
		mapElement = refMap.get(replacementString);
		if(mapElement === undefined){
			break;
		}
		tempString = tempString.substring(0, start) + mapElement[1] + tempString.substring(end);
		result += mapElement[0];
		spacePosition += mapElement[2];
		steps ++;
		}
	return result + ' ' + steps;
  }

console.log(whiteBlackFrogs(2));

