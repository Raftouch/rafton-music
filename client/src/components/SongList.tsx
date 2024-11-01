import { Song } from '@/models/song'
import React from 'react'
import SongCard from './SongCard'

interface SongListProps {
  songs: Song[] | null
  searchParams?: { query?: string; page?: string }
}

export default function SongList({ songs, searchParams }: SongListProps) {
  const query = searchParams?.query || ''

  if (!songs || songs.length === 0) {
    return <p>No songs available.</p>
  }

  const filteredSongs = query
    ? songs.filter((song) =>
        song.title.toLowerCase().startsWith(query.toLowerCase())
      )
    : songs

  return (
    <>
      {filteredSongs.length > 0 ? (
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 justify-items-center">
          {filteredSongs.map((song) => (
            <SongCard song={song} key={song.id} />
          ))}
        </div>
      ) : (
        <p>No songs found matching your query.</p>
      )}
    </>
  )
}
