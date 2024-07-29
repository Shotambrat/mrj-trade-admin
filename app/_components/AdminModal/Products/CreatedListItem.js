import Image from "next/image";
import close from "@/public/svg/close-gray.svg";
import defaultImage from "@/public/images/equipments/uzi.png";

export default function CreatedListItem({ handleDeleteProduct, item, productGallery }) {
  const firstImage = productGallery.length > 0 ? productGallery[0] : defaultImage;

  return (
    <button className="w-full px-2 py-2 border border-neutral-300 rounded-lg bg-white relative flex gap-2">
      <div className="h-full w-auto border border-neutral-300 bg-white rounded-lg">
        <Image
          src={firstImage instanceof File ? URL.createObjectURL(firstImage) : firstImage}
          width={100}
          height={100}
          alt="Product Image"
          className="w-16 h-16 object-contain"
        />
      </div>
      <div className="h-full flex flex-col items-start justify-center">
        <p className="">{item.name}</p>
        <p className="text-sm text-greentxt">
          click to edit
        </p>
      </div>
      <button onClick={() => handleDeleteProduct(item.id)} className="absolute top-2 right-2">
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