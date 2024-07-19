import Image from "next/image"

export default function NewCard({ key, title, date, imageSrc }) {
  return (
    <div className="w-full rounded-3xl bg-white shadow-custom-light p-4 h-full flex flex-col gap-5 justify-between">
      <Image
        src={imageSrc}
        width={500}
        height={500}
        alt={`News Image ${key}`}
        className="w-full h-auto object-cover rounded-2xl"
      />
      <div className="w-full flex flex-col gap-1">
        <h3 className="text-xl max-mdx:text-lg font-semibold">
          {title}
        </h3>
        <p className="text-neutral-400">
          {date}
        </p>
      </div>
    </div>
  )
}
