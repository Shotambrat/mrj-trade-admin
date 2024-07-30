import { useState } from "react";
import Image from "next/image";
import EditBlockModal from "./Modal/EditBlockModal";

export default function NewsPreview({
  newGallery,
  setNewGallery,
  activeNew,
  updateCreatedList,
}) {
  const [modal, setModal] = useState(false);

  const handleEditClick = () => {
    setModal(true);
  };

  const handleCloseModal = () => {
    setModal(false);
  };

  const handleAddBlock = () => {
    const newBlock = {
      heading: "",
      text: "",
      orderNum: activeNew.newOptions.length + 1,
      photo: null,
    };
    const updatedNew = {
      ...activeNew,
      newOptions: [...activeNew.newOptions, newBlock],
    };
    updateCreatedList(updatedNew);
  };

  if (!activeNew) return null;

  return (
    <div className="w-full flex flex-col p-6 overflow-y-scroll no-scrollbar">
      <div className="w-[900px] mx-auto flex gap-12 p-12">
        {modal && (
          <EditBlockModal
            activeNew={activeNew}
            closeModal={handleCloseModal}
            updateCreatedList={updateCreatedList}
          />
        )}
        <div className="flex-1 w-full">
          <h1 className="text-3xl font-semibold">{activeNew.head.title}</h1>
          <p className="text-neutral-400 leading-5 mt-2">{activeNew.head.body}</p>
          <Image
            src={newGallery instanceof File ? URL.createObjectURL(newGallery) : newGallery}
            width={800}
            height={600}
            alt="News Image"
            className="object-contain h-96 w-full border"
          />
          <button
            className="mt-4 px-24 py-4 text-sm font-semibold text-white rounded-xl bg-greenView"
            onClick={handleEditClick}
          >
            Edit
          </button>
          <hr className="my-6" />
          <div className="w-full">
            {activeNew.newOptions.map((block, index) => (
              <div key={index} className="mb-6">
                <h2 className="text-xl font-semibold">{block.heading}</h2>
                <p className="text-neutral-400 leading-5">{block.text}</p>
                {block.photo && (
                  <Image
                    src={block.photo instanceof File ? URL.createObjectURL(block.photo) : block.photo}
                    width={800}
                    height={600}
                    alt="Block Image"
                    className="object-contain h-96 w-full border mt-2"
                  />
                )}
                <button
                  className="mt-2 px-12 py-2 text-sm font-semibold text-white rounded-xl bg-greenView"
                  onClick={() => handleEditClick(index)}
                >
                  Edit
                </button>
              </div>
            ))}
          </div>
          <button
            className="mt-4 px-24 py-4 text-sm font-semibold text-greenView border rounded-xl"
            onClick={handleAddBlock}
          >
            Add block
          </button>
        </div>
      </div>
    </div>
  );
}

//NewsPrewiew