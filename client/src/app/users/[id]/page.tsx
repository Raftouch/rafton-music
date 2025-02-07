"use client";

import { User } from "@/models/user";
import useUserStore from "@/store/user";
import { getUser } from "@/utils/user";
import { notFound, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { formatName, formatDate } from "../../../utils/format";
import SongCard from "@/components/SongCard";
import Link from "next/link";

interface DetailsProps {
  params: { id: string };
}

export default function UserDetails({ params: { id } }: DetailsProps) {
  const [profile, setProfile] = useState<User | null>(null);
  const router = useRouter();
  const { user } = useUserStore();

  useEffect(() => {
    const fetchProfile = async () => {
      if (user?.id === id || user?.role === "ADMIN") {
        try {
          const userData = await getUser(id);
          setProfile(userData);
        } catch (error) {
          console.error("Error fetching user data:", error);
          notFound();
        }
      } else {
        console.log("Not authorized. Redirecting to home page");
        router.push("/");
      }
    };

    fetchProfile();
  }, [user, id, router]);

  if (!profile) {
    return (
      <div className="mt-20 text-center">
        <p>User not found or could not be fetched</p>
      </div>
    );
  }

  return (
    <div className="mt-20 text-center">
      <h1>Profile</h1>

      {/* <div className="flex flex-col gap-10 mt-10 mb-20"> */}
      <div className="flex gap-10 mt-10 mb-20">
        <div className="text-left flex flex-col gap-5">
          <p>Username:</p>
          <p>Role:</p>
          <p>Email:</p>
          <p>Registered at:</p>
          <p>Uploaded songs:</p>
        </div>
        <div className="text-left flex flex-col gap-5">
          <p>{formatName(profile.username)}</p>
          <p>{profile.role}</p>
          <p>{profile.email}</p>
          <p>{formatDate(profile.registeredAt)}</p>
          <ul className="space-y-4">
            {profile.uploadedSongs?.map((song) => (
              // <SongCard key={song.id} song={song} />
              <li
                key={song.id}
                className="hover:text-rafton-green"
                // onClick={() => (window.location.href = `/songs/${song.id}`)}
              >
                <Link href={`/songs/${song.id}`}>{song.title}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* <div className="flex gap-10">
          <p>Username:</p>
          <p>{formatName(profile.username)}</p>
        </div>
        <div className="flex gap-10">
          <p>Role:</p>
          <p>{profile.role}</p>
        </div>
        <div className="flex gap-10">
          <p>Registered at:</p>
          <p>{formatDate(profile.registeredAt)}</p>
        </div>
      </div>
      <div className="flex gap-10">
        <p>Number of uploaded songs:</p>
        <p>{profile.uploadedSongs?.length}</p>
      </div>
      <div className="flex gap-10">
        <p>Uploaded songs:</p>
        <ul>
          {profile.uploadedSongs?.map((song) => (
            <li key={song.id}>{song.title}</li>
          ))}
        </ul> */}
      </div>

      <div className="flex justify-between mt-auto">
        <p>Edit</p>
        <p>Delete</p>
      </div>
    </div>
  );
}
