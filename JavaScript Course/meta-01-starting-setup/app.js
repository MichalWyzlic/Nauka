const uid = Symbol('uid');
console.log(uid);

const person = {
	[uid]: 'p1',
	name: 'Max',
	age: 30,
	[Symbol.toStringTag]: 'User'
};

person.uid = 'm';