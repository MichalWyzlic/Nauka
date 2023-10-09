import React from 'react';
import { useParams } from 'react-router-dom';


function EventDetailsPage() {
	const params = useParams();

	return (
		<React.Fragment>
			<h1>{`Event ${params.eventId} details page`}</h1>			
		</React.Fragment>
	);
}

export default EventDetailsPage;