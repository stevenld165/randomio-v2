import { Request, Response } from "express"
import { CinemetaResponse } from "./types/api-types"
import { Show } from "./types/dtos"

const express = require("express")
const app = express()

const nameToImdb = require("name-to-imdb")

const showRoutes = require("./routes/shows")

app.use(express.json())
app.use("/shows", showRoutes)

app.listen(3000)
