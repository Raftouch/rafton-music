'use client'

import Button from '@/components/Button'
import FileUpload from '@/components/FileUpload'
import StepWrapper from '@/components/StepWrapper'
import { useInput } from '@/hooks/useInput'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function CreateSong() {
  const [activeStep, setActiveStep] = useState(0)
  const [image, setImage] = useState('')
  const [audio, setAudio] = useState('')
  const title = useInput('')
  const artist = useInput('')
  const genre = useInput('')
  const router = useRouter()

  const next = () => {
    if (activeStep !== 2) {
      setActiveStep((prev) => prev + 1)
    } else {
      const formData = new FormData()
      formData.append('title', title.value)
      formData.append('artist[name]', artist.value)
      formData.append('genre[type]', genre.value)
      formData.append('image', image)
      formData.append('audio', audio)
      fetch('http://localhost:5000/api/songs', {
        method: 'POST',
        body: formData,
      })
        .then((response) => router.push('/songs'))
        .catch((e) => console.log(e))
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
