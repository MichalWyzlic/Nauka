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
	#mainDisplay;
	#supportDisplay;
	//Possible states 'number1', 'dotNumber1', 'number2', 'dotNumber2', 'operator', 'result'
	#state = 'number1';
	#number1 = '';
	#number2 = '';
	#operator = '';
	#memory = '';
	lastResult = undefined;

	constructor(){
		this.#keyPad = new Keypad(this.checkInputHandler.bind(this));
		this.#keyPad.addListeners();
		this.#mainDisplay = document.getElementById('main-display-line');
		this.#supportDisplay = document.getElementById('support-display-line');
	};

	calculate(){
		let n1 = Number(this.#number1);
		let n2 = Number(this.#number2);
		switch(this.#operator){
			case 'div' :
				this.lastResult = n1 / n2;
				break;
			case 'mul' :
				this.lastResult = n1 * n2;
				break;
			case 'plus' :
				this.lastResult = n1 + n2;
				break;
			case 'min' :
				this.lastResult = n1 - n2;
				break;				
		};
		this.updateDisplay(this.lastResult.toString());
	};

	updateDisplay(str){
		this.#mainDisplay.innerHTML = str;
	};
	
	checkInputHandler(key){
		let rgKey = new RegExp(/^key\-/);
		let str = key.replace(rgKey, '');
		if(str ==='ac'){
			this.#number1 = '';
			this.#number2 = '';
			this.#state = 'number1';
			this.#memory = 0;
			this.updateDisplay('0');
			return;
		} else if(str ==='c'){
			this.#number1 = '';
			this.#number2 = '';
			this.#state = 'number1';
			this.updateDisplay('0');
			return;
		} else if(str ==='mc'){
			this.#memory = '';
			return;
		};

		switch(this.#state){
			case 'number1': 
			case 'dotNumber1':
				if(str === 'mr' && this.#memory !== ''){
					this.#number1 = this.#memory.toString();
					if(Math.floor(this.#memory) !== this.#memory){
						this.#state = 'dotNumber1';
					} else {
						this.#state = 'number1';
					};
				} else if(str >= 0 && str <= 9){
					this.#number1 += str;
				} else if(str ==='dot' && this.#state !=='dotNumber1'){
					this.#number1 += '.';
					this.#state = 'dotNumber1'
				} else if (this.#number1.length > 0){
					if(str === 'mmin'){
						if(this.#memory === ''){
							this.#memory = - Number(this.#number1);
						} else {
							this.#memory -= Number(this.#number1);
						};
					} else if(str === 'mplus'){
						if(this.#memory === ''){
							this.#memory = Number(this.#number1);
						} else {
							this.#memory += Number(this.#number1);
						};
					} else if(str === 'ce'){
						this.#number1 = '';
						this.#state = 'number1';
					} else if(str !== 'equ'){
						this.#operator = str;
						this.#state = 'operator';
					};
				} else {
					break;
				};
				this.updateDisplay(this.#number1);
				break;

			case 'number2': 
			case 'dotnumber2':
				if(str === 'mr' && this.#memory !== ''){
					this.#number2 = this.#memory.toString();
					if(Math.floor(this.#memory) !== this.#memory){
						this.#state = 'dotNumber2';
					} else {
						this.#state = 'number2';
					};
				} else if(str >= 0 && str <= 9){
					this.#number2 += str;
				} else if(str ==='dot' && this.#state !=='dotnumber2'){
					this.#number2 += '.';
					this.#state = 'dotnumber2'
				} else if (this.#number2.length > 0){
					if(str === 'mmin'){
						if(this.#memory === ''){
							this.#memory = - Number(this.#number2);
						} else {
							this.#memory -= Number(this.#number2);
						};
					} else if(str === 'mplus'){
						if(this.#memory === ''){
							this.#memory = Number(this.#number2);
						} else {
							this.#memory += Number(this.#number2);
						};
					} else if(str === 'ce'){
						this.#number2 = '';
						this.#state = 'number2';
					} else if(str === 'equ'){
						this.calculate();
						this.#state = 'number1';
						break;
					} else if (str === 'div' || 
								str === 'mul' || 
								str === 'min' ||
								str === 'plus'){
						this.calculate();
						this.#number1 = this.lastResult.toString();
						this.#operator = str;	
						break;				
					};
				}else {
					break;
				};
				this.updateDisplay(this.#number2);
				break;


			case 'operator':
				if(str === 'mr' && this.#memory !== ''){
					this.#number2 = this.#memory.toString();
					if(Math.floor(this.#memory) !== this.#memory){
						this.#state = 'dotNumber2';
					} else {
						this.#state = 'number2';
					};
				} if(str === 'mmin'){
					if(this.#memory === ''){
						this.#memory = - Number(this.#number1);
					} else {
						this.#memory -= Number(this.#number1);
					};
				} else if(str === 'mplus'){
					if(this.#memory === ''){
						this.#memory = Number(this.#number1);
					} else {
						this.#memory += Number(this.#number1);
					};
				} else if(str >= 0 && str <= 9){
					this.#number2 = str;
					this.#state = 'number2';
				} else if(str ==='dot' && this.#state !=='dotnumber2'){
					this.#number2 += '.';
					this.#state = 'dotnumber2'
				} else if (str === 'div' || 
							str === 'mul' ||
							str === 'min' || 
							str === 'plus'){
					this.#operator = str;	
					break;				
				};
				this.updateDisplay(this.#number2);
				break;

		};

	};

};

// App.init();


//Main application 
const calculator = new Calculator();



