import { RouterProvider, createBrowserRouter } from 'react-router-dom';

//Import pages section
import RootLayout from './pages/Root';
import ErrorPage from './pages/Error';
import HomePage from './pages/Home';
import EventsPage from './pages/Events';
import EventDetailPage from './pages/EventDetails';
import EditEventPage from './pages/EditEvent';
import NewEventPage from './pages/NewEvent';
import EventsRootLayout from './pages/EventsRoot';

const router = createBrowserRouter([
	{
		path: '/',
		errorElement: <ErrorPage />,
		element: <RootLayout />,
		children: [
			{ path: '', element: <HomePage />, errorElement: <ErrorPage /> },
			{
				path: 'events',
				element: <EventsRootLayout />,
				errorElement: <ErrorPage />,
				children: [
					{
						path: '',
						element: <EventsPage />,
						errorElement: <ErrorPage />,
						loader: async () => {
							const response = await fetch(
								'http://localhost:8080/events'
							);

							if (!response.ok) {
								//...
							} else {
								const resData = await response.json();
								return resData.events;
							}
						}
					},
					{ path: ':eventId', element: <EventDetailPage /> },
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
