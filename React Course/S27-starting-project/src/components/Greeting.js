
import {useState} from 'react';

import Output from './Output';

function Greeting(){
	const [changedText, setChangedText] = useState(false);

	function changeTextHandler(){
		setChangedText(!changedText);
	}
	return (
		<div>
			<h2>Hello World</h2>
			{!changedText && <Output>It is good to see you!</Output>}
			{changedText && <Output>Changed!</Output>}
			<button onClick={changeTextHandler}>Change Text!</button>
		</div>
	);
};

export default Greeting;