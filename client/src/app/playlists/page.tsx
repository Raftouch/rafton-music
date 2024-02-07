"use client";

import Button from "@/components/Button";

export default function Playlists() {
  return (
    <div>
      <h1>Discover Playlists</h1>
      <Button onClick={() => console.log("open modal")}>Upload New</Button>
    </div>
  );
}
