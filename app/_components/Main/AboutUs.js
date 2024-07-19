import Link from "next/link";
import Image from "next/image";
import smallImage from "@/public/images/main/about-small.png";
import largeImage from "@/public/images/main/about-large.png";

export default function AboutUs() {
  return (
    <div className="w-full max-w-[1440px] px-2 flex max-lg:flex-col-reverse max-lg:gap-8 mx-auto h-auto items-center">
      <div className="flex-1 h-full flex justify-center">
        <div className="w-full flex flex-col gap-8">
          <h2 className="text-3xl max-mdx:text-2xl font-semibold">
            ABOUT US
          </h2>
          <p className="w-full max-w-[80%] max-mdl:max-w-full text-neutral-400">
            MRJ Trade is a reliable distributor of medical equipment from leading manufacturers of the world. The company provides solid range of medical diagnostic equipment for IVD, PMLS and MIS such as ultrasound devices, lab analyzers, X-rays, MRI, CT systems, dental units in the UAE.
          </p>
          <Link href="/about">
            <button className="text-xs font-semibold rounded-xl bg-greenView text-white whitespace-nowrap px-12 py-3">
              More details
            </button>
          </Link>
        </div>
      </div>
      <div className="flex-1 w-full h-full flex relative z-10">
        <div className="relative w-full flex justify-center">
          <div className="w-1/3 relative">

          </div>
          <div className="w-1/2 h-[70%] aspect-w-4 aspect-h-1 absolute bottom-0 left-0 z-10">
            <Image
              src={smallImage}
              alt="Medical Equipment"
              layout="fill"
              objectFit="cover"
              className="rounded-3xl border-8 border-white"
            />
          </div>
          <div className="w-2/3 aspect-w-4 aspect-h-3 relative mb-12">
            <Image
              src={largeImage}
              alt="Office"
              layout="fill"
              objectFit="cover"
              className="rounded-3xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
}