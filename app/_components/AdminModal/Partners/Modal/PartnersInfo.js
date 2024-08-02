"use client";
import { useState } from "react";

export default function PartnersInfo({
  emptyPartner,
  setEmptyPartner,
  closeModal,
  updateCreatedList,
}) {
  const [partner, setPartner] = useState(emptyPartner);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPartner({ ...partner, [name]: value });
  };

  const handleSave = () => {
    setEmptyPartner(partner);
    updateCreatedList(partner);
    closeModal();
  };

  return (
    <div className="fixed inset-0 z-[10000] flex justify-center items-center bg-modalBg">
      <div className="bg-white rounded-lg shadow-lg w-[90%] lg:w-[60%] max-h-[95%] overflow-y-scroll no-scrollbar">
        <div className="flex justify-between items-center mb-6 bg-snowy p-8">
          <h2 className="text-2xl font-semibold">ABOUT PARTNER</h2>
          <button onClick={closeModal}>Close</button>
        </div>
        <div className="p-8 flex flex-col gap-4">
          <div className="flex gap-24 items-start justify-between text-2xl font-semibold">
            <p className="w-1/3 pt-2">Partner Name</p>
            <input
              type="text"
              name="title"
              value={partner.title}
              onChange={handleInputChange}
              className="border-2 border-neutral-300 p-2 pl-4 rounded-2xl w-full"
            />
          </div>
          <div className="flex gap-24 items-start justify-between text-2xl font-semibold">
            <p className="w-1/3 pt-2">Short description</p>
            <textarea
              name="main_description"
              value={partner.main_description}
              onChange={handleInputChange}
              className="border-2 border-neutral-300 p-2 pl-4 rounded-2xl w-full"
              rows="5"
            />
          </div>
          <div className="flex gap-24 items-start justify-between text-2xl font-semibold">
            <p className="w-1/3 pt-2">Partner Info</p>
            <textarea
              name="description"
              value={partner.description}
              onChange={handleInputChange}
              className="border-2 border-neutral-300 p-2 pl-4 rounded-2xl w-full"
              rows="10"
            />
          </div>
        </div>
        <div className="w-full flex justify-end px-8 pb-8">
          <button
            onClick={handleSave}
            className="py-3 px-20 bg-greenView text-white text-xl rounded-xl"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
