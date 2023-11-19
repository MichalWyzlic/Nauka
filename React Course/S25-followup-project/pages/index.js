import React, { useEffect, useState } from 'react';
import Head from 'next/head';

import { MongoClient } from 'mongodb';

import MeetupList from '../components/meetups/MeetupList';

function HomePage(props) {
	return (
		<React.Fragment>
			<Head>
				<title>React meetups project</title>
				<meta 
					name='description'
					content='Browse a huge list of react meetups'
				/>
			</Head>
			<MeetupList meetups={props.meetups} />;
		</React.Fragment>
	);
}

export async function getStaticProps() {
	const client = await MongoClient.connect(
		'mongodb+srv://TestMW:Profesor1@cluster0.qyurkhn.mongodb.net/?retryWrites=true&w=majority'
	);
	const db = client.db();
	const meetupsCollection = db.collection('meetups');
	const results = await meetupsCollection.find().toArray();
	const meetups = results.map((meetup) => {
		return {
			title: meetup.title,
			image: meetup.image,
			address: meetup.address,
			description: meetup.description,
			id: meetup._id.toString()
		};
	});
	client.close();

	return {
		props: {
			meetups: meetups
		},
		revalidate: 10
	};
}

export default HomePage;
