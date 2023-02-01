import { choiceSchema } from "../schema/choiceSchema.js";

export function choiceSchemaValidation(req, res, next){
    const choice  = req.body

    if (choice.title.length === 0){
        return res.status(422).send("A resposta não pode ser vazia")
    }

    const { error } = choiceSchema.validate(choice, { abortEarly: false })

    if (error) {
        const errorMessages = error.details.map(detail => detail.message)
        return res.status(400).send(errorMessages)
    }

    res.locals.choice = choice
    next()
}