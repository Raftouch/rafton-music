import { Song } from "@/models/song";
import { API_URL } from "@/utils/const";
import { create } from "zustand";

interface PlayerState {
  pause: boolean;
  active: Song | null;
  volume: number;
  duration: number;
  currentTime: number;
  playSong: (song?: Song) => void;
  pauseSong: () => void;
  setVolume: (volume: number) => void;
  setDuration: (duration: number) => void;
  setCurrentTime: (time: number) => void;
  resetPlayerState: () => void;
}

let audio: HTMLAudioElement | null = null;

const usePlayerStore = create<PlayerState>((set, get) => ({
  pause: true,
  active: null,
  volume: 50,
  duration: 0,
  currentTime: 0,

  playSong: (song?: Song) => {
    const state = get();

    if (song && song.id !== state.active?.id) {
      // If a new song is set, reset and play the new song
      if (!audio) {
        audio = new Audio();
      }
      audio.src = `${API_URL}/${song.audio}`;
      audio.volume = state.volume / 100;
      audio.play();

      // Set duration and currentTime as before
      audio.onloadedmetadata = () => {
        set({ duration: Math.ceil(audio!.duration) });
      };

      audio.ontimeupdate = () => {
        const clampedTime = Math.min(
          Math.ceil(audio!.currentTime),
          get().duration
        );
        set({ currentTime: clampedTime });
        // set({ currentTime: Math.ceil(audio!.currentTime) })
      };

      // Add an event listener for when the song ends
      audio.onended = () => {
        set({ pause: true, currentTime: 0 }); // Reset to 0 when song ends
        // set({ pause: true }) // Update pause state to show the play button
      };

      set({
        active: song,
        pause: false,
        currentTime: 0, // Reset time for a new song
      });
    } else if (state.pause && audio) {
      // If it's the same song and paused, just resume it
      audio.play();
      set({ pause: false });
    }
  },

  pauseSong: () => {
    if (audio) {
      audio.pause();
      set({ pause: true });
    }
  },

  setVolume: (volume: number) => {
    if (audio) {
      audio.volume = volume / 100;
    }
    set({ volume });
  },

  setDuration: (duration: number) => set({ duration }),

  setCurrentTime: (time: number) => {
    if (audio) {
      audio.currentTime = time;
    }
    set({ currentTime: time });
  },

  resetPlayerState: () =>
    set({
      pause: true,
      active: null,
      volume: 50,
      duration: 0,
      currentTime: 0,
    }),
}));

export default usePlayerStore;
