"use client";
import { useState } from "react";
import Image from "next/image";
import PartnersInfo from "./Modal/PartnersInfo";
import defaultImage from "@/public/images/default-image.png";

export default function PartnersPreview({ activePartner, updateCreatedList }) {
  const [modal, setModal] = useState(false);

  const handleEditClick = () => {
    setModal(true);
  };

  const handleCloseModal = () => {
    setModal(false);
  };

  const handleInputPhoto = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateCreatedList({ ...activePartner, logo: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  if (!activePartner) return null;

  return (
    <div className="w-full flex flex-col items-center p-12">
      {modal && (
        <PartnersInfo
          emptyPartner={activePartner}
          setEmptyPartner={(partner) => updateCreatedList(partner)}
          closeModal={handleCloseModal}
          updateCreatedList={updateCreatedList}
        />
      )}
      <div className="w-full flex flex-col gap-12 p-12">
        <div className="w-full flex gap-20 items-center">
          <Image
            src={activePartner.logo || defaultImage}
            width={150}
            height={150}
            alt="Partner Logo"
            className="h-36 w-auto"
          />
          <label className="px-12 py-3 text-white text-xl bg-greenView rounded-xl cursor-pointer">
            Upload logo
            <input
              type="file"
              accept="image/*"
              onChange={handleInputPhoto}
              className="hidden"
            />
          </label>
        </div>
        <hr />
        <div className="w-full mb-8">
          <h1 className="text-5xl font-bold mb-4">{activePartner.title}</h1>
          <p className="text-xl" dangerouslySetInnerHTML={{ __html: activePartner.description.replace(/\n/g, "<br>") }}></p>
          <button
            className="px-20 text-xl py-3 font-semibold text-white rounded-xl bg-greenView mt-8"
            onClick={handleEditClick}
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  );
}