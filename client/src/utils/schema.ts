import { z } from 'zod'

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB

const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
]

const ACCEPTED_AUDIO_TYPES = ['audio/mpeg', 'audio/wav', 'audio/mp3']

export const FormDataSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  artist: z.string().min(1, 'Artist name is required'),
  genre: z.string().min(1, 'Genre type is required'),
  image: z
    .any()
    .refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      'Only .jpg, .jpeg, .png and .webp formats are supported.'
    ),
  audio: z
    .any()
    .refine((file) => file?.size <= MAX_FILE_SIZE, `Max audio size is 5MB.`)
    .refine(
      (file) => ACCEPTED_AUDIO_TYPES.includes(file?.type),
      'Only .mp3, .wav, and .mpeg formats are supported.'
    ),
})
