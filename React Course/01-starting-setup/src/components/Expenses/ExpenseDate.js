import './ExpenseDate.css';
import Card from '../UI/Card';

function ExpenseDate(props) {
	const day = props.date.toLocaleString('en-GB', { day: 'numeric' });
	const month = props.date.toLocaleString('en-GB', { month: 'long' });
	const year = props.date.toLocaleString('en-GB', { year: 'numeric' });
	return (
		<Card className='expense-date'>
			<div className='expense-date__day'>{day}</div>
			<div className='expense-date__month'>{month}</div>
			<div className='expense-date__year'>{year}</div>
		</Card>
	);
}

export default ExpenseDate;
