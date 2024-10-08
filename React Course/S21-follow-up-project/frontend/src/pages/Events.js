import React, { Suspense } from 'react';
import { useLoaderData, json, defer, Await } from 'react-router-dom';

import EventsList from '../components/EventsList';

async function loadEvents() {
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
		const resData = await response.json();
		return resData.events;
	}
}

export function loader() {
	return defer({
		events: loadEvents()
	});
}

function EventsPage() {
	const data = useLoaderData();
	const events = data.events;

	if (data.isError) {
		return <p>{data.message}</p>;
	}
	return (
		<Suspense fallback={<p style={{textAlign: 'center'}}>Loading...</p>}>
			<Await resolve={events}>
				{(loadedEvents) => {					
					return <EventsList events={loadedEvents} />;
				}}
			</Await>
		</Suspense>
	);
}

export default EventsPage;
