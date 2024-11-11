'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import logo from '../../public/images/rafton.png'
import LogoutBtn from './LogoutBtn'
import useUserStore from '@/store/user'
import { useEffect, useState } from 'react'
import { formatName } from '@/utils/format'

export default function Navbar() {
  const pathname = usePathname()
  const { user, isAuth, checkAuth } = useUserStore()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkUserAuth = async () => {
      await checkAuth()
      setLoading(false)
    }
    checkUserAuth()
  }, [checkAuth])

  return (
    <div className="z-10 fixed w-full h-[80px] flex justify-between items-center bg-rafton-blue p-5">
      <Link href="/">
        <Image
          src={logo}
          alt="logo Rafton"
          width={95}
          height={95}
          priority={true}
          unoptimized
        />
      </Link>

      <ul className="flex sm:space-x-10 space-x-5 items-center">
        {loading ? null : !isAuth ? (
          <>
            <Link
              href="/auth/login"
              className={pathname === '/auth/login' ? 'text-rafton-green' : ''}
            >
              Login
            </Link>
            <Link
              href="/auth/register"
              className={
                pathname === '/auth/register' ? 'text-rafton-green' : ''
              }
            >
              Register
            </Link>
          </>
        ) : (
          <>
            <span className="">Hi, {formatName(user?.username || '', 3)}</span>
            <Link
              href="/songs"
              className={pathname === '/songs' ? 'text-rafton-green' : ''}
            >
              Playlist
            </Link>
            {/* <Link
              href="/favourites"
              className={pathname === '/favourites' ? 'text-rafton-green' : ''}
            >
              Favourites
            </Link> */}
            <LogoutBtn />
          </>
        )}
      </ul>
    </div>
  )
}
