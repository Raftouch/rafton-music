"use client";

import UpdateSongForm from "@/components/UpdateSongForm";
import { Song } from "@/models/song";
import { getSong } from "@/utils/song";
import { notFound } from "next/navigation";
import { useEffect, useState } from "react";

interface UpdateSongProps {
  params: { id: string };
}

export default function UpdateSong({ params: { id } }: UpdateSongProps) {
  const [song, setSong] = useState<Song | null>(null);

  useEffect(() => {
    const fetchSong = async () => {
      try {
        const songData = await getSong(id);
        setSong(songData);
      } catch (error) {
        console.error("Error fetching song data:", error);
        notFound();
      }
    };

    fetchSong();
  }, [id]);

  if (!song) return "No song data available";

  return <UpdateSongForm song={song} />;
}
