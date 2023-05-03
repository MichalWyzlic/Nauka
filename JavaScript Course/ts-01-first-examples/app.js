"use strict";
class User {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
}
const num1Input = document.getElementById('num1');
const num2Input = document.getElementById('num2');
const buttonEl = document.querySelector('button');
function add(a, b) {
    return a + b;
}
var OutputMode;
(function (OutputMode) {
    OutputMode[OutputMode["CONSOLE"] = 0] = "CONSOLE";
    OutputMode[OutputMode["ALERT"] = 1] = "ALERT";
})(OutputMode || (OutputMode = {}));
function printResults(result, printMode) {
    if (printMode === OutputMode.CONSOLE) {
        console.log(result);
    }
    if (printMode === OutputMode.ALERT) {
        alert(result);
    }
}
const results = [];
if (buttonEl) {
    buttonEl.addEventListener('click', () => {
        const num1 = Number(num1Input.value);
        const num2 = Number(num2Input.value);
        const result = add(num1, num2);
        const resultContainer = {
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
