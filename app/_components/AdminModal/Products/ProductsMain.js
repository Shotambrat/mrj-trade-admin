import { useState } from "react";
import ProductPreview from "./ProductPreview";
import CreatedList from "./CreatedList";
import DeleteModal from "./Modal/DeleteModal";

export default function ProductsMain({ setProductModal }) {
  const [canClose, setCanClose] = useState(true);
  const [activeId, setActiveId] = useState(1);
  const [idCount, setIdCount] = useState(2);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  const emptyProduct = {
    id: 0,
    name: "Title",
    tag: [],
    description: "Full product description",
    shortDescription: "Short description",
    discount: null,
    originalPrice: null,
    conditions: "Technical support",
    brand: {
      id: 0,
      title: "",
      photo: {
        url: "",
      },
    },
    catalog: {
      id: 0,
    },
    characteristics: [
      {
        parameterName: "Parameter Name",
        description: "Parameter desc",
      },
    ],
  };

  const [createdList, setCreatedList] = useState([{ ...emptyProduct, id: 1 }]);
  const [productGalleries, setProductGalleries] = useState({});

  const updateCreatedList = (updatedProduct) => {
    setCreatedList((prevList) =>
      prevList.map((item) =>
        item.id === updatedProduct.id ? updatedProduct : item
      )
    );
  };

  const createNewProduct = () => {
    setIdCount(idCount + 1);
    const newProduct = { ...emptyProduct, id: idCount };
    setCreatedList((prevList) => {
      return [...prevList, newProduct];
    });
  };

  const confirmDeleteProduct = (id) => {
    setCreatedList((prevList) => prevList.filter((item) => item.id !== id));
    setActiveId((prevList) => (prevList[0] ? prevList[0].id : 0));
    setShowDeleteModal(false);
  };

  const handleDeleteProduct = (id) => {
    const product = createdList.find((item) => item.id === id);
    if (product.name !== "Title") {
      setProductToDelete(id);
      setShowDeleteModal(true);
    } else {
      confirmDeleteProduct(id);
    }
  };

  const handleSelectProduct = (id) => {
    setActiveId(id);
  };

  const handleSaveProducts = async () => {
    for (const product of createdList) {
      const formData = new FormData();
      const productData = { ...product };
      delete productData.id; // Убираем id, так как он не нужен для отправки
      delete productData.priceWithDiscount;
      delete productData.subcategory;
      delete productData.category;
      formData.append("json", JSON.stringify(productData));

      if (productGalleries[product.id]) {
        productGalleries[product.id].forEach((file) => {
          formData.append("gallery", file);
        });
      }
      try {
        const response = await fetch("http://213.230.91.55:8110/product/v2/add", {
          method: "POST",
          body: formData,
        });

        console.log("Response: ", response.json())

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        console.log("Product saved successfully:", result);
        // Обработка успешного ответа
      } catch (error) {
        console.error("Error saving product:", error);
        // Обработка ошибки
      }
    }
    setProductModal(false);
  };

  const activeProduct = createdList.find((item) => item.id === activeId);

  return (
    <div className="fixed inset-0 z-[9999] h-screen w-screen bg-white flex">
      <CreatedList
        handleDeleteProduct={handleDeleteProduct}
        createNewProduct={createNewProduct}
        createdList={createdList}
        setProductModal={setProductModal}
        handleSelectProduct={handleSelectProduct}
        productGalleries={productGalleries}
        handleSave={handleSaveProducts} // Передача функции handleSave
      />
      <ProductPreview
        productGallery={productGalleries[activeId] || []}
        setProductGallery={(gallery) =>
          setProductGalleries({
            ...productGalleries,
            [activeId]: gallery,
          })
        }
        activeProduct={activeProduct}
        updateCreatedList={updateCreatedList}
      />
      {showDeleteModal && (
        <DeleteModal
          onConfirm={() => confirmDeleteProduct(productToDelete)}
          onCancel={() => setShowDeleteModal(false)}
        />
      )}
    </div>
  );
}