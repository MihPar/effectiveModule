import { ObjectId } from "mongodb";
import { TicketModel } from "../bd";
import { FilterType, FilType, Ticket, TicketDB } from "../types/ticketType";

export class QueryTicketRepository {
	constructor() {}
	async findTicketById(id: string, status: string, updatedAt: Date): Promise<Ticket | undefined> {
		const getTickeById = await TicketModel.findOne({ _id: new ObjectId(id) }, status, updatedAt)
		return getTickeById ? TicketDB.getTicketById(getTickeById) : undefined
	}

	async findTicketWithId(id: string): Promise<Ticket | undefined> {
		const getTickeById = await TicketModel.findOne({ _id: new ObjectId(id) })
		return getTickeById ? TicketDB.getTicketById(getTickeById) : undefined
	}

	async getTicket(filter: any): Promise<any | undefined> {
		const findTicket: any = await TicketModel.find(filter)
		return findTicket ? TicketDB.getTicketById(findTicket) : undefined
	}
}