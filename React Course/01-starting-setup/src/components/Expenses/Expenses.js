import './Expenses.css';
import ExpenseItem from './ExpenseItem';
import Card from '../UI/Card';

function Expenses(props) {
	let innerHTML = [];
	for (let i = 0; i < props.expenses.length; i++) {
		innerHTML[i] = (
			<ExpenseItem
				title={props.expenses[`${i}`].title}
				amount={props.expenses[`${i}`].amount}
				date={props.expenses[`${i}`].date}
			></ExpenseItem>
		);
	}
	// props.expenses.reduce((acc, currVal) => acc + ();
	// console.div(innerHTML);
	return <Card className='expenses'>{innerHTML}</Card>;
}

export default Expenses;
