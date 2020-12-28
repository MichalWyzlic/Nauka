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


function divide(){b
    const enteredNumber = getUserNumberInput();
    const initialResult = currentResult;
    currentResult /= enteredNumber;

    createAndWriteOutput("/", currentResult, initialResult, enteredNumber);
}


addBtn.addEventListener("click", add);
subtractBtn.addEventListener("click", subtract);
multiplyBtn.addEventListener("click", multiply);
divideBtn.addEventListener("click", divide);






