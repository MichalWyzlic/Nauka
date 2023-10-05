import logo from './logo.svg';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './pages/Home';
import ProductsPage from './pages/Products';
import RootLayout from './pages/Root';
import ErrorPage from './pages/Error';
import ProductDetailPage from './pages/ProductDetail';

const router = createBrowserRouter([
	{
		path: '/',
		errorElement: <ErrorPage/>,
		element: <RootLayout />,
		children: [
			{ path: '', element: <HomePage />, errorElement: <ErrorPage/>},
			{ path: 'products', element: <ProductsPage />, errorElement: <ErrorPage/> },
			{ path: 'products/:productId', element: <ProductDetailPage/>}
		]
	}
]);

function App() {
	return <RouterProvider router={router} />;
}

export default App;
