'use strict';

class Bike{
	constructor(license){
		this.license = license;
	}
}

class Car{
	constructor(license){
		this.license = license;
	}
}

class Van{
	constructor(license){
		this.license = license;
	}
}

class ParkingLot {
	constructor(size) {
		this.parking = Array(size).fill('0').join(',');
		this.size = size;
	}
	park(vehicle) {
		// const regEx = new RegExp(`${vehicle.license}`,'g'); 
		// if(regEx.test(this.parking)){
		// 	return false;
		// };

		if(vehicle instanceof Bike){
			if(/0/.test(this.parking)){
				this.parking = this.parking.replace(/0/,`${vehicle.license}`);
				return true;
			} else {
				return false;
			}

		} else if(vehicle instanceof Car){
			if(/0,0/.test(this.parking)){
				this.parking = this.parking.replace(/0,0/,`${vehicle.license},${vehicle.license}`);
				return true;
			} else {
				return false;
			}

		}else if(vehicle instanceof Van){
			if(/0,0,0/.test(this.parking)){
				this.parking = this.parking.replace(/0,0,0/,`${vehicle.license},${vehicle.license},${vehicle.license}`);
				return true;
			} else {
				return false;
			}

		} else {
			return false;
		}
	}
	retrieve(license) {
		const parkingArray = this.parking.split(',');
		let result = false;
		parkingArray.forEach(function test(value, index, arr){
			if(value === license){
				arr[index] = 0;
				result = true;
			};
		});
		this.parking = parkingArray.join(',');

		return result;

		// const regEx = new RegExp(`${license}`,'g'); 
		// if(regEx.test(this.parking)){
		// 	this.parking = this.parking.replace(regEx,`0`);
		// 	return true;
		// } else {
		// 	return false;
		// }
	}
}



let testParking = new ParkingLot(4);
const bike1 = new Bike("BK-123");
const bike2 = new Bike("BK-456");
const bike3 = new Bike("BK-789");
const car1 = new Car("CR-123");
const car2 = new Car("CR-456");
const van1 = new Van("VN-123");
const van2 = new Van("VN-456");
console.log(testParking.park(bike1));
console.log(testParking.park(car1));
console.log(testParking.park(bike2))
console.log(testParking.park(van1));
console.log(testParking.retrieve(bike1.license));
console.log(testParking.retrieve(bike2.license));
console.log(testParking.park(car2));

//console.log(testParking.retrieve(bike1.license));
console.log(testParking.park(bike3));
console.log(testParking.park(car2));
console.log(testParking.park(van2));
// console.log(testParking.retrieve(car2.license));
// console.log(testParking.retrieve(van1.license));
// console.log(testParking.park(car2));

function NamedOne(first, last) {
	// -- SHOULD be changed --
	const _firstName = first;
	const _lastName = last;
	Object.defineProperty(this,"firstName",{
		get: function() { return _firstName; },
		set: function(fName) { 
			if(typeof _firstName === 'undefined'){
				_firstName = fName;
			}
		 }
	  });
	  Object.defineProperty(this,"lastName",{
		get: function() { return _lastName },
		set: function(lName) { 
			if(typeof _lastName === 'undefined'){
				_lastName = lName;
			}
		 }
	  });
	Object.defineProperty(this,"fullName",{
		get: function() { return _firstName + ' ' + _lastName; },
		set: function(fName) { 
			const tempArray = fName.split(' ');
			if(tempArray.length === 2 && typeof _firstName === 'undefined' && typeof _lastName === 'undefined'){
				_firstName = tempArray[0];
				_lastName = tempArray[1];
			}
		 }
	  });
	// this.fullName = this.firstName + ' ' + this.lastName;
}



let n;
n=new NamedOne('John', 'Doe');
console.log(n.firstName, n.lastName, n.fullName);
n.lastName = 'Wojdylo';
console.log(n.firstName, n.lastName, n.fullName);



