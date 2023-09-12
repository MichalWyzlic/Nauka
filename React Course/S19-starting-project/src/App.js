import React from 'react';
import { useSelector } from 'react-redux';

import Counter from './components/Counter';
import Header from './components/Header';
import Auth from './components/Auth';


import UserProfile from './components/UserProfile';

function App() {
	const userAuthenticated = useSelector((state) => state.auth.isAuthenticated);

	return (
		<React.Fragment>
			<Header/>
			{!userAuthenticated && <Auth />}
			{userAuthenticated && <UserProfile/>}
			<Counter />
		</React.Fragment>
	);
}

export default App;
