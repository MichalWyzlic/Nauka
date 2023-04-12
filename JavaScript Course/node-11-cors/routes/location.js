const express = require('express');

const router = express.Router();

const locationStorage = {
	locations: []
};

router.post('/add-location', (req, res, next) => {
	const id = Math.random();
	locationStorage.locations.push({
		id: id,
		address: req.body.address,
		coords: { lat: req.body.lat, lng: req.body.lng }
	});
	res.json({ message: 'Stored location!', locId: id });
});

router.get('/location/:locId', (req, res, next) => {
	const locationId = +req.params.locId;
	const location = locationStorage.locations.find(loc => {
		return loc.id === locationId;
	});
	if(!location){
		return res.status(404).json({message: 'Not found'});
	}
	console.log(location);
	res.json({address: location.address, coordinates: location.coords})

});

module.exports = router;
