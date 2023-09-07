import React, { useContext, useCallback, useState } from 'react';
import useBasic from '../../hooks/use-basic';
import styles from './CustomerData.module.css';
import axios from 'axios';

import CartContext from '../../store/cart-context';

const CustomerData = (props) => {
	const cartContext = useContext(CartContext);
	

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

	function resetCartContext() {
		resetName();
		resetSurname();
		resetEmail();
		resetStreet();
		resetCity();
		resetZipCode();
		props.onSend(true);
		cartContext.resetCart();
	}

	const formIsValid =
		nameIsValid &&
		surnameIsValid &&
		emailIsValid &&
		streetIsValid &&
		cityIsValid &&
		zipCodeIsValid;

	const sendOrder = async function (orderToSend) {
		try {
			const response = await axios.post(
				'https://react-http-ae809-default-rtdb.europe-west1.firebasedatabase.app/orders.json',
				orderToSend
			);
			if (
				response.status >= 200 &&
				response.status < 300 &&
				response.data !== null
			) {
				console.log('Order sent');
				//console.log(orderToSend);
				console.log(cartContext);
				resetCartContext();
				
				console.log(cartContext.items);
				console.log(cartContext.totalAmount);
			} else {
				throw new Error('Sending the order has not succeeded!');
			}
		} catch (error) {
			console.error(error.message);
			props.onSend(true);
		}
	};

	async function formSubmitHandler(event) {
		event.preventDefault();

		if (!formIsValid) {
			return;
		}
		const orderToSend = {
			id: enteredName + enteredSurname + Date.now(),
			name: enteredName,
			surname: enteredSurname,
			email: enteredEmail,
			street: enteredStreet,
			city: enteredCity,
			zipCode: enteredZipCode,
			meals: cartContext.items,
			total: cartContext.totalAmount
		};
		sendOrder(orderToSend);
	}

	return (
		<React.Fragment>
			<form onSubmit={formSubmitHandler} className={styles.form}>
				<div className={styles['control']}>
					<div
						className={nameHasError ? ' ' + styles['invalid'] : ''}
					>
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
					<div
						className={
							surnameHasError ? ' ' + styles['invalid'] : ''
						}
					>
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
					<div
						className={emailHasError ? ' ' + styles['invalid'] : ''}
					>
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
					<div
						className={
							streetHasError ? ' ' + styles['invalid'] : ''
						}
					>
						<label htmlFor='street'>Street</label>
						<input
							type='text'
							id='street'
							onChange={streetChangedHandler}
							onBlur={streetTouchedHandler}
							value={enteredStreet}
						/>
						{streetHasError && (
							<p className='error-text'>
								Street must not be empty!
							</p>
						)}
					</div>

					<div
						className={
							zipCodeHasError ? ' ' + styles['invalid'] : ''
						}
					>
						<label htmlFor='zipCode'>Zip Code</label>
						<input
							type='text'
							id='zipCode'
							onChange={zipCodeChangedHandler}
							onBlur={zipCodeTouchedHandler}
							value={enteredZipCode}
						/>
						{zipCodeHasError && (
							<p className='error-text'>
								zipCode must not be empty!
							</p>
						)}
					</div>
					<div
						className={cityHasError ? ' ' + styles['invalid'] : ''}
					>
						<label htmlFor='city'>City</label>
						<input
							type='text'
							id='city'
							onChange={cityChangedHandler}
							onBlur={cityTouchedHandler}
							value={enteredCity}
						/>
						{cityHasError && (
							<p className='error-text'>
								City must not be empty!
							</p>
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
		</React.Fragment>
	);
};

export default CustomerData;
