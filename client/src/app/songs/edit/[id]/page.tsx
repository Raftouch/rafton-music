import UpdateSongForm from '@/components/UpdateSongForm'
import useUserStore from '@/store/user'
import { getSong } from '@/utils/song'
import { redirect } from 'next/navigation'

interface UpdateSongProps {
  params: { id: string }
}

export default async function UpdateSong({ params: { id } }: UpdateSongProps) {
  try {
    const { checkAuth, isAuth } = useUserStore.getState()
    await checkAuth()
    if (!isAuth) {
      redirect('/auth/login') 
    }

    const song = await getSong(id)
    if (!song) {
      throw new Error('No song data available')
    }

    return <UpdateSongForm song={song} />
  } catch (error) {
    console.error(error)
    return <div>Error: Failed to retrieve song data</div>
  }
}
