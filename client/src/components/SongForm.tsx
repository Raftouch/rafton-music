'use client'

import Button from '@/components/Button'
import FileUpload from '@/components/FileUpload'
import StepWrapper from '@/components/StepWrapper'
import { useInput } from '@/hooks/useInput'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Song } from '@/models/song'

interface SongFormProps {
  song?: Song
  isEditMode: boolean
}

export default function SongForm({ song, isEditMode }: SongFormProps) {
  const [activeStep, setActiveStep] = useState(0)
  const [image, setImage] = useState<string | undefined>(song?.image || '')
  const [audio, setAudio] = useState<string | undefined>(song?.audio || '')
  const title = useInput(song?.title || '')
  const artist = useInput(song?.artist.name || '')
  const genre = useInput(song?.genre.type || '')
  const router = useRouter()

  const url = isEditMode
    ? `http://localhost:5000/api/songs/${song?.id}`
    : 'http://localhost:5000/api/songs'

  const next = () => {
    if (activeStep !== 2) {
      setActiveStep((prev) => prev + 1)
    } else {
      const formData = new FormData()
      formData.append('title', title.value)
      formData.append('artist[name]', artist.value)
      formData.append('genre[type]', genre.value)
      if (image) formData.append('image', image)
      if (audio) formData.append('audio', audio)
      fetch(url, {
        method: isEditMode ? 'PATCH' : 'POST',
        body: formData,
      })
        .then((response) => {
          if (response.ok) {
            router.push('/songs')
          } else {
            throw new Error('Failed to submit form')
          }
        })
        .catch((error) => console.error(error))
    }
  }

  const back = () => {
    if (activeStep !== 0) {
      setActiveStep((prev) => prev - 1)
    }
  }

  return (
    <StepWrapper activeStep={activeStep}>
      {activeStep === 0 && (
        <div className="p-5 w-[100%]">
          <div className="flex flex-col gap-5">
            <div className="flex gap-5">
              <p className="w-1/6">Title</p>
              <input className="w-full border-2" {...title} />
            </div>
            <div className="flex gap-5">
              <p className="w-1/6">Artist</p>
              <input className="w-full border-2" {...artist} />
            </div>
            <div className="flex gap-5">
              <p className="w-1/6">Genre</p>
              <input className="w-full border-2" {...genre} />
            </div>
          </div>
        </div>
      )}

      {activeStep === 1 && (
        <FileUpload setFile={setImage} accept="image/">
          <button className="text-slate-900">Upload image</button>
        </FileUpload>
      )}

      {activeStep === 2 && (
        <FileUpload setFile={setAudio} accept="audio/">
          <button className="text-slate-900">Upload audio</button>
        </FileUpload>
      )}

      <div className="flex justify-between mt-10">
        <Button onClick={back}>Back</Button>
        <Button onClick={next}>Next</Button>
      </div>
    </StepWrapper>
  )
}
