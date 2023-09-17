import Card from '../UI/Card';
import classes from './Cart.module.css';
import CartItem from './CartItem';

import { useSelector, useDispatch } from 'react-redux';
import { uiActions } from '../../store/ui-slice';

const Cart = (props) => {
	const cart = useSelector((state) => state.cart);

	const shoppingList = [];
	if (cart.items) {
		cart.items.forEach((element) => {
			shoppingList.push(
				<CartItem
					key={element.id}
					item={{
						id: element.id,
						title: element.name,
						quantity: element.quantity,
						total: element.totalPrice,
						price: element.price
					}}
				/>
			);
		});
	}

	return (
		<Card className={classes.cart}>
			<h2>Your Shopping Cart</h2>
			<ul>{shoppingList}</ul>
		</Card>
	);
};

export default Cart;
