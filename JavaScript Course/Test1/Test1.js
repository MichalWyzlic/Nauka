'use strict'

// function checkPalindrome(s){
// 	const len = Math.floor(s.length/2);
// 	const end = s.length-1;
// 	for(let i=0; i<len; i++){
// 		if(s.charAt(i) != s.charAt(end-i)){
// 			return false;
// 		}
// 	}
// 	return true;
// }

// function palindromeIndex(s) {
// 	let len = Math.floor(s.length/2);
// 	let end = s.length-1;
// 	//const even = len === s.length/2;
// 	let removed = -1;
// 	for(let i = 0; i < len; i ++){
// 		if(s.charAt(i) !== s.charAt(end-i)){
// 			if(removed !== -1){
// 				return -1;
// 			} else if(i > 0 && s.charAt(i-1) === s.charAt(i) && s.charAt(i) === s.charAt(end-i+1)) {
// 				//remove i-1
// 				removed = i-1;
// 				s = s.slice(0,i-1) + s.slice(i);
// 				len = Math.floor(s.length/2);
// 				end = s.length-1;
// 			}else if(s.charAt(i) === s.charAt(end-i-1)){
// 				//remove end-i
// 				removed = end-i;
// 				s = s.slice(0,end-i) + s.slice(end-i+1);
// 				len = Math.floor(s.length/2);
// 				end = s.length-1;
// 			} else if(s.charAt(i+1) === s.charAt(end-i)){
// 				//remove i
// 				removed = i;
// 				s = s.slice(0,i) + s.slice(i+1);
// 				len = Math.floor(s.length/2);
// 				end = s.length-1;
// 			} else {
// 				return -1;
// 			};
// 		};
// 	};
// 	return removed;
// };

// console.log(palindromeIndex('hgygsvlfwcwnswtuhmyaljkqlqjjqlqkjlaymhutwsnwcflvsgygh'));
// console.log(palindromeIndex('quyjjdcgsvvsgcdjjyq'));

// quyjjdcgsvvsgcdjjyq
// hgygsvlfwcwnswtuhmyaljkqlqjjqlqkjlaymhutwsnwcflvsgygh
// fgnfnidynhxebxxxfmxixhsruldhsaobhlcggchboashdlurshxixmfxxxbexhnydinfngf
// bsyhvwfuesumsehmytqioswvpcbxyolapfywdxeacyuruybhbwxjmrrmjxwbhbyuruycaexdwyfpaloyxbcpwsoiqtymhesmuseufwvhysb
// fvyqxqxynewuebtcuqdwyetyqqisappmunmnldmkttkmdlnmnumppasiqyteywdquctbeuwenyxqxqyvf
// mmbiefhflbeckaecprwfgmqlydfroxrblulpasumubqhhbvlqpixvvxipqlvbhqbumusaplulbrxorfdylqmgfwrpceakceblfhfeibmm
// tpqknkmbgasitnwqrqasvolmevkasccsakvemlosaqrqwntisagbmknkqpt
// lhrxvssvxrhl
// prcoitfiptvcxrvoalqmfpnqyhrubxspplrftomfehbbhefmotfrlppsxburhyqnpfmqlaorxcvtpiftiocrp
// kjowoemiduaaxasnqghxbxkiccikxbxhgqnsaxaaudimeowojk

// 1
// 8
// 33
// 23
// 24
// 43
// 20
// -1
// 14
// -1

// 1
// -1
// 33
// 23
// 24
// 43
// 20
// -1
// 14
// -1

function palindromeIndex(s) {
	const reversedS = s.split('').reverse().join('');
	let len = Math.floor(s.length / 2);
	let string1 = s.slice(0,len);
	let string2 = reversedS.slice(0,len);
	if(string1 === string2){
		return -1;
	};
	for(let i = 0; i < len; i++){
		if(string1.charAt(i) !== string2.charAt(i)){
			let temp1 = s.slice(0,i) + s.slice(i+1,len+1);
			if(temp1 === string2){
				return i;
			};
			temp1 = reversedS.slice(0,i) + reversedS.slice(i+1,len+1); 
			if(temp1 === string1){
				return s.length - 1 - i;
			};
			return -1;
		};
	}

	return undefined;
};


console.log(palindromeIndex('abcwddwcwba'))