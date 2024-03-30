"use client";

import React, { useEffect } from "react";
import Button from "./Button";
import PlayProgress from "./PlayProgress";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { useActions } from "@/hooks/useActions";
import { FaPause, FaPlay, FaVolumeUp } from "react-icons/fa";

let audio: HTMLAudioElement;

export default function Player() {
  const { pause, active, volume, duration, currentTime } = useTypedSelector(
    (state) => state.player,
  );
  const { pauseSong, playSong, setVolume, setCurrentTime, setDuration } =
    useActions();

  useEffect(() => {
    if (!audio) {
      audio = new Audio();
    }

    if (audio && active) {
      audio.src = "http://localhost:5000/" + active.audio;
      audio.volume = volume / 100;
      audio.onloadedmetadata = () => {
        setDuration(Math.ceil(audio.duration));
      };
      audio.ontimeupdate = () => {
        setCurrentTime(Math.ceil(audio.currentTime));
      };
      play();
    }
  }, [active]);

  const play = () => {
    if (pause) {
      playSong();
      audio.play();
    } else {
      pauseSong();
      audio.pause();
    }
  };

  const changeVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (audio) {
      audio.volume = Number(e.target.value) / 100;
      setVolume(Number(e.target.value));
    }
  };

  const changeCurrentTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (audio) {
      audio.currentTime = Number(e.target.value);
      setCurrentTime(Number(e.target.value));
    }
  };

  if (!active) {
    return null;
  }

  return (
    <div className="w-full h-[70px] fixed bottom-0 flex items-center bg-rafton-blue p-5">
      <Button onClick={play}>{!pause ? <FaPause /> : <FaPlay />}</Button>

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
