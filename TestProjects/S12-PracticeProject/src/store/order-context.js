import React from 'react';

const OrderContext = React.createContext({
	isActive: false,
	name: '',
	surname: '',
	email: '',
	street: '',
	city: '',
	zipCode: ''
});

export default OrderContext;