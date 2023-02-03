import { voteSchema } from "../schema/voteSchema.js"; 

export function voteSchemaValidation(req, res, next){
    const id = req.params.id
    console.log(id)
    const { error } = voteSchema.validate({id: id}, { abortEarly: false })

    if (error) {
        const errorMessages = error.details.map(detail => detail.message)
        return res.status(400).send(errorMessages)
    }

    res.locals.id = id
}