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
				id: this._id,
				createdAt: this.createdAt,
				title: this.title,
				description: this.description,
				status: 'Новое',
		}
	}
		static async getTicketById(getTickeById: TicketDB): Promise<Ticket> {
			return {
				id: getTickeById._id,
				createdAt: getTickeById.createdAt,
				title: getTickeById.title,
				description: getTickeById.description,
				status: getTickeById.status,
			}
		}
}

export class Ticket {
	public id: ObjectId
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
		this.id = new ObjectId()
	}
}

export type StatusType = {
	status: string
}