const testMatrix = [2,7,12,10,9,8,6,4,5,3,11,20,55,34,72,-15];
//const testMatrix = [1, 1, -1, 0, 0];
// function down(arr){
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

class Node{
	constructor(value){
		this.value = value;
		this.isKnot = false;	
		//Knot parameters	
			this.minChild = null;
			this.maxChild = null;
			this.childrenCount = 0;
		this.isTwig = false;
		this.down = null;
		this.up = null;
		this.right = null;
		this.left = null;
		this.knot = null;
		this.twig = null;
	};
};

class OrderedList{
	maxBranchSize = 50;
	constructor(headValue, secondValue, index, resultArr){
		
		if(headValue >= secondValue){
			this.head = new Node(headValue);
			this.tail = new Node(secondValue);
			this.max = headValue;
			this.min = secondValue;

			resultArr[index]=0;
			resultArr[index -1]=0;
		} else {
			this.head = new Node(secondValue);
			this.tail = new Node(headValue);
			this.min = headValue;
			this.max = secondValue;

			resultArr[index]=0;
			resultArr[index -1]=1;
		}
		//Head as a knot
		this.head.down = this.right;
		this.head.isKnot = true;
		this.head.childrenCount = 1;
		this.head.minChild = this.tail.value;
		this.head.minChild = this.tail.value;
		this.twig = this.tail;
		//Tail as a twig
		this.tail.left = this.head;
		this.tail.isTwig = true;
		this.knot = this.head;

		this.length = 2;
	}

	add(value, index, resultArr){
		if(value <= this.min){
			this.min = value;
			resultArr[index] = 0;
			const newNode = this.tail;
			this.tail.up.down = newNode;

			this.tail = new Node(value);
			this.tail.up = newNode
			newNode.down = this.tail;
			this.length ++;

		} else if(value > this.max){
			this.max = value;
			resultArr[index] = this.length;
			const newNode = this.head;
			this.head.down.up = newNode;

			this.head = new Node(value);
			this.head.down = newNode
			newNode.up = this.head;
			this.length ++;
		} else {
			let currentNode = this.tail;
			let count = 1;
			while(currentNode.up){
				if(value <= currentNode.up.value){
					resultArr[index] = count;
					const newNode = new Node(value);
					newNode.down = currentNode;
					newNode.up = currentNode.up;
					currentNode.up.down = newNode;
					currentNode.up = newNode;
					this.length ++
					break;
				}
				currentNode = currentNode.up;
				count ++;
			}
		}

	}

	addToBranch(value, knot, counter, index, resultArr){
		if(value <= knot.minChild){
			knot.minChild = value;
		
			const newNode = knot.twig;
			knot.twig.up.down = newNode;

			this.tail = new Node(value);
			this.tail.up = newNode
			newNode.down = this.tail;

			resultArr[index] = this.length - counter - this.knot.childrenCount;
			this.length ++;
			this.knot.childrenCount ++;

		} else if(value > this.max){
			this.max = value;
			resultArr[index] = this.length;
			const newNode = this.head;
			this.head.down.up = newNode;

			this.head = new Node(value);
			this.head.down = newNode
			newNode.up = this.head;
			this.length ++;
		} else {
			let currentNode = this.tail;
			let count = 1;
			while(currentNode.up){
				if(value <= currentNode.up.value){
					resultArr[index] = count;
					const newNode = new Node(value);
					newNode.down = currentNode;
					newNode.up = currentNode.up;
					currentNode.up.down = newNode;
					currentNode.up = newNode;
					this.length ++
					break;
				}
				currentNode = currentNode.up;
				count ++;
			}
		}

	}

	addToTrunc(value, index, resultArr){
		if(value <= this.min){
			this.min = value;
			resultArr[index] = 0;
			const newNode = this.tail;
			this.tail.up.down = newNode;

			this.tail = new Node(value);
			this.tail.up = newNode
			newNode.down = this.tail;
			this.length ++;

		} else if(value > this.max){
			this.max = value;
			resultArr[index] = this.length;
			const newNode = this.head;
			this.head.down.up = newNode;

			this.head = new Node(value);
			this.head.down = newNode
			newNode.up = this.head;
			this.length ++;
		} else {
			let currentNode = this.tail;
			let count = 1;
			while(currentNode.up){
				if(value <= currentNode.up.value){
					resultArr[index] = count;
					const newNode = new Node(value);
					newNode.down = currentNode;
					newNode.up = currentNode.up;
					currentNode.up.down = newNode;
					currentNode.up = newNode;
					this.length ++
					break;
				}
				currentNode = currentNode.up;
				count ++;
			}
		}

	}

	putInBranch(){

	}
}

function smaller2(arr){
	const result = [];
	const list = new OrderedList(arr.at(-1), arr.at(-2), arr.length-1, result);
	let iterLen = arr.length - 3;
	for(let i = iterLen; i >= 0; i--){
		list.add(arr[i], i, result);
	}
	return result;

}



function smaller1(arr){
	let min = arr[arr.length -1];
	let max = arr[arr.length -1];
	let iterLen = arr.length -2;
	const result = [];//new Array(arr.length).fill(0);
	result[arr.length -1] = 0
	const sortedArray =[arr[arr.length-1]];
	for(let i = iterLen; i >= 0; i--){
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
				
				if(arr[i] <= sortedArray[j]){
					sortedArray.splice(j,0,arr[i]);
					result[i] = j;
					break;
				}
				if(j === sortedArray.length){
					sortedArray.push(arr[i]);
					result[i] = j;
					break;
				}
			}
		}
	}
	return result;
}


function down(arr){
	let result = [];
	let tempArr1 = [];
	let tempArr2 = [];

	//first pass
	let i = 0;
	for(let i = 0; i < Math.floor(arr.length/2); i++){
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
		tempArr1.push([[arr[arr.length-1],arr.length-1,0]]);
		result[arr.length-1]=0;
	}
	while(tempArr1.length > 1){
		tempArr2 = [];
		//let iterator = 0;
		

		// while( reverse ? posB > 0 : posA < tempArr1.length - 1){
		while( tempArr1.length > 1){
			let count = 0;
			let posA;
			let posB;
			if(reverse){
				//iterator = (Math.ceil(tempArr1.length/2) - 1);
				posB = tempArr1.pop();
				posA = tempArr1.pop();			
			} else {
				posA = tempArr1.shift();
				posB = tempArr1.shift();
			};	
			let lenPosA = posA.length;
			let lenPosB = posB.length;
			let increase = 0;
			let temp = [];
			while((posA.length > 0) && (posB.length > 0)){
				if(posA[0][0]>posB[0][0]){
					temp.push(posB.shift());
					count ++;
					// increase = temp.length - (lenPosA + (lenPosB - posB.length));
					// if(increase >0){
					// 	let originalPosition = temp.at(-1)[1];
					// 	result[originalPosition] += increase;
					// }
					
				} else {
					temp.push(posA.shift());
					// increase = temp.length - (lenPosA - posA.length);
					if(count >0){
						let originalPosition = temp.at(-1)[1];
						result[originalPosition] += count;//increase;
					}
				}
			}
			while(posA.length > 0){
				temp.push(posA.shift());
				// increase = temp.length - (lenPosA - posA.length);
				if(count >0){
					let originalPosition = temp.at(-1)[1];
					result[originalPosition] += count;
				}
			}
			if(posB.length > 0){
				temp = temp.concat(posB);
				// increase =
				// 	temp.length -
				// 	(lenPosA + (lenPosB - posB.length));
				// if (increase > 0) {
				// 	let originalPosition = temp.at(-1)[1];
				// 	result[originalPosition] += increase;
				// }
			}

			if(reverse){
				tempArr2.unshift(temp);
			} else {
				tempArr2.push(temp);
			}

			if(tempArr1.length === 1){
				if(reverse){
					tempArr2.unshift(tempArr1[0]);
				} else {
					tempArr2.push(tempArr1[0]);
				}
			}
		}

		tempArr1 = tempArr2;
		reverse = !reverse !=(tempArr1.length % 2);
	}
	return result;
};

		// tempArr2 = [];
		// let iterator = 0;
		// let posA = 0;
		// let posB = 1;
		// if(reverse){
		// 	posB = tempArr1.length -1;
		// 	posA = posB - 1;
		// 	iterator = (Math.ceil(tempArr1.length/2) - 1);
		// };

		// // while( reverse ? posB > 0 : posA < tempArr1.length - 1){
		// while( tempArr1.length > 1){	
		// 	let lenPosA = tempArr1[posA].length;
		// 	let lenPosB = tempArr1[posB].length;
		// 	let increase = 0;
		// 	tempArr2[iterator]=[];
		// 	while((tempArr1[posA].length > 0) && (tempArr1[posB].length > 0)){
		// 		if(tempArr1[posA][0]>tempArr1[posB][0]){
		// 			tempArr2[iterator].push(tempArr1[posB].shift());
		// 			increase = tempArr2[iterator].length - (lenPosA + (lenPosB - tempArr1[posB].length));
		// 			if(increase >0){
		// 				let originalPosition = tempArr2[iterator].at(-1)[1];
		// 				result[originalPosition] += increase;
		// 			}
					
		// 		} else {
		// 			tempArr2[iterator].push(tempArr1[posA].shift());
		// 			increase = tempArr2[iterator].length - (lenPosA - tempArr1[posA].length);
		// 			if(increase >0){
		// 				let originalPosition = tempArr2[iterator].at(-1)[1];
		// 				result[originalPosition] += increase;
		// 			}
		// 		}
		// 	}
		// 	while(tempArr1[posA].length > 0){
		// 		tempArr2[iterator].push(tempArr1[posA].shift());
		// 		increase = tempArr2[iterator].length - (lenPosA - tempArr1[posA].length);
		// 		if(increase >0){
		// 			let originalPosition = tempArr2[iterator].at(-1)[1];
		// 			result[originalPosition] += increase;
		// 		}
		// 	}
		// 	while(tempArr1[posB].length > 0){
		// 		tempArr2[iterator].push(tempArr1[posB].shift());
		// 		increase = tempArr2[iterator].length - (lenPosA + (lenPosB - tempArr1[posB].length));
		// 		if(increase >0){
		// 			let originalPosition = tempArr2[iterator].at(-1)[1];
		// 			result[originalPosition] += increase;
		// 		}
		// 	}

		// 	if(reverse){
		// 		tempArr1.pop();
		// 		tempArr1.pop();
		// 	} else {
		// 		tempArr1.shift();
		// 		t
		// 	}

		// 	if(tempArr1.length = 1){
		// 		if(reverse){
		// 			tempArr2.unshift(tempArr1[0]);
		// 		} else {
		// 			tempArr2.push(tempArr1[0]);
		// 		}
		// 	}

			// if(reverse){
			// 	posA -= 2;
			// 	posB -= 2;
			// 	iterator --;
			// } else {
			// 	posA += 2;
			// 	posB += 2;
			// 	iterator ++;
			// }


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


//console.log(smaller2(testMatrix));

let test;
const timerName = 'Array Map';
console.time(timerName);
for(let i=0; i < 100000; i++){
	smaller2(testMatrix);
}
console.timeEnd(timerName);


console.time(timerName);
for(let i=0; i < 100000; i++){
	smaller1(testMatrix);
}
console.timeEnd(timerName);
// console.log(down(testMatrix));
