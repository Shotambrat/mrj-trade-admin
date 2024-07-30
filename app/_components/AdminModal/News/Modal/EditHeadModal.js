import { useState, useEffect } from "react";
import Image from "next/image";

export default function EditHeadModal({
  activeNew,
  closeModal,
  updateCreatedList,
}) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [photo, setPhoto] = useState(null);

  const handleSaveHead = () => {
    const updatedNew = {
      ...activeNew,
      head: {
        ...activeNew.head,
        title,
        body,
        photo
      }
    };
    updateCreatedList(updatedNew);
    closeModal();
  };

  const handlePhotoUpload = (event) => {
    setPhoto(event.target.files[0]);
  };

  useEffect(() => {
    setTitle(activeNew.head.title);
    setBody(activeNew.head.body);
    setPhoto(activeNew.head.photo);
  }, [activeNew]);

  return (
    <div className="fixed inset-0 z-[9999] bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[400px]">
        <h2 className="text-xl font-semibold mb-4">Edit Head</h2>
        <div className="mb-4">
          <label className="block text-sm font-semibold">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold">Body</label>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold">Photo</label>
          <input
            type="file"
            onChange={handlePhotoUpload}
            className="w-full border rounded"
          />
          {photo && (
            <Image
              src={photo instanceof File ? URL.createObjectURL(photo) : photo}
              width={400}
              height={300}
              alt="Preview"
              className="object-contain mt-2"
            />
          )}
        </div>
        <div className="flex justify-end gap-2">
          <button
            className="px-4 py-2 text-white bg-greenView rounded"
            onClick={handleSaveHead}
          >
            Save
          </button>
          <button
            className="px-4 py-2 text-white bg-red-600 rounded"
            onClick={closeModal}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}