import { TicketModel } from "../bd";
import { StatusType, Ticket, TicketDB } from "../types/ticketType";

export class TicketRepository {

	async saveTicket(newTicket: TicketDB): Promise<TicketDB> {
		const result = await TicketModel.create(newTicket)
		return newTicket
	}

	async updateTicket(id: string, resolutionMessage: string): Promise<TicketDB> {
		const updateTicket = await TicketModel.create({id, resolutionMessage, status: 'Завершено', updatedAt: new Date().toISOString()})
		return updateTicket
	}

	async updateTicketByCancell(id: string, cancellationReason: string): Promise<TicketDB> {
		const updateTicket = await TicketModel.create({id, cancellationReason, status: 'Отменено', updatedAt: new Date().toISOString()})
		return updateTicket
	}

	async updateTicketBy(status: StatusType): Promise<any> {
		const update = await TicketModel.updateMany(
			{ status: 'В работе' },
      		{ status: 'Отменено', updatedAt: new Date() }
		)
		return update
	}
}