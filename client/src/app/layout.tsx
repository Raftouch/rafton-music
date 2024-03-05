import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import StoreProvider from '@/components/StoreProvider'
// import Footer from '@/components/Footer'
import Player from '@/components/Player'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Rafton - Music platform',
  description: 'Upload your song and become a star',
  keywords: 'Music, songs, artists',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <StoreProvider>
      <html lang="en">
        <body className={`bg-rafton-blue text-white ${inter.className}`}>
          <Navbar />
          <main className="w-screen p-5 flex items-center justify-center">
            {children}
            {/* <Footer /> */}
          </main>
          <Player />
        </body>
      </html>
    </StoreProvider>
  )
}
