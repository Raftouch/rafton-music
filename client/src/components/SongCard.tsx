'use client'

import { useActions } from '@/hooks/useActions'
import { Song } from '@/models/song'
import Image from 'next/image'
import Link from 'next/link'
import Button from './Button'
import RemoveBtn from './RemoveBtn'

interface SongProps {
  song: Song
  active?: boolean
}

export default function SongCard({ song, active = false }: SongProps) {
  const { playSong, setActiveSong } = useActions()

  const play = () => {
    setActiveSong(song)
    playSong()
  }

  return (
    <li key={song.id} className="flex flex-col gap-4">
      <div>{song.title}</div>
      <Link href={`/songs/${song.id}`}>
        <Image
          src={`http://localhost:5000/${song.image}`}
          width={150}
          height={150}
          alt="image"
          className="rounded-md"
          priority={true}
        />
      </Link>
      <Button onClick={play}>{active ? 'PAUSE' : 'PLAY'}</Button>
      <p>{active && <div>02:45 / 4:07</div>}</p>
      <Link href={`/songs/edit/${song.id}`}>Edit</Link>
      <RemoveBtn id={song.id} />
    </li>
  )
}
