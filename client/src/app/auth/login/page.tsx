import LoginForm from '@/components/LoginForm'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Login - Rafton Music App',
}

export default function LoginPage() {
  return (
    <main>
      <h1 className="mb-20 text-center">Login Form</h1>
      <LoginForm />
    </main>
  )
}
