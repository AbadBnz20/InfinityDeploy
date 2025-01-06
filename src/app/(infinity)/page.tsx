import { Experiences,   Slider } from "@/components";
import { TapsMain } from "@/components/home/TapsMain";
export default async function HomePage() {

  
  return (
    <div className="">
      <Slider  />
      <TapsMain />
      <Experiences />
      {/* <Roms /> */}
    </div>
  );
}
