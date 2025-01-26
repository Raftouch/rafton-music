"use client";

import PlayProgress from "./PlayProgress";
import { FaPause, FaPlay, FaVolumeUp } from "react-icons/fa";
import usePlayerStore from "@/store/player";
import useUserStore from "@/store/user";
import { useEffect } from "react";
import { incrementPlaycount } from "@/utils/playcount";

export default function Player() {
  const {
    pause,
    active,
    volume,
    duration,
    currentTime,
    playSong,
    pauseSong,
    setVolume,
    setCurrentTime,
  } = usePlayerStore();

  const { isAuth, checkAuth, user } = useUserStore();

  useEffect(() => {
    const checkUserAuth = async () => {
      await checkAuth();
    };
    checkUserAuth();
  }, [checkAuth]);

  const play = async () => {
    if (pause) {
      playSong();

      if (isAuth && active && user && user.id) {
        await incrementPlaycount(active.id, user.id);
      }
    } else {
      pauseSong();
    }
  };

  const changeVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(Number(e.target.value));
  };

  const changeCurrentTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentTime(Number(e.target.value));
  };

  if (!isAuth || !active) {
    return null;
  }

  return (
    <div
      data-cy="player"
      className="w-full h-[70px] fixed bottom-0 flex items-center bg-rafton-blue p-5"
    >
      <button data-cy="btn-play" onClick={play}>
        {!pause ? <FaPause /> : <FaPlay />}
      </button>

      <div className="flex flex-col mr-auto ml-4">
        <div className="flex justify-between">
          <p className="text-sm truncate w-[70%]">{active.title}</p>
          <p className="text-sm truncate w-[30%]">{active.artist.name}</p>
        </div>
        <PlayProgress
          left={currentTime}
          right={duration}
          onChange={changeCurrentTime}
          classNameLeftRight=""
        />
      </div>
      <div className="hidden sm:block">
        <FaVolumeUp />
        <PlayProgress
          left={volume}
          right={100}
          onChange={changeVolume}
          classNameLeftRight="hidden"
        />
      </div>
    </div>
  );
}
