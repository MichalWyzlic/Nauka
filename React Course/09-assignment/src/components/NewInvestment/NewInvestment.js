import React, {useState} from 'react';
import styles from './NewInvestment.module.css';

function NewInvestment(props) {
	const initialUserInput = {
		'current-savings': 10000,
		'yearly-contribution': 1200,
		'expected-return': 5,
		'duration': 10
	};
	const [userInput, setUserInput] = useState(initialUserInput);

	function resetButtonClickHandler(event) {
//		console.log('Resetting!!!');
		setUserInput(initialUserInput);
	};

	function submitHandler(event) {
		event.preventDefault();
		props.calculationFunction(userInput);
		// console.log('Claculating!!!');
		// console.log(userInput);
	};

	function changeHandler(input, value) {
//		console.log(input, value);
		setUserInput((prevInput) => {
			return {
				...prevInput,
				[input]: +value
			};
		});
	};

	return (
		<form
			className={`${styles['form']}`}
			onSubmit={submitHandler.bind(this)}
		>
			<div className={`${styles['input-group']}`}>
				<p>
					<label htmlFor='current-savings'>Current Savings ($)</label>
					<input
						onChange={(event) =>
							changeHandler('current-savings', event.target.value)
						}
						type='number'
						value={userInput['current-savings']}
						id='current-savings'
					/>
				</p>
				<p>
					<label htmlFor='yearly-contribution'>
						Yearly Savings ($)
					</label>
					<input
						onChange={(event) =>
							changeHandler('yearly-contribution', event.target.value)
						}
						type='number'
						value={userInput['yearly-contribution']}
						id='yearly-contribution'
					/>
				</p>
			</div>
			<div className={`${styles['input-group']}`}>
				<p>
					<label htmlFor='expected-return'>
						Expected Interest (%, per year)
					</label>
					<input
						onChange={(event) =>
							changeHandler('expected-return', event.target.value)
						}
						type='number'
						value={userInput['expected-return']}
						id='expected-return'
					/>
				</p>
				<p>
					<label htmlFor='duration'>
						Investment Duration (years)
					</label>
					<input
						onChange={(event) =>
							changeHandler('duration', event.target.value)
						}
						type='number'
						value={userInput['duration']}
						id='duration'
					/>
				</p>
			</div>
			<p className={`${styles['actions']}`}>
				<button
					type='reset'
					className={`${styles['buttonAlt']}`}
					onClick={resetButtonClickHandler.bind(this)}
				>
					Reset
				</button>
				<button type='submit' className={`${styles['button']}`}>
					Calculate
				</button>
			</p>
		</form>
	);
}

export default NewInvestment;
