class MaxBinaryHeap{
	constructor(){
		this.values = [];
	}

	insert(value){
		this.values.push(value);
		let index = this.values.length - 1;
		let parentIndex = Math.floor((index - 1) / 2);

		while(index > 0 && this.values[parentIndex] < this.values[index]){
			let temp = this.values[index];
			this.values[index] = this.values[parentIndex];
			this.values[parentIndex] = temp;
			index = parentIndex;
			parentIndex = Math.floor((index - 1) / 2);
		}

		return this.values;
	}

	extractMax(){
		let maxNode = this.values[0];
		let valueToSink = this.values.pop();
		if(this.values.length === 0) return maxNode;

		this.values[0] = valueToSink;
		let bubbleDown = true;
		let index = 0;

		while(bubbleDown){
			let leftIndex = index * 2 + 1;
			let rightIndex = leftIndex + 1; 
			let leftCondition = leftIndex < this.values.length && valueToSink < this.values[leftIndex];
			let rightCondition = rightIndex < this.values.length && valueToSink < this.values[rightIndex];
			if(leftCondition && rightCondition){
				if(this.values[leftIndex] > this.values[rightIndex]){
					this.values[index] = this.values[leftIndex];
					this.values[leftIndex] = valueToSink;
					index = leftIndex;
				} else{
					this.values[index] = this.values[rightIndex];
					this.values[rightIndex] = valueToSink;
					index = rightIndex;
				}
			} else if(leftCondition) {
				this.values[index] = this.values[leftIndex];
				this.values[leftIndex] = valueToSink;
				index = leftIndex;
			} else if(rightCondition){
				this.values[index] = this.values[rightIndex];
					this.values[rightIndex] = valueToSink;
					index = rightIndex;
			} else {
				bubbleDown = false;
			}
		}

		return maxNode;
	}
}


// const myHeap = new MaxBinaryHeap();

// console.log(myHeap.insert(15));
// console.log(myHeap.insert(22));
// console.log(myHeap.insert(11));
// console.log(myHeap.insert(7));
// console.log(myHeap.insert(16));
// console.log(myHeap.insert(12));
// console.log(myHeap.insert(8));
// console.log(myHeap.insert(33));
// console.log(myHeap.insert(17));
// console.log(myHeap.insert(18));
// console.log(myHeap.insert(9));
// console.log(myHeap.insert(1));

// console.log(myHeap.extractMax());
// console.log(myHeap.values);
// console.log(myHeap.extractMax());
// console.log(myHeap.values);
// console.log(myHeap.extractMax());
// console.log(myHeap.values);
// console.log(myHeap.extractMax());
// console.log(myHeap.values);
// console.log(myHeap.extractMax());
// console.log(myHeap.values);
// console.log(myHeap.extractMax());
// console.log(myHeap.values);
// console.log(myHeap.extractMax());
// console.log(myHeap.values);
// console.log(myHeap.extractMax());
// console.log(myHeap.values);
// console.log(myHeap.extractMax());
// console.log(myHeap.values);
// console.log(myHeap.extractMax());
// console.log(myHeap.values);
// console.log(myHeap.extractMax());
// console.log(myHeap.values);
// console.log(myHeap.extractMax());
// console.log(myHeap.values);
// console.log(myHeap.extractMax());
// console.log(myHeap.values);


class PriorityNode{
	constructor(value, priority){
		this.value = value;
		this.priority = priority;
	}
}

class PriorityQueue{
	constructor(){
		this.queue = []
	}

	enqueue(value, priority){
		const node = new PriorityNode(value, priority);
		this.queue.push(node);
		let index = this.queue.length - 1;
		let parentIndex = Math.floor((index - 1) / 2);

		while(index > 0 && this.queue[parentIndex].priority > this.queue[index].priority){
			let temp = this.queue[index];
			this.queue[index] = this.queue[parentIndex];
			this.queue[parentIndex] = temp;
			index = parentIndex;
			parentIndex = Math.floor((index - 1) / 2);
		}

		return this.queue;
	}

	dequeue(){
		let minNode = this.queue[0];
		let valueToBubble = this.queue.pop();
		if(this.queue.length === 0) return minNode;

		this.queue[0] = valueToBubble;
		let bubbleUP = true;
		let index = 0;

		while(bubbleUP){
			let leftIndex = index * 2 + 1;
			let rightIndex = leftIndex + 1; 
			let leftCondition = leftIndex < this.queue.length && valueToBubble.priority > this.queue[leftIndex].priority;
			let rightCondition = rightIndex < this.queue.length && valueToBubble.priority > this.queue[rightIndex].priority;
			if(leftCondition && rightCondition){
				if(this.queue[leftIndex].priority < this.queue[rightIndex].priority){
					this.queue[index] = this.queue[leftIndex];
					this.queue[leftIndex] = valueToBubble;
					index = leftIndex;
				} else{
					this.queue[index] = this.queue[rightIndex];
					this.queue[rightIndex] = valueToBubble;
					index = rightIndex;
				}
			} else if(leftCondition) {
				this.queue[index] = this.queue[leftIndex];
				this.queue[leftIndex] = valueToBubble;
				index = leftIndex;
			} else if(rightCondition){
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

const myQueue = new PriorityQueue();

console.log(myQueue.enqueue('do something',15));
console.log(myQueue.enqueue('do something',22));
console.log(myQueue.enqueue('do something',11));
console.log(myQueue.enqueue('do something',7));
console.log(myQueue.enqueue('do something',16));
console.log(myQueue.enqueue('do something',12));
console.log(myQueue.enqueue('do something',8));
console.log(myQueue.enqueue('do something',33));
console.log(myQueue.enqueue('do something',17));
console.log(myQueue.enqueue('do something',18));
console.log(myQueue.enqueue('do something',9));
console.log(myQueue.enqueue('do something',1));

console.log(myQueue.dequeue());
console.log(myQueue.dequeue());
console.log(myQueue.dequeue());
console.log(myQueue.dequeue());
console.log(myQueue.dequeue());
console.log(myQueue.dequeue());
console.log(myQueue.dequeue());
console.log(myQueue.dequeue());
console.log(myQueue.dequeue());
console.log(myQueue.dequeue());
console.log(myQueue.dequeue());
console.log(myQueue.dequeue());