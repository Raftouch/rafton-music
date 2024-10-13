import SearchSong from '@/components/SearchSong'
import SongList from '@/components/SongList'
import { getAllSongs } from '@/utils/song'
import { Metadata } from 'next'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import React from 'react'
import useUserStore from '@/store/user'
import { API_URL } from '@/utils/const'

export const metadata: Metadata = {
  title: 'Rafton - Playlist',
}

export default async function Playlists({
  searchParams,
}: {
  searchParams?: { query?: string; page?: string }
}) {
  const token = cookies().get('access_token')
  console.log('Token value : ', token?.value)
  if (!token) {
    redirect('/auth/login')
  }
  // const { checkAuth, isAuth } = useUserStore.getState()
  // await checkAuth()
  // console.log('is auth ? : ', isAuth)
  // if (!isAuth) {
  //   redirect('/auth/login')
  // }

  const songs = await getAllSongs()
  console.log('Fetched songs:', songs)
  console.log('API URL:', API_URL)

  return (
    <div className="mt-20 mb-20 flex flex-col items-center gap-5">
      {!token?.value ? (
        <>
          <p>No access, please log in</p>
          <Link href="/auth/login">To login page</Link>
        </>
      ) : !songs || songs.length === 0 ? (
        // {!songs || songs.length === 0 ? (
        <>
          <p>No song data available.</p>
          <Link href="/songs/create">Upload new</Link>
        </>
      ) : (
        <>
          <SearchSong placeholder="Search songs..." />
          <Link href="/songs/create">Upload new</Link>
          <SongList songs={songs} searchParams={searchParams} />
        </>
      )}
    </div>
  )
}
