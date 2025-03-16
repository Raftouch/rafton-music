"use client";

import SearchSong from "@/components/SearchSong";
import SongList from "@/components/SongList";
import { getAllSongs } from "@/utils/song";
// import { Metadata } from 'next'
import Link from "next/link";
import React, { Suspense, useEffect, useState } from "react";
// import { API_URL } from '@/utils/const'
import { Song } from "@/models/song";
import Loader from "@/components/Loader";

export default function Playlists({
  searchParams,
}: {
  searchParams?: { query?: string; page?: string };
}) {
  const [songs, setSongs] = useState<Song[]>([]);

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

  return (
    <div className="mt-20 mb-20 flex flex-col items-center gap-5">
      <Suspense fallback={<Loader />}>
        <SearchSong placeholder="Search songs..." />
      </Suspense>
      {/* <SearchSong placeholder="Search songs..." /> */}
      <Link href="/songs/create">Upload new</Link>
      {songs.length > 0 ? (
        // <SongList songs={songs} searchParams={searchParams} />
        <SongList songs={songs} />
      ) : (
        <p>No songs found</p>
      )}
    </div>
  );
}
