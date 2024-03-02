import SongList from "@/components/SongList";
import { Song } from "@/models/song";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Rafton - Playlist",
};

export default async function Playlists() {
  const response = await fetch(
    "http://localhost:5000/api/songs",
    { next: { revalidate: 0 } },
    // { cache: 'no-cache' } // or 'no-store'
  );
  const songs: Song[] = await response.json();

  return (
    <div className="flex flex-col items-center">
      <SongList songs={songs} />
      <Link className="fixed bottom-24" href="/songs/create">
        Upload new
      </Link>
    </div>
  );
}
