import ProductItem from './ProductItem';
import classes from './Products.module.css';

import { useSelector, useDispatch } from 'react-redux';

const Products = (props) => {
	const products = useSelector((state) => {
		return state.product;
	});



	const productsUL = [];
	products.forEach((element) => {
		productsUL.push(
			<ProductItem
				key={element.id}
				title={element.name}
				price={element.price}
				description={element.description}
			/>
		);
	});

	const dispatch = useDispatch();
	return (
		<section className={classes.products}>
			<h2>Buy your favorite products</h2>
			{/* <ul>
			<ProductItem
					title='Test'
					price={6}
					description='This is the firs product - fabulous!'
				/>
			</ul> */}
			{productsUL}
		</section>
	);
};

export default Products;
