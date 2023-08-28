import React, { useCallback, useEffect, useState } from 'react';
import useHTTP from './components/hooks/use-HTTP';

import Tasks from './components/Tasks/Tasks';
import NewTask from './components/NewTask/NewTask';

function App() {
	// const [isLoading, setIsLoading] = useState(false);
	// const [error, setError] = useState(null);
	const [tasks, setTasks] = useState([]);

	const { isLoading, error, sendRequest: fetchTasks } = useHTTP();

	useEffect(() => {
		const transformTask = (data) => {
			const loadedTasks = [];

			for (const taskKey in data) {
				loadedTasks.push({ id: taskKey, text: data[taskKey].text });
			}
			setTasks(loadedTasks);
		};

		fetchTasks(
			{
				url: 'https://react-http-ae809-default-rtdb.europe-west1.firebasedatabase.app/tasks.json'
			},
			transformTask
		);
	}, [fetchTasks]);

	const taskAddHandler = (task) => {
		setTasks((prevTasks) => prevTasks.concat(task));
	};

	return (
		<React.Fragment>
			<NewTask onAddTask={taskAddHandler} />
			<Tasks
				items={tasks}
				loading={isLoading}
				error={error}
				onFetch={fetchTasks}
			/>
		</React.Fragment>
	);
}

export default App;
