"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import axios from "axios";

export default function EditPhotoModal({ id, slug, onClose }) {
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  const deletePhoto = (id) => {
    setGallery((prev) =>
      prev.map((photo) => (photo.id === id ? { ...photo, url: null } : photo))
    );
  };

  useEffect(() => {
    const fetchPhotos = async () => {
      setLoading(true);
      try {
        const response = await axios(
          `http://213.230.91.55:8110/product/v2/${slug}`
        );
        setGallery(response.data.data.gallery);
        setLoading(false);
      } catch (error) {
        setLoading("Error");
      }
    };

    fetchPhotos();
  }, [slug]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      addPhoto(file);
    }
  };

  const addPhoto = (file) => {
    const newPhoto = {
      id: gallery.length + 1,
      url: file,
    };
    setGallery((prev) => [...prev, newPhoto]);
  };

  const handleClickAddPhoto = () => {
    fileInputRef.current.click();
  };

  const handleSave = async () => {
    try {
      const reallyArray = [];
      gallery.map((photo) => {
        if (!(photo.url instanceof File)) {
          reallyArray.push({
            id: photo.id,
            url: photo.url,
          });
        }
      });

      for (let photo of gallery) {
        if (photo.url instanceof File) {
          const formData = new FormData();
          formData.append("photo", photo.url);
          try {
            await axios.post('http://213.230.91.55:8110/photo', formData)
            .then(response => reallyArray.push({
              url: response.data.data.url
            }));
          } catch (error) {
            alert('Error while Post New Photos')
          }
        }
      }

      await axios.put('http://213.230.91.55:8110/product/v2',
        JSON.stringify({
          id,
          gallery: reallyArray
        }),
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      console.log(reallyArray);
      onClose();
    } catch (error) {
      alert('Error while Update All Photos')
      console.error("Error while saving photos:", error);
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 z-[10000] flex justify-center items-center bg-modalBg">
        <div className="bg-white rounded-lg shadow-lg w-[90%] lg:w-[60%] p-12 max-h-[95%] flex flex-col justify-center items-center text-3xl">
          <div className="flex justify-between items-center mb-6 w-full">
            <h2 className="text-2xl font-semibold">Edit Photo</h2>
            <button onClick={onClose}>Close</button>
          </div>
          {loading === "Error" ? "Error while fetching photos" : "Loading ..."}
        </div>
      </div>
    );
  }

  console.log(gallery);

  return (
    <div className="fixed inset-0 z-[10000] flex justify-center items-center bg-modalBg">
      <div className="bg-white p-8 rounded-lg shadow-lg w-[90%] lg:w-[60%] max-h-[95%] overflow-y-scroll no-scrollbar">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Edit Photo</h2>
          <button onClick={onClose}>Close</button>
        </div>
        {gallery.length > 0 ? (
          <div className="grid grid-cols-3 gap-4">
            {gallery.map((photo, index) =>
              photo.url ? (
                <div key={index} className="mb-4 relative border">
                  <Image
                    src={
                      photo.url instanceof File
                        ? URL.createObjectURL(photo.url)
                        : photo.url
                    }
                    alt={`Gallery image ${index + 1}`}
                    width={200}
                    height={200}
                    className="rounded-md"
                  />
                  <button
                    onClick={() => deletePhoto(photo.id)}
                    className="absolute flex justify-center items-center w-12 h-12 text-white text-xl top-0 right-0 rounded-full bg-red-700"
                  >
                    X
                  </button>
                </div>
              ) : null
            )}
            <button
              onClick={handleClickAddPhoto}
              className="border-2 border-dashed border-red-300 flex justify-center items-center text-6xl "
            >
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
              +
            </button>
          </div>
        ) : (
          <p>No photos found.</p>
        )}
        <div className="w-full flex mt-12 justify-end">
          <button onClick={handleSave} className="py-3 px-8 rounded-2xl text-white bg-blue-400">
            Сохранить
          </button>
        </div>
      </div>
    </div>
  );
}
