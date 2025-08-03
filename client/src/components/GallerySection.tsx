import React from "react";
import Image from "next/image";
import violin from "../../public/images/violin.avif";
import guitare from "../../public/images/guitare.avif";
import musika from "../../public/images/musika.jpg";
import piano from "../../public/images/piano.jpg";
import vinyl from "../../public/images/vinyl.jpg";
import chant from "../../public/images/chant.jpg";
import clsx from "clsx";

export default function GallerySection() {
  const slides = [
    { src: vinyl, alt: "Vinyl", colSpan: 4, rowSpan: 3 },
    { src: violin, alt: "Violin", colSpan: 6, rowSpan: 1 },
    { src: chant, alt: "Chant", colSpan: 3, rowSpan: 2 },
    { src: musika, alt: "Musika", colSpan: 3, rowSpan: 2 },
    { src: piano, alt: "Piano", colSpan: 4, rowSpan: 1 },
    { src: guitare, alt: "Guitare", colSpan: 6, rowSpan: 1 },
  ];

  return (
    <section className="px-10 py-20 space-y-10">
      <div className="space-y-5 text-center max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold">Gallery</h1>
        <h2 className="text-2xl font-semibold">
          Explore musical vibes through images
        </h2>
      </div>

      <div className="w-full h-screen flex justify-center items-center">
        <div className="grid grid-cols-10 grid-rows-4 gap-4 w-full h-full">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={clsx(
                {
                  "col-span-2": slide.colSpan === 2,
                  "col-span-3": slide.colSpan === 3,
                  "col-span-4": slide.colSpan === 4,
                  "col-span-6": slide.colSpan === 6,
                  "row-span-1": slide.rowSpan === 1,
                  "row-span-2": slide.rowSpan === 2,
                  "row-span-3": slide.rowSpan === 3,
                },
                "relative rounded-md overflow-hidden"
              )}
            >
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
