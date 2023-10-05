import React from 'react';
import { Link } from 'react-router-dom';

const productData = [
	{id: 'p1', title: 'Product 1'},
	{id: 'p2', title: 'Product 2'},
	{id: 'p3', title: 'Product 3'},
	{id: 'p4', title: 'Product 4'},
];

function ProductsPage() {
	return (
		<React.Fragment>
			<h1>The Products Page</h1>			
			<p>
				Go back to <Link to='..'>the maine page</Link>
			</p>
			<ul>
				{productData.map((item) => <li><Link to={item.id}>{item.title}</Link></li>)}				
			</ul>
		</React.Fragment>
	);
}

export default ProductsPage;
