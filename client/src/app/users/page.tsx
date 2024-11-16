'use client'

import Loader from '@/components/Loader'
import { User } from '@/models/user'
import useUserStore from '@/store/user'
import { formatName } from '@/utils/format'
import { getAllUsers } from '@/utils/user'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function UsersList() {
  const [users, setUsers] = useState<User[]>([])
  const { checkAuth } = useUserStore()
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const authAetchUsers = async () => {
      await checkAuth()

      const { isAuth, user } = useUserStore.getState()

      if (!isAuth || user?.role !== 'ADMIN') {
        router.push('/auth/login')
        return
      }

      try {
        const usersData = await getAllUsers()
        setUsers(usersData || [])
      } catch (error) {
        console.error('Failed to fetch users:', error)
      } finally {
        setLoading(false)
      }
    }
    authAetchUsers()
  }, [checkAuth, router])

  if (loading) return <Loader />

  return (
    <div className="mt-20 w-[80%]">
      <h1 className="mb-10 text-center">Users List</h1>
      {users.length > 0 ? (
        <ul className="flex flex-col gap-4 justify-start">
          {users
            .filter((user) => user.role !== 'ADMIN')
            .map((user, index) => (
              <li key={user.id}>
                {index + 1}. {formatName(user.username)}
              </li>
            ))}
        </ul>
      ) : (
        <p>No users found</p>
      )}
    </div>
  )
}
