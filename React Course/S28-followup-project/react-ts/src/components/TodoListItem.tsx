import React from 'react';
import Todo from '../models/todo';

import classes from './TodoItem.module.css';

const TodoListItem: React.FC<{ item: Todo; onRemoveTodo: (event: React.MouseEvent) => void }> = (props) => {
	return (
		<li onClick={props.onRemoveTodo} className={classes.item}>{props.item.text}</li>
		
	);
};

export default TodoListItem;