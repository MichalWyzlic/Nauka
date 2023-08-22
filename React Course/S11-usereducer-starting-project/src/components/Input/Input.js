import React, {useRef, useImperativeHandle} from 'react';
import classes from './Input.module.css';

const Input = React.forwardRef((props, reference) => {
	const inputRef = useRef();

	function activate(){
		inputRef.current.focus();
	}

	useImperativeHandle(reference, () =>{
		return {
			focus: activate
		};
	});

	return (
		<div
			className={`${classes.control} ${
				props.isValid === false ? classes.invalid : ''
			}`}
		>
			<label htmlFor={props.id}>{props.labelText}</label>
			<input
				ref={inputRef}
				type={props.inputType}
				id={props.id}
				value={props.inputValue}
				onChange={props.inputOnChange}
				onBlur={props.inputOnBlur}
			/>
		</div>
	);
});

export default Input;
