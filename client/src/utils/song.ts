import { Song } from "@/models/song";
import { notFound } from "next/navigation";

export async function getSong(id: string): Promise<Song | null> {
  try {
    const response = await fetch(`http://localhost:5000/api/songs/${id}`, {
      cache: "no-store",
      credentials: "include",
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

export async function getAllSongs(): Promise<Song[] | null | "unauthorized"> {
  try {
    const response = await fetch("http://localhost:5000/api/songs", {
      cache: "no-store",
      credentials: "include",
    });
    // if (response.status === 404) notFound();

    if (response.status === 401) {
      return "unauthorized"; // Return a special value for unauthorized access
    }

    if (response.status === 403) {
      throw new Error("Forbidden - you do not have permission to view these songs.");
    } else if (response.status === 404) {
      notFound();
      return null;
    } else if (response.status === 500) {
      throw new Error("Server error - please try again later.");
    }

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
