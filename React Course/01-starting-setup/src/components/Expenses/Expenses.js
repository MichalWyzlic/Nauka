import React, { useState } from 'react';
import './Expenses.css';
import ExpenseItem from './ExpenseItem';
import Card from '../UI/Card';
import ExpensesFilter from './ExpensesFilter';

function Expenses(props) {
	const [yearFilter, setYearFilter] = useState('2019');
	let innerHTML = [];
	for (let i = 0; i < props.expenses.length; i++) {
		innerHTML[i] = (
			<ExpenseItem
				title={props.expenses[`${i}`].title}
				amount={props.expenses[`${i}`].amount}
				date={props.expenses[`${i}`].date}
			></ExpenseItem>
		);
		// console.log(innerHTML);
		// console.dir(innerHTML);
	}

	function selectYearHandler(year){
		setYearFilter(year);
		console.log('Year passed from the ExpensesFilter: ' + year);
	}

	let filter = <ExpensesFilter selectedYear={yearFilter} onSelectYear={selectYearHandler}/>;

	return React.createElement(
		Card,
		{ className: 'expenses' },
		filter,
		...innerHTML
	);
	//<Card className='expenses'>{innerHTML}</Card>;
}

export default Expenses;
