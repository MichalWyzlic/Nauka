import React from 'react';
import styles from './TitleSection.module.css';

function TitleSection(props) {
	return (
		<header className={`${styles['header']}`}>
			<img src={props.logoImg} alt='logo' />
			<h1>Investment Calculator</h1>
		</header>
	);
}

export default TitleSection;
