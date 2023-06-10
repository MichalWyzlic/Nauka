import React from 'react';
import './NewExpense.css';
import ExpenseForm from './ExpenseForm';
import Card from '../UI/Card';


function NewExpense(props) {
	function onSaveExpenseData(enteredExpenseData) {
		const expenseData = {
			...enteredExpenseData,
			id: Math.random().toString()
		};
		props.onAddExpense(expenseData);
	}
	return (
		<div>
			<Card className='new-expense'>
				<ExpenseForm onSaveExpenseData={onSaveExpenseData} />
			</Card>
		</div>
	);
}

export default NewExpense;
