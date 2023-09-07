import React, {useReducer} from "react";
import CartContext from "./cart-context";

const defaultCartState = {
	items: [],
	totalAmount: 0
};

function cartReducer(state, action){
	if (action.type === 'ADD') {
		const updatedTotalAmount =
			state.totalAmount + action.item.price * action.item.amount;
		let i = 0;
		for (i = 0; i < state.items.length; i++) {
			if (state.items[i].id === action.item.id) {
				state.items[i].amount += action.item.amount;
				const updatedItems = state.items.concat([]);
				return { items: updatedItems, totalAmount: updatedTotalAmount };
			}
		}
		const updatedItems = state.items.concat(action.item);

		return { items: updatedItems, totalAmount: updatedTotalAmount };
	} else if (action.type === 'REMOVE') {
		let i = 0;
		for (i = 0; i < state.items.length; i++) {
			if (state.items[i].id === action.id) {
				let updatedItems = [];
				const updatedTotalAmount =
					state.totalAmount - state.items[i].price;
				if (state.items[i].amount > 1) {
					state.items[i].amount --;
					updatedItems = [...state.items];
					
				} else {
					updatedItems = state.items.toSpliced(i, 1);
				}
				return {
					items: updatedItems,
					totalAmount: updatedTotalAmount
				};
			}
		}
	}else if (action.type === 'RESET') {
		return {
			items: [],
			totalAmount: 0
		};	
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

	function resetCart(){
		dispatchCartAction({type: 'RESET'});
	}

	const cartContext = {
		items: cartState.items,
		totalAmount: cartState.totalAmount,
		addItem: addItemToCartHandler,
		removeItem: removeItemFromCartHandler,
		resetCart: resetCart
	}
	return <CartContext.Provider value={cartContext}>
		{props.children}
	</CartContext.Provider>;

};

export default CartProvider;