import { ObjectId } from "mongodb";
import { pollCollection, choiceCollection, voteCollection } from "../database/db.js";

export async function getResult(req, res) {
    const id = req.params.id
    const poll = await pollCollection.findOne({ _id: ObjectId(id) })

    if (poll === undefined || poll === null) {
        res.status(404).send("Poll not found")
    } else {

        const choices = await choiceCollection.find({ pollId: poll._id.toString() }).toArray()
        const votes = await getVotes(choices)
        const winner = await getWinner(votes)
        const numberWinnerVotes = countWinnerVotes(votes, winner)

        const result = {
            title: poll.title,
            expireAt: poll.expireAt,
            result: {
                title: "",
                votes: 0
            }
        }

        if (winner === undefined || winner === null) {
            result.result.title = "Não teve votos"
        } else {
            result.result.title = winner.title,
            result.result.votes = numberWinnerVotes
        }

        try {
            res.status(201).send(result)
        } catch (error) {
            res.status(500).send("Houve um problema no servidor")
        }

    }
}

async function getVotes(choice) {
    const votes = []
    for (const elem of choice) {
        votes.push(await voteCollection.find({ choiceId: elem._id.toString() }).toArray())
    }
    //votes is a list of lists with votes
    //lstsTolst transforms to one list with votes
    return lstsToLst(votes)
}

function lstsToLst(lst) {
    const retLst = []
    for (const arr of lst) {
        for (const elem of arr) {
            retLst.push(elem)
        }
    }
    return retLst
}

async function getWinner(votes) {

    const choiceIds = []
    for (const vote of votes) {
        choiceIds.push(vote.choiceId)
    }

    const winnerId = mostCommonElement(choiceIds)

    const winner = await choiceCollection.findOne({ _id: ObjectId(winnerId) })
    return winner
}

function mostCommonElement(arr) {
    let frequency = {};
    let maxElement = arr[0];
    let maxFrequency = 1;

    for (let i = 0; i < arr.length; i++) {
        let element = arr[i];
        frequency[element] = frequency[element] + 1 || 1;

        if (frequency[element] > maxFrequency) {
            maxElement = element;
            maxFrequency = frequency[element];
        }
    }

    return maxElement;
}

function countWinnerVotes(array, value) {
    let count = 0;
    for (const element of array) {
        if (element.choiceId == value._id.toString()) { count++ }
    }
    return count;
}
