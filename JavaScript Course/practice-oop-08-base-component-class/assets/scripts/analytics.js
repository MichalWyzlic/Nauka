
const intervalId = setInterval(() => {
	console.log('Sending analytics ...');},
	2000
);

let analyticsButton = document.getElementById('stop-analytics-btn');
// const cloneButton = analyticsButton.cloneNode(true);
// analyticsButton.replaceWith(cloneButton);
analyticsButton.addEventListener(
	'click', 
	() => {
		clearInterval(intervalId);
		console.log('Sending analytics blocked');
	}
);