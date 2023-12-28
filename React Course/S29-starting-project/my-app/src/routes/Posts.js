import React from 'react';

import './App.css';
import PostPostList from '../components/PostList';
import { Outlet } from 'react-router-dom';

function Posts() {
	return (
		<>
			<Outlet />
			<main className='Posts'>
				<PostPostList />
				{/* <TimePicker
				showSecond={false}
				defaultValue={now}
				className='xxx'
				onChange={onChange}
				format={format}
				use12Hours
				inputReadOnly
			/> */}
				,
			</main>
		</>
	);
}

export default Posts;

export async function loader() {
	const response = await fetch('http://localhost:8080/posts');
	const respData = await response.json();
	return respData.posts;
}
