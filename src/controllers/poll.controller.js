import { pollCollection } from "../database/db.js";

export async function registerPoll(req, res) {
    const poll = res.locals.poll;
    
    try {
        await pollCollection.insertOne(poll)
        res.status(201).send("Enquete registrada com sucesso")
    } catch (error) {
        console.error(error)
        res.status(500).send("Houve um problema no servidor")
    }

}

export async function getPolls(req, res) {
    const polls = await pollCollection.find().toArray()
    
    try {
        res.status(201).send(polls)
    } catch (error) {
        console.error(error)
        res.status(500).send("Houve um problema no servidor")
    }

}