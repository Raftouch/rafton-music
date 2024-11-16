'use client'

import SearchSong from '@/components/SearchSong'
import SongList from '@/components/SongList'
import { getAllSongs } from '@/utils/song'
// import { Metadata } from 'next'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import useUserStore from '@/store/user'
// import { API_URL } from '@/utils/const'
import { Song } from '@/models/song'
import { useRouter } from 'next/navigation'
import Loader from '@/components/Loader'

export default function Playlists({
  searchParams,
}: {
  searchParams?: { query?: string; page?: string }
}) {
  const [songs, setSongs] = useState<Song[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  const { checkAuth } = useUserStore()

  useEffect(() => {
    const authAndFetchSongs = async () => {
      await checkAuth()

      const { isAuth } = useUserStore.getState()

      if (!isAuth) {
        router.push('/auth/login')
        return
      }

      try {
        const songsData = await getAllSongs()
        setSongs(songsData || [])
      } catch (error) {
        console.error('Failed to fetch songs:', error)
      } finally {
        setLoading(false)
      }
    }

    authAndFetchSongs()
  }, [checkAuth, router])

  if (loading) return <Loader />

  return (
    <div className="mt-20 mb-20 flex flex-col items-center gap-5">
      <SearchSong placeholder="Search songs..." />
      <Link href="/songs/create">Upload new</Link>
      {songs.length > 0 ? (
        <SongList songs={songs} searchParams={searchParams} />
      ) : (
        <p>No songs found</p>
      )}
    </div>
  )
}
