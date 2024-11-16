'use client'

import Loader from '@/components/Loader'
import UserList from '@/components/UserList'
import { User } from '@/models/user'
import useUserStore from '@/store/user'
import { getAllUsers } from '@/utils/user'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function UsersList() {
  const [users, setUsers] = useState<User[]>([])
  const { checkAuth, isAuth, user } = useUserStore()
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const authFetchUsers = async () => {
      await checkAuth()

      if (!isAuth) {
        router.push('/auth/login')
        return
      }

      if (user?.role === 'ADMIN') {
        try {
          const usersData = await getAllUsers()
          setUsers(usersData || [])
        } catch (error) {
          console.error('Failed to fetch users:', error)
        } finally {
          setLoading(false)
        }
      } else {
        console.log('Not authorized. Redirecting to home page')
        router.push('/')
      }
    }
    authFetchUsers()
  }, [checkAuth, router, isAuth, user])

  if (loading) return <Loader />

  return (
    <div className="mt-20 w-[80%]">
      <h1 className="mb-10 text-center">Users List</h1>
      {users.length > 0 ? <UserList users={users} /> : <p>No users found</p>}
    </div>
  )
}
