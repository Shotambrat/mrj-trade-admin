import Banner from "@/app/_components/Main/Banner";
import Equipments from "@/app/_components/Main/Equipments";
import Scheme from "@/app/_components/Main/Scheme";
import ProfessionalEquipments from "@/app/_components/Main/ProfessionalEquipments";
import AboutUs from "@/app/_components/Main/AboutUs";
import Application from "./Application";
import Partners from "../About/Partners";
import News from "./News";
import Map from "../About/Map";

export default function Main() {
  return (
    <div className="w-full bg-white pt-12 flex flex-col gap-32">
      <Banner />
      <Equipments />
      <Scheme />
      <ProfessionalEquipments />
      <AboutUs />
      <Application />
      <Partners />
      <News />
      <Map />
    </div>
  );
}
