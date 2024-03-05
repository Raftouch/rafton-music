'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'
// import { useDebounce } from 'use-debounce'

interface SearchSongProps {
  placeholder: string
}

export default function SearchSong({ placeholder }: SearchSongProps) {
  const searchParams = useSearchParams()
  const { replace } = useRouter()
  const pathname = usePathname()
  //   const [text, setText] = useState('')
  //   const [query] = useDebounce(text, 500)

  const handleChange = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams)
    term ? params.set('query', term) : params.delete('query')

    replace(`${pathname}?${params.toString()}`)
  }, 500)

  //   useEffect(() => {
  //     query ? router.push(`/songs?search=${query}`) : router.push('/songs')
  //   }, [query, router])

  return (
    <input
      className="text-slate-900 w-full mb-10"
      //   value={text}
      //   placeholder="Search songs..."
      placeholder={placeholder}
      onChange={(e) => handleChange(e.target.value)}
      defaultValue={searchParams.get('query')?.toString()}
      //   onChange={(e) => setText(e.target.value)}
    />
  )
}
