import { useRef, useState } from 'react';

import styles from './SimpleInput.module.css';

const SimpleInput = (props) => {
	const [enteredName, setEnteredName] = useState('');
	const nameInputRef = useRef();
	const [nameIsValid, setNameIsValid] = useState(true);

	function nameInputChangeHandler(event) {
		setEnteredName(event.target.value);
	}

	function formSubmissionHandler(event){
		event.preventDefault();

		if(enteredName.trim() === ''){
			setNameIsValid(false);
			return;
		} 
		
		setNameIsValid(true);

		console.log(enteredName);
		const enteredValue = nameInputRef.current.value;
		console.log(enteredValue);

		setEnteredName('');

	}

	return (
		<form onSubmit={formSubmissionHandler}>
			<div className='form-control'>
				<label htmlFor='name'>Your Name</label>
				<input ref={nameInputRef}
					type='text'
					id='name'
					onChange={nameInputChangeHandler}
					value={enteredName}
					className={ nameIsValid ? '' : styles['input-error']}
				/>
				{!nameIsValid && <p className='error-text'>Name must not be empty!</p>}
			</div>
			<div className='form-actions'>
				<button>Submit</button>
			</div>
		</form>
	);
};

export default SimpleInput;
