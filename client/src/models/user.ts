import { Song } from './song'

export interface User {
  id: string
  username: string
  email: string
  role: Role
  registeredAt: string // as ISO string
  updatedAt: string // as ISO string
  uploadedSongs?: Song[]
}

enum Role {
  ADMIN = 'ADMIN',
  BASIC = 'BASIC',
}
