import React from 'react';
import { useNavigate } from 'react-router-dom';

import classes from './Modal.module.css';

function Modal(props) {
	const navigate = useNavigate();

	function onCloseHandler(){
		navigate('..');
	}

	return (
		<>
			<div className={classes.backdrop} onClick={onCloseHandler}/>
			<dialog open={true} className={classes.modal}>{props.children}</dialog>
		</>
	);
}

export default Modal;
