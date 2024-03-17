'use client'

import { useRouter } from 'next/navigation'
import Button from './Button'
import { toast } from 'sonner'
import { useState } from 'react'
import Modal from './Modal'

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
    const response = await fetch(`http://localhost:5000/api/songs/${id}`, {
      method: 'DELETE',
    })
    toast.success('Song successfully removed')

    if (response.ok) {
      router.refresh()
    }
  }

  return (
    <>
      <Button onClick={openModal}>Remove</Button>
      {modal && <Modal onClose={() => setModal(false)} onDelete={removeSong} />}
    </>
  )
}
