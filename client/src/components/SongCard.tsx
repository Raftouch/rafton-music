'use client'

import { useActions } from '@/hooks/useActions'
import { Song } from '@/models/song'
import Image from 'next/image'
import Link from 'next/link'
import Button from './Button'
import RemoveBtn from './RemoveBtn'
import { useRouter } from 'next/navigation'

interface SongProps {
  song: Song
  active?: boolean
}

export default function SongCard({ song, active = false }: SongProps) {
  const router = useRouter()
  const { playSong, setActiveSong, pauseSong } = useActions()

  const play = () => {
    setActiveSong(song)
    playSong()
  }

  return (
    <li
      key={song.id}
      className="bg-white text-rafton-blue py-4 px-6 flex flex-col gap-4 rounded-md"
    >
      <div className="truncate w-40">{song.title}</div>
      <Link href={`/songs/${song.id}`}>
        <Image
          src={`http://localhost:5000/${song.image}`}
          width={150}
          height={150}
          alt="image"
          className="rounded-full"
          priority={true}
        />
      </Link>
      <Button onClick={play}>{active ? 'PAUSE' : 'PLAY'}</Button>
      {/* <p>{active && <div>02:45 / 4:07</div>}</p> */}
      <Button onClick={() => router.push(`/songs/edit/${song.id}`)}>
        Edit
      </Button>
      <RemoveBtn id={song.id} />
    </li>
  )
}
