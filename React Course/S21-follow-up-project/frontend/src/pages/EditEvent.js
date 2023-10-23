import React from 'react';
import { useRouteLoaderData } from 'react-router-dom';

import EditForm from '../components/EventForm';


function EditEventPage() {
	const data = useRouteLoaderData('event-detail');
	const event = data.event;
	
	return (
		<React.Fragment>
			<EditForm method="patch" event={event}/>
		</React.Fragment>
	);
}

export default EditEventPage;