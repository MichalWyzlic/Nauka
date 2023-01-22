const scores = {
	'Emy': [12],
	'Sandra': [1,1,1,1,1],
	'Sue': [7]
};

function podium(scores){
	//Check the scores table
	const verifiedScores = Object.entries(scores);

	//create an array of competitors and their cumulated scores
	const calculatedScores = Object.entries(scores).map((value) => {
		const points = value[1];
		let sumOfPoints = undefined;
		points.forEach(element => {
			if(sumOfPoints === undefined){
				sumOfPoints = 0;
			}
			sumOfPoints += element;			
		});
		return [value[0], sumOfPoints]
	});

	//reduce empty elements
	for(let i = 0; i < calculatedScores.length; i++){
		while(calculatedScores[i][0] === '' || calculatedScores[i][1] === undefined){
			calculatedScores.splice(i,1);
			if(i >= calculatedScores.length){
				break;
			};
		};
	};

	//sort in a descending order
	calculatedScores.sort((a,b) => b[1]-a[1]);

	//if no valid scores - return an empty object
	if(calculatedScores.length === 0){
		return {};
	}

	function checkPosition(){
		let position = {
			'score': 0,
			'players': []
		  };
		position.score = calculatedScores[index][1];
		position.players.push(calculatedScores[index][0]);
		index ++;
		//check if more than one silver medal
		if(index < calculatedScores.length){
			while(position.score === calculatedScores[index][1]){
				position.players.push(calculatedScores[index][0]);
				index ++;
				if(index === calculatedScores.length){
					break;
				};
			};
		};
		position.players.sort();

		return position;
	}

	//check for gold
	let podium =  {};
	let index = 0;
	let goldPosition = checkPosition();
	if(goldPosition.players != []){
		podium.gold = goldPosition;
	}

	
	// check for silver medals (only one gold)
	if(index < 2 && index < calculatedScores.length){
		let silverPosition = checkPosition();
		if(silverPosition.players != []){
			podium.silver = silverPosition;
		}
	};

	// check for bronze medals (only one gold and silver)
	if(index < 3 && index < calculatedScores.length){
		let bronzePosition = checkPosition();
		if(bronzePosition.players != []){
			podium.bronze = bronzePosition;
		}
	};

	return podium;
};

console.log(podium(scores));