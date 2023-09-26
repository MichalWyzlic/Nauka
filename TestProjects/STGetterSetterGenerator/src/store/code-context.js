import React, {useState} from 'react';
import gettersSettersGenerator from '../utils/getters-setters-generator';

const CodeContext = React.createContext({
	inputCode: '',
	gettersAndSetters: '',
	convert: (codeInput) => {}
});

export function CodeContextProvider(props) {
	const [codeIn, setCodeIn] = useState('');
	const [codeOut, setCodeOut] = useState('');

	function convertCode(codeInput){
		setCodeIn(codeInput);
		setCodeOut(gettersSettersGenerator(codeInput));



	}

	return (
		<CodeContext.Provider
			value={{
				inputCode: codeIn,
				gettersAndSetters: codeOut,
				convert: convertCode
			}}
		>
			{props.children}
		</CodeContext.Provider>
	);
}

export default CodeContext;
