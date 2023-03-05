'use strict'

//Define eumeration

function createEnum(values) {
	const enumObject = {};
	for (const val of values) {
		enumObject[val] = val;
	}
	return Object.freeze(enumObject);
};
	

const calcStates = new createEnum(['number1', 'dotNumber1', 'number2', 'dotNumber2', 'operator']);

class Keypad{

	constructor(passToUpper){
		this.keyboardPad = document.getElementById('pad');
		this.passToUpperHandler = passToUpper;
	};

	keyClickHandler(event){
		//expose the clicked element ID to the upper class
		this.passToUpperHandler(event.target.id);		
	};

	addListeners(){		
		this.keyboardPad.addEventListener('click', this.keyClickHandler.bind(this));
	};
	
};

class Calculator{
	inputArray = [];
	#keyPad;
	//Possible states 'number1', 'dotNumber1', 'number2', 'dotNumber2', 'operator'
	#state = 'number1';
	#number1 = '';
	#number2 = '';
	#operator = '';
	#memory = '';
	lastResult = undefined;

	constructor(){
		this.#keyPad = new Keypad(this.checkInputHandler.bind(this));
		this.#keyPad.addListeners();
	};

	updateDisplay(){

	};
	
	checkInputHandler(key){
		const rgKey = new RegExp(/^key\-/);
		str = key.replace(rgKey, '');
		if(str ==='ac'){
			this.#number1 = '';
			this.#number2 = '';
			this.#state = 'number1';
			this.#memory = 0;
			updateDisplay();
			return;
		} else if(str ==='c'){
			this.#number1 = '';
			this.#number2 = '';
			this.#state = 'number1';
			updateDisplay();
			return;
		} else if(str ==='mc'){
			this.#memory = '';
			return;
		};

		switch(state){
			case 'number1': 
			case 'dotNumber1':
				if(str === 'mr' && this.#memory !== ''){
					this.#number1 = this.#memory.toString();
				} else if(str >= 0 && str <= 9){
					this.#number1 += str;
				} else if(str ==='dot' && this.#state !=='dotNumber1'){
					this.#number1 += '.';
					this.#state = 'dotNumber1'
				} else if (this.#number1.length > 0){
					if(str === 'mmin'){
						if(this.#memory = ''){
							this.#memory = - Number(this.#number1);
						} else {
							this.#memory -= Number(this.#number1);
						};
					} else if(str === 'mplus'){
						if(this.#memory = ''){
							this.#memory = Number(this.#number1);
						} else {
							this.#memory += Number(this.#number1);
						};
					} else if(str === 'ce'){
						this.#number1 = '';
						this.#state = 'number1';
						};
					} else 

				}

			case 'key-1': 
			case 'key-2': 
			case 'key-3': 
			case 'key-4': 
			case 'key-5': 
			case 'key-6': 
			case 'key-7': 
			case 'key-8': 
			case 'key-9':
					console.log(this.extractKey(key));
					break;
			case 'key-dot':
				console.log(this.extractKey(key));
				break; 
			case 'key-equ':
				console.log(this.extractKey(key));
				break; 
			case 'key-div': 
			case 'key-mul': 
			case 'key-min': 
			case 'key-plus':
				console.log(this.extractKey(key));
				break; 
			case 'key-c': 
			case 'key-ce': 
			case 'key-mc': 
			case 'key-mr':
			case 'key-mmin': 
			case 'key-mplus':
				console.log(this.extractKey(key));
				break; 

		}

	}

};

// App.init();


//Main application 
const calculator = new Calculator();



