import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { useSelector, useDispatch } from 'react-redux';
import React, { useEffect } from 'react';
import Notification from './components/UI/Notification';
import { sendCartData } from './store/cart-slice';

let isInit = true;

function App() {
	const isVisible = useSelector((state) => {
		return state.ui.cartIsVisible;
	});

	const cart = useSelector((state) => state.cart);
	const dispatch = useDispatch();

	const notification = useSelector((state) => state.ui.notification);

	useEffect(() => {


		if (isInit) {
			isInit = false;
			return;
		}
		
		dispatch(sendCartData(cart));
		
	}, [cart, dispatch]);
	return (
		<React.Fragment>
			{notification && (
				<Notification
					status={notification.status}
					title={notification.title}
					message={notification.message}
				/>
			)}
			<Layout>
				{isVisible && <Cart />}
				<Products />
			</Layout>
		</React.Fragment>
	);
}

export default App;