import { useState } from 'react';
import styles from './SimpleInput.module.css';

import useInput from '../hooks/use-input';

const SimpleInput = (props) => {
	const {
		value: enteredName,
		isValid: enteredNameIsValid,
		hasError: nameInputHasError,
		reset: nameReset,
		valueChangeHandler: nameChangedHandler,
		inputBlurHandler: nameBlurHandler
	} = useInput((value) => {
		if (value) {
			return value.trim() !== '';
		} else {
			return false;
		}
	});

	const {
		value: enteredEmail,
		isValid: enteredEmailIsValid,
		hasError: emailInputHasError,
		reset: emailReset,
		valueChangeHandler: emailChangedHandler,
		inputBlurHandler: emailBlurHandler
	} = useInput((value) => {
		if (value) {
			return value
				.toLowerCase()
				.match(
					/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
				);
		} else {
			return false;
		}
	});

	let formIsValid = enteredNameIsValid && enteredEmailIsValid;

	function formSubmissionHandler(event) {
		event.preventDefault();
		//setEnteredNameTouched(true);

		if (!(formIsValid)) {
			return;
		}
		console.log(enteredName);
		console.log(enteredEmail);
		nameReset();
		emailReset();
	}

	

	return (
		<form onSubmit={formSubmissionHandler}>
			<div className='form-control'>
				<label htmlFor='name'>Your Name</label>
				<input
					type='text'
					id='name'
					onChange={nameChangedHandler}
					onBlur={nameBlurHandler}
					value={enteredName}
					className={nameInputHasError ? styles['input-error'] : ''}
				/>
				{nameInputHasError && (
					<p className='error-text'>Name must not be empty!</p>
				)}
			</div>
			<div className='form-control'>
				<label htmlFor='email'>Your e-mail</label>
				<input
					type='email'
					id='email'
					onChange={emailChangedHandler}
					onBlur={emailBlurHandler}
					value={enteredEmail}
					className={emailInputHasError ? styles['input-error'] : ''}
				/>
				{emailInputHasError && (
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
