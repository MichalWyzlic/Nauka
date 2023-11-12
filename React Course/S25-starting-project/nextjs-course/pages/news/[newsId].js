import React from 'react';
import { useRouter } from 'next/router';

function DetailsPage() {
	const router = useRouter();
	const itemId = router.query.newsId;
	console.log(router.query.newsId);
	return (
		<React.Fragment>
			<h1>The Details page</h1>
			<p>{itemId}</p>
		</React.Fragment>
	);
}

export default DetailsPage;
