'use client'

import React, { useEffect, useState } from 'react'
import UpdateSongForm from '@/components/UpdateSongForm'
import { getSong } from '@/utils/song'
import { Song } from '@/models/song'

interface UpdateSongProps {
  params: { id: string }
}

const UpdateSong: React.FC<UpdateSongProps> = ({ params: { id } }) => {
  const [song, setSong] = useState<Song | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchSong = async () => {
      try {
        const fetchedSong = await getSong(id)

        if (!fetchedSong) {
          throw new Error('No song data available')
        }

        setSong(fetchedSong)
      } catch (error: any) {
        setError('Failed to retrieve song data')
      } finally {
        setLoading(false)
      }
    }

    fetchSong()
  }, [id])

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return song ? (
    <UpdateSongForm song={song} />
  ) : (
    <div>No song data available</div>
  )
}

export default UpdateSong
