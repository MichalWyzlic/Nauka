import React, { useContext } from 'react';
import styles from './Cart.module.css';

import Modal from '../UI/Modal';
import CartContext from '../../store/cart-context';

function Cart(props) {
	const cartContext = useContext(CartContext);
	const cartItems = (
		<ul className={styles['cart-items']}>
			{cartContext.cartItems.map((item) => {
				return <li key={item.id}>{item.name}</li>;
			})}
		</ul>
	);

	return (
		<React.Fragment>
			<Modal onClose={props.onClose}>
				{cartItems}
				<div className={styles.total}>
					<span>Total</span>
					<span>22.33</span>
				</div>
				<div className={styles.actions}>
					<button
						className={styles['button--alt']}
						onClick={props.onClose}
					>
						Close
					</button>
					<button className={styles.button}>Order</button>
				</div>
			</Modal>
		</React.Fragment>
	);
}

export default Cart;
