// const rectArray = [
// 	[3, 3, 8, 5],
// 	[6, 3, 8, 9],
// 	[11, 6, 14, 12]
// ];
// const x1 = 0;
// const x2 = 2;
// const y1 = 1;
// const y2 = 3;

// function testRectangles(rectArray) {
// 	function rectArea(rect1) {
// 		return (rect1[x2] - rect1[x1]) * (rect1[y2] - rect1[y1]);
// 	}

// 	function commonArea(rect1, rect2) {
// 		if (
// 			((rect2[x1] > rect1[x1] && rect2[x1] < rect1[x2]) ||
// 				(rect2[y2] > rect1[y1] && rect2[y2] < rect1[y2]) ||
// 				(rect2[y1] <= rect1[y1] && rect2[y2] >= rect1[y2])) &&
// 			((rect2[y1] > rect1[y1] && rect2[y1] < rect1[y2]) ||
// 				(rect2[y2] > rect1[y1] && rect2[y2] < rect1[y2]) ||
// 				(rect2[y1] <= rect1[y1] && rect2[y2] >= rect1[y2]))
// 		) {
// 			const newX1 = Math.max(rect1[x1], rect2[x1]);
// 			const newX2 = Math.min(rect1[x2], rect2[x2]);
// 			const newY1 = Math.max(rect1[y1], rect2[y1]);
// 			const newY2 = Math.min(rect1[y2], rect2[y2]);
// 			return (newX2 - newX1) * (newY2 - newY1);
// 		}
// 	}
// }

// function commonArea(rect1, rect2) {
// 	if (
// 		((rect2[x1] > rect1[x1] && rect2[x1] < rect1[x2]) ||
// 			(rect2[y2] > rect1[y1] && rect2[y2] < rect1[y2]) ||
// 			(rect2[y1] <= rect1[y1] && rect2[y2] >= rect1[y2])) &&
// 		((rect2[y1] > rect1[y1] && rect2[y1] < rect1[y2]) ||
// 			(rect2[y2] > rect1[y1] && rect2[y2] < rect1[y2]) ||
// 			(rect2[y1] <= rect1[y1] && rect2[y2] >= rect1[y2]))
// 	) {
// 		const newX1 = Math.max(rect1[x1], rect2[x1]);
// 		const newX2 = Math.min(rect1[x2], rect2[x2]);
// 		const newY1 = Math.max(rect1[y1], rect2[y1]);
// 		const newY2 = Math.min(rect1[y2], rect2[y2]);
// 		return (newX2 - newX1) * (newY2 - newY1);
// 	}
// 	return 0;
// }

// console.log(commonArea([1, 4, 8, 6], [2, 1, 5, 3]));

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
	constructor(initValue) {
		if (initValue) {
			this.header = new Node(initValue);
		}
	}

	putBefore(newNode, node) {
		newNode.previous = node.previous;
		newNode.next = node;
		node.previous = newNode;
		return node;
	}

	putAfter(newNode, node) {
		newNode.next = node.next;
		newNode.previous = node;
		node.next = newNode;
		return node;
	}

	add(node) {
		let currentNode = this.header;
		//Replace header
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
					for (let i = 1; i < node.length; i++) {
						currentNode.previous.value.push(node[i]);
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
					for (let i = 1; i < node.length; i++) {
						currentNode.next.value.push(node[i]);
					}
					return currentNode.next;
				}
			} else {
				for (let i = 1; i < node.length; i++) {
					currentNode.value.push(node[i]);
				}
				return currentNode;
			}
		}
		return node;
	}

	addEndNode(startNode, endNode){
		//const i = startNode.value.length -1;
		const startNodeValue = startNode.value;
		let currentNode = startNode;
				
		while (true) {




			//Check the code below
			if (!currentNode.next) {
				currentNode.next = endNode;
			} else if (endNode.value[0] < currentNode.next.value[0]) {
				endNode.next = currentNode.next;
				currentNode.next.previous = endNode;
				endNode.previous = currentNode;				
				return endNode;
			} else if (endNode.value[0] === currentNode.next.value[0]) {
				for (let i = 1; i < endNode.length; i++) {
					currentNode.next.value.push(node[i]);
				}
				return currentNode.next;
			} else {
				for (let i = 1; i < endNode.length; i++) {
					currentNode.value.push(node[i]);
				}
				return currentNode;
			}
		}
		return endNode;
	}



	addRectangle(startNode, endNode){
		const tempStatNode = this.add(startNode);

	}
}

const myList = new OrderedList([2, [0, 4, true]]);
myList.add(new Node([4, [0, 4, false]]));

myList.add(new Node([1, [1, 2, true]]));
myList.add(new Node([7, [1, 2, false]]));

myList.add(new Node([3, [3, 7, true]]));
myList.add(new Node([5, [3, 7, false]]));

myList.add(new Node([6, [3, 5, true]]));
myList.add(new Node([7, [3, 5, false]]));
