import dayjs from 'dayjs'
import { pollSchema } from '../schema/pollSchema.js'

export function pollSchemaValidation(req, res, next) {
    const poll = { title: "", expireAt: "" }

    if (req.body.expireAt === undefined) {
        poll.title = req.body.title
        poll.expireAt = dayjs().add(30, 'day').format("YYYY-MM-DD HH:mm")

    } else {
        poll.title = req.body.title
        poll.expireAt = req.body.expireAt
    }

    const { error } = pollSchema.validate(poll, { abortEarly: false })

    if (error) {

        const errorMessages = error.details.map(detail => detail.message)
        return res.status(422).send(errorMessages)
    }

    res.locals.poll = poll
    next()
}