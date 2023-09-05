import React from 'react';
import useBasic from '../../hooks/use-basic';
import styles from './CustomerData.module.css';

const CustomerData = (props) => {
	const {
		value: enteredName,
		isValid: nameIsValid,
		hasError: nameHasError,
		valueChangedHandler: nameChangedHandler,
		valueTouchedHandler: nameTouchedHandler,
		reset: resetName
	} = useBasic((value) => value.trim() !== '');

	const {
		value: enteredSurname,
		isValid: surnameIsValid,
		hasError: surnameHasError,
		valueChangedHandler: surnameChangedHandler,
		valueTouchedHandler: surnameTouchedHandler,
		reset: resetSurname
	} = useBasic((value) => value.trim() !== '');

	const {
		value: enteredEmail,
		isValid: emailIsValid,
		hasError: emailHasError,
		valueChangedHandler: emailChangedHandler,
		valueTouchedHandler: emailTouchedHandler,
		reset: resetEmail
	} = useBasic((value) =>
		value
			.toLowerCase()
			.match(
				/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
			)
	);

	const {
		value: enteredStreet,
		isValid: streetIsValid,
		hasError: streetHasError,
		valueChangedHandler: streetChangedHandler,
		valueTouchedHandler: streetTouchedHandler,
		reset: resetStreet
	} = useBasic((value) => value.trim() !== '');

	const {
		value: enteredCity,
		isValid: cityIsValid,
		hasError: cityHasError,
		valueChangedHandler: cityChangedHandler,
		valueTouchedHandler: cityTouchedHandler,
		reset: resetCity
	} = useBasic((value) => value.trim() !== '');

	const {
		value: enteredZipCode,
		isValid: zipCodeIsValid,
		hasError: zipCodeHasError,
		valueChangedHandler: zipCodeChangedHandler,
		valueTouchedHandler: zipCodeTouchedHandler,
		reset: resetZipCode
	} = useBasic((value) => value.trim() !== '');

	const formIsValid =
		nameIsValid &&
		surnameIsValid &&
		emailIsValid &&
		streetIsValid &&
		cityIsValid &&
		zipCodeIsValid;

	function formSubmitHandler(event) {
		event.preventDefault();

		if (!formIsValid) {
			return;
		}

		console.log(enteredName);
		console.log(enteredSurname);
		console.log(enteredEmail);
		console.log(enteredStreet);
		console.log(enteredCity);
		console.log(enteredZipCode);

		resetName();
		resetSurname();
		resetEmail();
		resetStreet();
		resetCity();
		resetZipCode();
	}

	return (
		<form onSubmit={formSubmitHandler} className={styles.form}>
			<div className={styles['control']}>
				<div className={nameHasError ? ' ' + styles['invalid'] : ''}>
					<label htmlFor='name'>First Name</label>
					<input
						type='text'
						id='name'
						onChange={nameChangedHandler}
						onBlur={nameTouchedHandler}
						value={enteredName}
					/>
					{nameHasError && (
						<p className={styles['error-text']}>
							Name must not be empty!
						</p>
					)}
				</div>
				<div className={surnameHasError ? ' ' + styles['invalid'] : ''}>
					<label htmlFor='surname'>Last Name</label>
					<input
						type='text'
						id='surname'
						onChange={surnameChangedHandler}
						onBlur={surnameTouchedHandler}
						value={enteredSurname}
					/>
					{surnameHasError && (
						<p className={styles['error-text']}>
							Surname must not be empty!
						</p>
					)}
				</div>
				<div className={emailHasError ? ' ' + styles['invalid'] : ''}>
					<label htmlFor='email'>E-Mail Address</label>
					<input
						type='email'
						id='email'
						onChange={emailChangedHandler}
						onBlur={emailTouchedHandler}
						value={enteredEmail}
					/>
					{emailHasError && (
						<p className={styles['error-text']}>
							Please enter a valid e-mail address!
						</p>
					)}
				</div>
				<div className={streetHasError ? ' ' + styles['invalid'] : ''}>
					<label htmlFor='street'>Street</label>
					<input
						type='text'
						id='street'
						onChange={streetChangedHandler}
						onBlur={streetTouchedHandler}
						value={enteredStreet}
					/>
					{streetHasError && (
						<p className='error-text'>Street must not be empty!</p>
					)}
				</div>

				<div className={zipCodeHasError ? ' ' + styles['invalid'] : ''}>
					<label htmlFor='zipCode'>Zip Code</label>
					<input
						type='text'
						id='zipCode'
						onChange={zipCodeChangedHandler}
						onBlur={zipCodeTouchedHandler}
						value={enteredZipCode}
					/>
					{zipCodeHasError && (
						<p className='error-text'>zipCode must not be empty!</p>
					)}
				</div>
				<div className={cityHasError ? ' ' + styles['invalid'] : ''}>
					<label htmlFor='city'>City</label>
					<input
						type='text'
						id='city'
						onChange={cityChangedHandler}
						onBlur={cityTouchedHandler}
						value={enteredCity}
					/>
					{cityHasError && (
						<p className='error-text'>City must not be empty!</p>
					)}
				</div>
			</div>
			<div className={styles['actions']}>
				<button type='button' onClick={props.onClose}>
					Cancel
				</button>
				<button
					type='submit'
					disabled={!formIsValid}
					className={styles['submit']}
				>
					Confirm purchase
				</button>
			</div>
		</form>
	);
};

export default CustomerData;
