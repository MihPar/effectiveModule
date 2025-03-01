import { Response } from "express"
import { BodyTicketModel, TicketBodyModel, TicketResolutionMessage } from "../model/bodyTicket.model"
import { RequestTicketBody, RequestWithParamsAndBody } from "../types/types"
import { HTTP_STATUS } from "../utils/utils.status"
import { Ticket } from "../types/ticketType"
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
	async takeTicketInWork(req: RequestWithParamsAndBody<TicketIdModel, TicketBodyModel>, res: Response<Ticket | undefined>): Promise<Ticket | undefined> {
		try{
			const { id } = req.params;
			const {status, updatedAt} = req.body
			const findTicketById: Ticket | undefined = await this.queryTicketRepository.findTicketById(id, status, updatedAt)
			return res.status(HTTP_STATUS.OK_200).send(findTicketById)
		} catch(e) {
			return res.sendStatus(HTTP_STATUS.NOT_FOUND_404)
		}
	}

	// завершение обработки обращения
	async completeTicket(req: RequestWithParamsAndBody<TicketIdModel, TicketResolutionMessage>, res: Response<Ticket | undefined>) {
		const { id } = req.params;
    	const { resolutionMessage } = req.body;
		const findTicketById = await this.queryTicketRepository.findTicketWithId(id)
		if(!findTicketById) {
			return res.sendStatus(HTTP_STATUS.NOT_FOUND_404)
		} else {
			const updateTicket = await this.
		}
	}

	async cancelTicket() {}

	async cancelAllInProgressTickets() {}
}