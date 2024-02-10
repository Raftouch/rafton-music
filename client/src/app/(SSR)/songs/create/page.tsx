'use client'

import Button from '@/components/Button'
import SongInfo from '@/components/SongInfo'
import StepWrapper from '@/components/StepWrapper'
import React, { useState } from 'react'

export default function CreateSong() {
  const [activeStep, setActiveStep] = useState(0)

  const next = () => {
    if (activeStep !== 2) {
      setActiveStep((prev) => prev + 1)
    }
  }
  const back = () => {
    setActiveStep((prev) => prev - 1)
  }

  return (
    <StepWrapper activeStep={activeStep}>
      {activeStep == 0 && <SongInfo />}

      {/* {activeStep == 1 && <h1 className="text-slate-900">{activeSteps[1]}</h1>} */}
      {/* {activeStep == 2 && <h1 className="text-slate-900">{activeSteps[2]}</h1>} */}

      <div className="text-slate-900 flex justify-between mt-10">
        <Button onClick={back}>Back</Button>
        <Button onClick={next}>Next</Button>
      </div>
    </StepWrapper>
  )
}
