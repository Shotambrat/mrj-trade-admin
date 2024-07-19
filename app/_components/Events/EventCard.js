import Image from "next/image";
import Link from "next/link";

export default function EventCard({ title, imageSrc, link }) {
  return (
    <div className=" relative rounded-2xl overflow-hidden shadow-lg h-[300px] mdx:h-[400px]  grid grid-cols-3">
      <Image
        src={imageSrc}
        alt={title}
        layout="fill"
        objectFit="cover"
        className="object-cover w-full h-full "
      />
      <div className=" absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end mdx:flex-row p-4 mdx:items-end mdx:justify-between ">
        <h3 className="text-xl  text-white mb-4 w-[221px] mdx:text-[24px] mdx:uppercase mdx:w-[380px] xl:w-full">{title}</h3>
        <Link href={link} className="flex justify-center bg-white text-black px-4 py-2 w-[140px] font-semibold rounded-lg hover:bg-gray-200 transition mdx:w-[190px]">
          More info
        </Link>
      </div>
    </div>
  );
}
