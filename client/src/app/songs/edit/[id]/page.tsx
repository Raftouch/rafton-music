'use client'

import Loader from '@/components/Loader'
import UpdateSongForm from '@/components/UpdateSongForm'
import { Song } from '@/models/song'
import useUserStore from '@/store/user'
import { getSong } from '@/utils/song'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

interface UpdateSongProps {
  params: { id: string }
}

export default function UpdateSong({ params: { id } }: UpdateSongProps) {
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

  if (!song) return 'No song data available'

  return <UpdateSongForm song={song} />
}
