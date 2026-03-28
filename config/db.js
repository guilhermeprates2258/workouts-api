import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const client = new MongoClient(process.env.MONGO_URI);

let db;

export async function connectDB() {
  try {
    await client.connect();
    db = client.db('workoutsDB');
    console.log('MongoDB conectado 🚀');
  } catch (error) {
    console.error(error);
  }
}

export { db };