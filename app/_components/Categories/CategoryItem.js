import Image from "next/image";
import Link from "next/link";
import GreenArrow from "@/app/_components/Buttons/GreenArrow";

export default function CategoryItem({ key, title, imageSrc, slug }) {
  return (
    <div
      key={key}
      className="w-full rounded-3xl bg-slate-100 overflow-hidden px-6 py-6 max-mdx:px-4 max-mdx:py-4 max-mdx:rounded-2xl transition-all duration-200 relative pb-52 max-mdx:h-[300px] flex flex-col gap-5"
    >
      <h2 className="text-3xl max-mdx:text-2xl font-semibold z-10">{title}</h2>
      <Link href={`/categories/catalog/${slug}`}>
        <GreenArrow title={"view all"} />
      </Link>
      <Image
        src={imageSrc}
        width={500}
        height={500}
        alt={`${title} Photo`}
        className="absolute w-1/2 h-[80%] z-0 object-contain -bottom-16 right-0"
      />
    </div>
  );
}
