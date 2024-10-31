'use client'

import CreateSongForm from '@/components/CreateSongForm'
import Loader from '@/components/Loader'
import useUserStore from '@/store/user'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function CreateSong() {
  const [loadingAuth, setLoadingAuth] = useState(true)
  const router = useRouter()

  const { checkAuth, isAuth } = useUserStore()

  useEffect(() => {
    const authenticateUser = async () => {
      await checkAuth()
      setLoadingAuth(false)

      const { isAuth } = useUserStore.getState()

      if (!isAuth) {
        router.push('/auth/login')
      }
    }
    authenticateUser()
  }, [checkAuth, isAuth, router])

  if (loadingAuth) return <Loader />

  return <CreateSongForm />
}
