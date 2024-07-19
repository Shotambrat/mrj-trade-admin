import Image from "next/image";
import smallImage from "@/public/images/main/about-small.png";
import largeImage from "@/public/images/main/about-large.png";

export default function Banner() {
  return (
    <div className="w-full max-w-[1440px] px-2 flex flex-col 2xl:flex-row mx-auto h-auto items-center">
      <div className="flex-1 h-full flex justify-center">
        <div className="w-full flex flex-col gap-8">
          <div className="text-black text-[30px] mdx:text-[45px] font-medium mdx 2xl:w-[550px]">
            <h1>
              <span className="text-greentxt text-[38px] font-bold mdx:text-[45px]">
                MRJ Trade
              </span>{" "}
              — reliable distributor of medical equipment
            </h1>
            <div className="text-[16px] mt-[16px] text-blacklighttxt mdx:text-[20px]">
              The company provides solid range of medical diagnostic equipment for IVD, PMLS and MIS such as ultrasound devices, lab analyzers, X-rays, MRI, CT systems, dental units in the UAE
            </div>
          </div>
        </div>
      </div>
      <div className="flex-1 w-full h-full flex relative z-10 mt-8 2xl:mt-0">
        <div className="relative w-full flex justify-center">
          <div className="w-1/3 relative"></div>
          <div className="w-1/2 h-[70%] aspect-w-4 aspect-h-1 absolute bottom-0 left-0 z-10 slg:ml-[10%] slg:mb-[5%] lg:mb-[8%] mdx:max-w-[345px] lg:ml-[12%] xl:ml-[17%] 2xl:ml-0 2xl:mb-0">
            <Image
              src={smallImage}
              alt="Medical Equipment"
              layout="fill"
              objectFit="cover"
              className="rounded-3xl border-8 border-white max-w-[367px] max-h-[412px] "
            />
          </div>
          <div className="w-2/3 aspect-w-4 aspect-h-3 relative mb-12 mdx:max-w-[467px]">
            <Image
              src={largeImage}
              alt="Office"
              layout="fill"
              objectFit="cover"
              className="rounded-3xl max-w-[467px] max-h-[500px] "
            />
          </div>
        </div>
      </div>
    </div>
  );
}
