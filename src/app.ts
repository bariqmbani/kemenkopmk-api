/**
 * @todo
 * - connect to db
 * - create models
 * - update controllers
 */

// dependencies
import express, { Application, Request, Response, NextFunction } from 'express'
import bodyParser from 'body-parser'
import path from 'path'
import dotenv from 'dotenv'

// importing routes
import authRoute from './routes/auth.route'
import userRoute from './routes/user.route'
import reportRoute from './routes/report.route'

dotenv.config()

const app: Application = express()
declare global {
	namespace Express {
		interface Request {
			user: any
		}
	}
	type FnController = (
		req: Request,
		res: Response,
		next: NextFunction
	) => Response | void
}

app.set('port', process.env.PORT || 5000)

// middlewares
app.use(bodyParser.json())

// serve static folder
app.use('/api/docs', express.static(path.join(__dirname, '../public')))

// routes middleware
app.use('/api/auth', authRoute)
app.use('/api/user', userRoute)
app.use('/api/report', reportRoute)

export default app
