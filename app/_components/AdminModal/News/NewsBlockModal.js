import { useState } from "react";
import Image from "next/image";

export default function NewsBlockModal({ block, closeModal, updateNewsData }) {
  const [blockData, setBlockData] = useState(block);
  const [photo, setPhoto] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBlockData({ ...blockData, [name]: value });
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setPhoto(file);
  };

  const handleSave = () => {
    if (photo) {
      blockData.photo = { url: URL.createObjectURL(photo) };
    }
    updateNewsData(blockData);
    closeModal();
  };

  return (
    <div className="fixed inset-0 z-[9999] bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Edit Block</h2>
        <input
          type="text"
          name="heading"
          value={blockData.heading}
          onChange={handleInputChange}
          placeholder="Heading"
          className="w-full p-2 mb-4 border rounded-lg"
        />
        <textarea
          name="text"
          value={blockData.text}
          onChange={handleInputChange}
          placeholder="Text"
          className="w-full p-2 mb-4 border rounded-lg"
        />
        <input
          type="number"
          name="orderNum"
          value={blockData.orderNum}
          onChange={handleInputChange}
          placeholder="Order Number"
          className="w-full p-2 mb-4 border rounded-lg"
        />
        <input type="file" onChange={handlePhotoChange} className="mb-4" />
        {photo && (
          <Image
            src={URL.createObjectURL(photo)}
            width={200}
            height={200}
            alt="Selected Photo"
            className="mb-4"
          />
        )}
        <button
          className="px-4 py-2 text-sm font-semibold text-white bg-greenView rounded-xl"
          onClick={handleSave}
        >
          Save
        </button>
        <button
          className="ml-4 px-4 py-2 text-sm font-semibold text-gray-700 rounded-xl"
          onClick={closeModal}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}