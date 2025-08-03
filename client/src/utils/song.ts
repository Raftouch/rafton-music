import { Song } from "@/models/song";
import { notFound } from "next/navigation";
import { API_URL } from "./const";

export async function getSong(id: string): Promise<Song | null> {
  try {
    const response = await fetch(`${API_URL}/api/songs/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
      credentials: "include",
    });

    if (response.status === 401) {
      throw new Error("Unathorized");
    } else if (response.status === 404) {
      notFound();
    } else if (!response.ok) {
      throw new Error("Failed to fetch song data");
    } else {
      const song: Song = await response.json();
      return song;
    }
  } catch (error) {
    console.error("Error fetching song:", error);
    return null;
  }
}

export async function getAllSongs(): Promise<Song[]> {
  try {
    const response = await fetch(`${API_URL}/api/songs`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
      credentials: "include",
    });

    if (response.status === 401) {
      throw new Error("Unathorized");
    } else if (response.status === 404) {
      return [];
    } else if (!response.ok) {
      throw new Error(`An error has occurred: ${response.statusText}`);
    } else {
      const songs: Song[] = await response.json();
      return songs;
    }
  } catch (error) {
    console.error("Error fetching songs:", error);
    return [];
  }
}

export async function getPublicSongs(): Promise<Song[]> {
  try {
    const response = await fetch(`${API_URL}/api/songs/public`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (response.status === 404) {
      return [];
    } else if (!response.ok) {
      throw new Error(`An error has occurred: ${response.statusText}`);
    } else {
      const songs: Song[] = await response.json();
      return songs;
    }
  } catch (error) {
    console.error("Error fetching songs:", error);
    return [];
  }
}
