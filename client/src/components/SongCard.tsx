"use client";

import { Song } from "@/models/song";
import Image from "next/image";
import Link from "next/link";
import Button from "./Button";
import RemoveBtn from "./RemoveBtn";
import { useRouter } from "next/navigation";
import { FaEdit, FaPlay, FaPause, FaHeart, FaRegHeart } from "react-icons/fa";
import usePlayerStore from "@/store/player";
import { API_URL } from "@/utils/const";
import useUserStore from "@/store/user";
import { incrementPlaycount } from "@/utils/playcount";
import { useState } from "react";

interface SongProps {
  song: Song;
}

export default function SongCard({ song }: SongProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const router = useRouter();
  const { active, pause, playSong, pauseSong } = usePlayerStore();
  const { user } = useUserStore();

  const isPlaying = active?.id === song.id && !pause;
  const isSongOwner = user?.id === song.uploadedBy.id;

  console.log("user songs : ", user?.uploadedSongs);
  console.log("user : ", user);

  const handlePlay = async () => {
    if (isPlaying) {
      pauseSong();
    } else {
      playSong(song);

      if (user?.id && song.id) {
        await incrementPlaycount(song.id, user.id);
      }
    }
  };

  return (
    <li
      key={song.id}
      className="relative bg-white text-rafton-blue p-6 flex flex-col items-center gap-4 rounded-md hover:bg-rafton-green"
    >
      <Link href={`/songs/${song.id}`}>
        <div className="w-[150px] h-[150px] overflow-hidden rounded-full">
          <Image
            src={`${API_URL}/${song.image}`}
            width={150}
            height={150}
            className="object-cover w-full h-full"
            alt="image"
            priority={true}
            unoptimized
          />
        </div>
      </Link>
      <div className="truncate w-40 font-bold">{song.title}</div>
      <div className="truncate w-40">{song.artist.name}</div>
      <div className="flex gap-8 w-full">
        <Button onClick={handlePlay}>
          {isPlaying ? <FaPause /> : <FaPlay />}
        </Button>

        {/* <button className="absolute top-2 right-2" onClick={handleFavorite}>
          {isFavorite ? <FaHeart color="red" /> : <FaRegHeart />}
        </button> */}

        {isSongOwner || user?.role === "ADMIN" ? (
          <>
            {/* <p>{active && <div>02:45 / 4:07</div>}</p> */}
            <Button onClick={() => router.push(`/songs/edit/${song.id}`)}>
              <FaEdit />
            </Button>
            <RemoveBtn id={song.id} />
          </>
        ) : null}
      </div>
    </li>
  );
}
