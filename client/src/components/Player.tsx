'use client'

import React from 'react'
import Button from './Button'
import { Song } from '@/models/song'
import PlayProgress from './PlayProgress'
import { useTypedSelector } from '../hooks/useTypedSelector'
import { useActions } from '@/hooks/useActions'

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

  const { pause, active, volume, duration, currentTime } = useTypedSelector(
    (state) => state.player
  )
  const { pauseSong, playSong } = useActions()

  const play = () => {
    pause ? playSong() : pauseSong()
  }

  return (
    <div className="w-full h-[60px] fixed bottom-0 flex items-center bg-slate-600">
      <Button onClick={play}>{!pause ? 'PAUSE' : 'PLAY'}</Button>
      <div>
        <p>{song.title}</p>
        <p>{song.artists.name}</p>
      </div>
      <PlayProgress left={0} right={100} onChange={() => ({})} />
      <div className="ml-auto">🔉</div>
      <PlayProgress left={0} right={100} onChange={() => ({})} />
    </div>
  )
}
