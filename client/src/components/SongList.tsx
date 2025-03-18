import { Song } from "@/models/song";
import SongCard from "./SongCard";
import { useSearchParams } from "next/navigation";

interface SongListProps {
  songs: Song[];
  // searchParams?: { query?: string; page?: string };
}

// export default function SongList({ songs, searchParams }: SongListProps) {
export default function SongList({ songs }: SongListProps) {
  // const query = searchParams?.query || "";
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";

  const filteredSongs = query
    ? songs.filter((song) =>
        song.title.toLowerCase().startsWith(query.toLowerCase())
      )
    : songs;

  if (filteredSongs.length === 0) {
    return (
      <p>
        {query ? "No songs found matching your query" : "No songs available"}
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 justify-items-center">
      {filteredSongs.map((song) => (
        <SongCard song={song} key={song.id} />
      ))}
    </div>
  );
}
