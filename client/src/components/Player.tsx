'use client'

import React, { useEffect } from 'react'
import Button from './Button'
import PlayProgress from './PlayProgress'
import { useTypedSelector } from '../hooks/useTypedSelector'
import { useActions } from '@/hooks/useActions'

let audio: HTMLAudioElement

export default function Player() {
  const { pause, active, volume, duration, currentTime } = useTypedSelector(
    (state) => state.player
  )
  const { pauseSong, playSong, setVolume, setCurrentTime, setDuration } =
    useActions()

  useEffect(() => {
    if (!audio) {
      audio = new Audio()
    }

    if (audio && active) {
      audio.src = 'http://localhost:5000/' + active.audio
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
      audio.play()
    } else {
      pauseSong()
      audio.pause()
    }
  }

  const changeVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (audio) {
      audio.volume = Number(e.target.value) / 100
      setVolume(Number(e.target.value))
    }
  }

  const changeCurrentTime = (e: React.ChangeEvent<HTMLInputElement>) => {
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
        {/* <p>{active.artists.name}</p> */}
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
