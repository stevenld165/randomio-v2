import { Request, Response } from "express"
import { CinemetaResponse } from "../types/api-types"
import { Show } from "../types/dtos"

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

    console.log("Fetching show metadata")
    const showMetaRes = await fetch(
      `https://v3-cinemeta.strem.io/meta/series/${imdbId}.json`,
    )

    console.log("Show metadata found: ", showMetaRes)

    if (!showMetaRes.ok) {
      console.log("ERROR!")
      throw new Error("" + showMetaRes.status)
    }

    const showMetaJson = ((await showMetaRes.json()) as CinemetaResponse).meta

    const seasons = new Set<number>()

    for (const video of showMetaJson.videos) {
      if (video.released) seasons.add(video.season)
    }

    const show: Show = {
      id: 0,
      title: showMetaJson.name,
      imdbId: showMetaJson.imdb_id,
      desc: showMetaJson.description,
      backgroundImg: showMetaJson.background,
      coverImg: showMetaJson.poster,
      releaseYear: showMetaJson.releaseInfo,
      seasons: seasons.values().toArray(),
    }

    res.json(show)
  } catch (error) {
    console.error("Error found")
    res.status(400).send("Something went wrong!")
  }
})

module.exports = router
