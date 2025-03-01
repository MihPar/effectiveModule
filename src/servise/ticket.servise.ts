import { QueryTicketRepository } from "../queryRepository/queryTicketRepository";
import { TicketRepository } from "../repositories/ticket.repository";
import { StatusType, TicketDB } from "../types/ticketType";

export class TicketService {
	constructor(
		protected ticketReposiotry: TicketRepository,
		protected queryTicketRepository: QueryTicketRepository
	) {}
	async createNewTicket(title: string, description: string, status: string) {
		const newTicket = new TicketDB(title, description, "Новое")
		const createTicket: TicketDB = await this.ticketReposiotry.saveTicket(newTicket)
		return createTicket.getNewTicket()
	}

	async updateTicket(id: string, resolutionMessage: string): Promise<TicketDB> {
		const updateTicketById = await this.ticketReposiotry.updateTicket(id, resolutionMessage)
		return updateTicketById
	}

	async updateTicketByCancellationReason(id: string, cancellationReason: string): Promise<TicketDB> {
		const updateTicketById = await this.ticketReposiotry.updateTicketByCancell(id, cancellationReason)
		return updateTicketById
	}

	async cancellAllTicket(status: StatusType) {
		const updateAllTicketByEnd = await this.ticketReposiotry.updateTicketBy(status)
		return updateAllTicketByEnd
	}
}