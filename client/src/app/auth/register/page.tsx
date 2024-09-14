import RegisterForm from '@/components/RegisterForm'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Register - Rafton Music App',
}

export default function RegisterPage() {
  return (
    <main>
      <h1 className="mb-20 text-center">Register Form</h1>
      <RegisterForm />
    </main>
  )
}
