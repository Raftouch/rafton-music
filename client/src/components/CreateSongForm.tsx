'use client'

import FileUpload from '@/components/FileUpload'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { validate } from '../validations/song'
import { FormValues } from '@/models/formvalues'
import { toast } from 'sonner'
import { API_URL } from '@/utils/const'

export default function CreateSongForm() {
  const [image, setImage] = useState<File | undefined>(undefined)
  const [audio, setAudio] = useState<File | undefined>(undefined)
  const router = useRouter()

  const [values, setValues] = useState<FormValues>({
    title: '',
    artist: '',
    genre: '',
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  function handleInput(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target
    setValues({ ...values, [name]: value })
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const validationErrors = validate({ ...values, image, audio })
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length === 0) {
      const formData = new FormData()
      formData.append('title', values.title)
      formData.append('artist[name]', values.artist)
      formData.append('genre[type]', values.genre)
      if (image) formData.append('image', image)
      if (audio) formData.append('audio', audio)
      fetch(`${API_URL}/api/songs`, {
        method: 'POST',
        body: formData,
        credentials: 'include',
      })
        .then((response) => {
          if (response.ok) {
            toast.success('Song successfully created')
            router.push('/songs')
          } else {
            toast.error('Failed to create song')
            throw new Error('Failed to submit form')
          }
        })
        .catch((error) => console.error(error))
    }
  }

  return (
    <form
      className="flex flex-col min-w-[50%] bg-white text-rafton-blue mt-20 mb-20 gap-10 p-10 rounded-md"
      onSubmit={handleSubmit}
    >
      <div className="space-y-5">
        <div>
          <label htmlFor="title">Title</label>
          <input
            className="w-full border-2"
            type="text"
            name="title"
            onChange={handleInput}
          />
          {errors.title && <p className="text-red-500">{errors.title}</p>}
        </div>
        <div>
          <label htmlFor="artist">Artist</label>
          <input
            className="w-full border-2"
            type="text"
            name="artist"
            onChange={handleInput}
          />
          {errors.artist && <p className="text-red-500">{errors.artist}</p>}
        </div>
        <div>
          <label htmlFor="genre">Genre</label>
          <input
            className="w-full border-2"
            type="text"
            name="genre"
            onChange={handleInput}
          />
          {errors.genre && <p className="text-red-500">{errors.genre}</p>}
        </div>
      </div>

      <FileUpload
        setFile={(file: File | null) => setImage(file || undefined)}
        accept="image/*"
        maxSize={5242880}
      >
        <button type="button" className="text-rafton-blue">
          Upload image
        </button>

        {errors.image && <p className="text-red-500">{errors.image}</p>}
      </FileUpload>

      <FileUpload
        setFile={(file: File | null) => setAudio(file || undefined)}
        accept="audio/*"
        maxSize={10485760}
      >
        <button type="button" className="text-rafton-blue m-auto">
          Upload audio
        </button>

        {errors.audio && <p className="text-red-500">{errors.audio}</p>}
      </FileUpload>

      <button type="submit">Create</button>
    </form>
  )
}
