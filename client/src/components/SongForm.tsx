'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Song } from '@/models/song'
import { z } from 'zod'
import { ValidationSchema } from '@/utils/schema'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

interface SongFormProps {
  song?: Song
  isEditMode: boolean
}

type FormFields = z.infer<typeof ValidationSchema>

const steps = [
  {
    id: 'Step 1',
    name: 'Song Information',
    fields: ['title', 'artist', 'genre'],
  },
  { id: 'Step 2', name: 'Upload image' },
  { id: 'Step 3', name: 'Upload audio' },
  { id: 'Step 4', name: 'Form submitted' },
]

export default function SongForm({ song, isEditMode }: SongFormProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [previousStep, setPreviousStep] = useState(0)
  const router = useRouter()

  const {
    register,
    handleSubmit,
    reset,
    trigger,
    setValue,
    formState: { errors },
  } = useForm<FormFields>({
    resolver: zodResolver(ValidationSchema),
  })

  useEffect(() => {
    if (song) {
      setValue('title', song.title || '')
      setValue('artist', song.artist.name || '')
      setValue('genre', song.genre.type || '')
      if (song?.image) {
        setValue('image', song.image[0])
      }
      if (song?.audio) {
        setValue('audio', song.audio[0])
      }
    }
  }, [song, setValue])

  const url = isEditMode
    ? `http://localhost:5000/api/songs/${song?.id}`
    : 'http://localhost:5000/api/songs'

  const onSubmit: SubmitHandler<FormFields> = (song) => {
    const formData = new FormData()

    formData.append('title', song.title)
    formData.append('artist[name]', song.artist)
    formData.append('genre[type]', song.genre)
    if (song.image) formData.append('image', song.image[0])
    if (song.audio) formData.append('audio', song.audio[0])

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

    console.log(song)
    reset()
  }

  type FieldName = keyof FormFields

  const next = async () => {
    const fields = steps[currentStep].fields
    const output = await trigger(fields as FieldName[])

    if (!output) return

    if (currentStep < steps.length - 1) {
      if (currentStep === steps.length - 2) {
        await handleSubmit(onSubmit)()
      }
      setPreviousStep(currentStep)
      setCurrentStep((step) => step + 1)
    }
  }

  const back = () => {
    if (currentStep > 0) {
      setPreviousStep(currentStep)
      setCurrentStep((step) => step - 1)
    }
  }

  return (
    <section className="bg-white text-rafton-blue flex flex-col gap-10 justify-between p-10 mt-40 rounded-md">
      <nav aria-label="Progress">
        <ol role="list" className="space-y-4 md:flex md:space-x-8 md:space-y-0">
          {steps.map((step, index) => (
            <li key={step.name}>
              {currentStep > index ? (
                <div className="flex flex-col">
                  <span>{step.id}</span>
                  <span>{step.name}</span>
                </div>
              ) : currentStep === index ? (
                <div aria-current="step">
                  <span>{step.id}</span>
                  <span>{step.name}</span>
                </div>
              ) : (
                <div>
                  <span>{step.id}</span>
                  <span>{step.name}</span>
                </div>
              )}
            </li>
          ))}
        </ol>
      </nav>

      <form onSubmit={handleSubmit(onSubmit)}>
        {currentStep === 0 && (
          <div className="p-5 w-[100%]">
            <div className="flex flex-col gap-5">
              <div className="flex flex-col">
                <div className="flex gap-5">
                  <label htmlFor="title" className="w-1/6">
                    Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    {...register('title')}
                    autoComplete={song?.title ?? ''}
                    className="w-full border-2"
                  />
                </div>
                {errors.title?.message && (
                  <p className="mt-2 text-sm text-red-500">
                    {errors.title.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col">
                <div className="flex gap-5">
                  <label htmlFor="artist" className="w-1/6">
                    Artist
                  </label>
                  <input
                    type="text"
                    id="artist"
                    {...register('artist')}
                    autoComplete={song?.artist.name ?? ''}
                    className="w-full border-2"
                  />
                </div>
                {errors.artist?.message && (
                  <p className="mt-2 text-sm text-red-500">
                    {errors.artist.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col">
                <div className="flex gap-5">
                  <label htmlFor="genre" className="w-1/6">
                    Genre
                  </label>
                  <input
                    type="text"
                    id="genre"
                    {...register('genre')}
                    autoComplete={song?.genre.type ?? ''}
                    className="w-full border-2"
                  />
                </div>
                {errors.genre?.message && (
                  <p className="mt-2 text-sm text-red-500">
                    {errors.genre.message}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {currentStep === 1 && (
          <div>
            <input
              type="file"
              id="image"
              {...register('image')}
              autoComplete={song?.image ?? ''}
              className="w-full border-2"
            />
            <button className="text-slate-900">Upload image</button>
            {errors.image?.message && (
              <p className="mt-2 text-sm text-red-500">
                Failed to upload image
              </p>
            )}
          </div>
        )}

        {currentStep === 2 && (
          <div>
            <input
              type="file"
              id="audio"
              {...register('audio')}
              autoComplete={song?.audio ?? ''}
              className="w-full border-2"
            />
            <button className="text-slate-900">Upload audio</button>
            {errors.audio?.message && (
              <p className="mt-2 text-sm text-red-500">
                Failed to upload audio
              </p>
            )}
          </div>
        )}

        <div className="mt-8 pt-5">
          <div className="flex justify-between">
            <button
              type="button"
              onClick={back}
              disabled={currentStep === 0}
              className="rounded px-2 py-1 text-sm font-semibold text-rafton-blue shadow-sm disabled:cursor-not-allowed disabled:opacity-50"
            >
              Back
            </button>
            <button
              type="button"
              onClick={next}
              disabled={currentStep === steps.length - 1}
              className="rounded px-2 py-1 text-sm font-semibold text-rafton-blue shadow-sm disabled:cursor-not-allowed disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </form>
    </section>
  )
}
