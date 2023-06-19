import React, { useState } from 'react';
import './Expenses.css';
import Card from '../UI/Card';
import ExpensesFilter from './ExpensesFilter';
import ExpensesLits from './ExpensesList';

function Expenses(props) {
	const [yearFilter, setYearFilter] = useState('2019');

	function selectYearHandler(year) {
		setYearFilter(year);
		console.log('Year passed from the ExpensesFilter: ' + year);
	}

	const filteredExpenses = props.items.filter((item) => {
		return item.date.getFullYear().toString() === yearFilter;
	});

	return (
		<Card className='expenses'>
			<ExpensesFilter
				selectedYear={yearFilter}
				onSelectYear={selectYearHandler}
			/>
			<ExpensesLits list={filteredExpenses}/>
		</Card>
	);
}

export default Expenses;
