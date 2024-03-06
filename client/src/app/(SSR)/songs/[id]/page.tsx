import SongCard from '@/components/SongCard'
import { getSong } from '@/utils/song'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

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
  const song = await getSong(id)

  if (!song) {
    throw new Error('No song data available')
  }

  return (
    <div className="flex gap-10 flex-wrap justify-center mt-20 mb-10">
      <SongCard song={song} key={song.id} />
      {/* <div className="flex flex-col"> */}
      <div className="flex flex-col gap-5">
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
