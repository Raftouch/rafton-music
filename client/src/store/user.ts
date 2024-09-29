import { User } from '@/models/user'
import { create } from 'zustand'

const API_URL = process.env.NEXT_PUBLIC_API_URL

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
    try {
      const response = await fetch(`${API_URL}/auth/check-auth`, {
        method: 'GET',
        credentials: 'include',
      })
      if (response.ok) {
        const data = await response.json()
        set({ user: { id: data.id, username: data.username }, isAuth: true })
      } else {
        set({ user: undefined, isAuth: false })
      }
    } catch (error) {
      console.error('Error checking authentication:', error)
      set({ user: undefined, isAuth: false })
    }
  },
}))

export default useUserStore
