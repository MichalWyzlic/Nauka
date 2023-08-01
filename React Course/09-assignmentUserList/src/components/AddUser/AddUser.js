import React, { useState } from 'react';
import Card from '../UI/Card/Card';
import Button from '../UI/Button/Button';
import styles from './AddUser.module.css';

function AddUser(props) {
	const [newUser, setNewUser] = useState({ name: '', age: 0 });

	function submitHandler(event) {
		event.preventDefault();
		//console.log(newUser);
		props.addUserFunction(newUser);
		setNewUser({ name: '', age: 0 });
	}

	function changeHandler(input, value) {
		setNewUser((prevInput) => {
			return {
				...prevInput,
				[input]: value
			};
		});
	}

	function resetButtonClickHandler(event){
		setNewUser({ name: '', age: 0 });
	}

	return (
		<Card className={styles.input}>
			<form
				className={styles.input}
				onSubmit={submitHandler.bind(this)}
			>
				<div>
					<label htmlFor='name'>Name</label>
					<input
						onChange={(event) =>
							changeHandler('name', event.target.value)
						}
						type='text'
						value={newUser.name}
						id='name'
					/>

					<label htmlFor='age'>Age</label>
					<input
						onChange={(event) =>
							changeHandler('age', event.target.value)
						}
						type='number'
						value={newUser.age}
						id='age'
					/>
				</div>
				<div>
					<Button
						type='reset'
						onClick={resetButtonClickHandler.bind(this)}
					>
						Reset
					</Button>
					<Button type='submit' >
						Submit
					</Button>
				</div>
			</form>
		</Card>
	);
}

export default AddUser;
