'use client'

import React, { useEffect, useRef } from 'react'
import Button from './Button'
import PlayProgress from './PlayProgress'
import { useTypedSelector } from '../hooks/useTypedSelector'
import { useActions } from '@/hooks/useActions'

export default function Player() {
  const { pause, active, volume, duration, currentTime } = useTypedSelector(
    (state) => state.player
  )
  const { pauseSong, playSong, setVolume, setCurrentTime, setDuration } =
    useActions()

  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // This code will only execute in a browser environment
      audioRef.current = new Audio()
    }
  }, [])

  useEffect(() => {
    const audio = audioRef.current

    if (audio && active) {
      audio.src = active.audio
      audio.volume = volume / 100
      audio.onloadedmetadata = () => {
        setDuration(Math.ceil(audio.duration))
      }
      audio.ontimeupdate = () => {
        setCurrentTime(Math.ceil(audio.currentTime))
      }
      play()
    }
  }, [active])

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
    const audio = audioRef.current
    if (audio) {
      audio.volume = Number(e.target.value) / 100
      setVolume(Number(e.target.value))
    }
  }

  const changeCurrentTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current
    if (audio) {
      audio.currentTime = Number(e.target.value)
      setCurrentTime(Number(e.target.value))
    }
  }

  if (!active) {
    return null
  }

  return (
    <div className="w-full h-[60px] fixed bottom-0 flex items-center bg-slate-600">
      <Button onClick={play}>{!pause ? 'PAUSE' : 'PLAY'}</Button>
      <div>
        <p>{active.title}</p>
        <p>{active.artists.name}</p>
      </div>
      <PlayProgress
        left={currentTime}
        right={duration}
        onChange={changeCurrentTime}
      />
      <div className="ml-auto">🔉</div>
      <PlayProgress left={volume} right={100} onChange={changeVolume} />
    </div>
  )
}
