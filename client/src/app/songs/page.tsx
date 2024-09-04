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




// import { cookies } from 'next/headers';
// import { Song } from '@/models/song';
// import SearchSong from '@/components/SearchSong';
// import SongList from '@/components/SongList';
// import Link from 'next/link';
// import { getAllSongs } from '@/utils/song';

// async function fetchSongs(token: string | undefined): Promise<Song[] | 'unauthorized' | null> {
//   try {
//     const response = await fetch('http://localhost:5000/api/songs', {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: token ? `Bearer ${token}` : '',
//       },
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

// export default async function Playlists({
//   searchParams,
// }: {
//   searchParams?: { query?: string; page?: string };
// }) {
//   const cookieStore = cookies();
//   const accessToken = cookieStore.get('access_token')?.value;
//   const refreshToken = cookieStore.get('refresh_token')?.value;

//   let songs: Song[] | 'unauthorized' | null = await getAllSongs(accessToken);

//   if (songs === 'unauthorized' && refreshToken) {
//     // Attempt to refresh the token
//     const refreshResponse = await fetch('http://localhost:5000/api/refresh', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ refreshToken }),
//     });

//     if (refreshResponse.ok) {
//       const { accessToken: newAccessToken } = await refreshResponse.json();
//       // Retry fetching songs with the new access token
//       songs = await getAllSongs(newAccessToken);
//     }
//   }

//   if (songs === 'unauthorized') {
//     return (
//       <div className="mt-20 mb-20 flex flex-col items-center gap-5">
//         <p>You are not authorized to view these songs. Please log in to continue.</p>
//         <Link href="/auth/login">Go to Login</Link>
//       </div>
//     );
//   }

//   if (songs === null) {
//     return (
//       <div className="mt-20 mb-20 flex flex-col items-center gap-5">
//         <p>Failed to load songs. Please try again later.</p>
//         <Link href="/songs/create">Upload new</Link>
//       </div>
//     );
//   }

//   if (songs.length === 0) {
//     return (
//       <div className="mt-20 mb-20 flex flex-col items-center gap-5">
//         <p>No songs available. Please check back later or upload new songs.</p>
//         <Link href="/songs/create">Upload new</Link>
//       </div>
//     );
//   }

//   return (
//     <div className="mt-20 mb-20 flex flex-col items-center gap-5">
//       <SearchSong placeholder="Search songs..." />
//       <Link href="/songs/create">Upload new</Link>
//       <SongList songs={songs} searchParams={searchParams} />
//     </div>
//   );
// }
