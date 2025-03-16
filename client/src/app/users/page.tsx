"use client";

import UserList from "@/components/UserList";
import { User } from "@/models/user";
import useUserStore from "@/store/user";
import { getAllUsers } from "@/utils/user";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function UsersList() {
  const [users, setUsers] = useState<User[]>([]);
  const { user } = useUserStore();
  const router = useRouter();

  useEffect(() => {
    const fetchUsers = async () => {
      if (user?.role === "ADMIN") {
        try {
          const usersData = await getAllUsers();
          setUsers(usersData || []);
        } catch (error) {
          console.error("Failed to fetch users:", error);
        }
      } else {
        router.push("/");
      }
    };

    fetchUsers();
  }, [user, router]);

  return (
    <div className="mt-20 sm:w-[80%] w-full">
      <h1 className="mb-10 text-center">Users List</h1>
      {users.length > 0 ? <UserList users={users} /> : <p>No users found</p>}
    </div>
  );
}
