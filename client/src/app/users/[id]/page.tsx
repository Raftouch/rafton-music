'use client'

import Loader from '@/components/Loader'
import { User } from '@/models/user'
import useUserStore from '@/store/user'
import { getUser } from '@/utils/user'
import { notFound, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

interface DetailsProps {
  params: { id: string }
}

export default function UserDetails({ params: { id } }: DetailsProps) {
  const [loading, setLoading] = useState(true)
  const [profile, setProfile] = useState<User | null>(null)
  const router = useRouter()
  const { checkAuth, user, isAuth } = useUserStore()

  useEffect(() => {
    const authAndFetchProfile = async () => {
      await checkAuth()

      if (!isAuth) {
        router.push('/auth/login')
        return
      }

      if (user?.id === id || user?.role === 'ADMIN') {
        try {
          const userData = await getUser(id)
          setProfile(userData)
        } catch (error) {
          console.error('Error fetching user data:', error)
          notFound()
        } finally {
          setLoading(false)
        }
      } else {
        console.log('Not authorized. Redirecting to home page')
        router.push('/')
      }
    }

    authAndFetchProfile()
  }, [checkAuth, user, router, id, isAuth])

  if (loading) return <Loader />

  if (!profile) {
    return (
      <div className="mt-20 text-center">
        <p>User not found or could not be fetched</p>
      </div>
    )
  }

  return (
    <div className="mt-20">
      <h1>{profile.username} Profile</h1>
      <p>Role : {profile.role}</p>
    </div>
  )
}
