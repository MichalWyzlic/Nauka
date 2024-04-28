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
}