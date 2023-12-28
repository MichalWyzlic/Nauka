import { useNavigate, Form, redirect } from 'react-router-dom';
import Modal from '../components/Modal';
import classes from './NewPost.module.css';

function NewPost(props) {

	const navigate = useNavigate();

	
	function onCloseHandler() {
		navigate('..');
	}

	return (
		<Modal>
			<Form method='post' className={classes.form}>
				<p>
					<label htmlFor='body'>Text</label>
					<textarea
						id='body'
						required
						rows={3}
						name='body'
					/>
				</p>
				<p>
					<label htmlFor='name'>Your name</label>
					<input
						type='text'
						id='name'
						required
						name='author'
					/>
				</p>
				<p className={classes.actions}>
					<button type='button' onClick={onCloseHandler}>
						Cancel
					</button>
					<button type='submit'>Submit</button>
				</p>
			</Form>
		</Modal>
	);
}

export default NewPost;

export async function action(data) {
	const formData = await data.request.formData();
	const newPost = Object.fromEntries(formData);

	const response = await fetch('http://localhost:8080/posts', {
		method: 'POST',
		body: JSON.stringify(newPost),
		headers: {
			'Content-Type': 'application/json'
		}
	});

	return redirect('..');
}
