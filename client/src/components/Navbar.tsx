"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <div className="w-screen h-[80px] border-b-2 flex justify-between items-center p-5">
      <span>LOGO</span>

      <ul className="flex space-x-10">
        <Link href="/" className={pathname === "/" ? "text-teal-400" : ""}>
          Home
        </Link>
        <Link
          href="/songs"
          className={pathname === "/songs" ? "text-teal-400" : ""}
        >
          Playlists
        </Link>
        <Link
          href="/favourites"
          className={pathname === "/favourites" ? "text-teal-400" : ""}
        >
          Favourites
        </Link>
      </ul>
    </div>
  );
}
