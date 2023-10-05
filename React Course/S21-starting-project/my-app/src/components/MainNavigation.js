import React from 'react';
import { NavLink } from 'react-router-dom';

import styles from './MainNavigation.module.css';

function MainNavigation() {
	return (
		<nav className={styles.header}>
			<ul className={styles.list}>
				<li>
					<NavLink
						to=''
						className={({ isActive }) =>
							isActive ? styles.active : ''
						}
					>
						Home
					</NavLink>
				</li>
				<li>
					<NavLink
						to='products'
						className={({ isActive }) =>
							isActive ? styles.active : ''
						}
					>
						Products
					</NavLink>
				</li>
			</ul>
		</nav>
	);
}

export default MainNavigation;
