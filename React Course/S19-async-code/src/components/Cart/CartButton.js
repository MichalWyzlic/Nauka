import classes from './CartButton.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { uiActions } from '../../store/ui-slice';

const CartButton = (props) => {
	const itemsCount = useSelector(state => state.cart.totalQuantity);
	
	const dispatch = useDispatch();

	function clickHandler(event){
		dispatch(uiActions.toggle())
	}
	
  return (
    <button className={classes.button} onClick={clickHandler}>
      <span>My Cart</span>
      <span className={classes.badge}>{itemsCount}</span>
    </button>
  );
};

export default CartButton;
