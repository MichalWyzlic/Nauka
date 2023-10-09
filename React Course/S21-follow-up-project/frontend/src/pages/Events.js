import React from 'react';
import { useLoaderData } from 'react-router-dom';

import EventsList from '../components/EventsList';

function EventsPage() {
	const events = useLoaderData();

	return (
		<React.Fragment>
			<EventsList events={events} />
		</React.Fragment>
	);
}

export default EventsPage;
