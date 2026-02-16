import { Request, Response } from "express"
import { eq, and } from "drizzle-orm"
import { authenticate } from "../middleware/auth"
import { AuthRequest } from "../types/internal-types"
import { db } from "../database"
import { showListEntries } from "../db/schema"
import CinemetaService from "../services/CinemetaService"
import { RandomioResponse } from "../types/dtos"

const express = require("express")
const router = express.Router()

router.get("/roll", authenticate, async (req: AuthRequest, res: Response) => {
  try {
    if (req.user == null) throw new Error("User is not signed in!")

    const userShowListEntries = await db
      .select()
      .from(showListEntries)
      .where(
        and(
          eq(showListEntries.userId, req.user.userId),
          eq(showListEntries.enabled, true),
        ),
      )

    if (userShowListEntries.length == 0)
      throw new Error("User does not have any shows in their show list")

    const randomIndex = Math.floor(Math.random() * userShowListEntries.length)
    const selectedShow = userShowListEntries[randomIndex]

    const selectedShowMeta = await CinemetaService.getShowMetaByIMDBId(
      selectedShow?.imdbId ?? "",
    )

    const selectedShowVideos = selectedShowMeta.videos.filter(
      (video) => video.released != null,
    )

    const filteredShowVideos = selectedShowVideos.filter(
      (video) =>
        !selectedShow?.excludedSeasons.includes(video.season) ||
        selectedShow.extraEpisodes.includes(
          video.id.split(":").splice(1, 2).join(":"),
        ),
    )

    const randomEpisodeIndex = Math.floor(
      Math.random() * filteredShowVideos.length,
    )
    const selectedEpisode = filteredShowVideos[randomEpisodeIndex]

    if (selectedEpisode == null) throw new Error("Something went wrong")

    const randomioResponse: RandomioResponse = {
      selectedShow: CinemetaService.metaToShow(selectedShowMeta),
      selectedEpisode: selectedEpisode,
    }

    res.json(randomioResponse)
  } catch (error) {
    res.status(400).send(error)
  }
})

module.exports = router
