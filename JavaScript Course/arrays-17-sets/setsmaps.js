// const ids = new Set(['Hi','from','set']);
// ids.add(2);
// if(ids.has('Hi')){
// 	ids.delete('Hi');
// }

// console.log(ids.has(2));

// for(value of ids.values()){
// 	console.log(value);
// };

// const person1 = {name: 'Max'};
// const person2 = {name: 'Manuel'};

// const personData = new Map([[person1,[{date: 'yesterday', price: 10}]]]);
// person1.name = 'Anna';
// personData.set(person2,[{date: 'two weeks ago', price: 20}]);
// console.log(personData);
// console.log(personData.get(person1));

// for(const [key, value] of personData.entries()){
// 	console.log(key, value);
// };

// for(const key of personData.keys()){
// 	console.log(key);
// };

// for(const value of personData.values()){
// 	console.log(value);
// };

let person = {name: 'Max'};
const persons = new WeakSet();
persons.add(person);

console.log(persons);
