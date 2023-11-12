import React from 'react';
import Link from 'next/link';

function NewsPage() {
	return (
		<>
			<h1>The News page</h1>
			<ul>
				<li>
					<Link href='/news/new-item1'>News item 1</Link>
				</li>
				<li>
					<Link href='/news/new-item2'>News item 2</Link>
				</li>
				<li>
					<Link href='/news/new-item3'>News item 3</Link>
				</li>
			</ul>
		</>
	);
}

export default NewsPage;
