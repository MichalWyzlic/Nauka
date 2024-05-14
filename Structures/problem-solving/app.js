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

class WeightedGraph{
	constructor(){
		this.adjacencyList = {};
	}

	addVertex(vertex){
		if(!this.adjacencyList[vertex]) this.adjacencyList[vertex] = [];
	}

	addEdge(vertex1, vertex2, weight){
		this.adjacencyList[vertex1].push({node: vertex2, weight});
		this.adjacencyList[vertex2].push({node: vertex1, weight});		
	}

	dijkstra(start, finish){
		const nodes = new PriorityQueue();
		const distances = {};
		const previous = {};
		let smallest;

		//initialise
		for(let vertex in this.adjacencyList){
			if(vertex === start){
				distances[start] = 0;
				nodes.enqueue(start, 0);
			} else {
				distances[vertex] = Infinity;
				nodes.enqueue(vertex, Infinity);
			}
			previous[vertex] = null;
		}

		//as long as there is something to visit
		while(nodes.queue.length > 0){
			smallest = nodes.dequeue().value;
			if(smallest === finish){
				const results = [finish];
				let tempNode = finish;
				console.log(distances);
				console.log(previous);
				console.log(nodes);
				//we are done
				//build the path
				while(tempNode !== start){
					tempNode = previous[tempNode];
					results.unshift(tempNode);
				}
				return results;
			}
			if(smallest || distances[smallest] !==  Infinity){
				for(let neighbor in this.adjacencyList[smallest]){
					//find neighbour node
					let nextNode = this.adjacencyList[smallest][neighbor];
					//calculate the distance to the nextNode
					let candidate = distances[smallest] + nextNode.weight;
					if(candidate < distances[nextNode.node]){
						distances[nextNode.node] = candidate;
						previous[nextNode.node] = smallest;
						nodes.enqueue(nextNode.node, candidate);
					}

				}

			}
		}

	}
}

let graph = new WeightedGraph()
graph.addVertex("A");
graph.addVertex("B");
graph.addVertex("C");
graph.addVertex("D");
graph.addVertex("E");
graph.addVertex("F");

graph.addEdge("A","B", 4);
graph.addEdge("A","C", 2);
graph.addEdge("B","E", 3);
graph.addEdge("C","D", 2);
graph.addEdge("C","F", 4);
graph.addEdge("D","E", 3);
graph.addEdge("D","F", 1);
graph.addEdge("E","F", 1);


console.log(graph.dijkstra("A", "E"));


