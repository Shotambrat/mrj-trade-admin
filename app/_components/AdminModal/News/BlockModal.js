import { useState } from "react";

export default function BlockModal({ block, updateBlock, closeModal }) {
  const [heading, setHeading] = useState(block.heading || "");
  const [text, setText] = useState(block.text || "");
  const [orderNum, setOrderNum] = useState(block.orderNum || 1);
  const [photo, setPhoto] = useState(block.photo || null);

  const handleSave = () => {
    updateBlock({ ...block, heading, text, orderNum, photo });
    closeModal();
  };

  const handlePhotoUpload = (event) => {
    const file = event.target.files[0];
    setPhoto(file);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold mb-4">Edit Block</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Heading</label>
          <input
            type="text"
            value={heading}
            onChange={(e) => setHeading(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Text</label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Order Number</label>
          <input
            type="number"
            value={orderNum}
            onChange={(e) => setOrderNum(Number(e.target.value))}
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Photo (optional)</label>
          <input type="file" onChange={handlePhotoUpload} className="w-full px-3 py-2 border rounded-lg" />
        </div>
        <div className="flex justify-end gap-2">
          <button onClick={closeModal} className="px-4 py-2 border rounded-lg">Cancel</button>
          <button onClick={handleSave} className="px-4 py-2 bg-greenView text-white rounded-lg">Save</button>
        </div>
      </div>
    </div>
  );
}