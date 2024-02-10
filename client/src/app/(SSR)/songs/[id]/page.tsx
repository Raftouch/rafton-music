import { Song } from "@/models/song";
import { Metadata } from "next";
import Image from "next/image";

interface DetailsProps {
  params: { id: string };
}

export function generateMetadata(): Metadata {
  return {
    title: "Rafton - your favourite playlists here",
  };
}

export default async function SongDetails({ params: { id } }: DetailsProps) {
  const response = await fetch(`http://localhost:5000/api/songs/${id}`);
  const song: Song = await response.json();

  return (
    <div className="flex gap-10 justify-center">
      <div className="w-[420px] h-[550px] flex flex-col items-center gap-4 border p-4">
        <h1 className="font-bold uppercase">{song.title}</h1>
        <Image
          src={`http://localhost:5000/${song.image}`}
          width={250}
          height={250}
          alt="image"
          className="rounded-md"
          priority={true}
        />
        <p>{song.artists.name}</p>
        <p>{song.genres.type}</p>
      </div>
    </div>
  );
}
