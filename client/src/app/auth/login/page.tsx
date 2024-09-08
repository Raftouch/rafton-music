'use client'

import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL
  const router = useRouter()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const payload = {
      username: event.currentTarget.username.value,
      password: event.currentTarget.password.value,
    }

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
        credentials: 'include',
      })

      if (!response.ok) {
        throw new Error(`Failed to login, status: ${response.status}`)
      }

      alert('Login successful!')
      router.push('/songs')
    } catch (e) {
      if (e instanceof Error) {
        alert(e.message)
      } else {
        alert('An unexpected error occurred')
      }
    }
  }

  return (
    <main>
      <h1 className="mb-20 text-center">Login Form</h1>

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
      </form>
    </main>
  )
}
