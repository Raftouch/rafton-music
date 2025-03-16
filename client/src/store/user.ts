import { User } from "@/models/user";
import { checkAuth } from "@/utils/auth";
import { getUser } from "@/utils/user";
import { create } from "zustand";

interface UserState {
  user: Partial<User> | undefined;
  isAuth: boolean;
  setUser: (user: Partial<User> | undefined) => void;
  setIsAuth: (isAuth: boolean) => void;
  checkAuth: () => Promise<void>;
}

const useUserStore = create<UserState>((set) => ({
  user: undefined,
  isAuth: false,
  setUser: (user: Partial<User> | undefined) => {
    set(() => ({ user }));
  },
  setIsAuth: (isAuth: boolean) => {
    set(() => ({ isAuth }));
  },
  checkAuth: async () => {
    const res = await checkAuth();
    if (res.authenticated) {
      const userData = await getUser(res.id);
      if (userData) {
        set({
          user: userData,
          isAuth: true,
        });
      }
    } else {
      set({ user: undefined, isAuth: false });
    }
  },
}));

export default useUserStore;
