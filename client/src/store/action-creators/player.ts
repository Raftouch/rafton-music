import { PlayerAction, PlayerActionTypes } from "@/models/player";
import { Song } from "@/models/song";

export const playSong = (): PlayerAction => {
  return { type: PlayerActionTypes.PLAY };
};

export const pauseSong = (): PlayerAction => {
  return { type: PlayerActionTypes.PAUSE };
};

export const setActiveSong = (payload: Song): PlayerAction => {
  return { type: PlayerActionTypes.SET_ACTIVE, payload };
};

export const setVolume = (payload: number): PlayerAction => {
  return { type: PlayerActionTypes.SET_VOLUME, payload };
};

export const setDuration = (payload: number): PlayerAction => {
  return { type: PlayerActionTypes.SET_DURATION, payload };
};

export const setCurrentTime = (payload: number): PlayerAction => {
  return { type: PlayerActionTypes.SET_CURRENT_TIME, payload };
};
