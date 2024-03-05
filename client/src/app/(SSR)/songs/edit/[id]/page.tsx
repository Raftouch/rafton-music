import { Song } from '@/models/song'
import React from 'react'
import SongForm from '@/components/SongForm'

interface UpdateSongProps {
  params: { id: string }
}

async function getSong(id: string): Promise<Song | null> {
  try {
    const response = await fetch(`http://localhost:5000/api/songs/${id}`, {
      cache: 'no-cache',
    })
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
    console.log(id)

    if (!song) {
      throw new Error('No song data available')
    }

    return <SongForm isEditMode={true} song={song} />
    
  } catch (error) {
    console.error(error)
    return <div>Error: Failed to retrieve song data</div>
  }
}
