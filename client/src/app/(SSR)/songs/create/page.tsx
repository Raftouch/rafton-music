'use client'

import Button from '@/components/Button'
import FileUpload from '@/components/FileUpload'
import SongInfo from '@/components/SongInfo'
import StepWrapper from '@/components/StepWrapper'
import React, { useState } from 'react'

export default function CreateSong() {
  const [activeStep, setActiveStep] = useState(0)
  const [image, setImage] = useState(null)
  const [audio, setAudio] = useState(null)

  const next = () => {
    if (activeStep !== 2) {
      setActiveStep((prev) => prev + 1)
    }
  }
  const back = () => {
    if (activeStep !== 0) {
      setActiveStep((prev) => prev - 1)
    }
  }

  return (
    <StepWrapper activeStep={activeStep}>
      {activeStep === 0 && <SongInfo />}

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
