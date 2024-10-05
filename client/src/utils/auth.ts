'use server'

import { cookies } from 'next/headers'
import { API_URL } from './const'

export async function checkAuth() {
  try {
    const response = await fetch(`${API_URL}/auth/check-auth`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Cookie: cookies().toString(),
      },
      cache: 'no-store',
      credentials: 'include',
    })

    if (response.ok) {
      const data = await response.json()
      return { authenticated: true, id: data.id, username: data.username }
    } else {
      return { authenticated: false }
    }
  } catch (error) {
    console.error('Error checking authentication:', error)
    return { authenticated: false }
  }
}
