import { API_URL } from './const'

export async function checkAuth() {
  try {
    const response = await fetch(`${API_URL}/api/auth/check-auth`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
      credentials: 'include',
    })

    if (response.ok) {
      const data = await response.json()
      return {
        authenticated: true,
        id: data.id,
        username: data.username,
        role: data.role,
      }
    } else {
      console.error('Authentication failed with status:', response.status)
      const errorData = await response.json()
      console.error('Error details:', errorData)
      return { authenticated: false }
    }
  } catch (error) {
    console.error('Error checking authentication:', error)
    return { authenticated: false }
  }
}
