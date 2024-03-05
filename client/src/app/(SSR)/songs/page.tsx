import SearchSong from '@/components/SearchSong'
import SongCard from '@/components/SongCard'
import SongList from '@/components/SongList'
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
    <div className="mt-20 mb-10 flex flex-col items-center gap-5">
      <SearchSong placeholder="Search songs..." />
      <Link href="/songs/create">Upload new</Link>

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
    </div>
  )
}
