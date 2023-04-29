const myRegEx = new RegExp(/^(0*|1(((10)*0|1(01)*1)(01*0((01)*1|0(10)*0))*1))+$/);

test 1 ^(0|1'powrot do 1'(?#1) (1'powrot do 3'(?#3) | 0(000)*(01)*'2'(0'4'((10)*|(11(001*0)*1)*)0
													|1'5'(11(01)*1|100((00(10)*0)*)))* 
					1'0'))+$

const from0to1 = 1;
const from1to3 = 1;
const returnTo1 = 00(?#4)((10|11(001*0)*1)*0)|01(001*0)*1(10|11(001*0)*1)*0(?#5)1;
const returnTo2 = 
let prev = 0;
for(let i = 0; i <10001; i++){
	if(myRegEx.test(i.toString(2))){
		if(i - prev != 7){
			console.log(i);
		}
		prev = i;
	};
}

