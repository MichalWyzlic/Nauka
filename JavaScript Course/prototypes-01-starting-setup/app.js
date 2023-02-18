// function Person() {
// 	this.name = 'Max';

// 	this.age = 30;
	

// 	this.greet = () => {
// 		console.log('Hi, I am ' + this.name + ' and I am ' + this.age + ' years old.');
// 	};
// }

// const person = new Person();
// person.greet();
// console.dir(Person);
// console.dir(Person.__proto__);
// console.dir(Person.prototype);


const course = {
	title: 'JavaScript - The Complete Guide',
	rating: 5
};

Object.setPrototypeOf(course, {
	printRating: function() {
		(`${this.rating}/5`);
	}
});

course.printRating();
