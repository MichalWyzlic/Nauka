import React, {useContext} from 'react';
import styles from './MealItem.module.css';
import MealItemForm from './MealitemForm';
import CartContext from '../../store/cart-context';

function MealItem(props) {
	const price = `$${props.price.toFixed(2)}`;

	const cartCtx = useContext(CartContext);

	function addToCartHandler(amount) {
		cartCtx.addItem({
			id: props.id,
			name: props.name,
	  		amount: amount,
	  		price: props.price
		})
	}

	return (
		<li className={styles.meal} key={props.id}>
			<div>
				<h3>{props.name}</h3>
				<div className={styles.description}>{props.description}</div>
				<div className={styles.price}>{price}</div>
			</div>
			<div>
				<MealItemForm onAddToCart={addToCartHandler} />
			</div>
		</li>
	);
}

export default MealItem;
