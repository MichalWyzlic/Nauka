import React, {useState} from 'react';

import './App.css';
import Todos from './components/Todos';
import Todo from './models/todo';
import NewTodo from './components/NewTodo';

function App() {
	const [todos, setTodos] = useState<Todo[]>([]);

	function addTodoHandler(text: string){	
		setTodos((currentState) => [...currentState, new Todo(text)]);
	} 
	return <div className='App'>
		<NewTodo onAddTodo={addTodoHandler}/>
		<Todos items={todos}/>
	</div>;
}

export default App;
