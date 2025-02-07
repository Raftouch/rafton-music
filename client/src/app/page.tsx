import Vinyl from "@/components/Vinyl";
import Image from "next/image";
import violin from "../../public/images/violin.avif";
import guitare from "../../public/images/guitare.avif";
import dog from "../../public/images/dog.avif";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center mt-20 space-y-10">
      <h1>Welcome to Rafton 🙂</h1>
      <h2>Share Your Music with the World 🌏</h2>
      <h3 className="text-sm">
        Upload your songs, connect with fans, and discover new music. A platform
        for creators, by creators ❤️
      </h3>

      <div className="flex">
        {/* <Image src={violin} alt="violin" width={500} height={250} /> */}
        <Image src={dog} alt="dog" width={500} height={250} />
        {/* <Image src={guitare} alt="guitare" width={500} height={250} /> */}
      </div>

      {/* <p>WHAT A GREAT WEBSITE ❤️</p> */}
    </div>
  );
}
