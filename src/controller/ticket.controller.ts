import { Response } from "express"
import { BodyTicketModel } from "../model/bodyTicket.model"
import { RequestTicketBody } from "../types/types"
import { HTTP_STATUS } from "../utils/utils.status"
import { Ticket, TicketDB } from "../types/ticketType"
import { TicketService } from "../servise/ticket.servise"

export class TicketController {
	constructor(
		protected ticketService: TicketService
	) {}

	async getTickets() {
		console.log("Hello world")
	}

	async createTicket(req: RequestTicketBody<BodyTicketModel>, res: Response<Ticket>) {
		try {
			const {title, description, status = "Новое"} = req.body
			if(!title || !description) {
				res.sendStatus(HTTP_STATUS.NOT_FOUND_404);
			}
			const crateNewTicket: Ticket = await this.ticketService.createNewTicket(title, description, status)
		} catch(e) {}
	}

	async takeTicketInWork() {}

	async completeTicket() {}

	async cancelTicket() {}

	async cancelAllInProgressTickets() {}
}