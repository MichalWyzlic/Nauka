import { createSlice } from '@reduxjs/toolkit';

const initProducts = [
	{
		id: 'product 1 - 11',
		price: 11,
		description: 'This is the first product!',
		name: 'Product 1'
	},
	{
		id: 'product 2 - 22',
		price: 22,
		description: 'This is the second product!',
		name: 'Product 2'
	},
	{
		id: 'product 3 - 33',
		price: 33,
		description: 'This is the third product!',
		name: 'Product 3'
	}
];

const productSlice = createSlice({
	name: 'product',
	initialState: initProducts,
	reducers: {
		add(state, action) {
			const newItem = action.payload;
			const existingItem = state.products.find(
				(item) => item.id === newItem.id
			);

			if (!existingItem) {
				state.products.push({
					id: newItem.id,
					price: newItem.price,
					description: newItem.description,
					name: newItem.name
				});
				
			}
		},
		removeEventListener(state, action) {
			const id = action.payload;
			state.products = state.products.filter((item) => item.id !== id);
		}
	}
});

export const productActions = productSlice.actions;
export default productSlice;
