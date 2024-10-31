'use client'

import Loader from '@/components/Loader'
import SongCard from '@/components/SongCard'
import { Song } from '@/models/song'
import useUserStore from '@/store/user'
// import useUserStore from '@/store/user'
import { getSong } from '@/utils/song'
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
  const [loadingAuth, setLoadingAuth] = useState(true)
  const router = useRouter()

  const { checkAuth, isAuth } = useUserStore()

  useEffect(() => {
    const authenticateUser = async () => {
      await checkAuth()
      setLoadingAuth(false)

      const { isAuth } = useUserStore.getState()
      console.log('Updated isAuth after authentication:', isAuth)

      if (!isAuth) {
        router.push('/auth/login')
      }
    }
    authenticateUser()
  }, [checkAuth, isAuth, router])

  useEffect(() => {
    const fetchSong = async () => {
      const songData = await getSong(id)
      setSong(songData)
    }
    fetchSong()
  }, [id])

  if (loadingAuth) return <Loader />

  return (
    <div
      data-cy="song-details"
      className="flex gap-10 flex-wrap justify-center mt-20 mb-10"
    >
      {song !== null && (
        <>
          <SongCard song={song} key={song.id} />
          {/* <div className="flex flex-col"> */}
          <div className="flex flex-col gap-5">
            <p>Title: {song?.title}</p>
            <p>Artist: {song?.artist.name}</p>
            <p>Genre: {song?.genre.type}</p>
            <p>Playcount: {song?.playcount}</p>
          </div>
        </>
      )}
      {/* <Link className="mt-auto" href="/songs">
          Back to playlist
        </Link> */}
      {/* </div> */}
    </div>
  )
}
