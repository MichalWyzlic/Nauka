import React, { useState, useEffect, useReducer, useContext, useRef } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import Input from '../Input/Input';
import AuthContext from '../../store/auth-context';

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

	const ctx = useContext(AuthContext);

	const [formIsValid, setFormIsValid] = useState(false);

	const [emailState, dispatchEmail] = useReducer(emailReducer, {
		value: '',
		isValid: null
	});

	const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
		value: '',
		isValid: null
	});

	const emailRef = useRef();
	const passwordRef = useRef();

	useEffect(() => {
		console.log('EFFECT RUNNING');

		return () => {
			console.log('EFFECT CLEANUP');
		};
	}, []);

	const { isValid: emailIsValid } = emailState;
	const { isValid: passwordIsValid } = passwordState;

	useEffect(() => {
		const identifier = setTimeout(() => {
			//console.log('Checking form validity!');
			setFormIsValid(emailIsValid && passwordIsValid);
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
		if(formIsValid){
			ctx.onLogin(emailState.value, passwordState.value);
		} else if (!emailIsValid){
			emailRef.current.focus();
			console.log(emailRef.current);
		} else if (!passwordIsValid){
			passwordRef.current.focus();
		}

	};
	return (
		<Card className={classes.login}>
			<form onSubmit={submitHandler}>
				<Input
					ref={emailRef}
					isValid={emailIsValid}
					id="email"
					labelText="E-Mail"
					inputType="email"
					inputValue={emailState.value}
					inputOnChange={emailChangeHandler}
					inputOnBlur={validateEmailHandler}
				/>
				<Input
					ref={passwordRef}
					isValid={passwordIsValid}
					labelHtmlFor="password"
					labelText="Password"
					inputType="password"
					inputId="password"
					inputValue={passwordState.value}
					inputOnChange={passwordChangeHandler}
					inputOnBlur={validatePasswordHandler}
					
				/>
				<div className={classes.actions}>
					<Button
						type="submit"
						className={classes.btn}
					>
						Login
					</Button>
				</div>
			</form>
		</Card>
	);
};

export default Login;
