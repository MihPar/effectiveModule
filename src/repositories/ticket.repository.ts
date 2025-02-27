import { TicketModel } from "../bd";
import { Ticket, TicketDB } from "../types/ticketType";

export class TicketRepository {

	async saveTicket(newTicket: TicketDB): Promise<TicketDB> {
		const result = await TicketModel.create(newTicket)
		return newTicket
	}
}