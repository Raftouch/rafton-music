'use client'

import React, { useEffect, useState } from 'react'
import SongCard from '@/components/SongCard'
import { getSong } from '@/utils/song'
// import { useRouter } from 'next/navigation'
import { Song } from '@/models/song'

interface DetailsProps {
  params: { id: string }
}

const SongDetails: React.FC<DetailsProps> = ({ params: { id } }) => {
  const [song, setSong] = useState<Song | null>(null)
  const [error, setError] = useState<string | null>(null)
  // const router = useRouter()

  useEffect(() => {
    const fetchSong = async () => {
      try {
        const fetchedSong = await getSong(id)
        if (fetchedSong === null) {
          setError('No song data available')
        } else {
          setSong(fetchedSong)
        }
      } catch (error: any) {
        setError(error.message || 'An unexpected error occurred')
      }
    }

    fetchSong()
  }, [id])

  if (error) {
    return <div>Error: {error}</div>
  }

  if (!song) {
    return <div>Loading...</div>
  }

  return (
    <div
      data-cy="song-details"
      className="flex gap-10 flex-wrap justify-center mt-20 mb-10"
    >
      <SongCard song={song} key={song.id} />
      {/* <div className="flex flex-col"> */}
      <div className="flex flex-col gap-5">
        <p>Title: {song?.title}</p>
        <p>Artist: {song?.artist.name}</p>
        <p>Genre: {song?.genre.type}</p>
        <p>Playcount: {song?.playcount}</p>
      </div>
      {/* <Link className="mt-auto" href="/songs">
          Back to playlist
        </Link> */}
      {/* </div> */}
    </div>
  )
}

export default SongDetails
