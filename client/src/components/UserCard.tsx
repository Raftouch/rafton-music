import { User } from '@/models/user'
import { formatName } from '@/utils/format'

interface UserProps {
  user: User
  index: number
}

export default function UserCard({ user, index }: UserProps) {
  return (
    <li>
      {index + 1}. {formatName(user.username)}
    </li>
  )
}
