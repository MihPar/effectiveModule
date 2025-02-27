import dotenv from 'dotenv'
import { initApp } from './settings';
import { runDb } from './bd';
dotenv.config()

const app = initApp();

const port = process.env.PORT || 3000

const starting = async () => {
	await runDb()
	app.set('trust proxy', true)
	app.listen(port, function() {
		console.log(`Server was started at port ${port}`)
	})
}

starting();