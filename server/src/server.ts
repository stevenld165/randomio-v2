import { Request, Response } from "express"
import { CinemetaResponse } from "./types/api-types"
import { Show } from "./types/dtos"

const express = require("express")
const app = express()

const nameToImdb = require("name-to-imdb")

const indexRoutes = require("./routes/index")
const showRoutes = require("./routes/shows")
const userRoutes = require("./routes/users")
const showListRoutes = require("./routes/show-list")
const authRoutes = require("./routes/auth")

app.use(express.json())

app.use("/", indexRoutes)
app.use("/shows", showRoutes)
app.use("/users", userRoutes)
app.use("/users/show-list", showListRoutes)
app.use("/auth", authRoutes)

app.listen(3000)
