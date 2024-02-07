import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Rafton',
  description: 'Created by Nelli with NextJS & much love',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`bg-slate-900 text-white ${inter.className}`}>
        <Navbar />
        <main className="w-screen p-5 flex items-center justify-center">
          {children}
        </main>
      </body>
    </html>
  )
}
