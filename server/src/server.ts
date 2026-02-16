import { Request, Response } from "express"
import { CinemetaResponse } from "./types/api-types"
import { Show } from "./types/dtos"

const express = require("express")
const app = express()

const nameToImdb = require("name-to-imdb")

const showRoutes = require("./routes/shows")
const userRoutes = require("./routes/users")
const showListRoutes = require("./routes/show-list")

app.use(express.json())

app.use("/shows", showRoutes)
app.use("/users", userRoutes)
app.use("/users/show-list", showListRoutes)

app.listen(3000)
