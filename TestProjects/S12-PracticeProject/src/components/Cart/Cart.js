import React, { useContext } from 'react';
import styles from './Cart.module.css';

import Modal from '../UI/Modal';
import CartItem from './CartItem';
import CartContext from '../../store/cart-context';

function Cart(props) {
	const cartContext = useContext(CartContext);

	const totalAmount = `$${cartContext.totalAmount.toFixed(2)}`;
	const hasItems = cartContext.items.length > 0;

	function cartAddItemHandler(item){
		cartContext.addItem(item);		
	}

	function cartRemoveItemHandler(id){
		cartContext.removeItem(id);
	}

	const cartItems = (
		<ul className={styles['cart-items']}>
			{cartContext.items !== undefined
				? cartContext.items.map((item) => {
						return (
							<CartItem
								key={item.id}
								name={item.name}
								amount={item.amount}
								price={item.price}
								onAdd={cartAddItemHandler.bind(null, {...item, amount: 1})}
								onRemove={cartRemoveItemHandler.bind(null, item.id)}
							/>
						);
				  })
				: ''}
		</ul>
	);
	console.log(cartItems);
	console.log(cartContext.items);

	return (
		<React.Fragment>
			<Modal onClose={props.onClose}>
				{cartItems}
				<div className={styles.total}>
					<span>Total</span>
					<span>{totalAmount}</span>
				</div>
				<div className={styles.actions}>
					<button
						className={styles['button--alt']}
						onClick={props.onClose}
					>
						Close
					</button>
					{hasItems && (
						<button className={styles.button}>Order</button>
					)}
				</div>
			</Modal>
		</React.Fragment>
	);
}

export default Cart;
