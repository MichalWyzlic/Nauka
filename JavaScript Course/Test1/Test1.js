'use strict'

function ipv4Parser(ip, mask){
	//your code here
	const ipArray = ip.split('.');
	const maskArray = mask.split('.');
	const result = [[0,0,0,0],[0,0,0,0]];

	ipArray.forEach((element, index) => { 
		let negMask = ~Number(mask[index]);
		// let temp1 = Number(ipArray[index]);
		// let temp2 = Number(maskArray[index]);
		// let res = Number(ipArray[index]) & Number(maskArray[index]);
		result[0][index] = Number(ipArray[index]) & Number(maskArray[index]);
		result[1][index] = Number(ipArray[index]) & ~Number(maskArray[index]);		
	});
	result[0] = result[0].join('.');
	result[1] = result[1].join('.');

	return result;
  }

console.log(ipv4Parser('192.168.50.1'  , '255.255.255.0'));
console.log(ipv4Parser('192.168.50.129', '255.255.255.192'));
console.log(ipv4Parser('192.168.50.153', '255.255.255.224'));
console.log(ipv4Parser('65.196.188.53' , '0.0.0.0'));
