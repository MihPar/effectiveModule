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

export type TicketCancellationReason = {
	cancellationReason: string
}

export type TicketType = {
	id: string
	createdAt: string
	title: string,
	description: string,
	status: 'Новое' | 'В работе' | 'Завершено' | 'Отменено',
	updatedAt?: Date,
	solution?: string,
  	cancellationReason?: string,
}

export type QueryTicketRequest = {
	date: Date
	startDate: Date 
	endDate: Date
}