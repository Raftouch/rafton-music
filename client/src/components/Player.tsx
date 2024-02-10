'use client'

import React from 'react'
import Button from './Button'
import { Song } from '@/models/song'
import PlayProgress from './PlayProgress'

export default function Player() {
  const song: Song = {
    id: '123',
    title: 'Frozen',
    image: '',
    audio: '',
    playcount: 0,
    uploadedat: new Date(),
    artists: {
      id: '456',
      name: 'Madonna',
    },
    genres: {
      id: '234',
      type: 'pop',
    },
  }
  const active = false

  return (
    <div className="w-full h-[60px] fixed bottom-0 flex items-center bg-slate-600">
      <Button onClick={() => console.log('player')}>
        {active ? 'PLAY' : 'PAUSE'}
      </Button>
      <div>
        <p>{song.title}</p>
        <p>{song.artists.name}</p>
      </div>
      <PlayProgress left={0} right={100} onChange={() => ({})} />
    </div>
  )
}
