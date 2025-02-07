"use client";

import SearchSong from "@/components/SearchSong";
import SongList from "@/components/SongList";
import { getAllSongs } from "@/utils/song";
// import { Metadata } from 'next'
import Link from "next/link";
import React, { useEffect, useState } from "react";
// import { API_URL } from '@/utils/const'
import { Song } from "@/models/song";

export default function Playlists({
  searchParams,
}: {
  searchParams?: { query?: string; page?: string };
}) {
  const [songs, setSongs] = useState<Song[]>([]);
  const [clientReady, setClientReady] = useState(false);

  useEffect(() => {
    setClientReady(true);
  }, []);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const songsData = await getAllSongs();
        console.log("songs data : ", songsData);
        setSongs(songsData || []);
      } catch (error) {
        console.error("Failed to fetch songs:", error);
      }
    };

    fetchSongs();
  }, []);

  if (!clientReady) {
    return null;
  }

  return (
    <div className="mt-20 mb-20 flex flex-col items-center gap-5">
      <SearchSong placeholder="Search songs..." />
      <Link href="/songs/create">Upload new</Link>
      {songs.length > 0 ? (
        <SongList songs={songs} searchParams={searchParams} />
      ) : (
        <p>No songs found</p>
      )}
    </div>
  );
}
