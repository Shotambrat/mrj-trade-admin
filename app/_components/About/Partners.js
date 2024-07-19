import lingen from "@/public/images/aboutUs/partners/image28.png";
import united from "@/public/images/aboutUs/partners/image32.png";
import browiner from "@/public/images/aboutUs/partners/image41.png";
import dollar from "@/public/images/aboutUs/partners/image42.png";
import mindray from "@/public/images/aboutUs/partners/image3.png";
import zoncare from "@/public/images/aboutUs/partners/image27.png";

import Image from "next/image";

export default function Partners() {
  const logos = [
    { src: lingen, alt: "Lingen Logo" },
    { src: united, alt: "United Imaging Logo" },
    { src: browiner, alt: "Browiner Logo" },
    { src: mindray, alt: "Mindray Logo" },
    { src: dollar, alt: "Dollar Logo" },
    { src: zoncare, alt: "Zoncare Logo" },
  ];

  return (
    <div className="max-w-[1440px] mx-auto px-2">
      <div className="text-2xl mb-8 mdx:text-3xl font-semibold">OUR PARTNERS</div>
      <div className="relative grid grid-cols-2 xl:grid-cols-3">
        <div className="absolute h-[98%] w-[99%] border-2 top-1 left-1 border-white shadow-custom-heavy z-10"></div>
        {logos.map((logo, index) => (
          <div
            key={index}
            className="flex justify-center items-center w-full h-24 p-5 xl:p-24 border border-gray-200"
          >
            <Image src={logo.src} alt={logo.alt} />
          </div>
        ))}
      </div>
    </div>
  );
}
