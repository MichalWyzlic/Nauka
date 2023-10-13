import React from 'react';
import { useLoaderData, json } from 'react-router-dom';

import EventsList from '../components/EventsList';

export async function loader() {
	const response = await fetch('http://localhost:8080/events');

	if (!response.ok) {
		//return {isError: true, message: 'Could not fetch events.'};
		// throw new Response(
		// 	JSON.stringify({ message: 'Could not fetch events.' }),
		// 	{ status: 500 }
		// );
		//new Error('Could not fetch events.');
		throw json({ message: 'Could not fetch events.' }, { status: 500 });
	} else {
		return response;
	}
}

function EventsPage() {
	const data = useLoaderData();
	const events = data.events;

	if (data.isError) {
		return <p>{data.message}</p>;
	}
	return (
		<React.Fragment>
			<EventsList events={events} />
		</React.Fragment>
	);
}

export default EventsPage;
