import CreateSongForm from '@/components/CreateSongForm'
// import useUserStore from '@/store/user'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function CreateSong() {
  const token = cookies().get('access_token')
  if (!token) {
    redirect('/auth/login')
  }
  // const { checkAuth, isAuth } = useUserStore.getState()
  // await checkAuth()
  // if (!isAuth) {
  //   redirect('/auth/login')
  // }

  return <CreateSongForm />
}
