import React from 'react';
import { useParams, Link } from 'react-router-dom';

function ProductDetailPage() {
	const params = useParams();

	const path = params.productId;
	return (
		<React.Fragment>
			<h1>Product details</h1>
			<p>{path}</p>
			<p><Link to=".." relative="path">Back</Link></p>
		</React.Fragment>
	);
}

export default ProductDetailPage;
