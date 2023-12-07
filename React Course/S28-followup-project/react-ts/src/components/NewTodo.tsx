import React, { useRef, useContext } from 'react';
import {TodosContext, TodosContextObject} from '../store/todo-context';

import classes from './NewTodo.module.css';

const NewTodo: React.FC = (props) => {
	const todoTextInputRef = useRef<HTMLInputElement>(null);
	const context: TodosContextObject = useContext(TodosContext);

	function submitHandler(event: React.FormEvent) {
		event.preventDefault();

		const enteredText = todoTextInputRef.current!.value;

		if (enteredText.trim().length === 0) {
			//throw an error
			return;
		}

		context.addTodo(enteredText);
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
