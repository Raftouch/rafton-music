import SearchSong from '@/components/SearchSong'
import SongCard from '@/components/SongCard'
import SongList from '@/components/SongList'
import { Song } from '@/models/song'
import { getAllSongs } from '@/utils/song'
import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Rafton - Playlist',
}

export default async function Playlists({
  searchParams,
}: {
  searchParams?: { query?: string; page?: string }
}) {
  const songs = await getAllSongs()

  if (!songs) {
    throw new Error('No song data available')
  }

  const query = searchParams?.query || ''

  return (
    <div className="flex flex-col items-center">
      <SearchSong placeholder="Search songs..." />

      {query ? (
        <div>
          {songs
            .filter((song) => {
              const lowerCaseQuery = query.toLowerCase()
              return lowerCaseQuery === ''
                ? ''
                : song.title.toLowerCase().startsWith(lowerCaseQuery)
            })
            .map((song) => (
              <SongCard song={song} key={song.id} />
            ))}
        </div>
      ) : (
        <SongList songs={songs} />
      )}

      <Link className="fixed bottom-24" href="/songs/create">
        Upload new
      </Link>
    </div>
  )
}
