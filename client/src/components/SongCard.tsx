'use client'

import { Song } from '@/models/song'
import Image from 'next/image'
import Link from 'next/link'
import Button from './Button'
import RemoveBtn from './RemoveBtn'
import { useRouter } from 'next/navigation'
import { FaEdit, FaPlay, FaPause } from 'react-icons/fa'
import usePlayerStore from '@/store/player'
import { API_URL } from '@/utils/const'

interface SongProps {
  song: Song
}

export default function SongCard({ song }: SongProps) {
  const router = useRouter()
  const { active, pause, playSong, pauseSong } = usePlayerStore()

  const isPlaying = active?.id === song.id && !pause

  const handlePlay = () => {
    if (isPlaying) {
      pauseSong()
    } else {
      playSong(song)
    }
  }

  return (
    <li
      key={song.id}
      className="bg-white text-rafton-blue p-6 flex flex-col items-center gap-4 rounded-md hover:bg-rafton-green"
    >
      <Link href={`/songs/${song.id}`}>
        <Image
          src={`${API_URL}/${song.image}`}
          width={150}
          height={150}
          alt="image"
          className="rounded-full"
          priority={true}
        />
      </Link>
      <div className="truncate w-40 font-bold">{song.title}</div>
      <div className="truncate w-40">{song.artist.name}</div>
      <div className="flex gap-8">
        <Button onClick={handlePlay}>
          {isPlaying ? <FaPause /> : <FaPlay />}
        </Button>
        {/* <p>{active && <div>02:45 / 4:07</div>}</p> */}
        <Button onClick={() => router.push(`/songs/edit/${song.id}`)}>
          <FaEdit />
        </Button>
        <RemoveBtn id={song.id} />
      </div>
    </li>
  )
}
