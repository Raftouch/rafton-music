import { Song } from '@/models/song'
import React from 'react'
import SongCard from './SongCard'

interface SongListProps {
  songs: Song[]
  searchParams?: { query?: string; page?: string }
}

export default function SongList({ songs, searchParams }: SongListProps) {
  const query = searchParams?.query || ''

  return (
    <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 justify-items-center">
      {query ? (
        <>
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
        </>
      ) : (
        <>
          {songs.map((song) => (
            <SongCard song={song} key={song.id} />
          ))}
        </>
      )}
    </div>
  )
}
