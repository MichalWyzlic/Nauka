import React, {useState} from "react";

import Todo from "../models/todo";

export type TodosContextObject = {
	items: Todo[];
	addTodo: (text: string) => void;
	removeTodo: (id: string) => void;
};

export const TodosContext = React.createContext<TodosContextObject>({
	items: [],
	addTodo: (text: string) => {},
	removeTodo: (id: string) => {}
});

const TodosContextProvider: React.FC<{ children: React.ReactNode }> = (props) => {
	const [todos, setTodos] = useState<Todo[]>([]);

	function addTodoHandler(text: string) {
		setTodos((currentState) => [...currentState, new Todo(text)]);
	}

	function removeTodoHandler(id: string) {
		console.log(id);
		setTodos((currentState) => {
			return currentState.filter((item) => item.id !== id);
		});
	}

	const contextValue: TodosContextObject = {
		items: todos,
		addTodo: addTodoHandler,
		removeTodo: removeTodoHandler
	};

	return <TodosContext.Provider value={contextValue}>
		{props.children}
	</TodosContext.Provider>
}

export default TodosContextProvider;