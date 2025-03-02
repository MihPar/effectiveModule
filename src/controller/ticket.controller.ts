import { NextFunction, Request, Response } from 'express';
import { BodyTicketModel, QueryTicketRequest, TicketBodyModel, TicketCancellationReason, TicketResolutionMessage } from "../model/bodyTicket.model"
import { QueryRequest, RequestTicketBody, RequestWithParamsAndBody } from "../types/types"
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

	async getTickets(req: QueryRequest<QueryTicketRequest>, res: Response<Ticket>): Promise<void> {
		try {
			const { date, startDate, endDate } = req.query
			let filter = {}
			if(date) {
				filter = { createdAt: new Date(date) }
			} else if(startDate && endDate) {
				filter = {
					createdAt: {
					  $gte: new Date(startDate),
					  $lte: new Date(endDate)
					}
				  }
			}
			const requestTicket = await this.queryTicketRepository.getTicket(filter)
			res.status(HTTP_STATUS.OK_200).send(requestTicket)
			
		} catch(e) {
			res.sendStatus(HTTP_STATUS.BAD_REQUEST_400)
		}
		console.log("Hello world")
	}

	async createTicket(req: RequestTicketBody<BodyTicketModel>, res: Response<Ticket>)
	: Promise<void> 
	{
		try {
			const {title, description, status = "Новое"} = req.body
			if(!title || !description) {
				res.sendStatus(HTTP_STATUS.NOT_FOUND_404);
			}
			const crateNewTicket: Ticket = await this.ticketService.createNewTicket(title, description, status)
			res.status(HTTP_STATUS.CREATED_201).send(crateNewTicket)
		} catch(e) {
			res.status(HTTP_STATUS.BAD_REQUEST_400)
		}
	}
	
  // Взять обращение в работу
	async takeTicketInWork(req: RequestWithParamsAndBody<TicketIdModel, TicketBodyModel>, res: Response<Ticket | null>) {
		try{
			const { id } = req.params;
			const {status, updatedAt} = req.body
			const findTicketById: Ticket | undefined = await this.queryTicketRepository.findTicketById(id, status, updatedAt)
			res.status(HTTP_STATUS.OK_200).send(findTicketById)
		} catch(e) {
			res.sendStatus(HTTP_STATUS.NOT_FOUND_404)
		}
	}

	// завершение обработки обращения
	async completeTicket(req: RequestWithParamsAndBody<TicketIdModel, TicketResolutionMessage>, res: Response<TicketDB | null>) {
		const { id } = req.params;
    	const { resolutionMessage } = req.body;
		const findTicketById = await this.queryTicketRepository.findTicketWithId(id)
		if(!findTicketById) {
			res.sendStatus(HTTP_STATUS.NOT_FOUND_404)
		} 
		const updateTicket = await this.ticketService.updateTicket(id, resolutionMessage)
		res.status(HTTP_STATUS.CREATED_201).send(updateTicket)
	}

	async cancelTicket(req: RequestWithParamsAndBody<TicketIdModel, TicketCancellationReason>, res: Response<TicketDB | null>) {
		const { id } = req.params;
    	const { cancellationReason } = req.body;
		const findTicketById = await this.queryTicketRepository.findTicketWithId(id)
		if(!findTicketById) {
			res.sendStatus(HTTP_STATUS.NOT_FOUND_404)
		} 
		const updateReq = await this.ticketService.updateTicketByCancellationReason(id, cancellationReason)
		res.status(HTTP_STATUS.CREATED_201).send(updateReq)
	}

	async cancelAllInProgressTickets(req: Request, res: Response) {
		try {
			const cancellAll = await this.ticketService.cancellAllTicket({status: 'Отменено'})
			res.status(HTTP_STATUS.OK_200).send(cancellAll)
		} catch(e) {
			res.sendStatus(HTTP_STATUS.BAD_REQUEST_400)
		}
		
	}
}