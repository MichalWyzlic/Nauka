class Graph{
	constructor(){
		this.adjacencyList = {} 
	}

	addVertex(vertex){
		if(!this.adjacencyList[vertex]){
			this.adjacencyList[vertex] = [];
			return true;
		}
		return false;
	}

	addEdge(v1, v2){
		this.adjacencyList[v1].push(v2);
		this.adjacencyList[v2].push(v1);
	}

	removeEdge(v1, v2){
		let index = this.adjacencyList[v1].indexOf(v2);		
		this.adjacencyList[v1].splice(index,1);

		index = this.adjacencyList[v2].indexOf(v1);
		this.adjacencyList[v2].splice(index,1);
	}

	removeVertex(v1){
		this.adjacencyList[v1].forEach((element) => {
			let index = this.adjacencyList[element].indexOf(v1);
			this.adjacencyList[element].splice(index,1);
		});		
		delete this.adjacencyList[v1];		
	}
}


const myGraph = new Graph;

myGraph.addVertex('Tokyo');
myGraph.addVertex('Dallas');
myGraph.addVertex('Aspen');
myGraph.addVertex('Hong Kong');
myGraph.addVertex('Los Angeles');

myGraph.addEdge('Tokyo', 'Dallas');
myGraph.addEdge('Tokyo', 'Hong Kong');
myGraph.addEdge('Dallas', 'Aspen');
myGraph.addEdge('Dallas', 'Hong Kong');
myGraph.addEdge('Dallas', 'Los Angeles');
myGraph.addEdge('Hong Kong', 'Los Angeles');

console.log(myGraph);

myGraph.removeVertex('Dallas');

console.log(myGraph);