import { useState, useEffect } from "react";
import NewsPreview from "./NewsPreview";
import NewsCreatedList from "./NewsCreatedList";
import DeleteModal from "../Products/Modal/DeleteModal";

export default function NewsMain({ setNewsModal }) {
  const [canClose, setCanClose] = useState(true);
  const [activeId, setActiveId] = useState(null);
  const [idCount, setIdCount] = useState(2);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [newToDelete, setNewToDelete] = useState(null);

  const emptyNew = {
    id: 0,
    head: {
      title: "News Title",
      body: "News Body",
    },
    newOptions: [],
  };

  const [createdList, setCreatedList] = useState([{ ...emptyNew, id: 1 }]);
  const [newsGalleries, setNewsGalleries] = useState({});

  useEffect(() => {
    setActiveId(createdList[0]?.id || null);
  }, []);

  const updateCreatedList = (updatedNew) => {
    setCreatedList((prevList) =>
      prevList.map((item) =>
        item.id === updatedNew.id ? updatedNew : item
      )
    );
  };

  const createNewNews = () => {
    setIdCount(idCount + 1);
    const newNews = { ...emptyNew, id: idCount };
    setCreatedList((prevList) => {
      return [...prevList, newNews];
    });
  };

  const confirmDeleteNew = (id) => {
    setCreatedList((prevList) => prevList.filter((item) => item.id !== id));
    setActiveId((prevList) => (prevList[0] ? prevList[0].id : null));
    setShowDeleteModal(false);
  };

  const handleDeleteNew = (id) => {
    const news = createdList.find((item) => item.id === id);
    if (news.head.title !== "News Title") {
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

      formData.append("json", JSON.stringify(newsData));

      if (newsGalleries[news.id]) {
        newsGalleries[news.id].forEach((file) => {
          formData.append("gallery", file);
        });
      }

      console.log([...formData.entries()].reduce((accumulator, [key, value]) => {
        accumulator[key] = value;
        return accumulator;
      }, {}));

      try {
        const response = await fetch("http://213.230.91.55:8110/news/create", {
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
          <NewsCreatedList
            handleDeleteNew={handleDeleteNew}
            createNewNews={createNewNews}
            createdList={createdList}
            setNewsModal={setNewsModal}
            handleSelectNew={handleSelectNew}
            newsGalleries={newsGalleries}
            handleSave={handleSaveNews}
          />
          <NewsPreview
            newsGallery={newsGalleries[activeId] || []}
            setNewsGallery={(gallery) =>
              setNewsGalleries({
                ...newsGalleries,
                [activeId]: gallery,
              })
            }
            newsData={activeNew}
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