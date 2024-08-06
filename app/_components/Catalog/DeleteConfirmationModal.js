"use client";
import { useState } from "react";

export default function DeleteConfirmationModal({ productId, onClose }) {
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleDelete = async () => {
    try {
      const response = await fetch(`https://mrjtrade.uz/product/v2/${productId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      if (result.message === "Deleted") {
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
          onClose();
        }, 5000);
      } else {
        setShowError(true);
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      setShowError(true);
    }
  };

  return (
    <div className="fixed inset-0 z-[10000] flex justify-center items-center bg-modalBg">
      <div className="bg-white p-8 rounded-lg shadow-lg w-[90%] lg:w-[40%] max-h-[95%] overflow-y-scroll no-scrollbar">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Delete Product</h2>
          <button onClick={onClose}>Close</button>
        </div>
        <div className="flex flex-col items-center">
          <p>Are you sure you want to delete this product?</p>
          <div className="flex gap-4 mt-4">
            <button
              onClick={handleDelete}
              className="bg-red-500 rounded-lg text-white p-2"
            >
              Confirm
            </button>
            <button
              onClick={onClose}
              className="bg-gray-500 rounded-lg text-white p-2"
            >
              Cancel
            </button>
          </div>
          {showSuccess && (
            <div className="mt-4 bg-green-500 text-white p-2 rounded">
              Product deleted successfully!
            </div>
          )}
          {showError && (
            <div className="mt-4 bg-red-500 text-white p-2 rounded">
              Error deleting product. Please try again.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}