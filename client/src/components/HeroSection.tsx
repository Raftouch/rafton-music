import React from "react";
import Image from "next/image";
import dog from "../../public/images/dog.avif";
import rainbow from "../../public/images/rainbow.svg";

export default function HeroSection() {
  return (
    <section className="px-10 py-28 relative flex flex-col justify-center items-center text-center">
      <h1
        className="text-3xl font-bold mb-10 z-10 bg-contain"
        style={{ backgroundImage: `url(${rainbow.src})` }}
      >
        Welcome to Rafton
      </h1>

      <div className="flex flex-col lg:flex-row items-center justify-between gap-10 w-full max-w-6xl">
        <div className="space-y-5 max-w-xl text-left">
          <h2 className="text-2xl font-semibold">
            Share Your Music with the World 🌏
          </h2>
          <p className="text-base">
            Upload your songs, connect with fans, and discover new music
          </p>
          <p className="text-base">A platform for creators, by creators!</p>
        </div>

        <Image
          src={dog}
          alt="dog"
          width={600}
          height={350}
          className="rounded-xl object-cover"
        />
      </div>
    </section>
  );
}
