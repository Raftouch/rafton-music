import { Song } from '@/models/song'
import Image from 'next/image'

interface SongProps {
  song: Song
}

export default function SongCard({ song }: SongProps) {
  return (
    <li key={song.id}>
      <div>Title: {song.title}</div>

      <Image
        src={`http://localhost:5000/${song.image}`}
        width={150}
        height={150}
        alt="image"
        className="rounded-md"
      />
    </li>
  )
}
