import Card from '../UI/Card';
import classes from './ProductItem.module.css';
import { useSelector, useDispatch } from 'react-redux';
import cartSlice, { cartActions } from '../../store/cart-slice';

const ProductItem = (props) => {
	const { id, title, price, description } = props;
	const products = useSelector((state) => {
		return state.product;
	});
	const cart= useSelector((state) => state.cart);

	const dispatch = useDispatch();

	function addToCartItem() {
		const product = products.find(item => item.name === title);
		if(product){
			dispatch(cartActions.addItemToCart(product));
		}

		//console.log(cart);

	}

	return (
		<li className={classes.item} key={id}>
			<Card>
				<header>
					<h3>{title}</h3>
					<div className={classes.price}>${price.toFixed(2)}</div>
				</header>
				<p>{description}</p>
				<div className={classes.actions}>
					<button onClick={addToCartItem}>Add to Cart</button>
				</div>
			</Card>
		</li>
	);
};

export default ProductItem;
