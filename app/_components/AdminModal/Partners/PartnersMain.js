import { useState, useEffect } from "react";
import PartnersPreview from "./PartnersPreview";
import CreatedList from "./CreatedList";
import DeleteModal from "./Modal/DeleteModal";
import defaultImage from "@/public/images/default-image.png";

export default function PartnersMain({ setAdminModal }) {
  const [activeId, setActiveId] = useState(null);
  const [idCount, setIdCount] = useState(2);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [partnerToDelete, setPartnerToDelete] = useState(null);

  const emptyPartner = {
    id: 0,
    title: "Partner Name",
    description: "Partner Info",
    main_description: "Short Description",
    logo: defaultImage, // Default image path
  };

  const [createdList, setCreatedList] = useState([{ ...emptyPartner, id: 1 }]);

  useEffect(() => {
    if (!activeId && createdList.length > 0) {
      setActiveId(createdList[0].id);
    }
  }, [createdList, activeId]);

  const updateCreatedList = (updatedPartner) => {
    setCreatedList((prevList) =>
      prevList.map((item) =>
        item.id === updatedPartner.id ? updatedPartner : item
      )
    );
    setActiveId(updatedPartner.id);
  };

  const createNewPartner = () => {
    setIdCount(idCount + 1);
    const newPartner = { ...emptyPartner, id: idCount };
    setCreatedList((prevList) => [...prevList, newPartner]);
    setActiveId(idCount);
  };

  const confirmDeletePartner = (id) => {
    setCreatedList((prevList) => prevList.filter((item) => item.id !== id));
    setActiveId((prevList) => (prevList[0] ? prevList[0].id : null));
    setShowDeleteModal(false);
  };

  const handleDeletePartner = (id) => {
    setPartnerToDelete(id);
    setShowDeleteModal(true);
  };

  const handleSelectPartner = (id) => {
    setActiveId(id);
  };

  const handleSavePartners = async () => {
    for (const partner of createdList) {
      const formData = new FormData();
      const { logo, ...partnerData } = partner;
      delete partnerData.id;

      formData.append("json", JSON.stringify(partnerData));

      if (logo instanceof File) {
        formData.append("photo", logo);
      } else {
        const response = await fetch(logo);
        const blob = await response.blob();
        formData.append("photo", blob, "logo.png");
      }

      console.log([...formData.entries()].reduce((accumulator, [key, value]) => {
        accumulator[key] = value;
        return accumulator;
      }, {}));

      try {
        const response = await fetch("https://mrjtrade.uz/partner/create", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        console.log("Partner saved successfully:", result);
      } catch (error) {
        console.error("Error saving partner:", error);
      }
    }
    setAdminModal(false);
  };

  const activePartner = createdList.find((item) => item.id === activeId);

  return (
    <div className="fixed inset-0 z-[9999] h-screen w-screen bg-white flex">
      {activeId !== null && (
        <>
          <CreatedList
            handleDeletePartner={handleDeletePartner}
            createNewPartner={createNewPartner}
            createdList={createdList}
            setPartnerModal={setAdminModal}
            handleSelectPartner={handleSelectPartner}
            handleSave={handleSavePartners}
          />
          <PartnersPreview
            activePartner={activePartner}
            updateCreatedList={updateCreatedList}
          />
          {showDeleteModal && (
            <DeleteModal
              onConfirm={() => confirmDeletePartner(partnerToDelete)}
              onCancel={() => setShowDeleteModal(false)}
            />
          )}
        </>
      )}
    </div>
  );
}