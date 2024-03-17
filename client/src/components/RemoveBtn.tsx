'use client'

import { useRouter } from 'next/navigation'
import Button from './Button'
import { toast } from 'sonner'

interface DeleteSongProps {
  id: string
}

export default function RemoveBtn({ id }: DeleteSongProps) {
  const router = useRouter()
  const removeSong = async () => {
    const confirmed = confirm('Are you sure?')

    if (confirmed) {
      const response = await fetch(`http://localhost:5000/api/songs/${id}`, {
        method: 'DELETE',
      })
      toast.success('Song successfully removed')

      if (response.ok) {
        router.refresh()
      }
    }
  }

  return <Button onClick={removeSong}>Remove</Button>
}
