import { User } from '@/models/user'
import { API_URL } from './const'

export async function getAllUsers(): Promise<User[] | null> {
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
      // notFound()
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
    // return null
  }
}
