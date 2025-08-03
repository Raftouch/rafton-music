"use client";

import React, { useEffect, useState } from "react";
import SongList from "./SongList";
import { Song } from "@/models/song";
import { getPublicSongs } from "@/utils/song";

export default function SongsSection() {
  const [songs, setSongs] = useState<Song[]>([]);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const songsData = await getPublicSongs();
        setSongs(songsData || []);
      } catch (error) {
        console.error("Failed to fetch songs:", error);
      }
    };

    fetchSongs();
  }, []);
  return (
    <section className="px-10 py-20 space-y-10">
      <div className="space-y-5 text-center max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold">Last added</h1>
      </div>
      <SongList songs={songs} />
    </section>
  );
}
