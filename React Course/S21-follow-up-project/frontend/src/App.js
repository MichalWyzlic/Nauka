import { RouterProvider, createBrowserRouter } from 'react-router-dom';

//Import pages section
import RootLayout from './pages/Root';
import ErrorPage from './pages/Error';
import HomePage from './pages/Home';
import EventsPage, { loader as eventsLoader } from './pages/Events';
import EventDetailPage, {
	loader as eventDetailsLoader,
	action as deleteEventAction
} from './pages/EventDetails';
import EditEventPage from './pages/EditEvent';
import NewEventPage from './pages/NewEvent';
import EventsRootLayout from './pages/EventsRoot';
import {action as manipulateEventAction} from './components/EventForm';
import NewsletterPage, { action as newsletterAction } from './pages/Newsletter';

const router = createBrowserRouter([
	{
		path: '/',
		errorElement: <ErrorPage />,
		element: <RootLayout />,
		children: [
			{ path: '', element: <HomePage /> },
			{
				path: 'events',
				element: <EventsRootLayout />,
				//errorElement: <ErrorPage />,
				children: [
					{
						path: '',
						element: <EventsPage />,
						//errorElement: <ErrorPage />,
						loader: eventsLoader
					},
					{
						path: ':eventId',
						loader: eventDetailsLoader,
						id: 'event-detail',
						children: [
							{
								index: true,
								element: <EventDetailPage />,
								action: deleteEventAction								
							},
							{
								path: 'edit',
								element: <EditEventPage />,
								action: manipulateEventAction
							}
						]
					},
					{ path: 'new', element: <NewEventPage />, action: manipulateEventAction }
				]
			},
			{
			  path: 'newsletter',
			  element: <NewsletterPage />,
			  action: newsletterAction,
			},
		]
	}
]);

function App() {
	return <RouterProvider router={router} />;
}

export default App;
