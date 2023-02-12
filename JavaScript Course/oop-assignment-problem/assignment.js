"use strict";

class Course {
	#title = '';
	#length = 0;
	#price = 0;
	_summary = '';

	constructor(t, l , p, s){
		this.#title = t;
		this.#length = l;
		this.price = p;
		this.summary = s;
	};

	priceLength(){
		return this.#length/this.#price;
	};

	set title(t){
		this.#title = t;
	};

	get title(){
		return `${this.#title}`;
	}

	set length(l){
		this.#length = l;
	};

	get length(){
		return `${this.#length}h`;
	}

	set price(p){
		if(p >= 0){
			this.#price = p;
		} else {
			throw ('Invalid price');
		};
	};

	get price(){
		return `\$${this.#price}`;
	}

	get summary(){
		return `\t\tCourse title: \t${this.title}
		Course length: \t${this.length}
		Course price: \t${this.price}
		Course description: 
		${this._summary}`;
	};

	set summary(text){
		this._summary = text;
	};

};

class PracticalCourse extends Course {
	#numOfExercises = 0;

	constructor(t, l , p, n){
		super(t, l , p);
		this.numOfExercises = n;
	};

	get numOfExercises(){
		return this.#numOfExercises;
	};
	
	set numOfExercises(n){
		if(n > 0){
			this.#numOfExercises = n;
		};
	};

	get summary(){
		return `\t\tCourse title: \t${this.title}
		Course length: \t${this.length}
		Course price: \t${this.price}
		Number of exercises: \t${this.numOfExercises}
		Course description: 
		${this._summary}`;
	};

	set summary(text){
		this._summary = text;
	};

};

class TheoreticalCourse extends Course {
	#theoreticalDescription = '';

	constructor(t, l , p, s, thD = ''){
		super(t, l , p, s);
		this.theoreticalDescription = thD;
	};

	get theoreticalDescription(){
		return this.#theoreticalDescription;
	};

	set theoreticalDescription(thD){
		this.#theoreticalDescription = thD;
	}

	publish(){
		console.log(this.theoreticalDescription);
	}
};

const climbingCourse = new Course('Sport climbing for beginners.', 30, 150, 'This is an initial climbing course.');
const alpineCourse = new Course('Alpine climbing course.', 30, 250, 'This is an advanced alpine climbing course.');

console.log(climbingCourse);
console.log(climbingCourse.priceLength().toFixed(2));
console.log(climbingCourse.summary);
console.log(alpineCourse);
console.log(alpineCourse.priceLength().toFixed(2));
console.log(alpineCourse.summary);

console.log('\n\n');
const practicalClimbingCourse = new PracticalCourse('Practical sport climbing course for beginners.', 30, 150, 20);
console.log(practicalClimbingCourse);
console.log(practicalClimbingCourse.priceLength().toFixed(2));
console.log(practicalClimbingCourse.summary);

const theoreticalClimbingCourse = new TheoreticalCourse(
					'Theoretical sport climbing course for beginners.', 
					15, 
					50, 
					'This is a theoretical climbing course',
					'This is just some theory to be learned.'
					);

console.log(theoreticalClimbingCourse);
console.log(theoreticalClimbingCourse.priceLength().toFixed(2));
console.log(theoreticalClimbingCourse.summary);
theoreticalClimbingCourse.publish();