import React from 'react';
import { useRouteError } from 'react-router-dom';
import MainNavigation from '../components/MainNavigation';
import PageContent from '../components/PageContent';
function ErrorPage() {
	const error = useRouteError();
	//console.log(error);

	let title = 'An error occurred!';
	let message = 'Something went wrong';

	if (error.status === 500) {
		message = error.data.message;
	}

	if (error.status === 404) {
		title = 'Not found';
		message = 'The page does not exist.';
	}

	return (
		<React.Fragment>
			<MainNavigation />
			<PageContent title={title}>
				<p>{message}</p>
			</PageContent>
		</React.Fragment>
	);
}

export default ErrorPage;
