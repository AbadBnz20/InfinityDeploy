import { Experiences, Slider } from "@/components";
import { ScrollingBanner } from "@/components/home/ScrollingBanner";
import { TapsMain } from "@/components/home/TapsMain";
export default async function HomePage() {

  
  return (
    <div className="">
      <Slider  />
      <TapsMain />
      <Experiences />
      <ScrollingBanner/>
      {/* <Roms /> */}
    </div>
  );
}
