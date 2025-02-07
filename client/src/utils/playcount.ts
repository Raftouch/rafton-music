import { API_URL } from "./const";

export async function incrementPlaycount(songId: string, userId: string) {
  try {
    const response = await fetch(`${API_URL}/api/playcount-records`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ songId, userId }),
    });

    if (!response.ok) {
      throw new Error("Failed to increment play count");
    }
  } catch (error) {
    console.error("Error in incrementPlayCount:", error);
  }
}
