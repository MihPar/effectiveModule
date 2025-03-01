export type BodyTicketModel = {
	title: string 
	description: string
	status: string
}

export type TicketBodyModel = {
	status: string
	updatedAt: Date
}

export type TicketResolutionMessage = {
	resolutionMessage: string
}