import React, { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { authActions } from '../store/auth';

import classes from './Auth.module.css';

const Auth = () => {
	const inAuthenticated = useSelector((state) => state.auth.inAuthenticated);
	const dispatch = useDispatch();

	const userEmailRef = useRef();
	const userPasswordRef = useRef();

	function loginHandler(event) {
		event.preventDefault();
		if (
			userEmailRef.current.value.includes('@') &&
			userPasswordRef.current.value.length > 5
		) {
			//console.log('logging in');
			dispatch(authActions.login());
		}
	}
	return (
		<React.Fragment>
		{!inAuthenticated && (<main className={classes.auth}>
			<section>
				<form onSubmit={loginHandler}>
					<div className={classes.control}>
						<label htmlFor='email'>Email</label>
						<input type='email' id='email' ref={userEmailRef} />
					</div>
					<div className={classes.control}>
						<label htmlFor='password'>Password</label>
						<input
							type='password'
							id='password'
							ref={userPasswordRef}
						/>
					</div>
					<button>Login</button>
				</form>
			</section>
		</main>)}
		</React.Fragment>
	);
};

export default Auth;
