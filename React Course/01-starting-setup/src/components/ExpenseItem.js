import './ExpenseItem.css';
import ExpenseDate from './ExpenseDate';

function ExpenseItem(props) {
	// const day = props.date.toLocaleString('en-GB', {day: 'numeric'});
	// const month = props.date.toLocaleString('en-GB', {month: 'long'});
	// const year = props.date.toLocaleString('en-GB', {year: 'numeric'});
	return (
		<div className='expense-item'>
			<ExpenseDate date={props.date}></ExpenseDate>
			<div className='expense-item__description'>
				<h2>{props.title}</h2>
				<div className='expense-item__price'>{`$${props.amount}`}</div>
			</div>
		</div>
	);
}

export default ExpenseItem;
