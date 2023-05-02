//const myRegEx = new RegExp(/^(0*|1(((10)*0|1(01)*1)(01*0((01)*1|0(10)*0))*1))+$/);

const returnTo1 = `(0(0(10|11(001*0)*1)*0|1((001*0)*|1(10)*11)*1(10)*0))*`;
const returnTo2 = `((01)+|0(10)*00|1(001*0)*1(10)*(1|00))*`;
const returnTo3 = `(01*0(0|1(10|000|111|00(01)*11)*(110|0010|01)))*`;
const returnTo5 = `(1(10|000)*(11|001)|001*0)*`;
const pattern = `^(0|1${returnTo1}(1|(0${returnTo2}1${returnTo5}0))${returnTo3}1)+$`;
console.log(pattern);
const myRegEx = new RegExp(pattern);

let prev = 0;
for(let i = 0; i <10001; i++){
	if(myRegEx.test(i.toString(2))){
		if(i - prev != 7){
			console.log(i);
		}
		prev = i;
	};
}

