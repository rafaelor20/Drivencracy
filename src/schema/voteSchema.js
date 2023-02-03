import joi from "joi";

export const voteSchema = joi.object({
    id: joi.string().required()
})