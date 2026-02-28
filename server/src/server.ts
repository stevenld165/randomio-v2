import { Request, Response } from "express"
import { CinemetaResponse } from "./types/api-types"
import { Show } from "./types/dtos"
import { auth } from "./auth"
import { toNodeHandler } from "better-auth/node"

const express = require("express")
const app = express()

const cors = require("cors")

const nameToImdb = require("name-to-imdb")

const loggerMiddleware = require("./middleware/logger")

const indexRoutes = require("./routes/index")
const showRoutes = require("./routes/shows")
const showListRoutes = require("./routes/show-list")

app.use(cors())

app.all("/api/auth/*splat", toNodeHandler(auth))

app.use(express.json())

app.use(loggerMiddleware)

app.use("/", indexRoutes)
app.use("/shows", showRoutes)
app.use("/users/show-list", showListRoutes)

app.listen(3001)
