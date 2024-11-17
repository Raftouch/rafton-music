import { User } from '@/models/user'
import { formatName, formatDate } from '@/utils/format'
import Link from 'next/link'

interface UserProps {
  user: User
  index: number
}

export default function UserCard({ user, index }: UserProps) {
  return (
    <Link href={`/users/${user.id}`}>
      <div className="w-full flex justify-between border p-4 rounded-md hover:bg-rafton-green">
        {/* <p>{index + 1}.</p> */}
        <p>{formatName(user.username)}</p>
        <p>{user.email}</p>
        <p>{formatDate(user.registeredAt)}</p>
        <p>{user.uploadedSongs?.length}</p>
      </div>
    </Link>
  )
}
