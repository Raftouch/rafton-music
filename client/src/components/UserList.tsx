import { User } from '@/models/user'
import UserCard from './UserCard'

interface UserListProps {
  users: User[]
}

export default function UserList({ users }: UserListProps) {
  return (
    <ul className="flex flex-col gap-4 justify-start">
      {users
        .filter((user) => user.role !== 'ADMIN')
        .map((user, index) => (
          <UserCard user={user} index={index} key={user.id} />
        ))}
    </ul>
  )
}
