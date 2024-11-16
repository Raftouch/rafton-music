'use client'

import Loader from '@/components/Loader'
import SongCard from '@/components/SongCard'
import { Song } from '@/models/song'
import useUserStore from '@/store/user'
import { formatDate, formatName } from '@/utils/format'
import { getSong } from '@/utils/song'
// import Link from 'next/link'
import { useRouter } from 'next/navigation'
// import { Metadata } from 'next'
// import { cookies } from 'next/headers'
// import { redirect } from 'next/navigation'
import { useEffect, useState } from 'react'
// import Image from 'next/image'
// import Link from 'next/link'

interface DetailsProps {
  params: { id: string }
}

export default function SongDetails({ params: { id } }: DetailsProps) {
  const [song, setSong] = useState<Song | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  const { checkAuth } = useUserStore()

  useEffect(() => {
    const authAndFetchSong = async () => {
      await checkAuth()

      const { isAuth } = useUserStore.getState()

      if (!isAuth) {
        router.push('/auth/login')
        return
      }

      const songData = await getSong(id)
      setSong(songData)
      setLoading(false)
    }

    authAndFetchSong()
  }, [checkAuth, id, router])

  // useEffect(() => {
  //   const fetchSong = async () => {
  //     const songData = await getSong(id)
  //     setSong(songData)
  //   }
  //   fetchSong()
  // }, [id])

  if (loading) return <Loader />

  return (
    <div className="mt-20 text-center">
      <h1>Song details</h1>
      {song !== null && (
        <div
          data-cy="song-details"
          className="flex gap-10 flex-wrap justify-center items-center mt-10 mb-20"
        >
          <SongCard song={song} key={song.id} />
          <div className="flex flex-col gap-5 text-left">
            <p>Title: {song?.title}</p>
            <p>Artist: {song?.artist.name}</p>
            <p>Genre: {song?.genre.type}</p>
            <p>Uploaded by: {formatName(song?.uploadedBy.username || '')}</p>
            <p>Uploaded at: {formatDate(song?.uploadedAt)}</p>
            <p>Playcount: {song?.playcount}</p>
          </div>
        </div>
      )}
      {/* <Link href="/songs">Back to playlist</Link> */}
    </div>
  )
}
