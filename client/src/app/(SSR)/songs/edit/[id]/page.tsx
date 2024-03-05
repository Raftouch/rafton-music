import React from 'react'
import SongForm from '@/components/SongForm'
import { getSong } from '@/utils/song'

interface UpdateSongProps {
  params: { id: string }
}

export default async function UpdateSong({ params: { id } }: UpdateSongProps) {
  try {
    const song = await getSong(id)

    if (!song) {
      throw new Error('No song data available')
    }

    return <SongForm isEditMode={true} song={song} />
  } catch (error) {
    console.error(error)
    return <div>Error: Failed to retrieve song data</div>
  }
}
