import React, {useState} from 'react';

const CodeContext = React.createContext({
	inputCode: '',
	gettersAndSetter: '',
	convert: () => {}
});

export function CodeContextProvider(props) {

	function onSubmitHandler(codeInput, event){

	}

	return (
		<CodeContext.Provider
			value={{
				inputCode: '',
				gettersAndSetter: ''
			}}
		>
			{props.children}
		</CodeContext.Provider>
	);
}

export default CodeContext;
