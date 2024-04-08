import { Song } from "@/models/song";
import { notFound } from "next/navigation";

export async function getSong(id: string): Promise<Song | null> {
  try {
    const response = await fetch(`http://localhost:5000/api/songs/${id}`, {
      next: {
        revalidate: 60,
      },
    });
    if (response.status === 404) notFound();

    if (!response.ok) {
      throw new Error("Failed to fetch song data");
    }
    const song: Song = await response.json();
    return song;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

export async function getAllSongs(): Promise<Song[] | null> {
  try {
    const response = await fetch("http://localhost:5000/api/songs", {
      cache: "no-store",
    });
    if (response.status === 404) notFound();

    if (!response.ok) {
      throw new Error("Failed to fetch song data");
    }
    const songs: Song[] = await response.json();
    return songs;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}
