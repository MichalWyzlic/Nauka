const  words = ['aab', 'defgab', 'abcde', 'aabcde', 'bbbbbbbbbb', 'jabjjjad'];

    // // Write your code here
	// for(let i = 0; i < words.length; i++){
	// 	for(let j = 0; j < words.length; j++){
	// 		if(j !== i && words[i].length >= words[j].length){
	// 			if(words[j] === words[i].substring(0, words[j].length)){
	// 				console.log('BAD SET');
	// 				console.log(words[i]);
	// 				return;
	// 			};
	// 		};
	// 	};
	// };
	// console.log('GOOD SET');


class TrieNode {
	constructor() {
		this.keys = new Map();
		this.end = false;
	};

	setEnd(){
		this.end = true;
	};

	isEnd(){
		return this.end;
	};
};

class Trie{
	constructor(){
		this.root = new TrieNode();
	};

	add(input, node = this.root){
		if(input.length === 0){
			node.setEnd();
			return;
		} else if(!node.keys.has(input[0])){
			node.keys.set(input[0], new TrieNode());
			return this.add(input.substring(1), node.keys.get(input[0]));
		}else {
			return this.add(input.substring(1), node.keys.get(input[0]));
		};
	};

	isWord(word){
		let node = this.root;
		while(word.length > 1){
			if(!node.keys.has(word[0])){
				return false;
			} else{
				node = node.keys.get(word[0]);
				word = word.substring(1);
			};
		};

		return (node.keys.has(word) && node.keys.get(word).isEnd());
	};



	print(){
		const words = [];
		const search = function(node = this.root, string){
			if(node.keys.size !== 0){
				for(let letter of node.keys.keys()){
					search(node.keys.get(letter), string.concat(letter));
				};
				if(node.isEnd()){
					words.push(string);
				};
			} else{
				string.length > 0 ? words.push(string) : undefined;
				return;
			};
		};
		search(this.root, new String());
		return words.length > 0 ? words : null;
	};
};


function noPrefix(words) {


	const testTrie = new Trie();
	for(let i = 0; i<words.length; i++){
		if(i > 0){

			let isPrefix = false;
			let hasPrefix = false;
			let node = testTrie.root;
			let word = words[i];
			while(word.length > 1){
				if(!node.keys.has(word[0])){
					break;
				} else{
					node = node.keys.get(word[0]);
					word = word.substring(1);
					if(node.isEnd()){
						hasPrefix = true;
					}
				};
			};
	
			isPrefix = node.keys.has(word);

			if(isPrefix || hasPrefix){
				console.log('BAD SET\n' + words[i]);
				return;
			}
		};
		testTrie.add(words[i]);
	};
	console.log('GOOD SET');

};

// myTrie = new Trie();
// myTrie.add('ball');
// myTrie.add('dorm');
// myTrie.add('send');
// myTrie.add('bat');
// myTrie.add('do');
// myTrie.add('sense');
// myTrie.add('doll');
// myTrie.add('dork');
// myTrie.add('sensei');

// console.log(myTrie.isWord('doll'));
// console.log(myTrie.isWord('sen'));
// console.log(myTrie.isWord('ball'));
// console.log(myTrie.print());

noPrefix(words);