import { Song } from '@/models/song'
import Image from 'next/image'
import Link from 'next/link'

interface SongProps {
  song: Song
}

export default function SongCard({ song }: SongProps) {
  return (
    <li key={song.id} className="flex flex-col gap-4">
      <div>Title: {song.title}</div>
      <Link href={`/songs/${song.id}`}>
        <Image
          src={`http://localhost:5000/${song.image}`}
          width={150}
          height={150}
          alt="image"
          className="rounded-md"
        />
      </Link>
    </li>
  )
}
