import React from 'react';
import {json, redirect} from 'react-router-dom';

import EventForm from '../components/EventForm';



function NewEventPage() {
	return (
		<React.Fragment>
			<EventForm method="post"/>
		</React.Fragment>
	);
}

export default NewEventPage;
