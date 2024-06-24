class MaxBinaryHeap {
	constructor() {
		this.values = [];
	}
	insert(val) {
		this.values.push(val);
		let index = this.values.length - 1;
		let parent = Math.floor((index - 1) / 2);
		while (index > 0 && this.values[parent] < val) {
			this.values[index] = this.values[parent];
			this.values[parent] = val;
			index = parent;
			parent = Math.floor((index - 1) / 2);
		}

		return this;
	}

	extractMax(){
		let max = this.values[0];
		let tempVal = this.values.pop();
		this.values[0] = tempVal;
		let index = 0;
		let child1 =  index * 2 + 1;
		let child2 = child1 + 1;
		while(child1 < this.values.length && child2 < this.values.length){
			//both children are greater than val
			if(this.values[child1] > tempVal && this.values[child2] > tempVal){
				if(this.values[child1] > this.values[child2]){
					//child 1 is bigger than child 2
					this.values[index] = this.values[child1];
					this.values[child1] = tempVal;
					index = child1;
					child1 =  index * 2 + 1;
					child2 = child1 + 1;
				} else {
					//child 2 is bigger than child 1
					this.values[index] = this.values[child2];
					this.values[child2] = tempVal;
					index = child2;
					child1 =  index * 2 + 1;
					child2 = child1 + 1;
					
				}
			} else if(this.values[child1] > tempVal){
				//child 1 is greater than val
				this.values[index] = this.values[child1];
				this.values[child1] = tempVal;
				index = child1;
				child1 =  index * 2 + 1;
				child2 = child1 + 1;
			} else if(this.values[child2] > tempVal){
				//child 2 is bigger than val
				this.values[index] = this.values[child2];
				this.values[child2] = tempVal;
				index = child2;
				child1 =  index * 2 + 1;
				child2 = child1 + 1;				
			} else {
				return max;
			}
		}
		//the last comparison 
		if(child1 < this.values.length){
			if(this.values[child1] > tempVal){
				//child 1 is greater than val
				this.values[index] = this.values[child1];
				this.values[child1] = tempVal;
			}
		}

		return max;
	}
}

let binaryHeap = new MaxBinaryHeap();
binaryHeap.insert(1)
binaryHeap.insert(2)
binaryHeap.insert(3)
binaryHeap.insert(4)
binaryHeap.insert(5)
binaryHeap.insert(6)
console.log(binaryHeap.extractMax());
console.log(binaryHeap.values[0]); // 5
 
console.log(binaryHeap.values); // [5,4,2,1,3])
 
console.log(binaryHeap.extractMax());
console.log(binaryHeap.values); // [4,3,2,1])
 
console.log(binaryHeap.extractMax());
console.log(binaryHeap.values); // [3,1,2])