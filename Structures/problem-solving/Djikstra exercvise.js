class WeightedGraph extends Graph {
	constructor() {
		super();
	}

	addEdge(vertex1, vertex2, weight) {
		//add edges between vertices as weighted objects { vertex: '', weight: }
		this.adjacencyList[vertex1].push({vertex: vertex2, weight: weight});
		this.adjacencyList[vertex2].push({vertex: vertex1, weight: weight});
	}

	Dijkstra(start, end){
		const visited = {};
		const previous = {};
		const distances = new PriorityQueue();
		//distances.enqueue(start, 0)
		previous[start] = null;
		visited[start] = true;

		for (let key in this.adjacencyList) {
			if (key !== start){
				distances.enqueue(key, Infinity);
				previous[key] = null;
			}
		}
		let currNode = {val: start, priority: 0};
		
		while(currNode.val !== end ){
			let edges = this.adjacencyList[currNode.val];
			edges.forEach(edge => {
				if(!(edge.vertex in visited)){
					let distToVtx = currNode.priority + edge.weight;
					if(distances.enqueue(edge.vertex, distToVtx)){
						previous[edge.vertex] = currNode.val;
					}
				}

			} );

			currNode = distances.dequeue(); 	
			visited[currNode.val] = true;

		}
		
		const path = [currNode.val];
		while(path[0] != start){
			path.unshift(previous[path[0]]);
		}

		return [currNode.priority, path];

	}
}

/***
 *** Use Graph as a constructor for WeightedGraph to inherit from!
 ***
 ***/

function Graph() {
	this.adjacencyList = {};
}

Graph.prototype.numEdges = function () {
	let total = 0;

	Object.values(this.adjacencyList).forEach((list) => {
		total += list.length;
	});

	// note that we've double-counted up til now since we've looked at
	// the adjacencyList for every node.
	return total / 2;
};

Graph.prototype.addVertex = function (vertex) {
	this.adjacencyList[vertex] = [];
};

Graph.prototype.addEdge = function (vertex1, vertex2) {
	this.adjacencyList[vertex1].push(vertex2);
	this.adjacencyList[vertex2].push(vertex1);
};

Graph.prototype.removeVertex = function (vertex) {
	while (this.adjacencyList[vertex].length) {
		const adjacentVertex = this.adjacencyList[vertex].pop();
		this.removeEdge(adjacentVertex, vertex);
	}
	delete this.adjacencyList[vertex];
};

Graph.prototype.removeEdge = function (vertex1, vertex2) {
	this.adjacencyList[vertex1] = this.adjacencyList[vertex1].filter(
		(v) => v !== vertex2
	);
	this.adjacencyList[vertex2] = this.adjacencyList[vertex2].filter(
		(v) => v !== vertex1
	);
};

/***
 *** Use the following as a PriorityQueue (it's a min heap)!
 ***
 ***/
class PriorityQueue {
	constructor() {
		this.values = [];
	}
	enqueue(val, priority) {
		let index = this.values.findIndex( element => element.val === val);
		if(index === -1){
			this.values.push({ val, priority });
			this.sort();
			return true;
		} else if(this.values[index].priority > priority){
			this.values[index].priority = priority;
			this.sort();
			return true;
		}

		return false;
	}
	dequeue() {
		return this.values.shift();
	}
	sort() {
		this.values.sort((a, b) => a.priority - b.priority);
	}
}

var g = new WeightedGraph();

g.addVertex('A');
g.addVertex('Z');
g.addVertex('C');
g.addVertex('D');
g.addVertex('E');
g.addVertex('H');
g.addVertex('Q');
g.addVertex('G');

g.addEdge('A', 'Z', 7);
g.addEdge('A', 'C', 8);
g.addEdge('Z', 'Q', 2);
g.addEdge('C', 'G', 4);
g.addEdge('D', 'Q', 8);
g.addEdge('E', 'H', 1);
g.addEdge('H', 'Q', 3);
g.addEdge('Q', 'C', 6);
g.addEdge('G', 'Q', 9);

console.log(g.Dijkstra('A', 'E')); // ["A", "Z", "Q", "H", "E"]
console.log(g.Dijkstra('A', 'Q')); // ["A", "Z", "Q"]
console.log(g.Dijkstra('A', 'G')); // ["A", "C", "G"]
console.log(g.Dijkstra('A', 'D')); // ["A", "Z", "Q", "D"]
