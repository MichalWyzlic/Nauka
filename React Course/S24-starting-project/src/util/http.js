import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient();

export async function fetchEvents({signal, searchTerm}) {
	let url = 'http://localhost:3000/events';
	
	if(searchTerm){
		url += '?search=' + searchTerm;
	}

	const response = await fetch(url, {signal: signal});

	if (!response.ok) {
		const error = new Error('An error occurred while fetching the events');
		error.code = response.status;
		error.info = await response.json();
		throw error;
	}

	const { events } = await response.json();

	return events;
}

export async function createNewEvent(eventData){
	let url = 'http://localhost:3000/events';
	const response = await fetch(url, {
		method: 'POST',
		body: JSON.stringify(eventData),
		headers: {
			'Content-Type': 'application/json'
		}
	});

	if(!response.ok){
		const error = new Error('An error has occurred while creating the event!');
		error.code = response.status;
		error.info = await response.json();
		throw error;
	}

	const {event} = await response.json();

	return event;
}

export async function fetchSelectableImages({ signal }){
	let url = 'http://localhost:3000/events/images';
	const response = await fetch(url, {signal});

	if(!response.ok){
		const error = new Error('An error has occurred while fetching the images!');
		error.code = response.status;
		error.info = await response.json();
		throw error;
	}

	const {images} = await response.json();

	return images;
}

export async function fetchEvent({id, signal}){
	let url = `http://localhost:3000/events/${id}`;
	const response = await fetch(url, {signal});

	if(!response.ok){
		const error = new Error(`An error has occurred while fetching the event ${id}!`);
		error.code = response.status;
		error.info = await response.json();
		throw error;
	}

	const {event} = await response.json();

	return event;
}

export async function deleteEvent({id}){
	let url = `http://localhost:3000/events/${id}`;
	const response = await fetch(url, {method: 'DELETE'});

	if(!response.ok){
		const error = new Error(`An error has occurred while deleting the event ${id}!`);
		error.code = response.status;
		error.info = await response.json();
		throw error;
	}

	const {event} = await response.json();

	return event;
}

