"use client";

import usePlayerStore from "@/store/player";
import useUserStore from "@/store/user";
import { API_URL } from "@/utils/const";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function LogoutBtn() {
  const router = useRouter();
  const { setUser, setIsAuth } = useUserStore();
  const { resetPlayerState } = usePlayerStore();

  const handleLogout = async () => {
    try {
      const response = await fetch(`${API_URL}/api/auth/logout`, {
        method: "POST",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`Logout failed, status: ${response.status}`);
      }

      setUser(undefined); // Clear user data
      setIsAuth(false);
      resetPlayerState();

      toast.success("Logout successful!");
      router.push("/");
    } catch (error) {
      console.error(error);
      toast.error("Logout failed");
    }
  };

  return <button onClick={handleLogout}>Logout</button>;
}
