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
  const isPublicPage = pathname === "/" || "/auth/register";

  useEffect(() => {
    const authCheck = async () => {
      // if (pathname === "/" || pathname === "/about" || pathname === "/contact") {
      if (isPublicPage) {
        setIsLoading(false);
        return;
      }

      await checkAuth();
      setIsLoading(false);
    };

    authCheck();
  }, [checkAuth]);

  if (pathname === "/auth/login") {
    return <>{children}</>;
  }

  if (isLoading && !isPublicPage) return <Loader />;

  if (!isAuth && !isPublicPage) {
    router.push("/auth/login");
    return null;
  }

  return <>{children}</>;
}
