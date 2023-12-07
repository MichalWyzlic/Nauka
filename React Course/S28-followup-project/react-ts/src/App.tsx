import React, { useState } from 'react';

import TodosContextProvider from './store/todo-context';

import './App.css';
import Todos from './components/Todos';
import Todo from './models/todo';
import NewTodo from './components/NewTodo';

function App() {
	
	return (
		<TodosContextProvider>
		<div className='App'>
			<NewTodo />
			<Todos />
		</div>
		</TodosContextProvider>
	);
}

export default App;
