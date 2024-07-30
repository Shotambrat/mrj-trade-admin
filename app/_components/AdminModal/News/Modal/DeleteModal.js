import React from "react";

export default function DeleteModal({ onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 z-[9999] bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Confirm Delete</h2>
        <p className="mb-6">Are you sure you want to delete this news item?</p>
        <div className="flex justify-end">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm font-semibold text-gray-600 border rounded-md mr-2"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-sm font-semibold text-white bg-red-500 rounded-md"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
