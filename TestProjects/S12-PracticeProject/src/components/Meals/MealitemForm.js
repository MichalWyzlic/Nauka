import React, { useRef, useState } from 'react';
import styles from './MealItemForm.module.css';

import Input from '../UI/Input';

function MealItemForm(props) {
	const [amountIsValid, setAmountIsValid] = useState(true);
	const amountInputRef = useRef();

	function submitHandler(event) {
		event.preventDefault();
		const enteredAmount = amountInputRef.current.value;
		const enteredAmountNumber = +enteredAmount;
		if (
			enteredAmount.trim().length === 0 ||
			enteredAmountNumber < 1 ||
			enteredAmountNumber > 5
		) {
			setAmountIsValid(false);
			return;
		}
		setAmountIsValid(true);
		props.onAddToCart(enteredAmountNumber);
	}

	return (
		<form className={styles.form} onSubmit={submitHandler}>
			<Input
				ref={amountInputRef}
				labelText='Amount'
				input={{
					id: 'amount_' + props.id,
					type: 'number',
					min: '1',
					max: '5',
					step: '1',
					defaultValue: '1'
				}}
			/>
			<button type='submit'>+ Add</button>
			{!amountIsValid && <p>Please enter a valid amount.</p>}
		</form>
	);
}

export default MealItemForm;
