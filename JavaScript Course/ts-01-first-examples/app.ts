const num1Input = document.getElementById('num1') as HTMLInputElement;
const num2Input = <HTMLInputElement>document.getElementById('num2');
const buttonEl = document.querySelector('button');

function add(a: number, b: number): number{
	return a + b;
}

function printResults(result: number, printMode: 'console' | 'alert'){
	if(printMode === 'console'){
		console.log(result);
	}
	if(printMode === 'alert'){
		alert(result);
	}
}
// const result = add(5, 3);
// console.log(result);

type CalculationResults = {res: number,  print: () => void};

const results: CalculationResults[]  = [];

buttonEl.addEventListener('click', () => {
	const num1 = Number(num1Input.value);
	const num2 = Number(num2Input.value);
	const result =	add(num1, num2);
	const resultContainer: CalculationResults = {
		res: result,
		print(){
			console.log(this.res);
		}
	}
	results.push(resultContainer);
	results[results.length-1].print();
	printResults(result, 'alert');
})