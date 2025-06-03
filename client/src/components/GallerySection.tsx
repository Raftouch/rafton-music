import React from "react";
import Image from "next/image";
import violin from "../../public/images/violin.avif";
import guitare from "../../public/images/guitare.avif";

export default function GallerySection() {
  return (
    <section className="px-10 py-20 space-y-10">
      <div className="space-y-5 text-center max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold">Gallery</h1>
        <h2 className="text-2xl font-semibold">
          Explore musical vibes through images
        </h2>
      </div>

      <div className="flex flex-col items-center gap-10 lg:flex-row lg:justify-center">
        <Image
          src={violin}
          alt="Violin"
          width={500}
          height={300}
          className="rounded-lg object-cover"
        />
        <Image
          src={guitare}
          alt="Guitar"
          width={500}
          height={300}
          className="rounded-lg object-cover"
        />
      </div>
    </section>
  );
}
