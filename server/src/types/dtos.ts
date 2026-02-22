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

export interface ShowListEntry {
  show_list_entries_table: {
    id: number
    excludedSeasons: number[]
    extraEpisodes: string[]
    userId: number | null
    imdbId: string | null
    enabled: boolean | null
  }
  shows_table: {
    id: number
    title: string
    desc: string | null
    imdbId: string
    backgroundImg: string | null
    coverImg: string | null
    releaseYear: string | null
    seasons: number[]
    episodeCount: number | null
  }
}
