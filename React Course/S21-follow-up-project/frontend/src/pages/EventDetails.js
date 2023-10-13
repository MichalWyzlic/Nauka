import React from 'react';
import { useLoaderData, useParams, json } from 'react-router-dom';

import EventItem from '../components/EventItem';

export async function loader({request, params}){
	const id = params.eventId;

	const response= await fetch(`http://localhost:8080/events/${id}`);

	if (!response.ok) {
		throw json({ message: 'Could not fetch the event ' + id + '.'  }, { status: 500 });
	} else {
		return response;
	}

};


function EventDetailsPage() {
	const params = useParams();
	const loaderData = useLoaderData();

	return (
		<EventItem event={loaderData.event}/>	
	);
}

export default EventDetailsPage;
