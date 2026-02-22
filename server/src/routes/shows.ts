import { Request, Response } from "express"
import { CinemetaResponse } from "../types/api-types"
import { Show } from "../types/dtos"

import CinemetaService from "../services/CinemetaService"
import { shows } from "../db/schema"
import { db } from "../database"

const express = require("express")
const router = express.Router()

const nameToImdb = require("name-to-imdb")

router.get("/search", async (req: Request, res: Response) => {
  const showName = req.query.name
  const showYear = req.query.year

  try {
    // fetch from the imdb api for first match
    console.log("Finding imdb id")
    const imdbId = (
      await nameToImdb({ name: showName, year: Number(showYear) })
    ).res

    console.log("IMDB ID found: " + imdbId)

    const show = await CinemetaService.getShowByIMDBId(imdbId)

    res.json(show)
  } catch (error) {
    console.error("Error found")
    res.status(400).send(error)
  }
})

router.post("/add", async (req: Request, res: Response) => {
  const { imdbId } = req.body

  // Add verification of imdb id that it is valid looking at leasd
  try {
    const show = await CinemetaService.getShowByIMDBId(imdbId)

    // Add to db
    const showEntry: typeof shows.$inferInsert = {
      ...show,
    }

    console.log("Adding to DB")
    const dbInsert = await db
      .insert(shows)
      .values(showEntry)
      .onConflictDoUpdate({ target: shows.imdbId, set: showEntry })
      .returning()

    res.json(imdbId)
  } catch (error) {
    res.status(400).send(error)
  }

  res.json(imdbId)
})

module.exports = router
