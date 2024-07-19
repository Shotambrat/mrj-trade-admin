import WhyChooseUs from "@/app/_components/About/WhyChooseUs"
import WhatWeDo from "@/app/_components/About/WhatWeDo"
import Partners from "@/app/_components/About/Partners"
import Banner from "@/app/_components/About/Banner";
import Map from "@/app/_components/About/Map";

export default function Home() {
  return (
    <main className="w-full bg-white flex flex-col gap-32  mx-auto">
      <div ><Banner /></div>
      <div ><WhatWeDo /></div>
      <div ><Partners /></div>
      <div ><WhyChooseUs /></div>
      <div><Map /></div>
    </main>
  );
}
