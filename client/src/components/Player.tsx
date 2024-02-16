'use client'

import React, { useEffect, useRef } from 'react'
import Button from './Button'
import { Song } from '@/models/song'
import PlayProgress from './PlayProgress'
import { useTypedSelector } from '../hooks/useTypedSelector'
import { useActions } from '@/hooks/useActions'

export default function Player() {
  const song: Song = {
    id: '123',
    title: 'Could you be loved',
    image: '',
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
  }

  const { pause, active, volume, duration, currentTime } = useTypedSelector(
    (state) => state.player
  )
  const { pauseSong, playSong, setVolume, setCurrentTime, setDuration } =
    useActions()

  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    if (!audioRef.current) {
      // Initialize audio only once when component mounts
      audioRef.current = new Audio(song.audio) // src = song.audio
      audioRef.current.volume = volume / 100 // can be set between 0.0 (muted) and 1.0 (maximum volume)
    }
  }, [song.audio, volume])

  const play = () => {
    if (pause) {
      playSong()
      audioRef.current?.play()
    } else {
      pauseSong()
      audioRef.current?.pause()
    }
  }

  const changeVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      audioRef.current.volume = Number(e.target.value) / 100
      setVolume(Number(e.target.value))
    }
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
      <PlayProgress left={volume} right={100} onChange={changeVolume} />
    </div>
  )
}
