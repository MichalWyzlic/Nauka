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
    const logEntry = {
        operation: operator,
        prevResult: resultBeforeCalc,
        number: calcNumber,
        result: result
    };
    logEntries.push(logEntry);
    console.log(logEntries[logEntries.length-1]);
}

function writeToLog(operator, result, resultBeforeCalc, calcNumber){
    const logEntry = {
        operation: operator,
        prevResult: resultBeforeCalc,
        number: calcNumber,
        result: result
    };
    logEntries.push(logEntry);
    console.log(logEntries[logEntries.length-1]);
}

function add(){
    const enteredNumber = getUserNumberInput();
    const initialResult = currentResult;
    currentResult += enteredNumber;

    createAndWriteOutput("+", currentResult, initialResult, enteredNumber);
    writeToLog("+", currentResult, initialResult, enteredNumber);
 
}

function subtract(){
    const enteredNumber = getUserNumberInput();
    const initialResult = currentResult;
    currentResult -= enteredNumber;
    createAndWriteOutput("-", currentResult, initialResult, enteredNumber);
    writeToLog("-", currentResult, initialResult, enteredNumber);
}

function multiply(){
    const enteredNumber = getUserNumberInput();
    const initialResult = currentResult;
    currentResult *= enteredNumber;
    createAndWriteOutput("*", currentResult, initialResult, enteredNumber);
    writeToLog("*", currentResult, initialResult, enteredNumber);
}


function divide(){
    const enteredNumber = getUserNumberInput();
    const initialResult = currentResult;
    currentResult /= enteredNumber;
    createAndWriteOutput("/", currentResult, initialResult, enteredNumber);
    writeToLog("/", currentResult, initialResult, enteredNumber);
}


addBtn.addEventListener("click", add);
subtractBtn.addEventListener("click", subtract);
multiplyBtn.addEventListener("click", multiply);
divideBtn.addEventListener("click", divide);






