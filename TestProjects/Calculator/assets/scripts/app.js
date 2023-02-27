class App {
	static init() {
		const keyPad = new Keypad();
		keyPad.addListeners();
	};
}


class Keypad{
	operator = '';
	memory = 0;
	lastValue = 0;


	constructor(){
		this.keyboardPad = document.getElementById('pad');
	};

	keyClickHandler(event){
		switch(event.id){
			case 'key-0', 'key-1','key-2',
					'key-3','key-4','key-5',
					'key-6','key-7','key-8',
					'key-9':
					
				
			
			case : 
		}
		console.log(event);
	};

	addListeners(){		
		this.keyboardPad.addEventListener('click', this.keyClickHandler.bind(this));
	};
	
};

App.init();