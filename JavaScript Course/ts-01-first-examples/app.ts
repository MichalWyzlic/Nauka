class User {
	name: string;
	age: number;
	constructor(name: string, age: number) {
		this.name = name;
		this.age = age;
	}
}

const num1Input = document.getElementById('num1') as HTMLInputElement;
const num2Input = <HTMLInputElement>document.getElementById('num2');
const buttonEl = document.querySelector('button') as HTMLButtonElement;

function add(a: number, b: number): number {
	return a + b;
}
type PrintMode = 'console' | 'alert';
enum OutputMode {
	CONSOLE,
	ALERT
}

function printResults(result: number, printMode: OutputMode) {
	if (printMode === OutputMode.CONSOLE) {
		console.log(result);
	}
	if (printMode === OutputMode.ALERT) {
		alert(result);
	}
}
// const result = add(5, 3);
// console.log(result);

type CalculationResults = { res: number; print: () => void };

const results: CalculationResults[] = [];
if (buttonEl) {
	buttonEl.addEventListener('click', () => {
		const num1 = Number(num1Input.value);
		const num2 = Number(num2Input.value);
		const result = add(num1, num2);
		const resultContainer: CalculationResults = {
			res: result,
			print() {
				console.log(this.res);
			}
		};
		results.push(resultContainer);
		results[results.length - 1].print();
		printResults(result, OutputMode.ALERT);
	});
}
