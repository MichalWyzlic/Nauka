const testMatrix = [[1,2,3],[4,5,6]];

function toCamelCase(str){
	const testString = str.replace(/(\_+)|(\-+)/g, ' ').split(' ');
	let result = testString[0];
	for(let i = 1; i < testString.length; i++){
		result += testString[i].charAt(0).toUpperCase() + testString[i].slice(1);		
	};

	return result;
}

  

console.log(toCamelCase('the_stealth_warrior'));
//console.log(0%3, 1%3, 2%3, 3%3 );


