import React, { useContext, useEffect, useState } from 'react';
import styles from './HeaderCartButton.module.css';
import CartIcon from '../Cart/CartIcon';
import CartContext from '../../store/cart-context';

function HeaderCartButton(props) {
	const cartCtx = useContext(CartContext);
	const {items} = cartCtx;
	const [showBump, setShowBump] = useState(false);


	const numberOfCartItems = items.reduce((prevVal, curVal) => {
		return prevVal + curVal.amount;
	}, 0);

	function onClickHandler() {
		props.showCart();
	}

	useEffect(() => {
		if(items.length === 0){
			return;
		}
		setShowBump(true);
		const timer = setTimeout(() => {
			setShowBump(false);
		},200);

		return () => {
			clearTimeout(timer);
		}
	}, [items])

	const btnClasses = `${styles.button} ${showBump ? styles.bump : ''}`;
	return (
		<button className={btnClasses} onClick={onClickHandler}>
			<span className={styles.icon}>
				<CartIcon />
			</span>
			<span>Your cart</span>
			<span className={styles.badge}>{numberOfCartItems}</span>
		</button>
	);
}

export default HeaderCartButton;
