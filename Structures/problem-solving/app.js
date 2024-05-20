class WiegthedGraph {
	constructor() {
		this.adjacencyList = {};
	}

	addVertex(vertex) {
		if (!this.adjacencyList[vertex]) this.adjacencyList[vertex] = [];
	}

	addEdge(vertex1, vertex2, weight) {
		this.adjacencyList[vertex1].push({ node: vertex2, weight });
		this.adjacencyList[vertex2].push({ node: vertex1, weight });
	}
}

// class PriorityQueue{
// 	constructor(){
// 		this.values=[];
// 	}

// 	enqueue(val, priority){
// 		this.values.push({val, priority});
// 		this.sort();
// 	}
// 	dequeue(){
// 		return this.values.shift();
// 	}

// 	sort(){
// 		this.values.sort((a, b) => a.priority - b.priority);
// 	}
// }

class PriorityNode {
	constructor(value, priority) {
		this.value = value;
		this.priority = priority;
	}
}

class PriorityQueue {
	constructor() {
		this.queue = [];
	}

	enqueue(value, priority) {
		const node = new PriorityNode(value, priority);
		this.queue.push(node);
		let index = this.queue.length - 1;
		let parentIndex = Math.floor((index - 1) / 2);

		while (
			index > 0 &&
			this.queue[parentIndex].priority > this.queue[index].priority
		) {
			let temp = this.queue[index];
			this.queue[index] = this.queue[parentIndex];
			this.queue[parentIndex] = temp;
			index = parentIndex;
			parentIndex = Math.floor((index - 1) / 2);
		}

		return this.queue;
	}

	dequeue() {
		let minNode = this.queue[0];
		let valueToBubble = this.queue.pop();
		if (this.queue.length === 0) return minNode;

		this.queue[0] = valueToBubble;
		let bubbleUP = true;
		let index = 0;

		while (bubbleUP) {
			let leftIndex = index * 2 + 1;
			let rightIndex = leftIndex + 1;
			let leftCondition =
				leftIndex < this.queue.length &&
				valueToBubble.priority > this.queue[leftIndex].priority;
			let rightCondition =
				rightIndex < this.queue.length &&
				valueToBubble.priority > this.queue[rightIndex].priority;
			if (leftCondition && rightCondition) {
				if (
					this.queue[leftIndex].priority <
					this.queue[rightIndex].priority
				) {
					this.queue[index] = this.queue[leftIndex];
					this.queue[leftIndex] = valueToBubble;
					index = leftIndex;
				} else {
					this.queue[index] = this.queue[rightIndex];
					this.queue[rightIndex] = valueToBubble;
					index = rightIndex;
				}
			} else if (leftCondition) {
				this.queue[index] = this.queue[leftIndex];
				this.queue[leftIndex] = valueToBubble;
				index = leftIndex;
			} else if (rightCondition) {
				this.queue[index] = this.queue[rightIndex];
				this.queue[rightIndex] = valueToBubble;
				index = rightIndex;
			} else {
				bubbleUP = false;
			}
		}

		return minNode;
	}
}

class WeightedGraph {
	constructor() {
		this.adjacencyList = {};
	}

	addVertex(vertex) {
		if (!this.adjacencyList[vertex]) this.adjacencyList[vertex] = [];
	}

	addEdge(vertex1, vertex2, weight) {
		this.adjacencyList[vertex1].push({ node: vertex2, weight });
		this.adjacencyList[vertex2].push({ node: vertex1, weight });
	}

	dijkstra(start, finish) {
		const nodes = new PriorityQueue();
		const distances = {};
		const previous = {};
		let smallest;

		//initialise
		for (let vertex in this.adjacencyList) {
			if (vertex === start) {
				distances[start] = 0;
				nodes.enqueue(start, 0);
			} else {
				distances[vertex] = Infinity;
				nodes.enqueue(vertex, Infinity);
			}
			previous[vertex] = null;
		}

		//as long as there is something to visit
		while (nodes.queue.length > 0) {
			smallest = nodes.dequeue().value;
			if (smallest === finish) {
				const results = [finish];
				let tempNode = finish;
				console.log(distances);
				console.log(previous);
				console.log(nodes);
				//we are done
				//build the path
				while (tempNode !== start) {
					tempNode = previous[tempNode];
					results.unshift(tempNode);
				}
				return results;
			}
			if (smallest || distances[smallest] !== Infinity) {
				for (let neighbor in this.adjacencyList[smallest]) {
					//find neighbour node
					let nextNode = this.adjacencyList[smallest][neighbor];
					//calculate the distance to the nextNode
					let candidate = distances[smallest] + nextNode.weight;
					if (candidate < distances[nextNode.node]) {
						distances[nextNode.node] = candidate;
						previous[nextNode.node] = smallest;
						nodes.enqueue(nextNode.node, candidate);
					}
				}
			}
		}
	}
}

let graph = new WeightedGraph();
graph.addVertex('A');
graph.addVertex('B');
graph.addVertex('C');
graph.addVertex('D');
graph.addVertex('E');
graph.addVertex('F');

graph.addEdge('A', 'B', 4);
graph.addEdge('A', 'C', 2);
graph.addEdge('B', 'E', 3);
graph.addEdge('C', 'D', 2);
graph.addEdge('C', 'F', 4);
graph.addEdge('D', 'E', 3);
graph.addEdge('D', 'F', 1);
graph.addEdge('E', 'F', 1);

console.log(graph.dijkstra('A', 'E'));

function sortedFrequency(arr, val) {
	if (arr[0] > val || arr[arr.length - 1] < val) return -1;
	// add whatever parameters you deem necessary - good luck!
	//lef limit
	let leftLimit = 0;
	let rightLimit = arr.length - 1;
	let left = leftLimit;
	let right = rightLimit;
	let end = false;
	if (arr[0] !== val) {
		while (right - left > 1) {
			let mid = Math.floor((left + right) / 2);
			if (arr[mid] < val) {
				left = mid;
			} else {
				right = mid;
				if (arr[right] > val) rightLimit = right;
			}
		}
		if (arr[right] !== val) return 0;
		leftLimit = right;
	}

	left = leftLimit;
	right = rightLimit;
	if (arr[arr.length - 1] !== val) {
		while (right - left > 1) {
			let mid = Math.floor((left + right) / 2);
			if (arr[mid] <= val) {
				left = mid;
			} else {
				right = mid;
			}
		}
		if (arr[left] !== val) return 0;
		rightLimit = left;
	}

	return rightLimit - leftLimit + 1;
}

// console.log(sortedFrequency([1, 1, 2, 2, 2, 2, 3], 2)); // 4
// console.log(sortedFrequency([1, 1, 2, 2, 2, 2, 3], 3)); // 1
// console.log(sortedFrequency([1, 1, 2, 2, 2, 2, 3], 1)); // 2
// console.log(sortedFrequency([1, 1, 2, 2, 2, 2, 3], 4)); // -1

function findRotatedIndex(arr, val) {
	if (arr[0] === val) return 0;
	if (arr[arr.length] === val) return arr.length;

	let left = 0;
	let right = arr.length - 1;

	let pivotIndex = 0;
	//find the pivot index - the first index of the original array
	if (arr[0] > arr[arr.length - 1]) {
		while (right - left > 1) {
			let mid = Math.floor((left + right) / 2);
			//if(arr[mid] === val) return mid;
			if (arr[mid] > arr[right]) {
				left = mid;
			} else {
				right = mid;
			}
		}
		pivotIndex = right;
	}

	//there is no solution
	if (arr[pivotIndex - 1] < val || arr[pivotIndex] > val) return -1;
	//solution is at the pivot index
	if (arr[pivotIndex] === val) return pivotIndex;

	//search in the bigger part
	if (arr[0] <= val) {
		left = 0;
		right = pivotIndex - 1;
	} else {
		left = pivotIndex;
		right = arr.length - 1;
	}

	while (right - left > 1) {
		let mid = Math.floor((left + right) / 2);
		if (arr[mid] < val) {
			left = mid;
		} else {
			right = mid;
		}
	}

	return arr[right] === val ? right : -1;
}

// console.log(findRotatedIndex([3, 4, 1, 2], 4)); // 1
// console.log(findRotatedIndex([6, 7, 8, 9, 1, 2, 3, 4], 8)); // 2
// console.log(findRotatedIndex([6, 7, 8, 9, 1, 2, 3, 4], 3)); // 6
// console.log(findRotatedIndex([37, 44, 66, 102, 10, 22], 14)); // -1
// console.log(findRotatedIndex([6, 7, 8, 9, 1, 2, 3, 4], 12)); // -1
// console.log(findRotatedIndex([11, 12, 13, 14, 15, 16, 3, 5, 7, 9], 16)); // 5

//selection sort
function sorting(arr, comparator) {
	if (typeof comparator !== 'function') {
		// provide a default
		comparator = (a, b) => a - b;
	}

	for (let i = 0; i < arr.length - 1; i++) {
		let minPos = i;
		for (let j = i + 1; j < arr.length; j++) {
			if (comparator(arr[j], arr[minPos]) < 0) {
				minPos = j;
			}
		}
		let temp = arr[i];
		arr[i] = arr[minPos];
		arr[minPos] = temp;
	}

	return arr;
}

console.log(sorting([4, 20, 12, 10, 7, 9])); // [4, 7, 9, 10, 12, 20]
console.log(sorting([0, -10, 7, 4])); // [-10, 0, 4, 7]
console.log(sorting([1, 2, 3])); // [1, 2, 3]
console.log(sorting([]));

var nums = [
	4, 3, 5, 3, 43, 232, 4, 34, 232, 32, 4, 35, 34, 23, 2, 453, 546, 75, 67,
	4342, 32
];
console.log(sorting(nums)); // [2, 3, 3, 4, 4, 4, 5, 23, 32, 32, 34, 34, 35, 43, 67, 75, 232, 232, 453, 546, 4342]

var kitties = ['LilBub', 'Garfield', 'Heathcliff', 'Blue', 'Grumpy'];

function strComp(a, b) {
	if (a < b) {
		return -1;
	} else if (a > b) {
		return 1;
	}
	return 0;
}

console.log(sorting(kitties, strComp)); // ["Blue", "Garfield", "Grumpy", "Heathcliff", "LilBub"]

var moarKittyData = [
	{
		name: 'LilBub',
		age: 7
	},
	{
		name: 'Garfield',
		age: 40
	},
	{
		name: 'Heathcliff',
		age: 45
	},
	{
		name: 'Blue',
		age: 1
	},
	{
		name: 'Grumpy',
		age: 6
	}
];

function oldestToYoungest(a, b) {
	return b.age - a.age;
}

console.log(sorting(moarKittyData, oldestToYoungest)); // sorted by age in descending order

class Node {
	constructor(val) {
		this.val = val;
		this.next = null;
	}
}

class SinglyLinkedList {
	constructor(val) {
		this.val = val;
		this.next = null;
		this.length = 0;
	}
	push(val) {
		var newNode = new Node(val);
		if (!this.head) {
			this.head = newNode;
			this.tail = this.head;
		} else {
			this.tail.next = newNode;
			this.tail = newNode;
		}
		this.length++;

		return this;
	}

	get(index) {
		if (index >= this.length || index < 0) return undefined;
		if (index === this.length - 1) return this.tail;		
		let tempNode = this.head;
		for (let i = 1; i <= index; i++) {
			tempNode = tempNode.next;
		}
		return tempNode;
	}

	remove(index) {
		if (index >= this.length || index < 0) return undefined;
		let tempNode;
		if (index === 0) {
			tempNode = this.head;
			this.head = this.head.next;
		} else if (index === this.length - 1) {
			tempNode = this.tail;
			this.tail = this.get(this.length - 2);
			this.tail.next = null;
		} else {
			let prevNode = this.get(index - 1);
			tempNode = prevNode.next;
			prevNode.next = tempNode.next;
		}
		tempNode.next = null;
		this.length--;
		return tempNode;
	}
}

let singlyLinkedList = new SinglyLinkedList();
console.log(singlyLinkedList.push(5).push(10).push(15).push(20));
console.log(singlyLinkedList);
console.log(singlyLinkedList.remove(2).val); // 15
console.log(singlyLinkedList.remove(100)); // undefined
console.log(singlyLinkedList.length); // 3
console.log(singlyLinkedList.head.val); // 5
console.log(singlyLinkedList.head.next.val); // 10
console.log(singlyLinkedList.head.next.next.val); // 20
