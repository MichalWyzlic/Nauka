import { useState } from 'react';
import styles from './SimpleInput.module.css';

const SimpleInput = (props) => {
	const [enteredName, setEnteredName] = useState('');
	const [enteredNameTouched, setEnteredNameTouched] = useState(false);
	const [enteredEmail, setEnteredEmail] = useState('');
	const [enteredEmailTouched, setEnteredEmailTouched] = useState(false);

	const enteredNameIsValid = enteredName.trim() !== '';
	const nameInputIsInvalid = !enteredNameIsValid && enteredNameTouched;

	const enteredEmailIsValid = enteredEmail
		.toLowerCase()
		.match(
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		);
	const emailInputIsInvalid = !enteredEmailIsValid && enteredEmailTouched;

	function nameInputChangeHandler(event) {
		setEnteredNameTouched(true);
		setEnteredName(event.target.value);
	}

	function emailInputChangeHandler(event) {
		setEnteredEmailTouched(true);
		setEnteredEmail(event.target.value);
	}

	function formSubmissionHandler(event) {
		event.preventDefault();
		//setEnteredNameTouched(true);

		if (!(enteredNameIsValid && enteredEmailIsValid)) {
			return;
		}
		console.log(enteredName);
		console.log(enteredEmail);
		setEnteredName('');
		setEnteredNameTouched(false);
		setEnteredEmail('');
		setEnteredEmailTouched(false);
	}

	function nameInputBlurHandler(event) {
		setEnteredNameTouched(true);
	}

	function emailInputBlurHandler(event) {
		setEnteredEmailTouched(true);
	}

	let formIsValid = enteredNameIsValid && enteredEmailIsValid;

	return (
		<form onSubmit={formSubmissionHandler}>
			<div className='form-control'>
				<label htmlFor='name'>Your Name</label>
				<input
					type='email'
					id='name'
					onChange={nameInputChangeHandler}
					onBlur={nameInputBlurHandler}
					value={enteredName}
					className={nameInputIsInvalid ? styles['input-error'] : ''}
				/>
				{nameInputIsInvalid && (
					<p className='error-text'>Name must not be empty!</p>
				)}
			</div>
			<div className='form-control'>
				<label htmlFor='email'>Your e-mail</label>
				<input
					type='text'
					id='email'
					onChange={emailInputChangeHandler}
					onBlur={emailInputBlurHandler}
					value={enteredEmail}
					className={emailInputIsInvalid ? styles['input-error'] : ''}
				/>
				{emailInputIsInvalid && (
					<p className='error-text'>
						Entered e-mails is not correct!
					</p>
				)}
			</div>
			<div className='form-actions'>
				<button disabled={!formIsValid} type='submit'>
					Submit
				</button>
			</div>
		</form>
	);
};

export default SimpleInput;
