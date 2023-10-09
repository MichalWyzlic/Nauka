import React from "react";
import MainNavigation from "../components/MainNavigation";

function ErrorPage(){
	return (
		<React.Fragment>
			<main>
				<MainNavigation />
				<h1>An error occurred!</h1>
				<p>Page could not be found!</p>
			</main>
		</React.Fragment>
	);
};

export default ErrorPage;