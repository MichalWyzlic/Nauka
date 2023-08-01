import React, { useState } from 'react';
import styles from './ErrorModal.module.css';
import Card from '../UI/Card/Card';
import Button from '../UI/Button/Button';

function ErrorModal(props) {
	function clickHandler(event) {
		props.hideModal();
	}

	return (
		<div
			className={
				styles.backdrop + (!props.hidden ? '' : ' ' + styles.hidden)
			}
			onClick={clickHandler.bind(this)}
		>
			<Card className={styles.modal}>
				<div
					onClick={(event) => {
						event.stopPropagation();
						console.log('Card onClick executed.');
					}}
				>
					<div className={styles.header}>
						<h2 className={styles.header}>Incorrect data</h2>
					</div>
					<p className={styles.content}>
						{props.errorMsg
							? props.errorMsg
							: 'Undefined error ocurred.'}
					</p>
					<Button
						className={styles.actions}
						onClick={clickHandler.bind(this)}
					>
						OK
					</Button>
				</div>
			</Card>
		</div>
	);
}

export default ErrorModal;
