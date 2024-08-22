// My trie

// class Trie {
//     constructor() {
//         this.characters = {};
//         this.isWord = false;
//     }
//     addWord(word, index = 0) {
// 		const char = word.charAt(index);
// 		if(!(char in this.characters, char)){
// 			this.characters[char] = new Trie();
// 		}
// 		if(index < word.length - 1){
// 			this.characters[char].addWord(word, index + 1);
// 		} else {
// 			this.characters[char].isWord = true;
// 		}
//     }
// }

// class Trie {
//     constructor() {
//         this.characters = {};
//         this.isWord = false;
//     }
//     addWord(word, index = 0) {
//         if (index === word.length) {
//             this.isWord = true;
//         } else if (index < word.length) {
//             var char = word[index];
//             var subTrie = this.characters[char] || new Trie();
//             subTrie.addWord(word, index + 1);
//             this.characters[char] = subTrie;
//         }
//         return this;
//     }

//     findWord(word, index = 0, curTrie = this) {
// 		let currentTrie = curTrie;
// 		let char = word.charAt(index);
// 		if(!(char in currentTrie.characters)){
// 			return undefined;
// 		};

// 		if(index === word.length - 1) {
// 			return currentTrie.characters[char].isWord ? currentTrie.characters[char] : undefined;
// 		} else {
// 			return this.findWord(word, index + 1, currentTrie.characters[char]);
// 		}

//     }
// }

// var t = new Trie();
// console.log(t.addWord('fun'));
// console.log(t.addWord('fast'));
// console.log(t.addWord('fat'));
// console.log(t.addWord('fate'));
// console.log(t.addWord('father'));

// console.log(t.findWord('taco')); // undefined
// console.log(t.findWord('fat').characters); // {t: Trie}
// console.log(t.findWord('father').characters); // {}
// console.log(t.findWord('father').isWord); // true

// class Trie {
//     constructor() {
//         this.characters = {};
//         this.isWord = false;
//     }
//     addWord(word, index = 0) {
//         if (index === word.length) {
//             this.isWord = true;
//         } else if (index < word.length) {
//             var char = word[index];
//             var subTrie = this.characters[char] || new Trie();
//             subTrie.addWord(word, index + 1);
//             this.characters[char] = subTrie;
//         }
//         return this;
//     }
//     getWords(words = [], currentWord = "", curTrie = this){
//         if(curTrie.isWord) words.push(currentWord);
// 		for(let key in curTrie.characters){
// 			this.getWords(words, currentWord + key, curTrie.characters[key]);
// 		}
// 		return words;
//     }
// }

// var t = new Trie();
// t.addWord('fun')
// t.addWord('fast')
// t.addWord('fat')
// t.addWord('fate')
// t.addWord('father')
// t.addWord('forget')
// t.addWord('awesome')
// t.addWord('argue')

// console.log(t.getWords()); // ["fun", "fast", "fat", "fate", "father", "forget", "awesome", "argue"]

// console.log(t.getWords().length); // 8

class Trie {
	constructor() {
		this.characters = {};
		this.isWord = false;
	}
	addWord(word, index = 0) {
		if (index === word.length) {
			this.isWord = true;
		} else if (index < word.length) {
			var char = word[index];
			var subTrie = this.characters[char] || new Trie();
			subTrie.addWord(word, index + 1);
			this.characters[char] = subTrie;
		}
		return this;
	}

	findWord(word, index = 0) {
		var char = word[index];
		if (index < word.length - 1 && this.characters[char]) {
			index += 1;
			return this.characters[char].findWord(word, index);
		} else {
			return this.characters[char];
		}
	}
	getWords(words = [], currentWord = '', curTrie = this) {
		if (curTrie.isWord) words.push(currentWord);
		for (let key in curTrie.characters) {
			this.getWords(words, currentWord + key, curTrie.characters[key]);
		}
		return words;
	}
	autoComplete(prefix, curTrie = this) {
		const result = [];
		let index = 0;

		while (index < prefix.length) {
			let char = prefix.charAt(index);
			if (char in curTrie.characters) {
				index++;
				curTrie = curTrie.characters[char];
			} else {
				return [];
			}
		}
		return this.getWords(result, prefix, curTrie);
	}

	removeWord(word, curTrie = this) {
		const charChain = [];
		let index = 0;
		let char = '';
		while (index < word.length) {
			char = word.charAt(index);
			if (char in curTrie.characters) {
				charChain[index] = [char, curTrie];
				curTrie = curTrie.characters[char];
				index++;
			} else {
				return false;
			}
		}

		index--;
		curTrie.isWord = false;

		let canRemove = Object.keys(curTrie.characters).length === 0;
		while (index >= 0 && canRemove) {
			char = charChain[index][0];
			curTrie = charChain[index][1];
			canRemove =
				canRemove &&
				Object.keys(curTrie.characters[char].characters).length === 0 &&
				!curTrie.characters[char].isWord;
			if (canRemove) {
				delete curTrie.characters[char];
			}
			index--;
		}
		return true;
	}
}

var t = new Trie();
t.addWord('awe');
t.addWord('fun');
t.addWord('fast');
t.addWord('fat');
t.addWord('fate');
t.addWord('father');
t.addWord('forget');
t.addWord('awesome');
t.addWord('argue');

console.log(t.autoComplete('fa')); // ["fast","fat", "fate", "father"]
console.log(t.autoComplete('a')); // ["awesome", "argue"]
console.log(t.autoComplete('arz')); // []

console.log(t.removeWord('fat'));
console.log(t.characters.f.characters.a.characters.t.isWord); // false
console.log(t.characters.f.characters.a.characters.t.characters.e.isWord); // true

console.log(t.removeWord('argue'));

console.log(t.characters.a.characters.r); // undefined
console.log(t.removeWord('awesome'));
console.log(t.removeWord('awe'));


console.log(t.getWords());
