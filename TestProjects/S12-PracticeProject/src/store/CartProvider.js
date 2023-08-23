import React, {useReducer} from "react";
import CartContext from "./cart-context";

const defaultCartState = {
	items: [],
	totalAmount: 0
};

function cartReducer(state, action){

	if(action.type === 'ADD'){
		// for( let i = 0, i < state.items.length, i++){
			// if(state[i].id === action.item.id){
			// 	state[i].amount
			// } else {
				const updatedItems = state.items.concat(action.item);
				const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;
			// }

		// }
		return {items: updatedItems, totalAmount: updatedTotalAmount};

	}
	return defaultCartState;
};

function CartProvider(props) {
	const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState)
	function addItemToCartHandler(item){
		dispatchCartAction({type: 'ADD', item: item });		
	}

	function removeItemFromCartHandler(id){
		dispatchCartAction({type: 'REMOVE', id: id });
	}

	const cartContext = {
		items: cartState.items,
		totalAmount: cartState.totalAmount,
		addItem: addItemToCartHandler,
		removeItem: removeItemFromCartHandler
	}
	return <CartContext.Provider value={cartContext}>
		{props.children}
	</CartContext.Provider>;

};

export default CartProvider;