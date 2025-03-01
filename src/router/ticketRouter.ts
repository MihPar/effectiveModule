import { Router } from "express";
import { ticketController } from "../composition-root/ticket.composition-root";
import { inputPostShortDescriptionValidator, inputTicketCancellationReasonValidator, inputTicketResolutionMessageValidator, inputTitleValidator } from "../validator/inputValidator";

export const ticketRouter = Router({})

ticketRouter.get('/', ticketController.getTickets.bind(ticketController))

ticketRouter.post('/create',
	inputTitleValidator,
	inputPostShortDescriptionValidator,
	 ticketController.createTicket.bind(ticketController)
)

ticketRouter.post('/:id/in-work', 
	ticketController.takeTicketInWork.bind(ticketController)
)

ticketRouter.post('/:id/complete',
	inputTicketResolutionMessageValidator,
	ticketController.completeTicket.bind(ticketController)
)

ticketRouter.post('/:id/cancel',
	inputTicketCancellationReasonValidator,
	ticketController.cancelTicket.bind(ticketController)
)

ticketRouter.delete('/cancel-all/in-work', 
	ticketController.cancelAllInProgressTickets.bind(ticketController)
)