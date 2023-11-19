import { MongoClient } from 'mongodb';

async function handler(req, res) {
	if (req.method === 'POST') {
		
		const data = JSON.parse(req.body);
		const { title, image, address, description } = data;

		const client = await MongoClient.connect('mongodb+srv://TestMW:Profesor1@cluster0.qyurkhn.mongodb.net/?retryWrites=true&w=majority');
		const db = client.db();

		const meetupsCollection = db.collection('meetups');

		const result = await meetupsCollection.insertOne(data);

		client.close();

		res.status(201).json({message: 'Meetup successfully inserted.'})

	}
}

export default handler;
