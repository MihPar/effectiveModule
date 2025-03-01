import { Response } from "express"
import { BodyTicketModel } from "../model/bodyTicket.model"
import { RequesParamstWithId, RequestTicketBody, RequestWithId } from "../types/types"
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
	
  // Взять обращение в работу
	async takeTicketInWork(req: RequesParamstWithId<TicketIdModel>, res: Response<Ticket | undefined>): Promise<Ticket | undefined> {
		try{
			const {id, status, updatedAt} = req.body
			const findTicketById: Ticket | undefined = await this.queryTicketRepository.findTicketById(id, status, updatedAt)
			return res.status(HTTP_STATUS.OK_200).send(findTicketById)
		} catch(e) {
			return res.sendStatus(HTTP_STATUS.NOT_FOUND_404)
		}
	}

	// завершение обработки обращения
	async completeTicket() {}

	async cancelTicket() {}

	async cancelAllInProgressTickets() {}
}