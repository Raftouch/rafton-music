'use client'

import Loader from '@/components/Loader'
import { User } from '@/models/user'
import useUserStore from '@/store/user'
import { getAllUsers } from '@/utils/user'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function UsersList() {
  const [users, setUsers] = useState<User[] | null>(null)
  const { user, isAuth, checkAuth } = useUserStore()
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const authenticateUser = async () => {
      await checkAuth()
      setLoading(false)
      if (!isAuth) {
        router.push('/auth/login')
      } else if (user?.role !== 'ADMIN') {
        router.push('/songs')
      }
    }
    authenticateUser()
  }, [checkAuth, user?.role, isAuth, router])

  useEffect(() => {
    const fetchUsers = async () => {
      if (isAuth && user?.role === 'ADMIN') {
        const usersData = await getAllUsers()
        setUsers(usersData)
      }
    }
    fetchUsers()
  }, [isAuth, user?.role])

  if (loading) return <Loader />

  return (
    <div className="mt-20">
      <h1 className="mb-10">Users List</h1>
      {users ? (
        <ul>
          {users
            .filter((user) => user.role !== 'ADMIN')
            .map((user) => (
              <li key={user.id}>{user.username}</li>
            ))}
        </ul>
      ) : (
        <p>No users found</p>
      )}
    </div>
  )
}
