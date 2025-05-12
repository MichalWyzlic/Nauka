function prepareWeirdTable(bits){
	bits = bits >>> 0;
	/** index 0 - value at bit, 
	 * index 1 - maximum positive value
	 * index 2 - maximum negative value
	 */
	let table= [[1,1,0]]
	for(let i = 1; i < bits; i++){
		table.push([0,0,0]);
		table[i][0] = Math.pow(-2, i);
		if(table[i][0] > 0) {
			table[i][1] = table[i-1][1] + table[i][0];
			table[i][2] = table[i-1][2];
		} else {
			table[i][2] = table[i-1][2] + table[i][0];
			table[i][1] = table[i-1][1];
		}
	}
	return table;
}

console.log(prepareWeirdTable(34));