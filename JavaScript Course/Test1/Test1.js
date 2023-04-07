class Node {
	value = undefined;
	previous = null;
	next = null;
	constructor(initValue) {
		this.value = initValue;
	}
}

class OrderedList {
	//Value needs to be an array
	//[xCoord, [y1Coord, y2Coord, start/end], [y1Coord, y2Coord, start/end] ...]
	header = null;
	constructor(rectArr) {
		if (rectArr) {
			this.header = new Node([
				rectArr[0],
				[rectArr[1], rectArr[3], true]
			]);
			this.header.next = new Node([
				rectArr[2],
				[rectArr[1], rectArr[3], false]
			]);
			this.header.next.previous = this.header;
		}
	}

	putBefore(newNode, node) {
		newNode.previous = node.previous;
		newNode.next = node;
		if (node.previous) {
			node.previous.next = newNode;
		}
		node.previous = newNode;
		return newNode;
	}

	putAfter(newNode, node) {
		newNode.next = node.next;
		newNode.previous = node;
		if (node.next) {
			node.next.previous = newNode;
		}
		node.next = newNode;
		return newNode;
	}

	add(node) {
		let currentNode = this.header;
		//Replace header
		if (this.header === null) {
			this.header = node;
			return this.header;
		}
		if (node.value[0] < currentNode.value[0]) {
			this.header.previous = node;
			node.next = this.header;
			this.header = node;
			return this.header;
		}

		while (currentNode) {
			if (node.value[0] < currentNode.value[0]) {
				if (currentNode.previous === null) {
					return this.putBefore(node, currentNode);
				} else if (node.value[0] > currentNode.previous.value[0]) {
					return this.putBefore(node, currentNode);
				} else if (node.value[0] < currentNode.previous.value[0]) {
					currentNode = currentNode.previous;
				} else if (node.value[0] === currentNode.previous.value[0]) {
					for (let i = 1; i < node.value.length; i++) {
						currentNode.previous.value.push(node.value[i]);
					}
					return currentNode.previous;
				}
			} else if (node.value[0] > currentNode.value[0]) {
				if (currentNode.next === null) {
					return this.putAfter(node, currentNode);
				} else if (node.value[0] < currentNode.next.value[0]) {
					return this.putAfter(node, currentNode);
				} else if (node.value[0] > currentNode.next.value[0]) {
					currentNode = currentNode.next;
				} else if (node.value[0] === currentNode.next.value[0]) {
					for (let i = 1; i < node.value.length; i++) {
						currentNode.next.value.push(node.value[i]);
					}
					return currentNode.next;
				}
			} else {
				for (let i = 1; i < node.value.length; i++) {
					currentNode.value.push(node.value[i]);
				}
				return currentNode;
			}
		}
		return node;
	}

	addStartNode(startNode) {
		let currentNode = this.header;
		let startNodeValue = startNode.value[1];
		//Replace header
		if (this.header === null) {
			this.header = startNode;
			return this.header;
		}
		if (startNode.value[0] < currentNode.value[0]) {
			this.header.previous = startNode;
			startNode.next = this.header;
			this.header = startNode;
			return this.header;
		}

		while (currentNode) {
			if (startNode.value[0] < currentNode.value[0]) {
				if (currentNode.previous === null) {
					return this.putBefore(startNode, currentNode);
				} else if (startNode.value[0] > currentNode.previous.value[0]) {
					//copy start values of the previous point
					for (
						let i = 1;
						i < currentNode.previous.value.length;
						i++
					) {
						if (currentNode.previous.value[i][2]) {
							startNode.value.push(currentNode.previous.value[i]);
						}
					}
					return this.putBefore(startNode, currentNode);
				} else if (startNode.value[0] < currentNode.previous.value[0]) {
					currentNode = currentNode.previous;
				} else if (
					startNode.value[0] === currentNode.previous.value[0]
				) {
					for (let i = 1; i < startNode.value.length; i++) {
						currentNode.previous.value.push(startNode.value[i]);
					}
					return currentNode.previous;
				}
			} else if (startNode.value[0] > currentNode.value[0]) {
				if (currentNode.next === null) {
					//copy start values of the current node
					for (let i = 1; i < currentNode.value.length; i++) {
						if (currentNode.value[i][2]) {
							startNode.value.push(currentNode.value[i]);
						}
					}
					return this.putAfter(startNode, currentNode);
				} else if (startNode.value[0] < currentNode.next.value[0]) {
					//copy start values of the current node
					for (let i = 1; i < currentNode.value.length; i++) {
						if (currentNode.value[i][2]) {
							startNode.value.push(currentNode.value[i]);
						}
					}
					return this.putAfter(startNode, currentNode);
				} else if (startNode.value[0] > currentNode.next.value[0]) {
					currentNode = currentNode.next;
				} else if (startNode.value[0] === currentNode.next.value[0]) {
					for (let i = 1; i < startNode.value.length; i++) {
						currentNode.next.value.push(startNode.value[i]);
					}
					return currentNode.next;
				}
			} else {
				for (let i = 1; i < startNode.value.length; i++) {
					currentNode.value.push(startNode.value[i]);
				}
				return currentNode;
			}
		}
		return startNode;
	}

	addEndNode(startNode, endNode) {
		//const i = startNode.value.length -1;
		const startNodeValue = [endNode.value[1][0], endNode.value[1][1], true];
		let currentNode = startNode;

		while (true) {
			if (!currentNode.next) {
				currentNode.next = endNode;
				endNode.previous = currentNode;
				let startRemoved = false;
				for (let i = 1; i < currentNode.value.length; i++) {
					if (currentNode.value[i][2]) {
						if (
							currentNode.value[i][0] === endNode.value[1][0] &&
							currentNode.value[i][1] === endNode.value[1][1] &&
							!startRemoved
						) {
							startRemoved = true;
						} else {
							endNode.value.push(currentNode.value[i]);
						}
					}
				}
				return endNode;
			} else if (endNode.value[0] < currentNode.next.value[0]) {
				endNode.next = currentNode.next;
				currentNode.next = endNode;
				currentNode.next.previous = endNode;
				endNode.previous = currentNode;
				let startRemoved = false;
				for (let i = 1; i < currentNode.value.length; i++) {
					if (currentNode.value[i][2]) {
						if (
							currentNode.value[i][0] === endNode.value[1][0] &&
							currentNode.value[i][1] === endNode.value[1][1] &&
							!startRemoved
						) {
							startRemoved = true;
						} else {
							endNode.value.push(currentNode.value[i]);
						}
					}
				}
				return endNode;
			} else if (endNode.value[0] === currentNode.next.value[0]) {
				currentNode.next.value.push(endNode.value[1]);
				return currentNode.next;
			} else {
				currentNode.next.value.push(startNodeValue);
				currentNode = currentNode.next;
			}
		}
		return endNode;
	}

	addRectangle(rectArr) {
		//rectArr format [x1,y1,x2,y2]
		const initialStartNodeValue = [rectArr[1]];
		const tempStatNode = this.addStartNode(
			new Node([rectArr[0], [rectArr[1], rectArr[3], true]])
		);
		this.addEndNode(
			tempStatNode,
			new Node([rectArr[2], [rectArr[1], rectArr[3], false]])
		);
	}
}

function calculate(rectArray) {
	console.log(rectArray);
	if (rectArray.length === 0) {
		return 0;
	}
	const myList = new OrderedList(rectArray[0]);
	for (let i = 1; i < rectArray.length; i++) {
		myList.addRectangle(rectArray[i]);
	}

	let currentNode = myList.header;
	let sum = 0;

	while (currentNode.next) {
		let sum1 = 0;
		const x1 = currentNode.value[0];
		const x2 = currentNode.next.value[0];
		const myTestPoint = new Array();
		for (let i = 1; i < currentNode.value.length; i++) {
			myTestPoint.push(currentNode.value[i].slice());
		}

		while (!myTestPoint[0][2]) {
			myTestPoint.shift();
			if (myTestPoint.length === 0) {
				break;
			}
		}

		myTestPoint.sort((a, b) => a[0] - b[0]);
		if (myTestPoint[0]) {
			while (!myTestPoint[0][2]) {
				myTestPoint.shift();
				if (myTestPoint.length === 0) {
					break;
				}
			}
		}
		let i = 0;
		if (myTestPoint.length === 1) {
			sum1 = myTestPoint[i][1] - myTestPoint[i][0];
		} else {
			while (i < myTestPoint.length) {
				if (i >= myTestPoint.length - 1) {
					sum1 += myTestPoint[i][1] - myTestPoint[i][0];
					break;
				} else if (!myTestPoint[i + 1][2]) {
					myTestPoint.splice(i + 1, 1);
				} else if (myTestPoint[i + 1][0] <= myTestPoint[i][1]) {
					myTestPoint[i][1] = Math.max(
						myTestPoint[i][1],
						myTestPoint[i + 1][1]
					);
					myTestPoint.splice(i + 1, 1);
				} else {
					sum1 += myTestPoint[i][1] - myTestPoint[i][0];
					i++;
				}
			}
		}

		sum += sum1 * (x2 - x1);
		currentNode = currentNode.next;
	}
	return sum;
}

const rectArray1 = [
	[1, 1, 2, 2],
	[2, 2, 3, 3],
	[3, 3, 4, 4],
	[4, 4, 5, 5],
	[2, 1, 3, 2]
];

// const rectArray = [
// 	[2, 0, 4, 4],
// 	[1, 1, 7, 2],
// 	[3, 3, 5, 7],
// 	[6, 3, 7, 5],
// 	[5, 1, 9, 2]
// ];

// if(rectArray.length === 0){
//     return 0;
// }

console.log(calculate(rectArray1));
