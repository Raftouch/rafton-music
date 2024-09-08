'use client'

import SearchSong from '@/components/SearchSong'
import SongList from '@/components/SongList'
import { Song } from '@/models/song'
import { getAllSongs } from '@/utils/song'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function Playlists({
  searchParams,
}: {
  searchParams?: { query?: string; page?: string }
}) {
  const [songs, setSongs] = useState<Song[] | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await getAllSongs()
        if (response) {
          setSongs(response)
        } else {
          setError('Failed to load songs. Please try again later.')
        }
      } catch (err) {
        setError('An error occurred while fetching songs.')
      }
    }

    fetchSongs()
  }, [])

  if (error) {
    return (
      <div className="mt-20 mb-20 flex flex-col items-center gap-5">
        <p>{error}</p>
        <Link href="/auth/login">Go to login</Link>
      </div>
    )
  }

  if (songs?.length === 0) {
    return (
      <div className="mt-20 mb-20 flex flex-col items-center gap-5">
        <p>No songs available. Please check back later or upload new songs.</p>
        <Link href="/songs/create">Upload new</Link>
      </div>
    )
  }

  return (
    <div className="mt-20 mb-20 flex flex-col items-center gap-5">
      <SearchSong placeholder="Search songs..." />
      <Link href="/songs/create">Upload new</Link>
      <SongList songs={songs} searchParams={searchParams} />
    </div>
  )
}
