import Map from "@/app/_components/About/Map";
import Application from "@/app/_components/Main/Application";
import ProductInfo from "@/app/_components/Products/ProductInfo";
import Similar from "@/app/_components/Products/Similar";


export default function page() {
  return (
    <div className="w-full bg-white flex flex-col gap-56 pt-12 ">
        <ProductInfo />
        <Application />
        <Similar />
        <Map />
    </div>
  )
}
