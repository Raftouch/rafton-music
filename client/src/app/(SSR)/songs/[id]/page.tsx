import { Song } from '@/models/song'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

interface DetailsProps {
  params: { id: string }
}

async function getSong(id: string): Promise<Song> {
  try {
    const response = await fetch(`http://localhost:5000/api/songs/${id}`, {
      cache: 'no-cache',
    })
    if (response.status === 404) notFound()

    if (!response.ok) {
      throw new Error('Failed to fetch song data')
    }
    const song: Song = await response.json()
    return song
  } catch (error) {
    console.error('Error:', error)
    throw error
  }
}

export async function generateMetadata({
  params: { id },
}: DetailsProps): Promise<Metadata> {
  const song: Song = await getSong(id)

  return {
    title: 'Rafton - Music platform - ' + song.title + ' - ' + song.artist.name,
  }
}

export default async function SongDetails({ params: { id } }: DetailsProps) {
  const song: Song = await getSong(id)

  return (
    <div className="flex gap-10 justify-center">
      <div className="w-[420px] h-[550px] flex flex-col items-center gap-4 border p-4">
        <h1 className="font-bold uppercase">{song.title}</h1>
        <Image
          src={`http://localhost:5000/${song.image}`}
          width={250}
          height={250}
          alt="image"
          className="rounded-md"
          priority={true}
        />
        <p>{song.artist.name}</p>
        <p>{song.genre.type}</p>
        <Link href="/songs">Back</Link>
      </div>
    </div>
  )
}
