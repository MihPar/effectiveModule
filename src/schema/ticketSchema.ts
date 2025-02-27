import { WithId } from "mongodb";
import mongoose from "mongoose";
import { TicketDB } from "../types/ticketType";

export const TicketSchema = new mongoose.Schema<WithId<TicketDB>>({
	title: {type: String, require: true},
	description: {type: String, require: true},
	createdAt: {type: String, require: true},
	status: {type: String, enum: ['Новое', 'В работе', 'Завершено', 'Отменено'], default: 'Новое'},
	updatedAt: {type: Date, require: false},
	solution: {type: String, required: function () {return this.status === 'Завершено'}},
	cancellationReason: {type: String, required: function () {return this.status === 'Отменено'}},
})