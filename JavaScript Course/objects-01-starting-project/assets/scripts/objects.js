const movieList = document.getElementById('movie-list');

movieList.style['background-color'] = 'green';
movieList.style.display = 'block'; 

const person = {
	'first name': 'Max',
	age: 30,
	hobbies: ['Sports', 'Cooking'],
	greet: function() {
		alert(`Hi there, I am ${this.name} and I am ${this.age} years old.`);
	},
	1.5: 'hello'
};

delete person.age;
//person.age = undefined;
person.isAdmin = true;

console.log(person);


