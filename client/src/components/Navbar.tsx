"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import logo from "../../public/images/rafton.png";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <div className="fixed w-full h-[80px] flex justify-between items-center bg-rafton-blue p-5">
      <button onClick={() => (window.location.href = "http://localhost:3000/")}>
        <Image src={logo} alt="logo Rafton" width={100} height={100} />
      </button>

      <ul className="flex sm:space-x-10 space-x-5 items-center">
        <Link
          href="/auth/login"
          className={pathname === "/auth/login" ? "text-rafton-green" : ""}
        >
          Login
        </Link>
        <Link
          href="/auth/register"
          className={pathname === "/auth/register" ? "text-rafton-green" : ""}
        >
          Register
        </Link>
        <Link
          href="/songs"
          className={pathname === "/songs" ? "text-rafton-green" : ""}
        >
          Playlist
        </Link>
        <Link
          href="/favourites"
          className={pathname === "/favourites" ? "text-rafton-green" : ""}
        >
          Favourites
        </Link>
      </ul>
    </div>
  );
}
