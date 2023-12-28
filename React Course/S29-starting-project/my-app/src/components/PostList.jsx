import React from 'react';
import { useLoaderData } from 'react-router-dom';
import Post from './Post';

import classes from './PostList.module.css';

const initialPosts = [
	{ author: 'Michal', body: 'This is post 1, body' },
	{ author: 'Ania', body: 'This is post 2, body' },
	{ author: 'Joasia', body: 'This is post 3, body' },
	{ author: 'Julia', body: 'This is post 4, body' }
];

function PostList(props) {
	const posts = useLoaderData();
	
	return (
		<>
			{posts.length > 0 && (
				<ul className={classes['posts']}>
					{posts &&
						posts.map((item, index) => (
							<Post
								key={item.id}
								author={item.author}
								body={item.body}
								id={item.id}
							/>
						))}
				</ul>
			)}
			{posts.length === 0 && (
				<div style={{textAlign: 'center'}}>
					<h2>There are no posts yet!</h2>
					<p>There are no posts to show.</p>
				</div>
			)}
		</>
	);
}

export default PostList;
