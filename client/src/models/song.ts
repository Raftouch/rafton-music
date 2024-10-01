import { User } from './user'

export interface Song {
  id: string
  title: string
  image?: string
  audio: string
  playcount: number
  uploadedat: Date
  artist: Artist
  genre: Genre
  users?: User[]
}

interface Artist {
  id: string
  name: string
  songs: Song[]
}

interface Genre {
  id: string
  type: string
  songs: Song[]
}
