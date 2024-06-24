class Node {
	constructor(value) {
		this.value = value;
		this.left = null;
		this.right = null;
	}
}

class BinarySearchTree {
	constructor() {
		this.root = null;
	}
	insert(value, node = this.root) {
		if (node === null) {
			this.root = new Node(value);
			return this;
		}

		if (value === node.value) {
			return this;
		} else if (value < node.value) {
			if (node.left) {
				return this.insert(value, node.left);
			} else {
				node.left = new Node(value);
				return this;
			}
		} else {
			if (node.right) {
				return this.insert(value, node.right);
			} else {
				node.right = new Node(value);
				return this;
			}
		}
	}

	DFSPreOrder() {
		let results = [];

		function searcher(node) {
			if (!node) return;
			results.push(node.value);
			if (node.left) searcher(node.left);
			if (node.right) searcher(node.right);
			return;
		}

		searcher(this.root);
		return results;
	}

	DFSPostOrder() {
		let results = [];

		function searcher(node) {
			if (!node) return;
			if (node.left) searcher(node.left);
			if (node.right) searcher(node.right);
			results.push(node.value);
			return;
		}

		searcher(this.root);
		return results;
	}

	DFSInOrder() {
		let results = [];

		function searcher(node) {
			if (!node) return;
			if (node.left) searcher(node.left);
			results.push(node.value);
			if (node.right) searcher(node.right);
			return;
		}

		searcher(this.root);
		return results;
	}

	breadthFirstSearch() {
		let results = [];
		if (!this.root) return results;
		let toVisit = [this.root];
		while (toVisit.length > 0) {
			let visitedNode = toVisit.shift();
			results.push(visitedNode.value);
			if (visitedNode.left) toVisit.push(visitedNode.left);
			if (visitedNode.right) toVisit.push(visitedNode.right);
		}
		return results;
	}

	remove(value) {
		if (!this.root) return undefined;
		let toRemove = find(value, this.root, null);
		if(toRemove === undefined) return undefined;
		let result = new Node(toRemove.currNode.value);
		
		if (!toRemove.currNode.left && !toRemove.currNode.right) {
			if(toRemove.parentNode){
				if(toRemove.isGreater){
					toRemove.parentNode.right = null;
				} else {
					toRemove.parentNode.left = null;
				}
			}
			toRemove.currNode = null;
		}else if (toRemove.currNode.left && !toRemove.currNode.right) {
			if(toRemove.parentNode){
				if(toRemove.isGreater){
					toRemove.parentNode.right = toRemove.currNode.left;
				} else {
					toRemove.parentNode.left = toRemove.currNode.left;
				}
			}
			toRemove.currNode = null;
		} else if (!toRemove.currNode.left && toRemove.currNode.right) {
			if(toRemove.parentNode){
				if(toRemove.isGreater){
					toRemove.parentNode.right = toRemove.currNode.right;
				} else {
					toRemove.parentNode.left = toRemove.currNode.right;
				}
			}
			toRemove.currNode = null;
		} else {
			if(!toRemove.currNode.right.left){
				toRemove.currNode.value = toRemove.currNode.right.value;
				toRemove.currNode.right = toRemove.currNode.right.right;				
			} else {
				toRemove.currNode.value = extractSmallestNode(toRemove.currNode);
			}
		}	
		return result;
		

		function find(value, currNode, parentNode = null) {
			if (currNode.value === value) {
				return { currNode, parentNode, isGreater: parentNode ? parentNode.value < currNode.value : undefined};
			} else if (value < currNode.value) {
				if (currNode.left)
					return find(value, currNode.left, currNode);
				return undefined;
			} else {
				if (currNode.right)
					return find(value, currNode.right, currNode);
				return undefined;
			}
		}

		function extractSmallestNode(node){
			if(!node.right) return undefined;
			let prevNode = node;
			let currNode = node.right;
			while(currNode.left){
				prevNode = currNode;
				currNode = currNode.left;
			}
			if(prevNode != node) {
				if(currNode.right){
					prevNode.left = currNode.right;
				} else {
					prevNode.left = null;
				}
			} 
			let returnVal = currNode.value;
			currNode = null;
			return returnVal;
		}
	}

	hight(){
		if(this.root === null) return -1;
		let hight = 0;
		function parse(node, level = 0){
			if(!node) return;
			hight = Math.max(hight, level);
			parse(node.left, (level + 1)) ;
			parse(node.right, (level + 1));
		}
		parse(this.root, 0);
		return hight;
	}

	size(){
		if(this.root === null) return 0;
		let size = 0;
		function parse(node){
			if(!node) return;
			size++;
			parse(node.left) ;
			parse(node.right);
		}
		parse(this.root);
		return size;
	}

	isBalanced() {
		let size = this.size();
		let hight = this.hight();
		let fraction = Math.log2(size);
		if(fraction >= hight && fraction < (hight + 1)){
			return true;
		}
		return false;
	}

	findSecondLargest() {
		if(!(this.root.right || this.root.left)) return undefined;
		let largest = this.root;
		let secondLargest = null;
		while(largest.right){
			secondLargest = largest;
			largest = largest.right;
		};
		if(largest.left){
			secondLargest = largest.left;
			while(secondLargest.right){
				secondLargest = secondLargest.right;
			}
		}
		return secondLargest.value;
	}
}


var binarySearchTree = new BinarySearchTree();
binarySearchTree.insert(15);
binarySearchTree.insert(20);
binarySearchTree.insert(10);
binarySearchTree.insert(12);
console.log(binarySearchTree.isBalanced()); // true
 
var binarySearchTree2 = new BinarySearchTree();
binarySearchTree2.insert(5);
console.log(binarySearchTree2.isBalanced()); // true
binarySearchTree2.insert(6);
console.log(binarySearchTree2.isBalanced()); // true
binarySearchTree2.insert(7);
console.log(binarySearchTree2.isBalanced()); // false


// var binarySearchTree = new BinarySearchTree();
// binarySearchTree
//     .insert(15)
//     .insert(20)
//     .insert(10)
//     .insert(12)
//     .insert(1)
//     .insert(5)
//     .insert(50);
// console.log(binarySearchTree.remove(50));
// console.log(binarySearchTree.root.right.value); // 20
// console.log(binarySearchTree.root.right.right); // null
 
// console.log(binarySearchTree.remove(5));
// console.log(binarySearchTree.root.left.left.value); // 1
// console.log(binarySearchTree.root.left.left.right); // null
 
// var binarySearchTree = new BinarySearchTree();
// binarySearchTree
//     .insert(15)
//     .insert(20)
//     .insert(10)
//     .insert(12)
//     .insert(1)
//     .insert(5)
//     .insert(50);
 
// console.log(binarySearchTree.remove(1));
// console.log(binarySearchTree.root.left.left.value); // 5
// console.log(binarySearchTree.root.left.left.left); // null
// console.log(binarySearchTree.root.left.left.right); // null
 
// console.log(binarySearchTree.remove(20));
// console.log(binarySearchTree.root.right.value); // 50
// console.log(binarySearchTree.root.right.right); // null
// console.log(binarySearchTree.root.right.left); // null
 
// var binarySearchTree = new BinarySearchTree();
// binarySearchTree
//     .insert(15)
//     .insert(20)
//     .insert(10)
//     .insert(12)
//     .insert(1)
//     .insert(5)
//     .insert(50)
//     .insert(60)
//     .insert(30)
//     .insert(25)
//     .insert(23)
//     .insert(24)
//     .insert(70);
 
// console.log(binarySearchTree.remove(10));
// console.log(binarySearchTree.root.left.value); // 12
// console.log(binarySearchTree.root.left.left.value); // 1
// console.log(binarySearchTree.root.left.left.right.value); // 5
 
// console.log(binarySearchTree.remove(50));
// console.log(binarySearchTree.root.right.value); // 20
// console.log(binarySearchTree.root.right.right.value); // 60
// console.log(binarySearchTree.root.right.right.left.value); // 30
 
// var binarySearchTree = new BinarySearchTree();
// binarySearchTree
//     .insert(22)
//     .insert(49)
//     .insert(85)
//     .insert(66)
//     .insert(95)
//     .insert(90)
//     .insert(100)
//     .insert(88)
//     .insert(93)
//     .insert(89)
 
// console.log(binarySearchTree.remove(85));
// console.log(binarySearchTree.root.right.right.value); // 88
// console.log(binarySearchTree.root.right.right.right.left.left.value); // 89