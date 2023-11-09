import React, { useState } from 'react';
import { Link, Outlet, useParams, useNavigate } from 'react-router-dom';

import Header from '../Header.jsx';
import { useQuery, useMutation } from '@tanstack/react-query';
import { fetchEvent, queryClient, deleteEvent } from '../../util/http.js';
import LoadingIndicator from '../UI/LoadingIndicator.jsx';
import ErrorBlock from '../UI/ErrorBlock.jsx';
import Modal from '../UI/Modal.jsx';

export default function EventDetails() {
	const [isDeleting, setIsDeleting] = useState(false);

	const { id } = useParams();

	const { data, isPending, isError, error } = useQuery({
		queryKey: ['event', { id: id }],
		queryFn: ({ signal }) => fetchEvent({ id, signal }),
		staleTime: 5000,
		//gcTime: 1000
		enabled: id !== undefined
	});

	const navigate = useNavigate();

	const {
		mutate,
		isPending: isPendingDeletion,
		isError: isErrorDeletion,
		error: errorDeletion
	} = useMutation({
		mutationFn: deleteEvent,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['events'],
				refetchType: 'none'
			});
			navigate('/events');
		}
	});

	function handleStartDelete() {
		setIsDeleting(true);
	}

	function handleStopDelete() {
		setIsDeleting(false);
	}

	function deleteHandler() {
		mutate({ id: data.id });
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

	if (!isPending && !isError) {
		content = (
			<>
				<article id='event-details'>
					<header>
						<h1>{data.title}</h1>
						<nav>
							<button onClick={handleStartDelete}>Delete</button>
							<Link to='edit'>Edit</Link>
						</nav>
					</header>
					<div id='event-details-content'>
						<img
							src={`http://localhost:3000/${data.image}`}
							alt='This is the event image'
						/>
						<div id='event-details-info'>
							<div>
								<p id='event-details-location'>
									{data.location}
								</p>
								<time dateTime={`Todo-DateT$Todo-Time`}>
									{data.date} @ {data.time}
								</time>
							</div>
							<p id='event-details-description'>
								{data.description}
							</p>
						</div>
					</div>
				</article>
			</>
		);
	}

	if (isError) {
		content = (
			<ErrorBlock
				title='Failed to load event details'
				message={
					error.info?.message ||
					'Failed to load event details. Please check your input and try again later.'
				}
			/>
		);
	}

	return (
		<>
			{isDeleting && (
				<Modal onClose={handleStopDelete}>
					<h2>Are you sure?</h2>
					<p>
						Do you really want to delete? This action cannot be
						undone.
					</p>
					<div className='form-actions'>
						{isPendingDeletion && <p>Deleting, please wait ...</p>}
						{!isPendingDeletion && (
							<>
								<button
									onClick={handleStopDelete}
									className='button-text'
								>
									Cancel
								</button>
								<button
									onClick={deleteHandler}
									className='button'
								>
									Delete
								</button>
							</>
						)}
					</div>
					{isErrorDeleting && (
						<ErrorBlock
							title='Failed to delete event.'
							message={
								errorDeletion.info?.message ||
								'Failed to delete event, try later.'
							}
						/>
					)}
				</Modal>
			)}
			<Outlet />
			<Header>
				<Link to='/events' className='nav-item'>
					View all Events
				</Link>
			</Header>

			{content}
		</>
	);
}
