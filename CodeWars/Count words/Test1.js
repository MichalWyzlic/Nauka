// function wordCount(s) {
// 	let tempStr = ' ' + s.toLowerCase().replace(/[^a-z]/g, ' ') + ' ';
// 	tempStr = tempStr.replace(/\s+/g, ' ');
// 	tempStr = tempStr.replace(/( (a\s*)+ )|( (the\s*)+ )|( (on\s*)+ )|( (of\s*)+ )|( (upon\s*)+ )|( (in\s*)+ )/g, ' ');
// 	tempStr = tempStr.replace(/( (as\s*)+ )|( (at\s*)+ )/g, ' ');
// 	tempStr = tempStr.replace(/^\s+/g, '');
// 	tempStr = tempStr.replace(/\s+$/g, '');
// 	const strArray = tempStr.split(' ');
// 	console.log(tempStr);
// 	return strArray.length;
// }

function wordCount(s) {
	let tempStr = s.toLowerCase().replace(/[^a-z]/g, ' ');
	tempStr = tempStr.replace(/\s+/g, ' ');
	tempStr = tempStr.replace(/^\s+/g, '');
	tempStr = tempStr.replace(/\s+$/g, '');
	let counter = 0;
	const strArray = tempStr.split(' ');
	for (let i = 0; i < strArray.length; i++) {
		let char = strArray[i];
		if (
			strArray[i] !== 'a' &&
			strArray[i] !== 'the' &&
			strArray[i] !== 'on' &&
			strArray[i] !== 'of' &&
			strArray[i] !== 'upon' &&
			strArray[i] !== 'in' &&
			strArray[i] !== 'as' &&
			strArray[i] != 'at'
		) {
			counter++;
		}
	}
	return counter;
}

let longText =
	'I’d been using my sphere as a stool. I traced counterclockwise circles on it with my fingertips and it shrank until I could palm it. My bolt had shifted while I’d been sitting. I pulled it up and yanked the pleats straight as I careered around tables, chairs, globes, and slow-moving fraas. I passed under a stone arch into the Scriptorium. The place smelled richly of ink. Maybe it was because an ancient fraa and his two fids were copying out books there. But I wondered how long it would take to stop smelling that way if no one ever used it at all; a lot of ink had been spent there, and the wet smell of it must be deep into everything.';

console.log(
	'I d been using my sphere stool I traced counterclockwise circles it with my fingertips and it shrank until I could palm it My bolt had shifted while I d been sitting I pulled it up and yanked pleats straight I careered around tables chairs globes and slow moving fraas I passed under stone arch into Scriptorium place smelled richly ink Maybe it was because an ancient fraa and his two fids were copying out books there But I wondered how long it would take to stop smelling that way if no one ever used it all lot ink had been spent there and wet smell it must be deep into everything'.split(
		' '
	).length
);
console.log(
	'i d been using my sphere stool i traced counterclockwise circles it with my fingertips and it shrank until i could palm it my bolt had shifted while i d been sitting i pulled it up and yanked pleats straight i careered around tables chairs globes and slow moving fraas i passed under stone arch into scriptorium place smelled richly ink maybe it was because an ancient fraa and his two fids were copying out books there but i wondered how long it would take to stop smelling that way if no one ever used it all lot ink had been spent there and wet smell it must be deep into everything'.split(
		' '
	).length
);

console.log(wordCount('hello there')); // 2)
console.log(wordCount('hello there and a hi')); // 4)
console.log(wordCount("I'd like to say goodbye")); // 6)
console.log(wordCount('Slow-moving user6463 has been here')); // 6)
console.log(wordCount('%^&abc!@# wer45tre')); // 3)
console.log(wordCount('abc123abc123abc')); // 3)
console.log(wordCount('Really2374239847 long ^&#$&(*@# sequence')); // 3)
console.log(wordCount(longText)); // 3)
//i d been using my sphere stool i traced counterclockwise circles it with my fingertips and it shrank until i could palm it my bolt had shifted while i d been sitting i pulled it up and yanked pleats straight i careered around tables chairs globes and slow moving fraas i passed under stone arch into scriptorium place smelled richly ink maybe it was because an ancient fraa and his two fids were copying out books there but i wondered how long it would take to stop smelling that way if no one ever used it all lot ink had been spent there and wet smell it must be deep into everything
//I d been using my sphere stool I traced counterclockwise circles it with my fingertips and it shrank until I could palm it My bolt had shifted while I d been sitting I pulled it up and yanked pleats straight I careered around tables chairs globes and slow moving fraas I passed under stone arch into Scriptorium place smelled richly ink Maybe it was because an ancient fraa and his two fids were copying out books there But I wondered how long it would take to stop smelling that way if no one ever used it all lot ink had been spent there and wet smell it must be deep into everything
