//Function definition
const defaultValue = 0;
let currentResult = defaultValue;
let logEntries = [];

function getUserNumberInput(){
    return parseInt(userInput.value);
}

function createAndWriteOutput(operator, result, resultBeforeCalc, calcNumber){
    const calcDescription = `${resultBeforeCalc} ${operator} ${calcNumber}`;
    outputResult(result, calcDescription);
    logEntries.push(calcNumber);
    logEntries.push(operator);
    console.log(logEntries[logEntries.length-1], logEntries[logEntries.length-2]);
}

function add(){
    const enteredNumber = getUserNumberInput();
    const initialResult = currentResult;
    currentResult += enteredNumber;

    createAndWriteOutput("+", currentResult, initialResult, enteredNumber);
 
}

function subtract(){
    const enteredNumber = getUserNumberInput();
    const initialResult = currentResult;
    currentResult -= enteredNumber;
    
    createAndWriteOutput("-", currentResult, initialResult, enteredNumber);
}

function multiply(){
    const enteredNumber = getUserNumberInput();
    const initialResult = currentResult;
    currentResult *= enteredNumber;

    createAndWriteOutput("*", currentResult, initialResult, enteredNumber);
}


function divide(){
    const enteredNumber = getUserNumberInput();
    const initialResult = currentResult;
    currentResult /= enteredNumber;

    createAndWriteOutput("/", currentResult, initialResult, enteredNumber);
}

function calculate (operation) {
	const enteredNumber = getUserNumberInput();
	const initialResult = currentResult;
	let operator = '+';
    if (operation === 'add') {
		currentResult += enteredNumber;
		operator = '+';
	} else if (operation === 'sub') {
		currentResult -= enteredNumber;
		operator = '-';

	} else if (operation === 'mul') {
		currentResult *= enteredNumber;
		operator = '*';

	} else if (operation === 'div') {
		currentResult /= enteredNumber;
		operator = '/';
	}
	createAndWriteOutput(operator, currentResult, initialResult, enteredNumber);
    
}

addBtn.addEventListener("click", calculate.bind(this, 'add'));
subtractBtn.addEventListener("click", calculate.bind(this, 'sub'));
multiplyBtn.addEventListener("click", calculate.bind(this, 'mul'));
divideBtn.addEventListener("click", calculate.bind(this, 'div'));






