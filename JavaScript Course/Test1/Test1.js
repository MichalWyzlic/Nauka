const numbers = [1, 2, 15.22, 35, 4.99, 5.01, 7, 0.15, 13.02];
console.log(numbers);

const filteredNumbers = numbers.filter(value =>  value > 5 );
console.log(filteredNumbers);

numbers[3]= 15.33;
console.log(numbers);
console.log(filteredNumbers);

const newNumbers = numbers.map((value, index) => ({index: index, value: value}));
console.log(newNumbers);

const reducedArray = numbers.reduce((previousValue, currentValue) => previousValue * currentValue);
console.log(reducedArray);

function findMax(...listOfNumbers){
	return [Math.min(...listOfNumbers), Math.max(...listOfNumbers)];
};

const [arrayMin, arrayMax] = findMax(...numbers);
console.log(findMax(...numbers), arrayMin, arrayMax);

const listNoDuplicates = new Set(['Hi', 'it', 'is']);
console.log(listNoDuplicates.size);
listNoDuplicates.add('me');
console.log(listNoDuplicates.size);
listNoDuplicates.add('Hi');
console.log(listNoDuplicates.size);

listNoDuplicates.add('Michal.');
console.log(listNoDuplicates.size);

console.log(listNoDuplicates);
