import { TicketController } from "../controller/ticket.controller";
import { QueryTicketRepository } from "../queryRepository/queryTicketRepository";
import { TicketRepository } from "../repositories/ticket.repository";
import { TicketService } from "../servise/ticket.servise";

export const ticketReposiotry = new TicketRepository()
export const queryTicketRepository = new QueryTicketRepository()

export const ticketService = new TicketService(ticketReposiotry, queryTicketRepository)


export const ticketController = new TicketController(ticketService, queryTicketRepository)