'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { IoHomeSharp } from 'react-icons/io5'
import { RiPlayList2Fill } from 'react-icons/ri'
import { FaHeart } from 'react-icons/fa6'
import Image from 'next/image'
import logo from '../../public/images/rafton.png'

export default function Navbar() {
  const pathname = usePathname()

  return (
    <div className="fixed w-full h-[80px] flex justify-between items-center bg-rafton-blue p-5">
      <Image src={logo} alt="logo Rafton" width={100} height={100} />

      <ul className="flex sm:space-x-10 space-x-5">
        <Link href="/" className={pathname === '/' ? 'text-rafton-green' : ''}>
          <IoHomeSharp />
        </Link>
        <Link
          href="/songs"
          className={pathname === '/songs' ? 'text-rafton-green' : ''}
        >
          <RiPlayList2Fill />
        </Link>
        <Link
          href="/favourites"
          className={pathname === '/favourites' ? 'text-rafton-green' : ''}
        >
          <FaHeart />
        </Link>
      </ul>
    </div>
  )
}
