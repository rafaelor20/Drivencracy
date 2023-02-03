import { MongoClient } from 'mongodb'
import dotenv from 'dotenv'
dotenv.config()

const mongoClient = new MongoClient(process.env.MONGO_URL)

try {
  await mongoClient.connect()
  console.log('Connection with DB is working')
} catch (error) {
  console.error(error)
}

const db = mongoClient.db()

export const pollCollection = db.collection('poll')
export const choiceCollection = db.collection('choice')
export const voteCollection = db.collection("vote")