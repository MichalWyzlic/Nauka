import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import NewPost, { action as sendPostAction } from './routes/NewPost';
import RootLayout from './routes/RootLayout';
import Posts, { loader as postsLoader } from './routes/Posts';
import PostDetails, {loader as postDetailsLoader} from './routes/PostDetails';

const router = createBrowserRouter([
	{
		path: '/',
		element: <RootLayout />,
		children: [
			{
				path: '',
				element: <Posts />,
				loader: postsLoader,
				children: [
					{
						path: 'create-new-post',
						element: <NewPost />,
						action: sendPostAction
					},
					{
						path: ':id',
						element: <PostDetails />,
						loader: postDetailsLoader
					}
				]
			}
		]
	}
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
