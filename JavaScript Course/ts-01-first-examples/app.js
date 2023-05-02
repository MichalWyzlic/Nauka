var num1Input = document.getElementById('num1');
var num2Input = document.getElementById('num2');
var buttonEl = document.querySelector('button');
function add(a, b) {
    return a + b;
}
function printResults(result, printMode) {
    if (printMode === 'console') {
        console.log(result);
    }
    if (printMode === 'alert') {
        alert(result);
    }
}
var results = [];
buttonEl.addEventListener('click', function () {
    var num1 = Number(num1Input.value);
    var num2 = Number(num2Input.value);
    var result = add(num1, num2);
    var resultContainer = {
        res: result,
        print: function () {
            console.log(this.res);
        }
    };
    results.push(resultContainer);
    results[results.length - 1].print();
    printResults(result, 'alert');
});
