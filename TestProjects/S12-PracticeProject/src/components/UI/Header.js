import React from "react";
import styles from './Header.module.css';
import mealsImage from '../../assets/meals.jpg';
import HeaderCartButton from "./HeaderCartButton";

function Header(props){
	return (
		<React.Fragment>
			<header className={styles.header}>
				<h1>Rect food ordering site</h1>
				<HeaderCartButton showCart={props.showCart}/>
			</header>
			<div className={styles['main-image']}>
				<img src={mealsImage} alt='A table with many plates.'/>
			</div>
		</React.Fragment>
	);
};

export default Header;