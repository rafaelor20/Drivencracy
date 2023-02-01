import dayjs from "dayjs";
import { pollCollection, choiceCollection } from "../database/db.js";
import { ObjectId } from "mongodb";


export async function registerChoice(req, res) {
    const choice = res.locals.choice
    const poll = await pollCollection.findOne({ _id: ObjectId(res.locals.choice.pollId) })
    const isNewChoice = await choiceCollection.findOne({ title: choice.title })
    const now = dayjs()

    try {
        if (poll === null) {
            res.status(404).send("Esta enquete não existe")
        } else if (isNewChoice !== null) {
            res.status(409).send("Esta reposta já existe")
        } else if (now.diff(poll.expireAt) > 0) {
            res.status(403).send("Esta enquete já terminou")
        } else {
            await choiceCollection.insertOne(choice)
            res.status(201).send("Escolha registrada com sucesso")
        }

    } catch (error) {
        console.error(error)
        res.status(500).send("Houve um problema no servidor")
    }

}