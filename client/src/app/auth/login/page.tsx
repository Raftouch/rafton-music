'use client'

import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react';
const API_URL = process.env.NEXT_PUBLIC_API_URL;


export default function LoginPage() {

  const router = useRouter()

  useEffect(() => {
    console.log('API_URL:', API_URL); // Doit afficher http://localhost:5000
  }, []);


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const payload = {
      username: event.currentTarget.username.value,
      password: event.currentTarget.password.value,
    }

    try {
      const response = await axios.post(`${API_URL}/auth/login`,
        payload, // Pas besoin de faire un JSON.stringify ici avec Axios, il le fait automatiquement
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true, // Cela remplace 'credentials: include' pour envoyer les cookies
        }
      );

      // Axios ne nécessite pas de vérifier `response.ok`, il lève automatiquement une erreur pour les codes de statut HTTP hors de la plage 2xx


      // const data = await response.json()
      // const { access_token, refresh_token } = data

      // document.cookie = `access_token=${access_token}; Secure; HttpOnly; SameSite=Strict`
      // document.cookie = `refresh_token=${refresh_token}; Secure; HttpOnly; SameSite=Strict`

      // alert(JSON.stringify(data))
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
