import React, { useState } from 'react';
import './ExpenseForm.css';

function ExpenseForm(props) {
	const [enteredTitle, setEnteredTitle] = useState('');
	const [enteredAmount, setEnteredAmount] = useState('');
	const [enteredDate, setEnteredDate] = useState('');
	const [showForm, setShowForm] = useState(false);

	function addNewExpenseHandler() {
		setShowForm(true);
	}

	if (!showForm) {
		return (
			<div className='new-expenses__actions'>
				<button onClick={addNewExpenseHandler}>Add New Expense</button>
			</div>
		);
	}

	function titleChangeHandler(event) {
		setEnteredTitle(event.target.value);
	}

	function amountChangeHandler(event) {
		setEnteredAmount(event.target.value);
	}

	function dateChangeHandler(event) {
		setEnteredDate(event.target.value);
	}

	function submitHandler(event) {
		event.preventDefault();

		const expenseData = {
			title: enteredTitle,
			amount: enteredAmount,
			date: new Date(enteredDate)
		};

		// console.log(expenseData);
		props.onSaveExpenseData(expenseData);
		setEnteredTitle('');
		setEnteredAmount('');
		setEnteredDate('');
		setShowForm(false);
	}

	function cancelHandler() {
		setEnteredTitle('');
		setEnteredAmount('');
		setEnteredDate('');
		setShowForm(false);
	}

	return (
		<form onSubmit={submitHandler.bind(this)}>
			<div className='new-expense__controls'>
				<div className='new-expense__controls'>
					<label>Title</label>
					<input
						type='text'
						value={enteredTitle}
						onChange={titleChangeHandler.bind(this)}
					/>
				</div>
				<div className='new-expense__controls'>
					<label>Amount</label>
					<input
						type='number'
						min='0.01'
						step='0.01'
						value={enteredAmount}
						onChange={amountChangeHandler.bind(this)}
					/>
				</div>
				<div className='new-expense__controls'>
					<label>Date</label>
					<input
						type='date'
						min='2019-01-01'
						max='2024-12-31'
						value={enteredDate}
						onChange={dateChangeHandler.bind(this)}
					/>
				</div>
			</div>
			<div className='new-expenses__actions'>
				<button onClick={cancelHandler}>Cancel</button>
				<button type='submit'>Add Expense</button>
			</div>
		</form>
	);
}

export default ExpenseForm;
