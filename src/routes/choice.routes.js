import { Router } from 'express'
import { registerChoice, getChoices } from '../controllers/choice.controller.js'
import { choiceSchemaValidation } from '../middlewares/choice.middleware.js'

const routerChoice = Router()


routerChoice.post("/choice", choiceSchemaValidation, registerChoice) 
routerChoice.get("/poll/:id/choice", getChoices)

export default routerChoice