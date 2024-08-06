import { useState, useEffect } from "react";
import NewsPreview from "./NewsPreview";
import CreatedList from "./CreatedList";
import DeleteModal from "./Modal/DeleteModal";
import DefaultImage from "@/public/images/default-image.png";

export default function NewsMain({ setNewsModal }) {
  const [activeId, setActiveId] = useState(null);
  const [idCount, setIdCount] = useState(2);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [newToDelete, setNewToDelete] = useState(null);

  const emptyNew = {
    id: 0,
    head: {
      title: "News Title",
      body: "News Body",
      photo: DefaultImage,
    },
    newOptions: [
      {
        heading: "Heading",
        text: "Text",
        orderNum: 1,
        photo: DefaultImage,
      }
    ],
  };

  const [createdList, setCreatedList] = useState([{ ...emptyNew, id: 1 }]);

  useEffect(() => {
    setActiveId(createdList[0]?.id || null);
  }, []);

  const updateCreatedList = (updatedNew) => {
    setCreatedList((prevList) =>
      prevList.map((item) => (item.id === updatedNew.id ? updatedNew : item))
    );
  };

  const createNew = () => {
    setIdCount(idCount + 1);
    const newNew = { ...emptyNew, id: idCount };
    setCreatedList((prevList) => {
      return [...prevList, newNew];
    });
  };

  const confirmDeleteNew = (id) => {
    setCreatedList((prevList) => prevList.filter((item) => item.id !== id));
    setActiveId((prevList) => (prevList[0] ? prevList[0].id : null));
    setShowDeleteModal(false);
  };

  const handleDeleteNew = (id) => {
    const newItem = createdList.find((item) => item.id === id);
    if (newItem.head.title !== "News Title") {
      setNewToDelete(id);
      setShowDeleteModal(true);
    } else {
      confirmDeleteNew(id);
    }
  };

  const handleSelectNew = (id) => {
    setActiveId(id);
  };

  const handleSaveNews = async () => {
    for (const news of createdList) {
      const formData = new FormData();
      const newsData = { ...news };
      delete newsData.id;
  
      // Remove photo fields from the json data
      const { photo, ...headWithoutPhoto } = newsData.head;
      console.log(headWithoutPhoto)
      const newOptionsWithoutPhotos = newsData.newOptions.map(option => {
        const { photo, ...optionWithoutPhoto } = option;
        console.log(optionWithoutPhoto)
        return optionWithoutPhoto;
      });
  
      const jsonToSend = {
        ...newsData,
        head: headWithoutPhoto,
        newOptions: newOptionsWithoutPhotos
      };

      console.log("JsonTosend", jsonToSend)
  
      formData.append("json", JSON.stringify(jsonToSend));
  
      if (news.head.photo) {
        formData.append("main-photo", news.head.photo);
      }
  
      news.newOptions.forEach((option) => {
        if (option.photo) {
          formData.append(`block-index-${option.orderNum}`, option.photo);
        }
      });
  
      try {
        const response = await fetch("https://mrjtrade.uz/news/create", {
          method: "POST",
          body: formData,
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
  
        const result = await response.json();
        console.log("News saved successfully:", result);
      } catch (error) {
        console.error("Error saving news:", error);
      }
    }
    setNewsModal(false);
  };

  const activeNew = createdList.find((item) => item.id === activeId);

  return (
    <div className="fixed inset-0 z-[9999] h-screen w-screen bg-white flex">
      {activeId !== null && (
        <>
          <CreatedList
            handleDeleteNew={handleDeleteNew}
            createNew={createNew}
            createdList={createdList}
            setNewsModal={setNewsModal}
            handleSelectNew={handleSelectNew}
            handleSave={handleSaveNews}
          />
          <NewsPreview
            activeNew={activeNew}
            updateCreatedList={updateCreatedList}
          />
          {showDeleteModal && (
            <DeleteModal
              onConfirm={() => confirmDeleteNew(newToDelete)}
              onCancel={() => setShowDeleteModal(false)}
            />
          )}
        </>
      )}
    </div>
  );
}