import { Router } from "express";
import { ticketController } from "../composition-root/ticket.composition-root";

export const ticketRouter = Router({})

ticketRouter.get('/', ticketController.getTickets.bind(ticketController))

ticketRouter.post('/create', ticketController.createTicket.bind(ticketController));

ticketRouter.post('/:id/in-work', ticketController.takeTicketInWork.bind(ticketController));

ticketRouter.post('/:id/complete', ticketController.completeTicket.bind(ticketController));

ticketRouter.post('/:id/cancel', ticketController.cancelTicket.bind(ticketController));

ticketRouter.delete('/cancel-all/in-work', ticketController.cancelAllInProgressTickets.bind(ticketController));