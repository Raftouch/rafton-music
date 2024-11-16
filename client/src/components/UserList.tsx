import { User } from '@/models/user'
import { formatName } from '@/utils/format'

interface UserListProps {
  users: User[]
}

export default function UserList({ users }: UserListProps) {
  return (
    <ul className="flex flex-col gap-4 justify-start">
      {users
        .filter((user) => user.role !== 'ADMIN')
        .map((user, index) => (
          <li key={user.id}>
            {index + 1}. {formatName(user.username)}
          </li>
        ))}
    </ul>
  )
}
