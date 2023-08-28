import { useState } from 'react';

import Section from '../UI/Section';
import TaskForm from './TaskForm';
import useHTTP from '../hooks/use-HTTP';

const NewTask = (props) => {

	function transformTask(taskText, data) {
		const generatedId = data.name; // firebase-specific => "name" contains generated id
		const createdTask = { id: generatedId, text: taskText };

		props.onAddTask(createdTask);
	}

	const { isLoading, error, sendRequest: sendTaskRequest } = useHTTP();

	const enterTaskHandler = async (taskText) => {
		sendTaskRequest({
			url: 'https://react-http-ae809-default-rtdb.europe-west1.firebasedatabase.app/tasks.json',
			method: 'POST',
			body: { text: taskText },
			headers: {
				'Content-Type': 'application/json'
			}
		}, transformTask.bind(null, taskText));
	};

	return (
		<Section>
			<TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
			{error && <p>{error}</p>}
		</Section>
	);
};

export default NewTask;
