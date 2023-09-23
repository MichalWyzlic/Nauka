import { createSlice } from '@reduxjs/toolkit';
import { uiActions } from './ui-slice';

const cartSlice = createSlice({
	name: 'cart',
	initialState: {
		items: [],
		totalQuantity: 0,
		totalAmount: 0
	},
	reducers: {
		addItemToCart(state, action) {
			const newItem = action.payload;
			const existingItem = state.items.find(
				(item) => item.id === newItem.id
			);
			if (existingItem) {
				existingItem.quantity++;
				existingItem.totalPrice += existingItem.price;
				state.totalQuantity++;
				state.totalAmount += existingItem.price;
			} else {
				state.items.push({
					id: newItem.id,
					price: newItem.price,
					totalPrice: newItem.price,
					quantity: 1,
					name: newItem.name
				});
				state.totalQuantity += 1;
				state.totalAmount += newItem.price;
			}
		},
		removeItemFromCart(state, action) {
			const id = action.payload;
			const existingItem = state.items.find((item) => item.id === id);
			if (existingItem) {
				if (existingItem.quantity > 1) {
					existingItem.quantity--;
					existingItem.totalPrice -= existingItem.price;
					state.totalQuantity--;
					state.totalAmount -= existingItem.price;
				} else {
					state.totalQuantity += existingItem.quantity;
					state.totalAmount +=
						existingItem.quantity * existingItem.price;
					state.items = state.items.filter((item) => item.id !== id);
				}
			}
		}
	}
});

export function sendCartData(cart) {
	return async (dispatch) => {
		dispatch(
			uiActions.showNotification({
				status: 'pending',
				title: 'Sending...',
				message: 'Sending cart to server.'
			})
		);

		async function sendRequest() {
			const response = await fetch(
				'https://react-http-ae809-default-rtdb.europe-west1.firebasedatabase.app/cart.json',
				{
					method: 'PUT',
					body: JSON.stringify(cart)
				}
			);

			if (!response.ok) {
				throw new Error('Sending cart data failed.');
			}

			const responseData = await response.json();
		}

		try {
			await sendRequest();

			dispatch(
				uiActions.showNotification({
					status: 'success',
					title: 'Success...',
					message: 'Sending cart to server succeeded.'
				})
			);
		} catch (error) {
			dispatch(
				uiActions.showNotification({
					status: 'error',
					title: 'Error...',
					message: error.message
				})
			);
		}
	};
}

export const cartActions = cartSlice.actions;
export default cartSlice;
