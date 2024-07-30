import Image from "next/image";
import close from "@/public/svg/close-gray.svg";
import defaultImage from "@/public/images/equipments/uzi.png";

export default function NewsCreatedListItem({ handleDeleteNew, item, newsGallery }) {
  const firstImage = newsGallery.length > 0 ? newsGallery[0] : defaultImage;

  return (
    <button className="w-full px-2 py-2 border border-neutral-300 rounded-lg bg-white relative flex gap-2">
      <div className="h-full w-auto border border-neutral-300 bg-white rounded-lg">
        <Image
          src={firstImage instanceof File ? URL.createObjectURL(firstImage) : firstImage}
          width={100}
          height={100}
          alt="News Image"
          className="w-16 h-16 object-contain"
        />
      </div>
      <div className="h-full flex flex-col items-start justify-center">
        <p className="">{item.head.title}</p>
        <p className="text-sm text-greentxt">
          click to edit
        </p>
      </div>
      <button onClick={() => handleDeleteNew(item.id)} className="absolute top-2 right-2">
        <Image
          src={close}
          width={50}
          height={50}
          alt="Close Icon Gray"
          className="w-3 h-3"
        />
      </button>
    </button>
  );
}