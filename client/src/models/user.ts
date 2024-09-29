import { Song } from "./song"

export interface User {
  id: string
  username: string
  songs?: Song[]
}
