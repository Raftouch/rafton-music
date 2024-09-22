'use client'

import { useRouter } from 'next/navigation'

const API_URL = process.env.NEXT_PUBLIC_API_URL

export default function LogoutBtn() {
  const router = useRouter()

  const handleLogout = async () => {
    try {
      const response = await fetch(`${API_URL}/auth/logout`, {
        method: 'POST',
        credentials: 'include',
      })

      if (!response.ok) {
        throw new Error('Logout failed')
      }

      alert('Logout successful!')
      router.push('/')
    } catch (error) {
      console.error(error)
      alert('An error occurred while logging out')
    }
  }

  return <button onClick={handleLogout}>Logout</button>
}
