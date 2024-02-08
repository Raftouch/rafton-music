export interface Song {
  id: string;
  title: string;
  image?: string;
  audio: string;
  playcount: number;
  uploadedat: Date;
  artists: Artist[];
  genres: Genre[];
  //   users?: User[]
}

export interface Artist {
  id: string;
  name: string;
}

export interface Genre {
  id: string;
  type: string;
}
