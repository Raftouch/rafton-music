import SongCard from '@/components/SongCard'
import { Song } from '@/models/song'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Playlists - Rafton',
}

export default async function fetchSongs() {
  const response = await fetch(
    'http://localhost:5000/api/songs',
    { next: { revalidate: 0 } }
    // { cache: 'no-cache' } // or 'no-store'
  )
  const songs: Song[] = await response.json()

  return (
    <div className="flex flex-col items-center gap-3">
      {/* <Alert>Dynamic Page</Alert> */}

      {songs.map((song) => (
        <SongCard song={song} key={song.id} />
      ))}
    </div>
  )
}
