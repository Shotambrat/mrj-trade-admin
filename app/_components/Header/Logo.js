"use client"
import Image from "next/image";
import Link from "next/link";
import editIcon from "@/public/svg/edit-icon.svg"
import { useState } from "react";

function Logo({ logoUrl, id }) {
  const [showButtons, setShowButtons] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleMouseEnter = () => {
    setShowButtons(true);
  };

  const handleMouseLeave = () => {
    setShowButtons(false);
  };

  const handleEditClick = () => {
    setShowModal(true);
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("new-photo", selectedFile);
    console.log(formData);

    try {
      const response = await fetch("http://213.230.91.55:8110/photo/1", {
        method: "PUT",
        body: formData,
      });

      if (response.ok) {
        window.location.reload();
      } else {
        console.error("Failed to upload file");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div
      className="relative h-full"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link href="/" className="h-full">
        <Image
          src={logoUrl}
          width={300}
          height={300}
          alt="MRJ Logo"
          className="h-full w-auto"
          id={id}
        />
      </Link>
      {showButtons && (
        <div className="absolute top-0 right-0 flex gap-2">
          <button onClick={handleEditClick} className="rounded-full bg-greenView text-white px-2 py-1 border-green-400 border"><Image
          src={editIcon}
          width={100}
          height={100}
          alt="editIcon"
          className="w-4 h-4 "
          /></button>
        </div>
      )}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-modalBg z-[9999]">
          <div className="bg-white p-4 rounded-2xl max-h-screen overflow-y-scroll no-scrollbar flex flex-col gap-2 items-center">
          <h1 className="text-xl font-bold">Выберите новый логотип</h1>
          <div className="flex gap-2 items-center">
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleSubmit} className="bg-blue-500 rounded-lg text-white p-2 mt-2">Upload</button>
            <button onClick={() => setShowModal(false)} className="bg-gray-500 rounded-lg text-white p-2 mt-2">Close</button>
          </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Logo;
