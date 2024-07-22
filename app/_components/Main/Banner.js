"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import axios from "axios";
import Image from "next/image";
import editIcon from "@/public/svg/edit-icon.svg";

const ItemTypes = {
  ITEM: "item",
};

const DraggableBanner = ({
  item,
  index,
  moveItem,
  handleLinkChange,
  handleActiveChange,
}) => {
  const ref = useRef(null);
  const [, drop] = useDrop({
    accept: ItemTypes.ITEM,
    hover(draggedItem) {
      if (draggedItem.index !== index) {
        moveItem(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.ITEM,
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  return (
    <div
      ref={ref}
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: "move",
      }}
      className="flex gap-2 items-center mb-2"
    >
      <Image
        src={item.photo.url}
        width={150}
        height={150}
        alt={`Banner ${item.id}`}
        className="w-[150px]"
      />
      <input
      type="file"
      
      />
      <input
        type="text"
        value={item.link}
        onChange={(e) => handleLinkChange(index, e)}
        className="p-2 border rounded"
      />
      <label className="flex items-center">
        Active
        <input
          type="checkbox"
          checked={item.active}
          onChange={(e) => handleActiveChange(index, e)}
          className="ml-2"
        />
      </label>
    </div>
  );
};

const BannerCarousel = () => {
  const [banners, setBanners] = useState([]);
  const [showButtons, setShowButtons] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [updatedBanners, setUpdatedBanners] = useState([]);

  const fetchBanners = useCallback(async () => {
    try {
      const response = await axios.get("http://213.230.91.55:8110/banner/get");
      if (response.data && response.data.data && response.data.data.banner) {
        setBanners(response.data.data.banner.data);
        setUpdatedBanners(response.data.data.banner.data);
      }
    } catch (error) {
      console.error("Error fetching banners:", error);
    }
  }, []);

  useEffect(() => {
    fetchBanners();
  }, [fetchBanners]);

  const handleMouseEnter = () => {
    setShowButtons(true);
  };

  const handleMouseLeave = () => {
    setShowButtons(false);
  };

  const handleEditClick = () => {
    setShowModal(true);
  };

  const handleLinkChange = (index, event) => {
    const newBanners = [...updatedBanners];
    newBanners[index].link = event.target.value;
    setUpdatedBanners(newBanners);
  };

  const handleActiveChange = (index, event) => {
    const newBanners = [...updatedBanners];
    newBanners[index].active = event.target.checked;
    setUpdatedBanners(newBanners);
  };

  const handleSubmit = async () => {
    console.log("Updated order of banners:", updatedBanners);

    // Prepare data for the API request
    const updateData = updatedBanners.map(({ id, link, active }) => ({
      id,
      link,
      active,
    }));

    try {
      const response = await axios.put("http://213.230.91.55:8110/banner/update/", {
        options: updateData,
      });

      if (response.status === 200) {
        console.log("Update successful");
      } else {
        console.error("Update failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }

    setShowModal(false);
  };

  const moveItem = (fromIndex, toIndex) => {
    const newBanners = [...updatedBanners];
    const [movedItem] = newBanners.splice(fromIndex, 1);
    newBanners.splice(toIndex, 0, movedItem);
    setUpdatedBanners(newBanners);
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="w-full max-w-[1440px] mx-auto relative px-2"
    >
      <Carousel
        autoPlay
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        showIndicators={false}
        renderArrowPrev={(clickHandler, hasPrev) => (
          <button
            onClick={clickHandler}
            className={`${
              hasPrev ? "absolute" : "hidden"
            } top-1/2 z-10 left-4 transform -translate-y-1/2 bg-gray-500 rounded-full p-2 opacity-70 hover:opacity-100`}
            aria-label="Previous Slide"
          >
            <svg
              className="w-8 h-8 max-mdl:w-6 max-mdl:h-6 text-white"
              viewBox="-9 0 40 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.2969 1.5625L1.85938 10L10.2969 18.4375M3.03125 10L20.1406 10"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        )}
        renderArrowNext={(clickHandler, hasNext) => (
          <button
            onClick={clickHandler}
            className={`${
              hasNext ? "absolute" : "hidden"
            } top-1/2 right-4 z-10 transform -translate-y-1/2 bg-gray-500 rounded-full p-2 opacity-70 hover:opacity-100`}
            aria-label="Next Slide"
          >
            <svg
              className="w-8 h-8 max-mdl:w-6 max-mdl:h-6 text-white"
              viewBox="-9 0 40 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.7031 1.5625L20.1406 10L11.7031 18.4375M18.9687 10L1.85937 10"
                stroke="white"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        )}
        className="relative"
      >
        {banners.map((banner, index) => (
          <div key={banner.id} className="w-full relative">
            <a href={banner.link} target="_blank" rel="noopener noreferrer">
              <Image
                src={banner.photo.url}
                width={1500}
                height={1500}
                alt={`Banner ${banner.id}`}
                className="w-full h-full rounded-2xl"
              />
            </a>
          </div>
        ))}
      </Carousel>
      {showButtons && (
        <div className="absolute top-0 right-0 flex gap-2">
          <button
            onClick={handleEditClick}
            className="rounded-full bg-greenView text-white px-2 py-1 border-green-400 border"
          >
            <Image
              src={editIcon}
              width={100}
              height={100}
              alt="editIcon"
              className="w-4 h-4"
            />
          </button>
        </div>
      )}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50 z-[9999]">
          <div className="bg-white p-4 rounded flex flex-col gap-2 items-center">
            <DndProvider backend={HTML5Backend}>
              {updatedBanners.map((banner, index) => (
                <DraggableBanner
                  key={banner.id}
                  index={index}
                  item={banner}
                  moveItem={moveItem}
                  handleLinkChange={handleLinkChange}
                  handleActiveChange={handleActiveChange}
                />
              ))}
            </DndProvider>
            <div className="flex gap-4">
              <button
                onClick={handleSubmit}
                className="bg-blue-500 rounded-lg text-white p-2 mt-2"
              >
                Upload
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-500 rounded-lg text-white p-2 mt-2"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BannerCarousel;
