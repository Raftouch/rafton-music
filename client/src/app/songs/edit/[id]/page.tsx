'use client'

import Loader from '@/components/Loader'
import UpdateSongForm from '@/components/UpdateSongForm'
import { Song } from '@/models/song'
import useUserStore from '@/store/user'
import { getSong } from '@/utils/song'
import { notFound, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

interface UpdateSongProps {
  params: { id: string }
}

export default function UpdateSong({ params: { id } }: UpdateSongProps) {
  const [song, setSong] = useState<Song | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  const { checkAuth, isAuth } = useUserStore()

  useEffect(() => {
    const authAndUpdateSong = async () => {
      await checkAuth()

      if (!isAuth) {
        router.push('/auth/login')
        return
      }

      try {
        const songData = await getSong(id)
        setSong(songData)
      } catch (error) {
        console.error('Error fetching song data:', error)
        notFound()
      } finally {
        setLoading(false)
      }
    }

    authAndUpdateSong()
  }, [checkAuth, router, id, isAuth])

  if (loading) return <Loader />

  if (!song) return 'No song data available'

  return <UpdateSongForm song={song} />
}
