import { Modal } from './UI/Modal';

class PlaceFinder{
	constructor(){
		const addressForm = document.querySelector('form');
		const locateUserBtn = document.getElementById('locate-btn');

		locateUserBtn.addEventListener('click', this.locateUserHandler);
		addressForm.addEventListener('submit', this.findAddressHandler);
	};

	locateUserHandler(){
		if (!navigator.geolocation){
			alert('Geolocation is not available in your browser. \nPlease enter the address manually');
			return;
		};
		const modal = new Modal('loading-modal-content', 'Loading location, please wait.');
		modal.show();
		navigator.geolocation.getCurrentPosition(successResult => {
			const coordinates = {
				lat: successResult.coords.latitude,
				lng: successResult.coords.longitude
			};
			console.log(coordinates);
			modal.hide();
		}, error => {
			alert('Could not locate you, please enter the address manually!');
			modal.hide();
		});
	};

	findAddressHandler(){
	};
};

new PlaceFinder();