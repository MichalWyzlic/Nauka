import { RouterProvider, createBrowserRouter } from 'react-router-dom';

//Import pages section
import RootLayout from './pages/Root';
import ErrorPage from './pages/Error';
import HomePage from './pages/Home';
import EventsPage, { loader as eventsLoader } from './pages/Events';
import EventDetailPage, {
	loader as eventDetailsLoader
} from './pages/EventDetails';
import EditEventPage from './pages/EditEvent';
import NewEventPage from './pages/NewEvent';
import EventsRootLayout from './pages/EventsRoot';

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
						element: <EventDetailPage />,
						loader: eventDetailsLoader
					},
					{
						path: ':eventId/edit',
						element: <EditEventPage />
					},
					{ path: 'new', element: <NewEventPage /> }
				]
			}
		]
	}
]);

function App() {
	return <RouterProvider router={router} />;
}

export default App;
