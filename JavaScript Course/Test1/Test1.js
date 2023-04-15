const testMatrix = [2,7,1,10,9,8,6,4,5,3];

// function smaller(arr){
// 	const result = new Array(arr.length).fill(0);
// 	for(let i = 0; i < arr.length; i++){
// 		for(let j = i+1; j < arr.length; j++){
// 			if(arr[i] > arr[j]){
// 				result[i] ++;
// 			}
// 		}
// 	}
// 	return result;
// }


function smaller(arr){
	let min = arr[arr.length -1];
	let max = arr[arr.length -1];
	const result = [];//new Array(arr.length).fill(0);
	result[arr.length -1] = 0
	const sortedArray =[arr[arr.length-1]];
	for(let i = arr.length-2; i >= 0; i--){
		if(arr[i] <= min){
			min = arr[i];
			result[i] = 0;
			sortedArray.unshift(min);
		} else if(arr[i] > max){
			max = arr[i];
			result[i] = sortedArray.length;
			sortedArray.push(max);
		} else{
			for(let j = 0; j <= sortedArray.length; j++){
				if(j === sortedArray.length){
					sortedArray.push(arr[i]);
					result[i] = j;
					break;
				}
				if(arr[i] <= sortedArray[j]){
					sortedArray.splice(j,0,arr[i]);
					result[i] = j;
					break;
				}
			}
		}
	}
	return result;
}


function mergeSort(arr){
	let result = [];
	let tempArr1 = [];
	let tempArr2 = [];

	//first pass
	let i = 0;
	for(let i = 0; i < arr.length/2; i++){
			let pos = i*2;
			if(arr[pos] > arr[pos+1]){
				tempArr1[i]=[];
				tempArr1[i][0]=[arr[pos+1],pos+1,0];
				result[pos+1] = 0;
				tempArr1[i][1]=[arr[pos],pos,1];					
				result[pos] = 1;
			} else {
				tempArr1[i]=[];
				tempArr1[i][0]=[arr[pos],pos,0];
				result[pos] = 0;
				tempArr1[i][1]=[arr[pos+1],pos+1,0];
				result[pos+1] = 0;
			}
	}
	let reverse = (arr.length % 2);
	if(reverse){
		tempArr1.push([arr[arr.length-1],arr.length-1,0]);
	}
	while(tempArr1.length > 1){
		tempArr2 = [];
		let iterator = 0;
		let posA = 0;
		let posB = 1;
		if(reverse){
			posB = tempArr1.length -1;
			posA = posB - 1;
			iterator = (Math.ceil(tempArr1.length/2) - 1);
		};

		// while( reverse ? posB > 0 : posA < tempArr1.length - 1){
		while( tempArr1.length > 1){	
			let lenPosA = tempArr1[posA].length;
			let lenPosB = tempArr1[posB].length;
			let increase = 0;
			tempArr2[iterator]=[];
			while((tempArr1[posA].length > 0) && (tempArr1[posB].length > 0)){
				if(tempArr1[posA][0]>tempArr1[posB][0]){
					tempArr2[iterator].push(tempArr1[posB].shift());
					increase = tempArr2[iterator].length - (lenPosA + (lenPosB - tempArr1[posB].length));
					if(increase >0){
						let originalPosition = tempArr2[iterator].at(-1)[1];
						result[originalPosition] += increase;
					}
					
				} else {
					tempArr2[iterator].push(tempArr1[posA].shift());
					increase = tempArr2[iterator].length - (lenPosA - tempArr1[posA].length);
					if(increase >0){
						let originalPosition = tempArr2[iterator].at(-1)[1];
						result[originalPosition] += increase;
					}
				}
			}
			while(tempArr1[posA].length > 0){
				tempArr2[iterator].push(tempArr1[posA].shift());
				increase = tempArr2[iterator].length - (lenPosA - tempArr1[posA].length);
				if(increase >0){
					let originalPosition = tempArr2[iterator].at(-1)[1];
					result[originalPosition] += increase;
				}
			}
			while(tempArr1[posB].length > 0){
				tempArr2[iterator].push(tempArr1[posB].shift());
				increase = tempArr2[iterator].length - (lenPosA + (lenPosB - tempArr1[posB].length));
				if(increase >0){
					let originalPosition = tempArr2[iterator].at(-1)[1];
					result[originalPosition] += increase;
				}
			}

			if(reverse){
				tempArr1.pop();
				tempArr1.pop();
			} else {
				tempArr1.shift();
				t
			}

			if(tempArr1.length = 1){
				if(reverse){
					tempArr2.unshift(tempArr1[0]);
				} else {
					tempArr2.push(tempArr1[0]);
				}
			}

			// if(reverse){
			// 	posA -= 2;
			// 	posB -= 2;
			// 	iterator --;
			// } else {
			// 	posA += 2;
			// 	posB += 2;
			// 	iterator ++;
			// }

		}

	}

	// if(arr.length % 2){
	// 	let pos1 = tempArr1.length - 1;
	// 	let pos2 = arr.length -1;
	// 	tempArr1.push([arr[arr.length-1],arr.length-1,0]);
	// 	if(tempArr1[pos1][0][0] > arr[pos2]){

	// 		tempArr1[i]=[];
	// 		tempArr1[i][0]=[arr[pos+1],pos+1,0];
	// 		result[pos+1] = 0;
	// 		tempArr1[i][1]=[arr[pos],pos,1];					
	// 		result[pos] = 1;
	// 	} else {
	// 		tempArr1[i]=[];
	// 		tempArr1[i][0]=[arr[pos],pos,0];
	// 		result[pos] = 0;
	// 		tempArr1[i][1]=[arr[pos+1],pos+1,0];
	// 		result[pos+1] = 0;
	// 	}
	// }

};

let test;

console.log(mergeSort(testMatrix));
console.log(smaller(testMatrix));
