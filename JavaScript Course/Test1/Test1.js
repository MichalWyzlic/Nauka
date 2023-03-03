'use strict'

function arrayToList(arr){
	function iterate(i, arr){
		if(i === (arr.length - 1)){
			return new Node(arr[i], null);
		} else {
			return new Node(arr[i], iterate(i + 1, arr));
		};
	};

	return iterate(0, arr);
}

function Node(value, next=null) {
	this.value = value;
	this.next = next;
  }
  

function zipWith(fn,head0,head1) {
	if(head0 === null || head1 === null){
	  return null;
	} else {
		  return new Node(fn(head0.value, head1.value), zipWith(fn,head0.next,head1.next));
	};
};

function add(a,b) {
	return a+b;
}
let a = arrayToList([0,1,2,3,4,5]);
let b = arrayToList([6,5,4,3,2,1]);
console.log(zipWith(add, a, b));


let boom3 = 343;
let test = false;
let myWireId = 0;

for(let i = 0; i < 10; i++ ){
	let text = `test = (typeof boom${i} === 'number');`;
	console.log(eval(text));
	if(test){
		eval(`myWireId = boom${i};`);
		break;
	}
};



console.log(myWireId)
