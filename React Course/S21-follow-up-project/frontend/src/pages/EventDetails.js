import React, {Suspense} from 'react';
import {
	useRouteLoaderData,
	useParams,
	json,
	redirect,
	defer,
	Await
} from 'react-router-dom';

import EventItem from '../components/EventItem';
import EventsList from '../components/EventsList';

async function loadEvent(id) {
	//console.log(`LoadEvent ${id}`);
	const response = await fetch(`http://localhost:8080/events/${id}`);
	
	if (!response.ok) {
		throw json(
			{ message: 'Could not fetch the event ' + id + '.' },
			{ status: 500 }
		);
	} else {
		const resData = await response.json();
		//console.log(resData);
		return resData.event;
	}
}

async function loadEvents() {
	//console.log(`LoadEvents`);
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
		//console.log(resData);
		return resData.events;
	}
}

export async function loader({ request, params }) {
	const id = params.eventId;
	//console.log(id);

	return defer({
		event: loadEvent(id),
		events: loadEvents()
	});
}

export async function action({ request, params }) {
	const id = params.eventId;

	const response = await fetch(`http://localhost:8080/events/${id}`, {
		method: request.method
	});

	if (!response.ok) {
		throw json(
			{ message: 'Could not delete the event ' + id + '.' },
			{ status: 500 }
		);
	} else {
		return redirect('/events');
	}
}

function EventDetailsPage() {
	const params = useParams();
	const { event, events } = useRouteLoaderData('event-detail');
	// console.log(event);
	// console.log(events);

	return (
		<React.Fragment>
			<Suspense fallback={<p style={{textAlign: 'center'}}>Loading...</p>}>
			<Await resolve={event}>
				{(loadedEvent) => <EventItem event={loadedEvent} />}
			</Await>
			</Suspense>
			<Suspense fallback={<p style={{textAlign: 'center'}}>Loading...</p>}>
			<Await resolve={events}>
				{(loadedEvents) => <EventsList events={loadedEvents} />}
			</Await>
			</Suspense>
			
		</React.Fragment>
	);
}

export default EventDetailsPage;
