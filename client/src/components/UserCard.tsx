import { User } from "@/models/user";
import { formatName, formatDate } from "@/utils/format";
import { FaInfo } from "react-icons/fa";
import Link from "next/link";

interface UserProps {
  user: User;
  index: number;
}

export default function UserCard({ user, index }: UserProps) {
  return (
    <div className="w-full flex justify-between items-center border p-4 rounded-md">
      {/* <p>{index + 1}.</p> */}
      <div>
        <span className="text-xs text-rafton-green">username</span>
        <p>{formatName(user.username)}</p>
      </div>
      <div>
        <span className="text-xs text-rafton-green">email</span>
        <p>{user.email}</p>
      </div>
      {/* <div>
          <span className="text-xs text-rafton-green">registered at</span>
          <p>{formatDate(user.registeredAt)}</p>
        </div> */}
      <div>
        <span className="text-xs text-rafton-green">uploads</span>
        <p>{user.uploadedSongs?.length}</p>
      </div>
      <div>
        <Link href={`/users/${user.id}`}>
          <FaInfo />
        </Link>
      </div>
    </div>
  );
}
