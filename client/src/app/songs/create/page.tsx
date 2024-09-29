import CreateSongForm from '@/components/CreateSongForm'
import useUserStore from '@/store/user'
import { redirect } from 'next/navigation'

export default async function CreateSong() {
  const { checkAuth, isAuth } = useUserStore.getState()
  await checkAuth()
  if (!isAuth) {
    redirect('/auth/login')
  }

  return <CreateSongForm />
}
