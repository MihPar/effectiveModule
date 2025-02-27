import express from 'express'
import  cookieParser  from 'cookie-parser';
import { ticketRouter } from './router/ticketRouter';

export const initApp =()=>{
	const app = express()

	app.use(express.json());
	app.use(cookieParser())

	app.use('/ticket', ticketRouter)
	
	app.get('/test', (req, res) => {
		res.json({ message: 'This is a test endpoint!' });
	});
return app;
}