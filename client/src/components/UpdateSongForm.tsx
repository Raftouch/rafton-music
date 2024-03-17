'use client'

import FileUpload from '@/components/FileUpload'
import { useInput } from '@/hooks/useInput'
import React, { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Song } from '@/models/song'
import { toast } from 'sonner'

interface UpdateSongFormProps {
  song: Song
}

export default function UpdateSongForm({ song }: UpdateSongFormProps) {
  const [image, setImage] = useState<File | string | undefined>(song?.image)
  const [audio, setAudio] = useState<File | string | undefined>(song?.audio)
  const title = useInput(song?.title)
  const artist = useInput(song?.artist.name)
  const genre = useInput(song?.genre.type)
  const router = useRouter()

  const url = `http://localhost:5000/api/songs/${song?.id}`

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('title', title.value)
    formData.append('artist[name]', artist.value)
    formData.append('genre[type]', genre.value)
    if (image) formData.append('image', image)
    if (audio) formData.append('audio', audio)
    fetch(url, {
      method: 'PATCH',
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          toast.success('Song successfully updated')
          router.push('/songs')
        } else {
          toast.error('Failed to update song')
          throw new Error('Failed to submit form')
        }
      })
      .catch((error) => console.error(error))
  }

  return (
    <form
      className="flex flex-col bg-white text-rafton-blue mt-20 mb-20 gap-10 p-10 rounded-md"
      onSubmit={handleSubmit}
    >
      <div className="space-y-5">
        <div>
          <label>Title</label>
          <input required className="w-full border-2" {...title} />
        </div>
        <div>
          <label>Artist</label>
          <input required className="w-full border-2" {...artist} />
        </div>
        <div>
          <label>Genre</label>
          <input required className="w-full border-2" {...genre} />
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
      </FileUpload>

      <FileUpload
        setFile={(file: File | null) => setAudio(file || undefined)}
        accept="audio/*"
        maxSize={10485760}
      >
        <button type="button" className="text-rafton-blue m-auto">
          Upload audio
        </button>
      </FileUpload>

      <button type="submit">Update</button>
    </form>
  )
}
