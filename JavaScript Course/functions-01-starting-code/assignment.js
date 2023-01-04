const sayHello = (name) => console.log(`Hi ` + name);


sayHello('Michal');

const sayHello2 = (name, greeting) => console.log(greeting + name);


const sayHello3 = () => console.log('Cześć Mysza');


const sayHello4 = (name) => 'Hi ' + name;

const sayHello5 = (name, greeting = 'Dzien dobry') => console.log(greeting + name);


const checkInput = (cb, ...strings) => strings.forEach(cb);


const callback = (myString) => {
	if (myString != ''){
		console.log(myString);	
	} else{
		console.log('I found an empty space');
	}	
}

const str3 = 'and';
checkInput(callback, 'me', '', 'myself', str3, 'I');
