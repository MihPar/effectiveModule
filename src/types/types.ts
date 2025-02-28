import { Request } from "express";

export type RequestTicketBody<T> = Request<{}, {}, T>
export type RequestWithId<T> = Request<T> 