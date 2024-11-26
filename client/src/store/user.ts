import { User } from '@/models/user'
import { checkAuth } from '@/utils/auth'
import { create } from 'zustand'

// interface MinimalUser {
//   id: string;
//   username: string;
// }

interface UserState {
  user: Partial<User> | undefined
  isAuth: boolean
  setUser: (user: Partial<User> | undefined) => void
  setIsAuth: (isAuth: boolean) => void
  checkAuth: () => Promise<void>
}

const useUserStore = create<UserState>((set) => ({
  user: undefined,
  isAuth: false,
  setUser: (user: Partial<User> | undefined) => {
    console.log('Setting user:', user)
    set(() => ({ user }))
  },
  setIsAuth: (isAuth: boolean) => {
    console.log('Setting isAuth:', isAuth)
    set(() => ({ isAuth }))
  },
  checkAuth: async () => {
    // const { isAuth } = useUserStore.getState()
    // if (isAuth) return // if already auth, don't check again
    console.log('Starting authentication check...')
    const res = await checkAuth()
    console.log('Auth check response:', res)
    if (res.authenticated) {
      console.log('User authenticated:', {
        id: res.id,
        username: res.username,
        role: res.role,
      })
      set({
        user: { id: res.id, username: res.username, role: res.role },
        isAuth: true,
      })
    } else {
      console.log('User not authenticated')
      set({ user: undefined, isAuth: false })
    }
  },
}))

export default useUserStore
