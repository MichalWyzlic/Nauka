import React from 'react';
import { Link } from 'react-router-dom';

import styles from './MainNavigation.module.css';

function MainNavigation() {
	return (
		<nav className={styles.header}>
			<ul className={styles.list}>
				<li>
					<Link to='/'>Home</Link>
				</li>
				<li>
					<Link to='/products'>Products</Link>
				</li>
			</ul>
		</nav>
	);
}

export default MainNavigation;
