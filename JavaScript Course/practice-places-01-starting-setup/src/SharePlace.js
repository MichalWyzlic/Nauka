import { Modal } from './UI/Modal';
import { Map } from './UI/Map';
import { getCoordsFromAddress, getAddressFromCoords } from './Utility/Location';

class PlaceFinder {
	constructor() {
		const addressForm = document.querySelector('form');
		const locateUserBtn = document.getElementById('locate-btn');
		this.shareBtn = document.getElementById('share-btn');

		locateUserBtn.addEventListener(
			'click',
			this.locateUserHandler.bind(this)
		);
		this.shareBtn.addEventListener(
			'click',
			this.sharePlaceHandler.bind(this)
		);
		addressForm.addEventListener(
			'submit',
			this.findAddressHandler.bind(this)
		);
	}

	sharePlaceHandler() {
		const shareLinkInputElement = document.getElementById('share-link');
		if (!navigator.clipboard) {
			shareLinkInputElement.select();
			return;
		}

		navigator.clipboard
			.writeText(shareLinkInputElement.value)
			.then((response) => {
				alert('Copied into clipboard.');
			})
			.catch((err) => {
				console.log(err);
				shareLinkInputElement.select();
			});
	}

	selectPlace(coordinates, address) {
		if (this.map) {
			this.map.render(coordinates);
		} else {
			this.map = new Map(coordinates);
		}
		fetch('http://localhost:3000/add-location', {
			method: 'POST',
			body: JSON.stringify({
				address: address,
				lat: coordinates.lat,
				lng: coordinates.lng
			}),
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				console.log(data);
				const locationId = data.locId;
				this.shareBtn.disabled = false;
				const shareLinkInputElement =
					document.getElementById('share-link');
				shareLinkInputElement.value = `${
					location.origin
				}/my-place?location=${locationId}`;
			});
	}

	locateUserHandler() {
		if (!navigator.geolocation) {
			alert(
				'Geolocation is not available in your browser. \nPlease enter the address manually'
			);
			return;
		}
		const modal = new Modal(
			'loading-modal-content',
			'Loading location, please wait.'
		);
		modal.show();
		navigator.geolocation.getCurrentPosition(
			(successResult) => {
				const coordinates = {
					lat: successResult.coords.latitude,
					lng: successResult.coords.longitude
				};
				console.log(coordinates);

				getAddressFromCoords(coordinates).then(
					(result) => {
						const address = result;
						console.log(address);
						this.selectPlace(coordinates, address);
						modal.hide();
					},
					(error) => {
						alert('Could not get the address form given position.');
						modal.hide();
					}
				);
			},
			(error) => {
				alert(
					'Could not locate you, please enter the address manually!'
				);
				modal.hide();
			}
		);
	}

	findAddressHandler(event) {
		event.preventDefault();
		const address = event.target.querySelector('input').value;
		if (!address || address.trim().length === 0) {
			alert('Invalid address. Enter a valid one.');
			return;
		}

		const modal = new Modal(
			'loading-modal-content',
			'Loading location, please wait.'
		);
		modal.show();

		getCoordsFromAddress(address).then(
			(result) => {
				//console.log('findAddessHandler result '+result);
				const coordinates = result;
				//console.log(coordinates);
				modal.hide();
				this.selectPlace(coordinates, address);
			},
			(error) => {
				alert('Could not get the position form given address.');
				modal.hide();
			}
		);
	}
}

new PlaceFinder();
