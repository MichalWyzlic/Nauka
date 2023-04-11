const test1 = [
	-10, -9, -8, -6, -3, -2, -1, 0, 1, 3, 4, 5, 7, 8, 9, 10, 11, 14, 15, 17, 18,
	19, 20
];

const test2 = [
	-87,-85,-82,-79,-76,-75,-72,-70,-67,-65,-63,-62,-60,-59,-58,-57,-55

]

// function solution(list) {
// 	if(list.length === 0){
// 		return '';
// 	} else if (list.length === 1){
// 		return `${list[0]}`;
// 	}
// 	let result = ``;
// 	let prev = list[0];
// 	let sequence = false;
	
// 	let i = 1;
// 	while(i < list.length) {
// 		let next = list[i];
// 		if(i < list.length)
// 		if ((prev + 1) === next){
// 			if (!sequence){
// 				result += `${prev}-`;
// 			}
// 			sequence = true;
// 		} else {
// 			result += `${prev},`;
// 			sequence = false;
// 		}
// 		if(i >= list.length-1){
// 			result += `${next}`;
// 			break;
// 		}
// 		prev = list[i];
// 		i++;
// 	}	
// 	return result;
// }

function solution(list) {
	let result = ``;
	if(list.length <= 2){
		result = list.join(',');
		return result;
	};

	
	let start;
	let next1;
	let next2;
	let i = 0;
	
	while(i<=list.length-3){
		start = list[i];
		next1 = list[i+1];
		next2 = list[i+2];
		if(start + 1 === next1){
			if (next1 + 1 === next2){
				result += `${start}-`;
				i += 2;
				if(i >= list.length - 1){
					result += `${next2}`;
					i++;
					break;
				};
				while(true){
					next1 = list[i];
					next2 = list[i+1];
					if(next1 + 1 !== next2){
						result += `${next1},`;
						i++;
						break;
					} else {
						i ++;
						if(i >= list.length -1){
							result += `${next2}`;
							i ++;
							break;
						};
					};
				};
			} else {
				result += `${start},`;
				i += 1;
				if(i >= list.length -2){
					result += `${next1},${next2}`;
					i += 2;
					break;
				};
			}
		} else {
			result += `${start},`;
				i ++;
				if(i >= list.length -2){
					result += `${next1},${next2}`;
					i += 2;
					break;
				}; 
		};


	};

	while(i <= list.length -1){
		if(i = list.length - 1){
			result += `${list[i]}`;
		} else {
			result += `${list[i]},`;
		};
		i++;
	};	
	
	return result;
};



console.log(solution(test2));