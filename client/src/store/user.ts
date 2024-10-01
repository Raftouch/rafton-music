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
  setUser: (user: User | undefined) => set(() => ({ user })),
  setIsAuth: (isAuth: boolean) => set(() => ({ isAuth })),
  checkAuth: async () => {
    const res = await checkAuth()
    if (res.authenticated) {
      set({
        user: { id: res.id, username: res.username },
        isAuth: true,
      })
    } else {
      set({ user: undefined, isAuth: false })
    }
  },
}))

export default useUserStore
