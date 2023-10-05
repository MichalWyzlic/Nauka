import React from 'react';
import { Link, useNavigate } from 'react-router-dom';


function HomePage() {
	const navigate = useNavigate();

	function navigateHandler(){
		navigate('products');
	}

	return (
		<React.Fragment>
			<h1>My home page</h1>
			<p>
				Go to <Link to='products'>the list of products</Link>
			</p>
			<p>
				<button onClick={navigateHandler}>Navigate</button>
			</p>
		</React.Fragment>
	);
}

export default HomePage;
