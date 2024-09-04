import { Song } from "@/models/song";
import { notFound } from "next/navigation";

export async function getSong(id: string, token?: string): Promise<Song | null> {
  try {
    const response = await fetch(`http://localhost:5000/api/songs/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token ? `Bearer ${token}` : '', // Include token in Authorization header
      },
      cache: "no-store",
      credentials: "include",
    });

    if (response.status === 404) {
      notFound();
      return null; // notFound() throws an error, but this is a fallback
    }

    if (!response.ok) {
      throw new Error("Failed to fetch song data");
    }

    const song: Song = await response.json();
    return song;
  } catch (error) {
    console.error("Error fetching song:", error);
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

// export async function getAllSongs(token: string | undefined): Promise<Song[] | 'unauthorized' | null> {
//   try {
//     const response = await fetch('http://localhost:5000/api/songs', {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: token ? `Bearer ${token}` : '',
//       },
//       cache: "no-store",
//       credentials: "include",
//     });

//     if (response.status === 401) {
//       return 'unauthorized';
//     } else if (response.status === 404) {
//       return null;
//     } else if (!response.ok) {
//       throw new Error(`An error has occurred: ${response.statusText}`);
//     } else {
//       return await response.json();
//     }
//   } catch (error) {
//     console.error('Error fetching songs:', error);
//     return null;
//   }
// }
