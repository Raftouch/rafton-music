'use server'

import { Song } from '@/models/song'
import { cookies } from 'next/headers'
import { notFound } from 'next/navigation'

const API_URL = process.env.NEXT_PUBLIC_API_URL

export async function getSong(id: string): Promise<Song | null> {
  try {
    const response = await fetch(`${API_URL}/api/songs/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Cookie: cookies().toString(),
      },
      cache: 'no-store',
      credentials: 'include',
    })

    if (response.status === 401) {
      throw new Error('Unathorized')
    } else if (response.status === 404) {
      notFound()
    } else if (!response.ok) {
      throw new Error('Failed to fetch song data')
    } else {
      const song: Song = await response.json()
      return song
    }
  } catch (error) {
    console.error('Error fetching song:', error)
    return null
  }
}

export async function getAllSongs(): Promise<Song[] | null> {
  try {
    const response = await fetch(`${API_URL}/api/songs`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Cookie: cookies().toString(),
      },
      cache: 'no-store',
      credentials: 'include',
    })

    if (response.status === 401) {
      throw new Error('Unathorized')
    } else if (response.status === 404) {
      notFound()
    } else if (!response.ok) {
      throw new Error(`An error has occurred: ${response.statusText}`)
    } else {
      const songs: Song[] = await response.json()
      return songs
    }
  } catch (error) {
    console.error('Error fetching songs:', error)
    return null
  }
}
