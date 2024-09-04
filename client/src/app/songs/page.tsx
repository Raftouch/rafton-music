import SearchSong from "@/components/SearchSong";
import SongList from "@/components/SongList";
import { getAllSongs } from "@/utils/song";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Rafton - Playlist",
};

export default async function Playlists({
  searchParams,
}: {
  searchParams?: { query?: string; page?: string };
}) {
  const songs = await getAllSongs();

  if (songs === "unauthorized") {
    return (
      <div className="mt-20 mb-20 flex flex-col items-center gap-5">
        <p>You are not authorized to view these songs. Please log in to continue.</p>
        <Link href="/auth/login">Go to Login</Link>
      </div>
    );
  }

  if (songs === null) {
    return (
      <div className="mt-20 mb-20 flex flex-col items-center gap-5">
        <p>Failed to load songs. Please try again later.</p>
        <Link href="/songs/create">Upload new</Link>
      </div>
    );
  }

  if (songs.length === 0) {
    return (
      <div className="mt-20 mb-20 flex flex-col items-center gap-5">
        <p>No songs available. Please check back later or upload new songs.</p>
        <Link href="/songs/create">Upload new</Link>
      </div>
    );
  }

  if (!songs) {
    throw new Error("No song data available");
  }

  return (
    <div className="mt-20 mb-20 flex flex-col items-center gap-5">
      <SearchSong placeholder="Search songs..." />
      <Link href="/songs/create">Upload new</Link>
      <SongList songs={songs} searchParams={searchParams} />
    </div>
  );
}
