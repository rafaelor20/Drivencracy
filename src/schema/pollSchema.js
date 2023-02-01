import coreJoi from "joi";
import joiDate from "@joi/date";

const joi = coreJoi.extend(joiDate) //as typeof coreJoi;

export const pollSchema = joi.object({
    title: joi.string().required(),
    expireAt: joi.date().format("YYYY-MM-DD")
})
