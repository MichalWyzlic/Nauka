import React from 'react';
import ReactDOM from 'react-dom';
import styles from './Modal.module.css';

import Backdrop from './Backdrop';

function ModalOverlay(props) {
	return (
		<div
			className={`${styles.modal} ${
				props.className ? props.className : ''
			}`}
			onClick={props.onClose}
		>
			<div className={styles.content}>{props.children}</div>
		</div>
	);
};

function Modal(props) {
	return (
		<React.Fragment>
			{ReactDOM.createPortal(
				<Backdrop onConfirm={props.onClose} />,
				document.getElementById('backdrop-root')
			)}
			{ReactDOM.createPortal(
				<ModalOverlay>
					{props.children}
				</ModalOverlay>,
				document.getElementById('overlay-root')
			)}
		</React.Fragment>
	);
}

export default Modal;
