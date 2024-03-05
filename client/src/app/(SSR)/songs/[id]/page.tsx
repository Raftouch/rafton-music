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

  return (
    <div className="flex gap-10 justify-center">
      <div className="w-[420px] h-[550px] flex flex-col items-center gap-4 border p-4">
        <h1 className="font-bold uppercase">{song?.title}</h1>
        <Image
          src={`http://localhost:5000/${song?.image}`}
          width={250}
          height={250}
          alt="image"
          className="rounded-md"
          priority={true}
        />
        <p>{song?.artist.name}</p>
        <p>{song?.genre.type}</p>
        <Link href="/songs">Back</Link>
      </div>
    </div>
  )
}
