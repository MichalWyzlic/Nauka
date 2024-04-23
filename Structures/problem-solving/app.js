class Node{
	constructor(value){
		this.value = value;
		this.left = null;
		this.right = null;
	}
}

class BinarySearchTree{
	constructor(){
		this.root=null;
	}

	insert(value){
		let newNode = new Node(value);
		if(!this.root){
			this.root = newNode;
			return this;
		}
		
		function search(curNode){
			if(curNode.value === value) return this;
			if(value < curNode.value){
				if(curNode.left === null){
					curNode.left = newNode;
					return this;
				} else {
					return search(curNode.left);
				}
			}

			if(curNode.right === null){
				curNode.right = newNode;
				return this;
			} else {
				return search(curNode.right);
			}
		}

		return search(this.root);
	}

	find(value){
		if(!this.root){
			this.root = newNode;
			return this;
		}
		
		function search(curNode){
			if(curNode.value === value) return true;
			if(value < curNode.value){
				if(curNode.left === null){
					return false;
				} else {
					return search(curNode.left);
				}
			}

			if(curNode.right === null){
				return false;
			} else {
				return search(curNode.right);
			}
		}

		return search(this.root);
	}

	traverseBFS(){
		let queue = [];
		let visited = [];

		if(this.root){
			queue.push(this.root);
			while(queue.length > 0){
				let curNode = queue.shift();
				visited.push(curNode.value);
				if(curNode.left){
					queue.push(curNode.left);
				}
				if(curNode.right){
					queue.push(curNode.right);
				} 
			}
		}
		return visited;
	}
}

const myBST = new BinarySearchTree();
myBST.insert(10);
myBST.insert(1);
myBST.insert(3);
myBST.insert(15);
myBST.insert(12);
myBST.insert(4);
myBST.insert(14);
myBST.insert(25);
myBST.insert(17);
myBST.insert(2);
myBST.insert(-1);
myBST.insert(27);

console.log(myBST.find(15));
console.log(myBST.find(5));
console.log(myBST.find(7));
console.log(myBST.find(25));
console.log(myBST.find(17));
console.log(myBST.traverseBFS());
