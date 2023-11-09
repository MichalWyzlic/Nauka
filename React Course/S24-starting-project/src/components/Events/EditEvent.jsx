import {
	Link,
	redirect,
	useNavigation,
	useParams,
	useSubmit,
	useNavigate	
} from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';

import Modal from '../UI/Modal.jsx';
import EventForm from './EventForm.jsx';
import { fetchEvent, modifyEvent, queryClient } from '../../util/http.js';
import LoadingIndicator from '../UI/LoadingIndicator.jsx';
import ErrorBlock from '../UI/ErrorBlock.jsx';

export default function EditEvent() {
	const navigate = useNavigate();
	const { state } = useNavigation();
	const { id } = useParams();
	const submit = useSubmit();
	

	const { data, isPending, isError, error } = useQuery({
		queryKey: ['event', { id: id }],
		queryFn: ({ signal }) => fetchEvent({ id, signal }),
		staleTime: 5000,
		//gcTime: 1000
		enabled: id !== undefined
	});

	// const { mutate } = useMutation({
	// 	mutationFn: modifyEvent,
	// 	onMutate: async (data) => {
	// 		const newEvent = data.event;
	// 		await queryClient.cancelQueries({queryKey: ['event', { id: id }]});
	// 		const previousEvent = queryClient.getQueryData(['event', { id: id }]);
	// 		queryClient.setQueryData(['event', { id: id }],newEvent);
	// 		navigate(`/events/${id}`);
	// 		return {previousEvent: previousEvent}
	// 	},
	// 	onError: (error, data, context) => {
	// 		queryClient.setQueryData(['event', { id: id }], context.previousEvent);
	// 	},
	// 	onSettled: () => {
	// 		queryClient.invalidateQueries({queryKey: ['event', { id: id }]});
	// 	}
	// });

	function handleSubmit(formData) {
		// mutate({id: id, event: formData});
		// navigate('../');
		submit(formData, { method: 'PUT' });
	}

	function handleClose() {
		navigate('../');
	}

	let content = '';
	if (isPending) {
		content = (
			<div id='event-detail-content' className='center'>
				<p>Loading selected event...</p>
				<LoadingIndicator />
			</div>
		);
	}

	if (isError) {
		content = (
			<>
				<ErrorBlock
					title='Failed to load event details'
					message={
						error.info?.message ||
						'Failed to load event details. Please check your input and try again later.'
					}
				/>
				<div>
					<Link to='../' className='button'>
						OK
					</Link>
				</div>
			</>
		);
	}

	console.log(state);
	if (data) {
		content = (
			<EventForm inputData={data} onSubmit={handleSubmit}>
				{state === 'submitting' ? (
					<p>Sending data ...</p>
				) : (
					<>
						<Link to='../' className='button-text'>
							Cancel
						</Link>
						<button type='submit' className='button'>
							Update
						</button>
					</>
				)}
			</EventForm>
		);
	}

	return <Modal onClose={handleClose}>{content}</Modal>;
}

export function loader({ params }) {
	return queryClient.fetchQuery({
		queryKey: ['event', { id: params.id }],
		queryFn: ({ signal }) => fetchEvent({ id: params.id, signal })
	});
}

export async function action({ request, params }) {
	const formData = await request.formData();
	const updatedEventData = Object.fromEntries(formData);

	await modifyEvent({ id: params.id, event: updatedEventData });

	await queryClient.invalidateQueries(['events']);

	return redirect('../');
}
