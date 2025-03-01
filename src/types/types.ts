import { Request } from "express";

export type RequestTicketBody<T> = Request<{}, {}, T>
export type RequesParamstWithId<T> = Request<T> 