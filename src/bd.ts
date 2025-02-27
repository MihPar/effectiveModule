import {MongoClient} from 'mongodb'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import { TicketDB } from './types/ticketType'
import { TicketSchema } from './schema/ticketSchema'

dotenv.config()

// const mongoURL = process.env.MONGO_URL || 'mongodb://0.0.0.0:27017'
const mongoURL = 'mongodb://0.0.0.0:27017'


export const client = new MongoClient(mongoURL)
// export const bd = client.db('bd')
export async function runDb() {
	try {
		await mongoose.connect(mongoURL)
		console.log('Connect successfully to mongo server')
	} catch(e) {
		console.log('Cann`t to connect to db:', e)
		await mongoose.disconnect()
	}
}
export const stop = async function() {
	await client.close()
}

export const TicketModel = mongoose.model<TicketDB>('ticket', TicketSchema) 