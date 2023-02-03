import dayjs from "dayjs";
import { ObjectId } from "mongodb";
import { voteCollection, choiceCollection} from "../database/db.js";

export async function vote(req, res){
    const id = req.params.id

    const vote = {
        createdAt: dayjs().format("YYYY-MM-DD HH:MM"),
        choiceId: id
    }

    try {
        await voteCollection.insertOne(vote)
        res.status(201).send("Voto registrado com sucesso")
    } catch (error) {
        console.error(error)
        res.status(500).send("Houve um problema no servidor")
    }
}