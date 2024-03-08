import { z } from 'zod'

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB

const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
]

const ACCEPTED_AUDIO_TYPES = ['audio/mpeg', 'audio/wav', 'audio/mp3']

const BaseSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  artist: z.string().min(1, 'Artist name is required'),
  genre: z.string().min(1, 'Genre type is required'),
  image: z
    .any()
    .refine((file) => file?.[0]?.size <= MAX_FILE_SIZE, {
      message: 'Max size 5MB',
    })
    .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file?.[0]?.type), {
      message: 'Only .jpg, .jpeg, .png et .webp formats are accepted',
    }),
  audio: z.any(),
  //   .refine((file) => file?.[0]?.size <= MAX_FILE_SIZE, {
  //     message: "Max size 5MB",
  //   })
  //   .refine((file) => ACCEPTED_AUDIO_TYPES.includes(file?.[0]?.type), {
  //     message: 'Only .mpeg, .wav and mp3 formats are accepted',
  //   }),
})

export const NewSongSchema = BaseSchema.extend({
  image: z.any(),
  audio: z.any(),
})

export const UpdateSongSchema = BaseSchema.extend({
  image: z.any().optional(),
  audio: z.any().optional(),
})
