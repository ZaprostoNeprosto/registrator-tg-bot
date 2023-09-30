import { MongoClient } from 'mongodb';

const url = process.env.DATABASE_TOKEN;
const client = new MongoClient(url);
const dbName = process.env.DATABASE_NAME;

async function mongodbConnection(data) {

  console.log('Connected successfully to the database server');
  const db = client.db(dbName);
  const collection = db.collection(`${data.from.id}`);
  await collection.insertOne({
    answers: {
      id: data.from.id,
      profileUserName: data.from.username,
      profileFirstName: data.from.first_name,
      profileLastName: data.from.last_name,
      firstName: data.firstName,
      middleName: data.middleName,
      lastName: data.lastName,
      company: data.company,
      position: data.position,
      adress: data.adress,
      email: data.email,
      phone: data.phone,
      interest: data.interest,
      days: data.days,
      practice: data.practice,
      date: data.formattedDate
    }
  })
    console.log('Successfully sent to the database.');
  return 'done.';
}

export default mongodbConnection;
