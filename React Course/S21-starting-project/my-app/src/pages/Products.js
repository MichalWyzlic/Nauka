import React from 'react';
import { Link } from 'react-router-dom';

function ProductsPage() {
	return (
		<React.Fragment>
			<h1>The Products Page</h1>
			<p>
				Go back to <Link to='../'>the maine page</Link>
			</p>
		</React.Fragment>
	);
}

export default ProductsPage;
