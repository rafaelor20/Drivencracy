import { Router } from 'express'
import { getResult } from '../controllers/result.controller.js'

const routerResult = Router()

routerResult.get("/poll/:id/result", getResult)

export default routerResult