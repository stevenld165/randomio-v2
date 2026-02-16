import { CinemetaVideo } from "./api-types"

export interface Show {
  id?: number
  title: string
  desc?: string
  imdbId: string
  backgroundImg: string
  coverImg: string
  releaseYear: string
  seasons: number[]
  episodeCount: number
}

export interface RandomioResponse {
  selectedShow: Show
  selectedEpisode: CinemetaVideo
}
