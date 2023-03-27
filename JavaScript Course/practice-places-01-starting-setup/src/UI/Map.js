export class Map{
	constructor(cords){
		// this.coordinates = cords;
		this.render(cords);
	};

	render(coordinates) {
		if(!google){
			alert('Google maps are not available1');
			return;
		};

		const map = new google.maps.Map(document.getElementById('map'), {
			center: coordinates,
			zoom: 16
		});

		new google.maps.Marker({
			position: coordinates,
			map: map
		});

	}
};