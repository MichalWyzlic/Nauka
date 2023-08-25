import React, { useState } from 'react';
import Button from './components/UI/Button/Button';
import DemoOutput from './components/UI/Button/Demo/DemoOutput';

import './App.css';

function App() {
	const [togglePragraph, setTogglePragraph] = useState(false);

	const togglePragraphHandler = React.useCallback(() => {
		setTogglePragraph((prevStateValue) => !prevStateValue);
	}, []);

	return (
		<div className='app'>
			<h1>Hi there!</h1>
			<DemoOutput show={togglePragraph}/>
			<Button onClick={togglePragraphHandler}>Toggle paragraph</Button>
		</div>
	);
}

export default App;
