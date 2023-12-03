import React from 'react';
import Todo from '../models/todo';

import classes from './TodoItem.module.css';

const TodoListItem: React.FC<{ item: Todo }> = (props) => {
	return (
		<li className={classes.item}>{props.item.text}</li>
		
	);
};

export default TodoListItem;