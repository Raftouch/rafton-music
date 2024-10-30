import { User } from '@/models/user'
import { checkAuth } from '@/utils/auth'
import { create } from 'zustand'

interface UserState {
  user: User | undefined
  isAuth: boolean
  setUser: (user: User | undefined) => void
  setIsAuth: (isAuth: boolean) => void
  checkAuth: () => Promise<void>
}

const useUserStore = create<UserState>((set) => ({
  user: undefined,
  isAuth: false,
  setUser: (user: User | undefined) => {
    console.log('Setting user:', user)
    set(() => ({ user }))
  },
  setIsAuth: (isAuth: boolean) => {
    console.log('Setting isAuth:', isAuth)
    set(() => ({ isAuth }))
  },
  checkAuth: async () => {
    console.log('Starting authentication check...')
    const res = await checkAuth()
    console.log('Auth check response:', res)
    if (res.authenticated) {
      console.log('User authenticated:', { id: res.id, username: res.username })
      set({
        user: { id: res.id, username: res.username },
        isAuth: true,
      })
    } else {
      console.log('User not authenticated')
      set({ user: undefined, isAuth: false })
    }
  },
}))

export default useUserStore
