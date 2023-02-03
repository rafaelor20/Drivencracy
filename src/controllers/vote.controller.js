import dayjs from "dayjs";
import { ObjectId } from "mongodb";
import { voteCollection, choiceCollection, pollCollection} from "../database/db.js";

export async function vote(req, res){
    const id = req.params.id

    const vote = {
        createdAt: dayjs().format("YYYY-MM-DD HH:MM"),
        choiceId: id
    }

    const choice = await findChoice(vote.choiceId)
    
    if(choice === undefined || choice === null){
        res.status(404).send("Esta resposta não existe")
    }

    const poll = findPoll(choice.pollId)
    const now = dayjs()
    if(now.diff(poll.expireAt) < 0){
        res.status(403).send("Esta enquete já terminou")
    }

    try {
        await voteCollection.insertOne(vote)
        res.status(201).send("Voto registrado com sucesso")
    } catch (error) {
        
        res.status(500).send("Houve um problema no servidor")
    }
}

async function findChoice(id){
    const choice = await choiceCollection.findOne({ _id: ObjectId(id) })
    return choice
}

async function findPoll(id){
    const poll = await pollCollection.findOne({ _id: ObjectId(id) })
    return poll
}