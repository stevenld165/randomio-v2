export interface CinemetaResponse {
  meta: {
    name: string
    imdb_id: string
    description: string
    background: string
    poster: string
    releaseInfo: string
    videos: CinemetaVideo[]
  }
}

export interface CinemetaVideo {
  name: string
  season: number
  number: 1
  overview: string
  thumbnail: string
  id: string
  episode: number
  description: string
  released: Date
}
