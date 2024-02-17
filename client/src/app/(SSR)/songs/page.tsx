import SongList from '@/components/SongList'
import { Song } from '@/models/song'
import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Playlists - Rafton',
}

export default function Playlists() {
 // const response = await fetch('http://localhost:5000/api/songs');
  // const songs: Song[] = await response.json();

  const songs: Song[] = [
    {
      id: '123',
      title: 'Could you be loved',
      image:
        'http://localhost:5000/image/134ed885-3aa4-4c16-84b6-25db34449633.jpg',
      audio:
        'http://localhost:5000/audio/a6177eae-1876-42d1-be82-e88750257cb4.mp3',
      playcount: 0,
      uploadedat: new Date(),
      artists: {
        id: '456',
        name: 'Bob Marley',
      },
      genres: {
        id: '234',
        type: 'Reggae',
      },
    },
    {
      id: '234',
      title: 'La isla bonita',
      image:
        'http://localhost:5000/image/a710027b-e20c-4b1c-b9e5-fa3300dad8a3.jpg',
      audio:
        'http://localhost:5000/audio/d6c2bcf8-283c-4461-9a38-4e78ae4fe95b.mp3',
      playcount: 0,
      uploadedat: new Date(),
      artists: {
        id: '456',
        name: 'Madonna',
      },
      genres: {
        id: '234',
        type: 'Pop',
      },
    },
  ]

  return (
    <div className="flex flex-col items-center">
      <SongList songs={songs} />
      <Link className="fixed bottom-24" href="/songs/create">
        Upload new
      </Link>
    </div>
  )
}
