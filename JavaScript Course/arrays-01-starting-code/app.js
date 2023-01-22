// const hobbies = ['Sports', 'Movies'];
// hobbies.push('Reading');
// hobbies.unshift('Coding');
// console.log(hobbies);
// hobbies.pop();
// console.log(hobbies);
// hobbies.shift();
// console.log(hobbies);

// hobbies.splice(1, 0, 'Good food.');
// console.log(hobbies);

// const results = [1, 2.5, 3, 4.2, 15]
// const newResults = results.slice(0,3);

// results.push(5.22);
// console.log(results,newResults)

// const nameFragments = ['Max', 'Schwartz'];
// const name1 = nameFragments.join(' ');
// console.log(name1);

// const copiedNameFragments = [...nameFragments];
// nameFragments.push('Mr');
// console.log(nameFragments, copiedNameFragments);

// const persons = [{name: 'Max', age: 30}, {name: 'Manuel', age: 31}];
// const copiedPersons = [...persons];
// persons.push({name: 'Tom', age: 15});
// persons[0].age = 44;

// console.log(persons, copiedPersons);

const nameFragments = ['Max', 'Schwarz', 'Mr', 30];
const [firstName, lastName, ...otherInformation] = nameFragments;
console.log(firstName, lastName, otherInformation);

