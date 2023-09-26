import React from 'react';
import Header from './components/Header';
import VariableInput from './components/VariablesInput';
import CodeOutput from './components/CodeOutput';



function App() {
	const appTitle = 'Structured Text getters and setters generator'
	const version = '1.0.0';
	return (
		<React.Fragment>
			<Header title={appTitle} version={version}/>
			<VariableInput title="Put your variables here."/>
			<CodeOutput title="Resulting code:"/>
		</React.Fragment>
	);
}

export default App;
