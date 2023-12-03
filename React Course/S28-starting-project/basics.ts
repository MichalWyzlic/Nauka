//Primitives
let age: number = 24;

let userName: string;

userName = 'Michal';
let isInstructor: boolean = true;

//arrays and other complex types

let hobbies: string[];

hobbies = ['climbing', 'skiing', 'cooking'];

type Person = {
	name: string, 
	age: number
};

let person: Person;

person = {
	name: userName,
	age: age
};

//Functions and types

function add(a: number, b: number){
	return a+b;
}



