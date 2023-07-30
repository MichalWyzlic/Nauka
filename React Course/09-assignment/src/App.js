import logo from './assets/investment-calculator-logo.png';
import NewInvestment from './components/NewInvestment/NewInvestment';
import Results from './components/Results/Results';
import TitleSection from './components/TitleSection/TitleSection';
import React, { useState } from 'react';

function App() {
	const [savings, setSavings] = useState(null);

	const calculateHandler = (userInput) => {
		// Should be triggered when form is submitted
		// You might not directly want to bind it to the submit event on the form though...
		if (userInput) {
			const yearlyData = []; // per-year results

			let currentSavings = +userInput['current-savings']; // feel free to change the shape of this input object!
			const yearlyContribution = +userInput['yearly-contribution']; // as mentioned: feel free to change the shape...
			const expectedReturn = +userInput['expected-return'] / 100;
			const duration = +userInput['duration'];
			let totalInvestedCapital = 0;
			let totalInterestGained = 0;

			// The below code calculates yearly results (total savings, interest etc)
			for (let i = 0; i < duration; i++) {
				const yearlyInterest = currentSavings * expectedReturn;
				currentSavings += yearlyInterest + yearlyContribution;
				totalInvestedCapital += yearlyContribution;
				totalInterestGained += yearlyInterest;

				yearlyData.push({
					// feel free to change the shape of the data pushed to the array!
					year: i + 1,
					yearlyInterest: yearlyInterest,
					savingsEndOfYear: currentSavings,
					yearlyContribution: yearlyContribution,
					totalInvestedCapital: totalInvestedCapital,
					totalInterestGained: totalInterestGained
				});
			}

			setSavings(yearlyData);
		}
		// console.log(savings);

		// do something with yearlyData ...
	};

	return (
		<div>
			<TitleSection logoImg={`${logo}`} />

			<NewInvestment calculationFunction={calculateHandler.bind(this)} />

			{/* Todo: Show below table conditionally (only once result data is available) */}
			{/* Show fallback text if no data is available */}

			{savings ? (
				<Results userData={savings} />
			) : (
				<p style={{textAlign: 'center'}}>No investment data calculated yet.</p>
			)}
		</div>
	);
}

export default App;
