"use client"
import Image from "next/image";
import Link from "next/link";
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
          <button onClick={handleEditClick} className="rounded-full bg-gray-200 p-1">Edit</button>
        </div>
      )}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50">
          <div className="bg-white p-4 rounded">
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleSubmit} className="bg-blue-500 text-white p-2 mt-2">Upload</button>
            <button onClick={() => setShowModal(false)} className="bg-gray-500 text-white p-2 mt-2">Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Logo;
