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

function sumOfSums(n) {
	function s(n){
		return BigInt((BigInt(n)**2n+BigInt(n))/2n);
	};
	function z(n){
		return BigInt( (BigInt(n)*(BigInt(n)+1n)*(BigInt(n)+2n))/6n);
	};
	return s(z(n));
  }
console.log(sumOfSums(3));
console.log(sumOfSums(4));
console.log(sumOfSums(5));



const ML = 1000000007n;
const COMB_REFS = {};

function legoBlocks(n, m) {
    const combs = [0n, 1n, 2n, 4n, 8n];
    const totals = [0n]; // 0^n 1^n 2^n ... m^n
    const results = [0n];
    for (let i=1; i<=m; i++) {
        if (i >= 5) {
            if (COMB_REFS[i] !== undefined) {
                combs[i] = COMB_REFS[i];
            } else {
                combs[i] = (combs[i-1] + combs[i-2] + combs[i-3] + combs[i-4]) % ML;
                COMB_REFS[i] = combs[i];
            }
        }
        totals[i] = 1n;
        for (let j=1; j<=n; j++) {
            totals[i] *= combs[i];
            totals[i] %= ML;
        }
        results[i] = totals[i];
    }
    for (let i=1; i<totals.length; i++) {
        for (let j=1; j<=i; j++) {
            results[i] += ML; // IMPORTANT!!! So the subtract below never be negative
            results[i] -= (results[j]*totals[i-j]) % ML;
        }
    }
    return results[m] % ML;
}


