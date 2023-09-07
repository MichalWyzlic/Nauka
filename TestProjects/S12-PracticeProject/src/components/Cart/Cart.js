import React, { useState, useContext, useEffect } from 'react';
import styles from './Cart.module.css';

import Modal from '../UI/Modal';
import CartItem from './CartItem';
import CartContext from '../../store/cart-context';
import CustomerData from './CustomerData';

function Cart(props) {
	const cartContext = useContext(CartContext);
	const [oderActive, setOrderActive] = useState(false);
	const [orderWasSent, setOrderWasSent] = useState(false);

	const totalAmount = `$${cartContext.totalAmount.toFixed(2)}`;
	const hasItems = cartContext.items.length > 0;

	function cartAddItemHandler(item) {
		cartContext.addItem(item);
	}

	function cartRemoveItemHandler(id) {
		cartContext.removeItem(id);
	}

	useEffect(() => {
		console.log('Cart context from Cart component ')
		console.log(cartContext);
	}, [cartContext]);

	useEffect(() => {
		if(orderWasSent){
			console.log('Checking if the order was sent.')
			props.onClose();
		}
	}, [orderWasSent, props])

	const cartItems = (
		<div className={styles['cart-items']}>
			<ul>
				{cartContext.items !== undefined
					? cartContext.items.map((item) => {
							return (
								<CartItem
									key={item.id}
									name={item.name}
									amount={item.amount}
									price={item.price}
									onAdd={cartAddItemHandler.bind(null, {
										...item,
										amount: 1
									})}
									onRemove={cartRemoveItemHandler.bind(
										null,
										item.id
									)}
								/>
							);
					  })
					: ''}
			</ul>
			
		</div>
	);

	function orderBtnClickHandler(event) {
		setOrderActive(!oderActive);
	}

	return (
		<React.Fragment>
			<Modal onClose={props.onClose}>
				{cartItems}
				<div className={styles.total}>
					<span>Total</span>
					<span>{totalAmount}</span>
				</div>
				{oderActive && <CustomerData onClose={props.onClose} onSend={setOrderWasSent}/>}
				{!oderActive && <div className={styles.actions}>
					<button
						className={styles['button--alt']}
						onClick={props.onClose}
					>
						Close
					</button>
					{hasItems && (
						<button
							className={styles.button}
							onClick={orderBtnClickHandler}
						>
							Order
						</button>
					)}
				</div>}
			</Modal>
		</React.Fragment>
	);
}

export default Cart;
