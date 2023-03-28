import { Modal } from './UI/Modal';
import { Map } from './UI/Map';
import { getCoordsFromAddress } from './Utility/Location';

class PlaceFinder{
	constructor(){
		const addressForm = document.querySelector('form');
		const locateUserBtn = document.getElementById('locate-btn');

		locateUserBtn.addEventListener('click', this.locateUserHandler.bind(this));
		addressForm.addEventListener('submit', this.findAddressHandler.bind(this));
	};

	selectPlace(coordinates){
		if(this.map){
			this.map.render(coordinates);
		} else {
			this.map = new Map(coordinates);
		};
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
			this.selectPlace(coordinates);
		}, error => {
			alert('Could not locate you, please enter the address manually!');
			modal.hide();
		});
	};

	findAddressHandler(event){
		event.preventDefault();
		const address = event.target.querySelector('input').value;
		if(!address || address.trim().length ===0){
			alert('Invalid address. Enter a valid one.')
			return;
		};

		const modal = new Modal('loading-modal-content', 'Loading location, please wait.');
		modal.show();
		
		getCoordsFromAddress(address).then(result => {
			console.log('findAddessHandler result '+result);
			const coordinates = result;
			console.log(coordinates);
			modal.hide();
			this.selectPlace(coordinates);

		}, error => {
			alert('Could not get the position form given address.');
			modal.hide();
		});

	};
};

new PlaceFinder();