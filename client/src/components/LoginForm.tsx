'use client'

import useUserStore from '@/store/user'
import { API_URL } from '@/utils/const'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'

export default function LoginForm() {
  const [error, setError] = useState<string | null>(null)
  const { setUser, setIsAuth } = useUserStore()
  const router = useRouter()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError(null)

    const formData = new FormData(event.currentTarget)
    const payload = {
      username: formData.get('username'),
      password: formData.get('password'),
    }

    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
        credentials: 'include',
      })

      if (!response.ok) {
        throw new Error(`Login failed, status: ${response.status}`)
      }

      const userData = await response.json()
      setUser({ id: userData.id, username: userData.username })
      setIsAuth(true)

      toast.success('Login successful')
      router.push('/songs')
    } catch (e) {
      if (e instanceof Error) {
        toast.error(e.message)
        // setError(e.message)
      } else {
        toast.error('Login failed')
        // setError('An unexpected error occurred')
      }
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col min-w-[50%] bg-white text-rafton-blue mt-20 mb-20 gap-10 p-10 rounded-md"
    >
      <div>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          required
          className="w-full border-2"
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          required
          className="w-full border-2"
        />
      </div>
      <button type="submit">Login</button>
      {error && <p className="text-red-500">{error}</p>}
    </form>
  )
}
