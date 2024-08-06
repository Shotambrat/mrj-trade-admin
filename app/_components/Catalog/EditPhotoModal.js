"use client";
import { useState } from "react";
import Image from "next/image";
export default function EditPhotoModal({ image, photoId, onClose }) {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("new-photo", selectedFile);

    try {
      const response = await fetch(`https://mrjtrade.uz/photo/${photoId}`, {
        method: "PUT",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      console.log("Photo updated successfully");
      onClose();
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <div className="fixed inset-0 z-[10000] flex justify-center items-center bg-modalBg">
      <div className="bg-white p-8 rounded-lg shadow-lg w-[90%] lg:w-[60%] max-h-[95%] overflow-y-scroll no-scrollbar">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Edit Photo</h2>
          <button onClick={onClose}>Close</button>
        </div>
        <div className="flex flex-col items-center">
          <Image
            src={image}
            alt="Current Product Image"
            width={200}
            height={200}
            className="object-contain w-full h-full"
          />
          <input type="file" onChange={handleFileChange} className="mt-4" />
          <button
            onClick={handleSubmit}
            className="bg-blue-500 rounded-lg text-white p-2 mt-2"
          >
            Upload
          </button>
          <button
            onClick={onClose}
            className="bg-gray-500 rounded-lg text-white p-2 mt-2"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}