import { Router } from 'express'
import { registerPoll } from '../controllers/poll.controller.js'
import { pollSchemaValidation } from '../middlewares/poll.middleware.js'

const routerPoll = Router()

routerPoll.post("/poll", pollSchemaValidation, registerPoll)
//routerPoll.get("/poll", signInBodyValidation, signIn)

export default routerPoll