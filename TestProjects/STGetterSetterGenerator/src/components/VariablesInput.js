import React, { useContext, useRef } from 'react';
import CodeContext from '../store/code-context';

import Card from './Card';



import styles from './VariablesInput.module.css';

function VariableInput(props) {
	const codeCtx = useContext(CodeContext);
	const inputRef = useRef();

	function submitHandler(event) {
		event.preventDefault();
		const codeIn = inputRef.current.value;
		codeCtx.convert(codeIn);
		//console.log(codeCtx.gettersAndSetters)
	}

	return (
		<Card className={styles['variable-input']}>
			<form onSubmit={submitHandler}>
				<label htmlFor='input-code'>{props.title}</label>
				<textarea
					id='input-code'
					ref={inputRef}
					rows='20'
					cols='60'
					type="text"
					placeholder='(**Process value *)
					PVi				: REAL;	'
				></textarea>
				<button type='submit'>Convert</button>
			</form>
		</Card>
	);
}

export default VariableInput;
