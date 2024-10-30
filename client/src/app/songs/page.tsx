'use client'

import SearchSong from '@/components/SearchSong'
import SongList from '@/components/SongList'
import { getAllSongs } from '@/utils/song'
import { Metadata } from 'next'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import useUserStore from '@/store/user'
import { API_URL } from '@/utils/const'

export default function Playlists({
  searchParams,
}: {
  searchParams?: { query?: string; page?: string }
}) {
  const [songs, setSongs] = useState([])

  useEffect(() => {
    const fetchSongs = async () => {
      const songsData = await getAllSongs()
      setSongs(songsData)
    }
    fetchSongs()
  }, [])

  return (
    <div className="mt-20 mb-20 flex flex-col items-center gap-5">
          <SearchSong placeholder="Search songs..." />
          <Link href="/songs/create">Upload new</Link>
          <SongList songs={songs} searchParams={searchParams} />

    </div>
  )
}
