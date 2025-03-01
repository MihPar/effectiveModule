import { body } from "express-validator";

export const inputTitleValidator = body('title')
	.isString()
	.notEmpty()
	.trim()
	.isLength({ min: 1, max: 30 })
	.withMessage("Name should be length from 1 to 30 symbols");

export const inputPostShortDescriptionValidator = body('description')
	.isString()
	.notEmpty()
	.trim()
	.isLength({ min: 1, max: 100 })
	.withMessage("Descriptionme should be length from 1 to 100 symbols");

export const inputTicketResolutionMessageValidator = body('resolutionMessage')
	.isString()
	.notEmpty()
	.trim()
	.isLength({ min: 1, max: 100 })
	.withMessage("Descriptionme should be length from 1 to 100 symbols");

export const inputTicketCancellationReasonValidator = body('cancellationReason')
	.isString()
	.notEmpty()
	.trim()
	.isLength({ min: 1, max: 100 })
	.withMessage("Descriptionme should be length from 1 to 100 symbols");