import { ObjectId } from "mongodb"

export class TicketDB {
	public _id: ObjectId
	public createdAt: string
	constructor(
		public title: string,
		public description: string,
		public status: 'Новое' | 'В работе' | 'Завершено' | 'Отменено',
		public updatedAt?: Date,
		public solution?: string,
  		public cancellationReason?: string,
	) {
		this.createdAt = new Date().toISOString()
		this._id = new ObjectId()
	}

		async getNewTicket(): Promise<Ticket> {
			return {
				createdAt: this.createdAt,
				title: this.title,
				description: this.description,
				status: 'Новое',
		}
	}
}

export class Ticket {
	public createdAt: string
	constructor(
		public title: string,
		public description: string,
		public status: 'Новое' | 'В работе' | 'Завершено' | 'Отменено',
		public updatedAt?: Date,
		public solution?: string,
  		public cancellationReason?: string,
	) {
		this.createdAt = new Date().toISOString()
	}
}