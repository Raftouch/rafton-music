"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <div className="fixed w-full h-[80px] flex justify-between items-center bg-rafton-blue p-5">
      <span>LOGO</span>

      <ul className="flex sm:space-x-10 sm:flex-row flex-col">
        <Link href="/" className={pathname === "/" ? "text-rafton-green" : ""}>
          Home
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
