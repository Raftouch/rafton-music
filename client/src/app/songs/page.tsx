import SearchSong from '@/components/SearchSong'
import SongList from '@/components/SongList'
import { getAllSongs } from '@/utils/song'
import { Metadata } from 'next'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Rafton - Playlist',
}

export default async function Playlists({
  searchParams,
}: {
  searchParams?: { query?: string; page?: string }
}) {
  const token = cookies().get('access_token')
  if (!token) {
    redirect('/auth/login')
  }
  
  const songs = await getAllSongs()
  if (!songs) {
    throw new Error('No song data available')
  }

  return (
    <div className="mt-20 mb-20 flex flex-col items-center gap-5">
      <SearchSong placeholder="Search songs..." />
      <Link href="/songs/create">Upload new</Link>
      <SongList songs={songs} searchParams={searchParams} />
    </div>
  )
}
