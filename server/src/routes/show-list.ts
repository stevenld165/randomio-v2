import { Request, Response } from "express"
import { eq, and, desc } from "drizzle-orm"

import express from "express"
const router = express.Router()

import { db } from "../database"
import { showListEntries, shows } from "../db/schema"
import { authenticate } from "../middleware/auth"
import AuthService from "../services/AuthService"

router.get("/get", authenticate, async (req: Request, res: Response) => {
  const userId = (await AuthService.getUser(req))?.id

  if (userId == null) {
    res.sendStatus(401)
    return
  }

  try {
    const userShowList = await db
      .select()
      .from(showListEntries)
      .innerJoin(shows, eq(showListEntries.imdbId, shows.imdbId))
      .orderBy(desc(showListEntries.id))
      .where(eq(showListEntries.userId, userId))

    res.json(userShowList)
  } catch (error) {
    res.status(400).send(error)
  }
})

router.post("/add", authenticate, async (req: Request, res: Response) => {
  const { imdbId } = req.body

  const userId = (await AuthService.getUser(req))?.id

  try {
    const showListEntry: typeof showListEntries.$inferInsert = {
      userId: userId,
      imdbId: imdbId,
      excludedSeasons: [0],
    }

    const dbInsert = await db
      .insert(showListEntries)
      .values(showListEntry)
      .returning()

    res.json(dbInsert)
  } catch (error) {
    res.status(400).send(error)
  }
})

router.delete("/delete", authenticate, async (req: Request, res: Response) => {
  const { entryId } = req.body

  const user = await AuthService.getUser(req)

  try {
    if (user == null) throw new Error("User is not logged in")

    const dbResponse = await db
      .delete(showListEntries)
      .where(
        and(
          eq(showListEntries.id, entryId),
          eq(showListEntries.userId, user.id),
        ),
      )

    res.json(dbResponse)
  } catch (error) {
    res.status(400).send(error)
  }
})

router.patch(
  "/update-filters",
  authenticate,
  async (req: Request, res: Response) => {
    const { entryId, excludedSeasons, extraEpisodes } = req.body

    const user = await AuthService.getUser(req)

    try {
      if (user == null) throw new Error("User is not logged in")

      const updatedFields: typeof showListEntries.$inferInsert = {
        excludedSeasons: excludedSeasons,
        extraEpisodes: extraEpisodes,
      }

      const dbResponse = await db
        .update(showListEntries)
        .set(updatedFields)
        .where(
          and(
            eq(showListEntries.id, entryId),
            eq(showListEntries.userId, user.id),
          ),
        )

      res.json(dbResponse)
    } catch (error) {
      res.status(400).send(error)
    }
  },
)

router.patch("/toggle", authenticate, async (req: Request, res: Response) => {
  const { entryId, enabled } = req.body

  const user = await AuthService.getUser(req)

  try {
    if (user == null) throw new Error("User is not logged in")

    const updatedFields: typeof showListEntries.$inferInsert = {
      enabled: enabled,
    }

    const dbResponse = await db
      .update(showListEntries)
      .set(updatedFields)
      .where(
        and(
          eq(showListEntries.id, entryId),
          eq(showListEntries.userId, user.id),
        ),
      )

    res.json(dbResponse)
  } catch (error) {
    res.status(400).send(error)
  }
})

export default router
