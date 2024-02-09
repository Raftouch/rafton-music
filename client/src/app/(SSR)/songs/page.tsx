import SongCard from '@/components/SongCard'
import { Song } from '@/models/song'
import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Playlists - Rafton',
}

export default async function Playlists() {
  const response = await fetch(
    'http://localhost:5000/api/songs',
    { next: { revalidate: 0 } }
    // { cache: 'no-cache' } // or 'no-store'
  )
  const songs: Song[] = await response.json()

  return (
    <div className="flex flex-col items-center">
      <div className="grid grid-cols-2 gap-12 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 justify-items-center">
        {/* <Alert>Dynamic Page</Alert> */}

        {songs.map((song) => (
          <SongCard song={song} key={song.id} />
        ))}
      </div>
      <Link className="fixed bottom-24" href="/songs/create">
        Upload new
      </Link>
    </div>
  )
}
