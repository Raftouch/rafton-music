import SongCard from '@/components/SongCard'
// import useUserStore from '@/store/user'
import { getSong } from '@/utils/song'
import { Metadata } from 'next'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
// import Image from 'next/image'
// import Link from 'next/link'

interface DetailsProps {
  params: { id: string }
}

export async function generateMetadata({
  params: { id },
}: DetailsProps): Promise<Metadata> {
  const song = await getSong(id)

  return {
    title:
      'Rafton - Music platform - ' + song?.title + ' - ' + song?.artist.name,
  }
}

export default async function SongDetails({ params: { id } }: DetailsProps) {
  const token = cookies().get('access_token')
  if (!token) {
    redirect('/auth/login')
  }

  // const { checkAuth, isAuth } = useUserStore.getState()
  // await checkAuth()
  // if (!isAuth) {
  //   redirect('/auth/login')
  // }

  const song = await getSong(id)
  if (!song) {
    throw new Error('No song data available')
  }

  return (
    <div
      data-cy="song-details"
      className="flex gap-10 flex-wrap justify-center mt-20 mb-10"
    >
      <SongCard song={song} key={song.id} />
      {/* <div className="flex flex-col"> */}
      <div className="flex flex-col gap-5">
        <p>Title: {song?.title}</p>
        <p>Artist: {song?.artist.name}</p>
        <p>Genre: {song?.genre.type}</p>
        <p>Playcount: {song?.playcount}</p>
      </div>
      {/* <Link className="mt-auto" href="/songs">
          Back to playlist
        </Link> */}
      {/* </div> */}
    </div>
  )
}
