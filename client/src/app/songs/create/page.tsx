'use client'

import CreateSongForm from '@/components/CreateSongForm'
import Loader from '@/components/Loader'
import useUserStore from '@/store/user'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function CreateSong() {
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  const { checkAuth, isAuth } = useUserStore()

  useEffect(() => {
    const authAndCreateSong = async () => {
      await checkAuth()

      if (!isAuth) {
        router.push('/auth/login')
        return
      }
      setLoading(false)
    }
    authAndCreateSong()
  }, [checkAuth, isAuth, router])

  if (loading) return <Loader />

  return <CreateSongForm />
}
