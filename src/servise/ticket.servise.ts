import { TicketRepository } from "../repositories/ticket.repository";
import { TicketDB } from "../types/ticketType";

export class TicketService {
	constructor(
		protected ticketReposiotry: TicketRepository
	) {}
	async createNewTicket(title: string, description: string, status: string) {
		const newTicket = new TicketDB(title, description, "Новое")
		const createTicket: TicketDB = await this.ticketReposiotry.saveTicket(newTicket)
		return createTicket.getNewTicket()
	}

}