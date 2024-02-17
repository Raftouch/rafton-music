import { Song } from '@/models/song'
import React from 'react'
import SongCard from './SongCard'

interface SongListProps {
  songs: Song[]
}

export default function SongList({ songs }: SongListProps) {
  return (
    <div className="flex flex-col items-center">
      <div className="grid grid-cols-2 gap-12 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 justify-items-center">
        {songs.map((song) => (
          <SongCard song={song} key={song.id} />
        ))}
      </div>
    </div>
  )
}
