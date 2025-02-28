import { ObjectId } from "mongodb";
import { TicketModel } from "../bd";
import { Ticket, TicketDB } from "../types/ticketType";

export class QueryTicketRepository {
	constructor() {}
	async findTicketById(id: string): Promise<Ticket | undefined> {
		const getTickeById = await TicketModel.findOne({ _id: new ObjectId(id) })
		return getTickeById ? TicketDB.getTicketById(getTickeById) : undefined
	}
}