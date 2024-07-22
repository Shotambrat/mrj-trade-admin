"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import editIcon from '@/public/svg/edit-icon.svg';

const ItemTypes = {
  ITEM: 'item',
};

const DraggableItem = ({ item, index, moveItem, handleTitleChange, handleActiveChange }) => {
  const ref = React.useRef(null);
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
        cursor: 'move',
      }}
      className="flex gap-2 items-center mb-2"
    >
      <span className="cursor-move">&#x2630;</span>
      <input
        type="text"
        value={item.title}
        onChange={(e) => handleTitleChange(index, e)}
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

const Navigation = ({ navOptions }) => {
  const [showButtons, setShowButtons] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [updatedOptions, setUpdatedOptions] = useState(navOptions);

  const handleMouseEnter = () => {
    setShowButtons(true);
  };

  const handleMouseLeave = () => {
    setShowButtons(false);
  };

  const handleEditClick = () => {
    setShowModal(true);
  };

  const handleTitleChange = (index, event) => {
    const newOptions = [...updatedOptions];
    newOptions[index].title = event.target.value;
    setUpdatedOptions(newOptions);
  };

  const handleActiveChange = (index, event) => {
    const newOptions = [...updatedOptions];
    newOptions[index].active = event.target.checked;
    setUpdatedOptions(newOptions);
  };

  const handleSubmit = async () => {
    console.log('Updated order of navigation items:', updatedOptions);
  
    try {
      const response = await fetch("http://213.230.91.55:8110/navbar/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ options: updatedOptions }),
      });
  
      if (response.ok) {
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
    const newOptions = [...updatedOptions];
    const [movedItem] = newOptions.splice(fromIndex, 1);
    newOptions.splice(toIndex, 0, movedItem);
    setUpdatedOptions(newOptions);
  };

  return (
    <nav
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="h-full relative flex gap-20 items-center max-2xl:hidden"
    >
      {showButtons && (
        <div className="absolute top-0 right-0 flex gap-2">
          <button onClick={handleEditClick} className="rounded-full bg-greenView text-white px-2 py-1 border-green-400 border">
            <Image src={editIcon} width={100} height={100} alt="editIcon" className="w-4 h-4" />
          </button>
        </div>
      )}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50 z-[9999]">
          <div className="bg-white p-4 rounded flex flex-col gap-2 items-center">
            <DndProvider backend={HTML5Backend}>
              {updatedOptions.map((option, index) => (
                <DraggableItem
                  key={option.id}
                  index={index}
                  item={option}
                  moveItem={moveItem}
                  handleTitleChange={handleTitleChange}
                  handleActiveChange={handleActiveChange}
                />
              ))}
            </DndProvider>
            <div className="flex gap-4">
              <button onClick={handleSubmit} className="bg-blue-500 rounded-lg text-white p-2 mt-2">
                Upload
              </button>
              <button onClick={() => setShowModal(false)} className="bg-gray-500 rounded-lg text-white p-2 mt-2">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      {navOptions.map((item, i) => {
        if (item.active) {
          return (
            <Link href={`/${item.slug}`} key={i}>
              <div className="text-gray-800 font-semibold text-xl hover:text-gray-400 transition-all duration-300 whitespace-nowrap">
                {item.title}
              </div>
            </Link>
          );
        }
        return null;
      })}
    </nav>
  );
};

export default Navigation;