import React from 'react';
import styles from './Header.module.css';
import Card from './Card';

function Header(props) {
	return (
		<header className={styles.header}>
			<h1>{props.title}</h1>
			<p>{'v ' + props.version}</p>
		</header>
	);
}

export default Header;
