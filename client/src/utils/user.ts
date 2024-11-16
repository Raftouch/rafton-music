import { User } from '@/models/user'
import { API_URL } from './const'
import { notFound } from 'next/navigation'

export async function getUser(id: string): Promise<User | null> {
  try {
    const response = await fetch(`${API_URL}/api/users/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
      credentials: 'include',
    })

    if (response.status === 401) {
      throw new Error('Unathorized')
    } else if (response.status === 404) {
      notFound()
    } else if (!response.ok) {
      throw new Error('Failed to fetch user data')
    } else {
      const user: User = await response.json()
      console.log('Fetched user:', user)
      return user
    }
  } catch (error) {
    console.error('Error fetching user:', error)
    return null
  }
}

export async function getAllUsers(): Promise<User[]> {
  try {
    console.log(`Fetching users from: ${API_URL}/api/users`)
    const response = await fetch(`${API_URL}/api/users`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
      credentials: 'include',
    })

    if (response.status === 401) {
      throw new Error('Unathorized')
    } else if (response.status === 404) {
      return []
    } else if (!response.ok) {
      throw new Error(`An error has occurred: ${response.statusText}`)
    } else {
      const users: User[] = await response.json()
      console.log('Fetched users:', users)
      return users
    }
  } catch (error) {
    console.error('Error fetching users:', error)
    return []
  }
}
