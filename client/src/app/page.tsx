import HeroSection from "@/components/HeroSection";
import GallerySection from "@/components/GallerySection";
import rainbow from "../../public/images/rainbow.svg";
import Image from "next/image";

export default function Home() {
  return (
    <main className="">
      <HeroSection />

      <Image
        src={rainbow}
        alt="rainbow"
        width={500}
        height={300}
        className=""
      />

      <GallerySection />
    </main>
  );
}
