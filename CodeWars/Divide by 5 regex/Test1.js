const myRegEx = new RegExp(/^(0*|1(((10)*0|1(01)*1)(01*0((01)*1|0(10)*0))*1))+$/);

//^(0*|1(((10)*0|1(01)*1)+(01*0((01)*1|0(10)*0))*1))+$
//^(0*|1(((10)*0|1(01)*1)(01*0((01)*1|0(10)*0))*1))+$
//^(0+|(1(((10)*0|1(01)*1)(01*0((01)*1|0(10)*0))*1)+)+$
let prev = 0;
for(let i = 0; i <10001; i++){
	if(myRegEx.test(i.toString(2))){
		if(i - prev != 5){
			console.log(i);
		}
		prev = i;
	};
}

