import { Router } from 'express'
import { registerPoll, getPolls} from '../controllers/poll.controller.js'
import { pollSchemaValidation } from '../middlewares/poll.middleware.js'

const routerPoll = Router()

routerPoll.post("/poll", pollSchemaValidation, registerPoll)
routerPoll.get("/poll", getPolls)

export default routerPoll