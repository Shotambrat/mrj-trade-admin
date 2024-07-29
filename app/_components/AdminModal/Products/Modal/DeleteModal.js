import React from "react";

export default function DeleteModal({ onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 shadow-lg">
        <h2 className="text-xl font-semibold">Delete product?</h2>
        <p className="mt-2 text-gray-600">Are you sure you want to delete the product? This action will not be undone.</p>
        <div className="mt-4 flex justify-end gap-2">
          <button
            onClick={onCancel}
            className="py-2 px-4 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}