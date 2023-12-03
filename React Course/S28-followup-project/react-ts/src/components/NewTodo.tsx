import React, { useRef } from 'react';

import classes from './NewTodo.module.css';

const NewTodo: React.FC<{ onAddTodo: (text: string) => void }> = (props) => {
	const todoTextInputRef = useRef<HTMLInputElement>(null);

	function submitHandler(event: React.FormEvent) {
		event.preventDefault();

		const enteredText = todoTextInputRef.current!.value;

		if (enteredText.trim().length === 0) {
			//throw an error
			return;
		}

		props.onAddTodo(enteredText);
	}

	return (
		<form className={classes.form} onSubmit={submitHandler}>
			<label htmlFor='textInput'>Todo text</label>
			<input ref={todoTextInputRef} type='text' id='textInput' />
			<button>Add Todo</button>
		</form>
	);
};

export default NewTodo;
