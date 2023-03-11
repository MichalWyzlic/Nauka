'use strict'
const button = document.querySelector('button');
const output = document.querySelector('p');

const getPosition = (opts) => {
	const promise = new Promise((resolve, reject) => {
		navigator.geolocation.getCurrentPosition(success => {
			resolve(success);
		}, error => {
			reject(error);
		}, opts);
	});

	return promise;
	
}

const setTimer = (duration) => {
	const promise = new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve('Done!');
		}, duration);
	});

	return promise;
};




async function trackUserHandler() {
	let posData;
	let timerData;
	try {		
		posData = await getPosition();
		timerData = await setTimer(2000);
	} catch(error){
		console.log(error);
	};
	console.log(timerData, posData);
	// 	.then(posData => {
	// 		positionData = posData;
	// 		return setTimer(2000);
	// 	})
	// 	.then(data => {
	// 		console.log(data, positionData);
	// 	})
	// 	.catch(err => {
	// 		console.log(err);
	// 	});
		
	// setTimer(1000).then(() => {
	// 	console.log('Timer done!');
	// });
	console.log('Getting the position...');
}

button.addEventListener('click', trackUserHandler);