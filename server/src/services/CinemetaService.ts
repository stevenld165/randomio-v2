import { CinemetaMeta, CinemetaResponse } from "../types/api-types"
import { Show } from "../types/dtos"

class CinemetaService {
  getShowByIMDBId = async (imdbId: string): Promise<Show> => {
    // console.log("Fetching show metadata")
    // const showMetaRes = await fetch(
    //   `https://v3-cinemeta.strem.io/meta/series/${imdbId}.json`,
    // )

    // console.log("Show metadata found: ", showMetaRes)

    // if (!showMetaRes.ok) {
    //   console.log("ERROR!")
    //   throw new Error("" + showMetaRes.status)
    // }

    // const showMetaJson = ((await showMetaRes.json()) as CinemetaResponse).meta

    // const seasons = new Set<number>()
    // let episodeCount = 0

    // for (const video of showMetaJson.videos) {
    //   if (video.released) {
    //     seasons.add(video.season)
    //     episodeCount++
    //   }
    // }

    // const show: Show = {
    //   title: showMetaJson.name,
    //   imdbId: showMetaJson.imdb_id,
    //   desc: showMetaJson.description,
    //   backgroundImg: showMetaJson.background,
    //   coverImg: showMetaJson.poster,
    //   releaseYear: showMetaJson.releaseInfo,
    //   seasons: seasons.values().toArray(),
    //   episodeCount: episodeCount,
    // }

    // return show
    const showMeta = await this.getShowMetaByIMDBId(imdbId)
    return this.metaToShow(showMeta)
  }

  getShowMetaByIMDBId = async (imdbId: string): Promise<CinemetaMeta> => {
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

    return showMetaJson
  }

  metaToShow = (meta: CinemetaMeta) => {
    const showMetaJson = meta

    const seasons = new Set<number>()
    let episodeCount = 0

    for (const video of showMetaJson.videos) {
      if (video.released) {
        seasons.add(video.season)
        episodeCount++
      }
    }

    const show: Show = {
      title: showMetaJson.name,
      imdbId: showMetaJson.imdb_id,
      desc: showMetaJson.description,
      backgroundImg: showMetaJson.background,
      coverImg: showMetaJson.poster,
      releaseYear: showMetaJson.releaseInfo,
      seasons: seasons.values().toArray(),
      episodeCount: episodeCount,
    }

    return show
  }
}

export default new CinemetaService()
