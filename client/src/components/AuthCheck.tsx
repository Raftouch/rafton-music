"use client";

import { useEffect, useState } from "react";
import useUserStore from "@/store/user";
import { usePathname, useRouter } from "next/navigation";
import Loader from "./Loader";

interface AuthCheckProps {
  children: React.ReactNode;
}

export default function AuthCheck({ children }: AuthCheckProps) {
  const [isLoading, setIsLoading] = useState(true);
  const { checkAuth, isAuth } = useUserStore();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const authCheck = async () => {
      await checkAuth();
      setIsLoading(false);
    };

    authCheck();
  }, [checkAuth]);

  if (pathname === "/auth/login") {
    return <>{children}</>;
  }

  if (isLoading) return <Loader />;

  if (!isAuth) {
    router.push("/auth/login");
    return null;
  }

  return <>{children}</>;
}
