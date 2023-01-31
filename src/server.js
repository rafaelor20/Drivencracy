import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import routerPool from './routes/pool.routes.js'
import routerChoice from './routes/choice.routes.js'
import routerResult from "./routes/result.routes.js";
import routerVote from "./routes/vote.routes.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use([routerPool, routerChoice, routerResult, routerVote])

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running in port ${port}`));