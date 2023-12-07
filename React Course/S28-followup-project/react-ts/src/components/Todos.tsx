import React, {useContext} from 'react';
import {TodosContext, TodosContextObject} from '../store/todo-context';

import Todo from '../models/todo';
import TodoListItem from './TodoListItem';

import classes from './Todos.module.css';

const Todos: React.FC = (props) => {
	const context: TodosContextObject = useContext(TodosContext);


	return (
		<ul className={classes.todos}>
			{context.items.map((item) => {
				return <TodoListItem onRemoveTodo={context.removeTodo.bind(null, item.id)} key={item.id} item={item}/>;
			})}
		</ul>
	
	);
};

export default Todos;
