import UpdateSongForm from '@/components/UpdateSongForm'
// import useUserStore from '@/store/user'
import { getSong } from '@/utils/song'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

interface UpdateSongProps {
  params: { id: string }
}

export default async function UpdateSong({ params: { id } }: UpdateSongProps) {
  try {
    const token = cookies().get('access_token')
    if (!token) {
      redirect('/auth/login')
    }
    // const { checkAuth, isAuth } = useUserStore.getState()
    // await checkAuth()
    // if (!isAuth) {
    //   redirect('/auth/login')
    // }

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
