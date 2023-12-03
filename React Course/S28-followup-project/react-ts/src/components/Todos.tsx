import React from 'react';
import Todo from '../models/todo';
import TodoListItem from './TodoListItem';

import classes from './Todos.module.css';

const Todos: React.FC<{ items: Todo[] }> = (props) => {
	return (
		<ul className={classes.todos}>
			{props.items.map((item) => {
				return <TodoListItem key={item.id} item={item}/>;
			})}
		</ul>
	
	);
};

export default Todos;
