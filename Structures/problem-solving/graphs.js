class Graph {
	constructor() {
		this.adjacencyList = {};
	}

	addVertex(vertex) {
		if (!this.adjacencyList[vertex]) {
			this.adjacencyList[vertex] = [];
			return true;
		}
		return false;
	}

	addEdge(v1, v2) {
		this.adjacencyList[v1].push(v2);
		this.adjacencyList[v2].push(v1);
	}

	removeEdge(v1, v2) {
		let index = this.adjacencyList[v1].indexOf(v2);
		this.adjacencyList[v1].splice(index, 1);

		index = this.adjacencyList[v2].indexOf(v1);
		this.adjacencyList[v2].splice(index, 1);
	}

	removeVertex(v1) {
		this.adjacencyList[v1].forEach((element) => {
			let index = this.adjacencyList[element].indexOf(v1);
			this.adjacencyList[element].splice(index, 1);
		});
		delete this.adjacencyList[v1];
	}

	DFS_Recursive(vertex) {
		const visitingOrder = [];
		const visitedVertices = {};
		const ptToAdjacencyList = this.adjacencyList;

		function visit(vertex) {
			if (!vertex in ptToAdjacencyList) return null;
			visitingOrder.push(vertex);
			visitedVertices[vertex] = true;
			console.log(vertex);
			ptToAdjacencyList[vertex].forEach((vtx) => {
				if (!visitedVertices[vtx]) {
					visit(vtx);
				}
			});
		}

		visit(vertex);
		return visitingOrder;
	}

	DFS_Iterative(start) {
		const stack = [];
		const visitedVertices = {};
		const visitingOrder = [];
		stack.push(start);

		while (stack.length) {
			let tempVertex = stack.pop();
			if (!visitedVertices[tempVertex]) {
				visitingOrder.push(tempVertex);
				visitedVertices[tempVertex] = true;
				console.log(tempVertex);
				this.adjacencyList[tempVertex].forEach((vtx) => {
					if (!visitedVertices[vtx]) {
						stack.push(vtx);
					}
				});
			}
		}
		return visitingOrder;
	}

	BFS_Iterative(start) {
		const stack = [];
		const visitedVertices = {};
		const visitingOrder = [];
		stack.push(start);

		while (stack.length) {
			let tempVertex = stack.shift();
			if (!visitedVertices[tempVertex]) {
				visitingOrder.push(tempVertex);
				visitedVertices[tempVertex] = true;
				console.log(tempVertex);
				this.adjacencyList[tempVertex].forEach((vtx) => {
					if (!visitedVertices[vtx]) {
						stack.push(vtx);
					}
				});
			}
		}
		return visitingOrder;
	}
}

const myGraph = new Graph();

// myGraph.addVertex('Tokyo');
// myGraph.addVertex('Dallas');
// myGraph.addVertex('Aspen');
// myGraph.addVertex('Hong Kong');
// myGraph.addVertex('Los Angeles');

// myGraph.addEdge('Tokyo', 'Dallas');
// myGraph.addEdge('Tokyo', 'Hong Kong');
// myGraph.addEdge('Dallas', 'Aspen');
// myGraph.addEdge('Dallas', 'Hong Kong');
// myGraph.addEdge('Dallas', 'Los Angeles');
// myGraph.addEdge('Hong Kong', 'Los Angeles');
myGraph.addVertex('A');
myGraph.addVertex('B');
myGraph.addVertex('C');
myGraph.addVertex('D');
myGraph.addVertex('E');
myGraph.addVertex('F');

myGraph.addEdge('A', 'B');
myGraph.addEdge('A', 'C');
myGraph.addEdge('B', 'D');
myGraph.addEdge('C', 'E');
myGraph.addEdge('D', 'E');
myGraph.addEdge('D', 'F');
myGraph.addEdge('E', 'F');

console.log(myGraph);

//myGraph.removeVertex('Dallas');
console.log(myGraph.DFS_Recursive('A'));
console.log(myGraph);

console.log(myGraph.DFS_Iterative('A'));
console.log(myGraph);

console.log(myGraph.BFS_Iterative('A'));
console.log(myGraph);

console.log(myGraph.BFS_Iterative('F'));
console.log(myGraph);


console.log(myGraph.BFS_Iterative('E'));
console.log(myGraph);

