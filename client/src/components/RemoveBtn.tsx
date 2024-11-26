'use client'

import { useRouter } from 'next/navigation'
import Button from './Button'
import { toast } from 'sonner'
import { useState } from 'react'
import Modal from './Modal'
import { RiDeleteBin7Fill } from 'react-icons/ri'
import React from 'react'
import { API_URL } from '@/utils/const'

interface DeleteSongProps {
  id: string
}

export default function RemoveBtn({ id }: DeleteSongProps) {
  const [modal, setModal] = useState(false)
  const router = useRouter()
  const openModal = () => {
    setModal(true)
  }

  const removeSong = async () => {
    const response = await fetch(`${API_URL}/api/songs/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    })
    if (response.ok) {
      toast.success('Song successfully removed')
      setTimeout(() => {
        window.location.reload()
      }, 1000)
      // router.refresh()
    } else {
      toast.error('Failed to remove the song')
    }

    setModal(false)
  }

  return (
    <>
      <Button onClick={openModal}>
        <RiDeleteBin7Fill />
      </Button>
      {modal && <Modal onClose={() => setModal(false)} onDelete={removeSong} />}
    </>
  )
}
