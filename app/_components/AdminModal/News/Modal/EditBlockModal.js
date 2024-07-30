import { useState } from "react";
import Image from "next/image";

export default function EditBlockModal({
  activeNew,
  closeModal,
  updateCreatedList,
}) {
  const [currentBlock, setCurrentBlock] = useState(null);
  const [heading, setHeading] = useState("");
  const [text, setText] = useState("");
  const [orderNum, setOrderNum] = useState(0);
  const [photo, setPhoto] = useState(null);

  const handleSaveBlock = () => {
    const updatedBlocks = activeNew.newOptions.map((block, index) =>
      index === currentBlock
        ? { ...block, heading, text, orderNum, photo }
        : block
    );
    const updatedNew = {
      ...activeNew,
      newOptions: updatedBlocks,
    };
    updateCreatedList(updatedNew);
    closeModal();
  };

  const handlePhotoUpload = (event) => {
    setPhoto(event.target.files[0]);
  };

  useEffect(() => {
    if (currentBlock !== null) {
      const block = activeNew.newOptions[currentBlock];
      setHeading(block.heading);
      setText(block.text);
      setOrderNum(block.orderNum);
      setPhoto(block.photo);
    }
  }, [currentBlock]);

  return (
    <div className="fixed inset-0 z-[9999] bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Edit Block</h2>
        <label className="block text-sm font-medium text-gray-700">Heading</label>
        <input
          type="text"
          value={heading}
          onChange={(e) => setHeading(e.target.value)}
          className="mt-1 p-2 w-full border rounded-md"
        />
        <label className="block text-sm font-medium text-gray-700 mt-4">Text</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="mt-1 p-2 w-full border rounded-md"
          rows="4"
        ></textarea>
        <label className="block text-sm font-medium text-gray-700 mt-4">Order Number</label>
        <input
          type="number"
          value={orderNum}
          onChange={(e) => setOrderNum(parseInt(e.target.value))}
          className="mt-1 p-2 w-full border rounded-md"
        />
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
              alt="Block Image"
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
            onClick={handleSaveBlock}
            className="px-4 py-2 text-sm font-semibold text-white bg-greenView rounded-md"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}