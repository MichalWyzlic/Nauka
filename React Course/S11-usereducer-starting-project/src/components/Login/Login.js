import React, { useState, useEffect, useReducer } from 'react';


import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

function emailReducer(state, action) {
	const emailPatter = new RegExp(/[^\s@]+@[^\s@]+\.[^\s@]+/gi);

	if (action.type === 'USER_INPUT') {
		//console.log(action.val);
		let valid = emailPatter.test(action.val);
		//console.log(valid);
		let retMsg = {
			value: action.val,
			isValid: valid
		};
		//console.log(retMsg);
		return retMsg;
	}
	if (action.type === 'INPUT_BLUR') {
		return {
			value: state.value,
			isValid: emailPatter.test(state.value)
		};
	}

	return { value: '', isValid: false };
}

function passwordReducer(state, action) {
	if (action.type === 'USER_INPUT') {
		return { value: action.val, isValid: action.val.trim().length > 6 };
	}
	if (action.type === 'INPUT_BLUR') {
		return { value: state.value, isValid: state.value.trim().length > 6 };
	}

	return { value: '', isValid: false };
}

const Login = (props) => {
	//   const [enteredEmail, setEnteredEmail] = useState('');
	//   const [emailIsValid, setEmailIsValid] = useState();
	// const [enteredPassword, setEnteredPassword] = useState('');
	// const [passwordIsValid, setPasswordIsValid] = useState();
	const [formIsValid, setFormIsValid] = useState(false);

	const [emailState, dispatchEmail] = useReducer(emailReducer, {
		value: '',
		isValid: null
	});

	const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
		value: '',
		isValid: null
	});

	useEffect(() => {
		console.log('EFFECT RUNNING');

		return () => {
			console.log('EFFECT CLEANUP');
		};
	}, []);

	const {isValid: emailIsValid} = emailState;
	const {isValid: passwordIsValid} = passwordState;

	useEffect(() => {
	  const identifier = setTimeout(() => {
	    //console.log('Checking form validity!');
	    setFormIsValid(
			emailIsValid && passwordIsValid
	    );
	  }, 500);

	  return () => {
	    //console.log('CLEANUP');
	    clearTimeout(identifier);
	  };
	}, [emailIsValid, passwordIsValid]);

	const emailChangeHandler = (event) => {
		dispatchEmail({ type: 'USER_INPUT', val: event.target.value });
		// console.log(emailState);
		// setFormIsValid(emailState.isValid && passwordState.isValid);
	};

	const passwordChangeHandler = (event) => {
		dispatchPassword({ type: 'USER_INPUT', val: event.target.value });

		// setFormIsValid(emailState.isValid && passwordState.isValid);
	};

	const validateEmailHandler = () => {
		// setEmailIsValid(emailState.isValid);
		dispatchEmail({ type: 'INPUT_BLUR' });
	};

	const validatePasswordHandler = () => {
		dispatchPassword({ type: 'INPUT_BLUR' });
	};

	const submitHandler = (event) => {
		event.preventDefault();
		props.onLogin(emailState.value, passwordState.value);
	};
	
	return (
		<Card className={classes.login}>
			<form onSubmit={submitHandler}>
				<div
					className={`${classes.control} ${
						emailState.isValid === false ? classes.invalid : ''
					}`}
				>
					<label htmlFor='email'>E-Mail</label>
					<input
						type='email'
						id='email'
						value={emailState.value}
						onChange={emailChangeHandler}
						onBlur={validateEmailHandler}
					/>
				</div>
				<div
					className={`${classes.control} ${
						passwordState.isValid === false ? classes.invalid : ''
					}`}
				>
					<label htmlFor='password'>Password</label>
					<input
						type='password'
						id='password'
						value={passwordState.value}
						onChange={passwordChangeHandler}
						onBlur={validatePasswordHandler}
					/>
				</div>
				<div className={classes.actions}>
					<Button
						type='submit'
						className={classes.btn}
						disabled={!formIsValid}
					>
						Login
					</Button>
				</div>
			</form>
		</Card>
	);
};

export default Login;