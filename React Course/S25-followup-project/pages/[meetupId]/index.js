import React from 'react';
import Head from 'next/head';

import { MongoClient, ObjectId } from 'mongodb';

import MeetupDetail from '../../components/meetups/MeetupDetail';

//import { DUMMY_MEETUPS } from '../index';

function MeetupDetailsPage(props) {
	console.log(props);
	return (
		<React.Fragment>
			<Head>
				<title>{props.meetupData.title}</title>
				<meta
					name='description'
					content={props.meetupData.description}
				/>
			</Head>
			<MeetupDetail
				image={props.meetupData.image}
				title={props.meetupData.title}
				address={props.meetupData.address}
				description={props.meetupData.description}
			/>
		</React.Fragment>
		
	);
}

export async function getStaticPaths() {
	const client = await MongoClient.connect(
		'mongodb+srv://TestMW:Profesor1@cluster0.qyurkhn.mongodb.net/?retryWrites=true&w=majority'
	);
	const db = client.db();

	const meetupsCollection = db.collection('meetups');

	const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

	const paths = meetups.map((meetup) => {
		return {
			params: {
				meetupId: meetup._id.toString()
			}
		};
	});
	//console.log(paths);

	client.close();

	return {
		fallback: 'blocking',
		paths: paths
	};
}

export async function getStaticProps(context) {
	const meetupId = context.params.meetupId;
	console.log(meetupId);
	const client = await MongoClient.connect(
		'mongodb+srv://TestMW:Profesor1@cluster0.qyurkhn.mongodb.net/?retryWrites=true&w=majority'
	);
	const db = client.db();

	const meetupsCollection = db.collection('meetups');
	const newId = new ObjectId(meetupId);

	const selectedMeetup = await meetupsCollection.findOne({ _id: newId });

	console.log(selectedMeetup);

	client.close();

	return {
		props: {
			meetupData: {
				title: selectedMeetup.title,
				image: selectedMeetup.image,
				address: selectedMeetup.address,
				description: selectedMeetup.description,
				id: selectedMeetup._id.toString()
			}
		}
	};
}
export default MeetupDetailsPage;
