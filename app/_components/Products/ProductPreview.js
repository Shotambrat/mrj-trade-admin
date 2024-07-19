import Image from "next/image";
import VerticalCarousel from "./ProductCarousel";
import mindray from "@/public/images/aboutUs/partners/image41.png";
import heartIcon from "@/public/svg/tools/heart-icon.svg";

export default function ProductPreview() {
  return (
    <div className="w-full flex flex-col lg:flex-row">
      <div className="flex-1 w-full">
        <VerticalCarousel />
      </div>
      <div className="w-full flex-1 flex flex-col gap-5">
        <div className="flex gap-4 max-lg:hidden">
          <h1 className="text-3xl font-semibold">RESONA R9</h1>
          <div className="py-2 px-5 font-bold rounded-full text-greenView bg-greenCategory">
            New
          </div>
        </div>
        <p className="text-neutral-400 leading-5">
          The Resona R9 by Mindray is a premium ultrasound system designed for
          high precision in both routine and complex diagnostic and
          interventional procedures. Leveraging advanced ZONE Sonography
          Technology (ZST+), it enhances ultrasound image quality through
          sophisticated zone acquisition and channel data processing. The Resona
          R9 is equipped with state-of-the-art imaging tools, such as iClear+
          for higher signal-to-noise ratio and reduced speckle noise, UWN
          Contrast Imaging, Plane-Wave-Based CEUS, Micro Flow Enhancement, and
          High Frame Rate CEUS (HiFR CEUS). These features facilitate more
          accurate and confident diagnoses and interventions
        </p>
        <hr />
        <div className="w-full flex justify-between items-center">
          <p className="w-full max-w-[200px] leading-4">
            {`Manufacturer's Warranty Technical support`}
          </p>
          <Image
            src={mindray}
            width={300}
            height={300}
            alt="Mindray"
            className="w-32 h-10"
          />
        </div>
        <div className="flex gap-4">
          <button className="px-4 py-3 text-sm font-semibold text-white rounded-xl bg-greenView">
            Send a commercial offer
          </button>
          <div className="px-3 py-3 border rounded-xl flex items-center justify-center">
            <Image
              src={heartIcon}
              width={100}
              height={100}
              alt="Heart Icon"
              className="w-5 h-5"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
