import { Router } from 'express'
import { vote } from '../controllers/vote.controller.js'

const routerVote = Router()

routerVote.post("/choice/:id/vote", vote)

export default routerVote