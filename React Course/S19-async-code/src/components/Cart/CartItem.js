import classes from './CartItem.module.css';
import cartSlice from '../../store/cart-slice';
import { useSelector, useDispatch } from 'react-redux';
import { cartActions } from '../../store/cart-slice';

const CartItem = (props) => {
	const { id, title, quantity, total, price } = props.item;
	const dispatch = useDispatch();

	const itemToAdd = {
		id:id,
		price: price,
		totalPrice: price,
		quantity: 1,
		name: title
	};
	function addItemHandler(item, event) {
		dispatch(cartActions.addItemToCart(item));
	}

	function removeItemHandler(id, event) {
		dispatch(cartActions.removeItemFromCart(id));
	}

	return (
		<li className={classes.item}>
			<header>
				<h3>{title}</h3>
				<div className={classes.price}>
					${total.toFixed(2)}{' '}
					<span className={classes.itemprice}>
						(${price.toFixed(2)}/item)
					</span>
				</div>
			</header>
			<div className={classes.details}>
				<div className={classes.quantity}>
					x <span>{quantity}</span>
				</div>
				<div className={classes.actions}>
					<button onClick={removeItemHandler.bind(this, id)}>
						-
					</button>
					<button onClick={addItemHandler.bind(this,itemToAdd)}>+</button>
				</div>
			</div>
		</li>
	);
};

export default CartItem;
