import { User } from "./user";

export interface Song {
  id: string;
  title: string;
  image: string;
  audio: string;
  playcount: number;
  uploadedAt: string;
  uploadedBy: User;
  favoritedBy?: User[];
  artist: Artist;
  genre: Genre;
}

interface Artist {
  id: string;
  name: string;
  songs: Song[];
}

interface Genre {
  id: string;
  type: string;
  songs: Song[];
}
