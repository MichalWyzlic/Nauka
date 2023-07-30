import React from 'react';
import styles from './Results.module.css';

const fomratter = new Intl.NumberFormat('en-GB', {
	style: 'currency',
	currency: 'EUR',
	minimumFractionDigits: 0,
	maximumFractionDigits: 2
});

function Results(props) {
	//console.log(props.userData);
	return (
		<table className={`${styles['result']}`}>
			<thead className={`${styles['result']}`}>
				<tr>
					<th>Year</th>
					<th>Total Savings</th>
					<th>Interest (Year)</th>
					<th>Total Interest</th>
					<th>Invested Capital</th>
				</tr>
			</thead>
			<tbody className={`${styles['result']}`}>
				{/* <tr>
						<td>YEAR NUMBER</td>
						<td>TOTAL SAVINGS END OF YEAR</td>
						<td>INTEREST GAINED IN YEAR</td>
						<td>TOTAL INTEREST GAINED</td>
						<td>TOTAL INVESTED CAPITAL</td>
					</tr> */}
				{props.userData.map((item) => {
					return (
						<tr key={item.year}>
							<td>{item.year}</td>
							<td>{fomratter.format(item.savingsEndOfYear)}</td>
							<td>{fomratter.format(item.yearlyInterest)}</td>
							<td>{fomratter.format(item.totalInterestGained)}</td>
							<td>{fomratter.format(item.totalInvestedCapital)}</td>
						</tr>
					);
				})}
			</tbody>
		</table>
	);
}

export default Results;
