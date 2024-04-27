

class HashTable{
	constructor(size = 53){
		this.keyMap = new Array(size);
	}
	
	#hash(key) {
		let total = 0;
		const WEIRD_PRIME = 31;
		for(let i = 0; i < Math.min(key.length, 100); i++){
			let value = key.charCodeAt(i) - 96;
			total = (total * WEIRD_PRIME + value) % this.keyMap.length;
		}
		return total;
	}

	set(key, value){
		let hashedKey = this.#hash(key);
		if(!this.keyMap[hashedKey]) {
			this.keyMap[hashedKey] = [];
		}
		this.keyMap[hashedKey].push([key, value]);
		return this;		
	}

	get(key){
		let hashedKey = this.#hash(key);
		if(this.keyMap[hashedKey] === undefined) return undefined;
		if(this.keyMap[hashedKey].length === 1) return this.keyMap[hashedKey][0][1];
		const found = this.keyMap[hashedKey].find((element) => element.key === key);
		return found[1];

	}

	keys(){
		const keys = new Set();

		this.keyMap.forEach((element) => {
			if(element){
				element.forEach((item) => keys.add(item[0]));
			}
		})
		return [...keys];
	}

	values(){
		const values = new Set();

		this.keyMap.forEach((element) => {
			if(element){
				element.forEach((item) => values.add(item[1]));
			}
		})
		return [...values];
	}


}


let myHashTable = new HashTable();

myHashTable.set('cyan', '#00ffff');
myHashTable.set('magenta', '#ffff00');
myHashTable.set('yellow', '#ff00ff');


console.log(myHashTable.get('yellow'));
console.log(myHashTable.get('cyan'));
console.log(myHashTable.get('red'));

console.log(myHashTable.keys());
console.log(myHashTable.values());


