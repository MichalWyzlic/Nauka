import React from "react";
import styles from "./Input.module.css";

function Input(props){
	return(
		<div className={styles.input}>
			<label htmlFor={props.input.id}>{props.labelText}</label>
			<input {...props.input}/>
		</div>

	);
};

export default Input;