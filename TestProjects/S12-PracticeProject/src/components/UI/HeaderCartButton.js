import React, { useContext } from 'react';
import styles from './HeaderCartButton.module.css';
import CartIcon from '../Cart/CartIcon';
import CartContext from '../../store/cart-context';

function HeaderCartButton(props) {
	const cartCtx = useContext(CartContext);

	const numberOfCartItems = cartCtx.items.reduce((prevVal, curVal) => {
		return prevVal + curVal.amount;
	}, 0);

	function onClickHandler() {
		props.showCart();
	}

	return (
		<button className={styles.button} onClick={onClickHandler}>
			<span className={styles.icon}>
				<CartIcon />
			</span>
			<span>Your cart</span>
			<span className={styles.badge}>{numberOfCartItems}</span>
		</button>
	);
}

export default HeaderCartButton;
