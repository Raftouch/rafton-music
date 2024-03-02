import { Song } from '@/models/song'
import React from 'react'
import EditSongForm from '@/components/EditSongForm'

interface UpdateSongProps {
  params: { id: string }
}

async function getSong(id: string): Promise<Song | null> {
  try {
    const response = await fetch(`http://localhost:5000/api/songs/${id}`)
    if (!response.ok) {
      throw new Error('Failed to fetch song data')
    }
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error:', error)
    return null
  }
}

export default async function UpdateSong({ params: { id } }: UpdateSongProps) {
  try {
    const song = await getSong(id)

    if (!song) {
      throw new Error('No song data available')
    }

    console.log(song)
    return <EditSongForm song={song} />
  } catch (error) {
    console.error(error)
    return <div>Error: Failed to retrieve song data</div>
  }
}
