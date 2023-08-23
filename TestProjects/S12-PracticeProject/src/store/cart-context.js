import React from 'react';

const CartContext = React.createContext({
	cartItems: [],
	amount: 0,
	addItem: (item) => {},
	removeItem: (id) => {}
});

export default CartContext;
