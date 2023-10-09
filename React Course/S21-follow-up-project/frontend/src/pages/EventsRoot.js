import React from "react";
import { Outlet } from "react-router-dom";
import EventsNavigation from '../components/EventsNavigation';


function EventsRootLayout(){
	return (
		<React.Fragment>
			<EventsNavigation/>
			<Outlet/>
		</React.Fragment>
	)
};

export default EventsRootLayout;