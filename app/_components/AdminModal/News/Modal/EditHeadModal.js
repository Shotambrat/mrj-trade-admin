import { useState, useEffect } from "react";
import Image from "next/image";

export default function EditHeadModal({ activeNew, closeModal, updateCreatedList }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    if (activeNew) {
      setTitle(activeNew.head.title);
      setBody(activeNew.head.body);
      setPhoto(activeNew.head.photo);
    }
  }, [activeNew]);

  const handleSaveHead = () => {
    const updatedNew = {
      ...activeNew,
      head: { ...activeNew.head, title, body, photo },
    };
    updateCreatedList(updatedNew);
    closeModal();
  };

  const handlePhotoUpload = (event) => {
    setPhoto(event.target.files[0]);
  };

  return (
    <div className="fixed inset-0 z-[9999] bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Edit Head</h2>
        <label className="block text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 p-2 w-full border rounded-md"
        />
        <label className="block text-sm font-medium text-gray-700 mt-4">Body</label>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className="mt-1 p-2 w-full border rounded-md"
          rows="4"
        ></textarea>
        <label className="block text-sm font-medium text-gray-700 mt-4">Photo</label>
        <input
          type="file"
          onChange={handlePhotoUpload}
          className="mt-1 p-2 w-full border rounded-md"
        />
        {photo && (
          <div className="mt-4">
            <Image
              src={photo instanceof File ? URL.createObjectURL(photo) : photo}
              width={400}
              height={300}
              alt="Head Image"
              className="object-contain h-48 w-full border mt-2"
            />
          </div>
        )}
        <div className="mt-6 flex justify-end">
          <button
            onClick={closeModal}
            className="px-4 py-2 text-sm font-semibold text-gray-600 border rounded-md mr-2"
          >
            Cancel
          </button>
          <button
            onClick={handleSaveHead}
            className="px-4 py-2 text-sm font-semibold text-white bg-greenView rounded-md"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}