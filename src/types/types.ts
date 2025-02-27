import { Request } from "express";

export type RequestTicketBody<T> = Request<{}, {}, T>