import { Response } from "express"
import { BodyTicketModel } from "../model/bodyTicket.model"
import { RequestTicketBody, RequestWithId } from "../types/types"
import { HTTP_STATUS } from "../utils/utils.status"
import { Ticket, TicketDB } from "../types/ticketType"
import { TicketService } from "../servise/ticket.servise"
import { TicketIdModel } from "../model/ticketId.model"
import { QueryTicketRepository } from "../queryRepository/queryTicketRepository"

export class TicketController {
	constructor(
		protected ticketService: TicketService,
		protected queryTicketRepository: QueryTicketRepository
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
			return res.status(HTTP_STATUS.CREATED_201).send(crateNewTicket)
		} catch(e) {
			return res.status(HTTP_STATUS.NOT_WORK_SERVER_500)
		}
	}

	async takeTicketInWork(req: RequestWithId<TicketIdModel>, res: Response<Ticket>) {
		try{
			const {id} = req.body
			const findTicketById = await this.queryTicketRepository.findTicketById(id)
		} catch(e) {
			return res.status(HTTP_STATUS.NOT_FOUND_404)
		}
	}

	async completeTicket() {}

	async cancelTicket() {}

	async cancelAllInProgressTickets() {}
}