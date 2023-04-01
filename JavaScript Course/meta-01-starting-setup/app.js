const uid = Symbol('uid');
console.log(uid);

const person = {
	[uid]: 'p1',
	name: 'Max',
	age: 30,
	[Symbol.toStringTag]: 'User'
};

const company = {
	curEmployee: 0,
	employees: ['Herve','Ania','James'],
	// next() {
	// 	if(this.curEmployee >= this.employees.length){
	// 		return { value: this.curEmployee, done: true};
	// 	};
	// 	const returnValue = {
	// 		value: this.employees[this.curEmployee],
	// 		done: false
	// 	};
	// 	this.curEmployee ++;
	// 	return returnValue;
	// },
	[Symbol.iterator]: function* employeeGenerator(){
		// let employee = company.next();

		// while(!employee.done){
		// 	yield employee.value;
		// 	employee = company.next();
		// };

		let currentEmployee = 0;
		while(currentEmployee < this.employees.length){
			yield this.employees[currentEmployee];
			currentEmployee ++;
		}
	}
};

// let employee = company.next();

// while(!employee.done){
// 	console.log(employee.value);
// 	employee = company.next();
// };

// const it = company.getEmployee();

// console.log(it.next());
// console.log(it.next());
// console.log(it.next());
// console.log(it.next());
// console.log(it.next());

for(const employee of company){
	console.log(employee);
};

console.log([...company]);

//------

const course = {
	title: 'JavaScript - The Complete Guide'
};

Reflect.setPrototypeOf(course, {toString() {return this.title}});
console.log(course.toString());

const courseHandler = {
	get(obj, propertyName) {
		console.log(propertyName);
		return obj[propertyName]; 

	}
};

const pCourse = new Proxy(course, courseHandler);
console.log(pCourse.title);