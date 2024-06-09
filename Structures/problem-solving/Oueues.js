class Stack {	
	constructor() {
		this.queue = new Queue();
		this.size = 0;
	}

    push(val) {
		this.size++;
		if(this.queue.size === 0){
			this.queue.enqueue(val);
			return this;			
		}

		let queue2 = new Queue();
		queue2.enqueue(val);
		while(this.queue.size > 0){
			queue2.enqueue(this.queue.dequeue());			
		};
		this.queue = queue2;
		return this;
	}

    pop() {
		if(this.size === 0) return null;
		this.size--;
		return this.queue.dequeue();		
	}
}

// QUEUE AND NODE HAVE BEEN IMPLEMENTED FOR YOU

class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

class Queue {
    constructor() {
        this.first = null;
        this.last = null;
        this.size = 0;
    }
    enqueue(data) {
        var node = new Node(data);

        if (!this.first) {
            this.first = node;
            this.last = node;
        } else {
            this.last.next = node;
            this.last = node;
        }

        return ++this.size;
    }

    dequeue() {
        if (!this.first) return null;

        var temp = this.first;
        if (this.first == this.last) {
            this.last = null;
        }
        this.first = this.first.next;
        this.size--;
        return temp.value;
    }
}


var s = new Stack();
console.log(s.push(10).push(20).push(30));
console.log(s.pop()); // 30
console.log(s.pop()); // 20
console.log(s.pop()); // 10
console.log(s.pop()); // null
console.log(s.push(30).push(40).push(50));
console.log(s.pop()); // 50
console.log(s.push(60));
console.log(s.pop()); // 60