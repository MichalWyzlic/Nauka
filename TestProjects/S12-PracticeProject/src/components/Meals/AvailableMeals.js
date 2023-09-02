import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import styles from './AvailableMeals.module.css';

import Card from '../UI/Card';
import MealItem from './MealItem';

function AvailableMeals() {
	const [mealsLoaded, setMealsLoaded] = useState(false);
	const [hasError, setHasError] = useState(null);
	const [mealsTable, setMealsTable] = useState([
		// {
		// 	id: 'm1',
		// 	name: 'Sushi',
		// 	description: 'Finest fish and veggies',
		// 	price: 22.99
		// },
		// {
		// 	id: 'm2',
		// 	name: 'Schnitzel',
		// 	description: 'A german specialty!',
		// 	price: 16.5
		// },
		// {
		// 	id: 'm3',
		// 	name: 'Barbecue Burger',
		// 	description: 'American, raw, meaty',
		// 	price: 12.99
		// },
		// {
		// 	id: 'm4',
		// 	name: 'Green Bowl',
		// 	description: 'Healthy...and green...',
		// 	price: 18.99
		// }
	]);

	const getMeals = useCallback(async function () {
		try {
			const response = await axios.get(
				'https://react-http-ae809-default-rtdb.europe-west1.firebasedatabase.app/meals.json'
			);
			if (
				response.status >= 200 &&
				response.status < 300 &&
				response.data !== null
			) {
				const newMealsTable = [];
				for (let key in response.data) {
					newMealsTable.push({ id: key, ...response.data[key] });
				}
				setMealsTable(newMealsTable);
				setMealsLoaded(true);
				setHasError(null);
			} else {
				throw new Error('Fetching data has not succeeded!');
			}
		} catch (error) {
			console.error(error.message);
			setMealsLoaded(true);
			setHasError(error.message);
		}
	}, []);

	useEffect(() => {
		getMeals();
	}, [getMeals]);

	const mealsList = mealsTable.map((item) => {
		return (
			<MealItem
				key={item.id}
				id={item.id}
				name={item.name}
				description={item.description}
				price={item.price}
			/>
		);
	});
	return (
		<section>
			{mealsLoaded && !hasError && (
				<Card className={styles.meals}>
					<ul>{mealsList}</ul>
				</Card>
			)}
			{!mealsLoaded && !hasError && (
				<p className={styles.loading}>Loading data ...</p>
			)}
			{hasError && (
				<p className={styles.error}>{hasError}</p>
			)}
		</section>
	);
}

export default AvailableMeals;
