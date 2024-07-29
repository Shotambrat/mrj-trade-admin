"use client";
import { useState } from "react";

export default function ProductCharacteristics({ emptyProduct, setEmptyProduct }) {
  const [active, setActive] = useState('description');
  const [filtered, setFiltered] = useState(emptyProduct.description);

  const handleFilter = (catname) => {
    setActive(catname);
    const filteredData = catname === 'description' ? emptyProduct.description : emptyProduct.characteristics;
    setFiltered(filteredData);
  };

  const handleEditClick = () => {
    if (active === 'description') {
      setShowDescriptionModal(true);
    } else {
      setShowCharacteristicsModal(true);
    }
  };

  const [showDescriptionModal, setShowDescriptionModal] = useState(false);
  const [showCharacteristicsModal, setShowCharacteristicsModal] = useState(false);

  const addNewParameter = () => {
    const newParameter = { parameterName: '', description: [''] };
    const updatedCharacteristics = [...emptyProduct.characteristics, newParameter];
    setEmptyProduct({ ...emptyProduct, characteristics: updatedCharacteristics });
  };

  const removeParameter = (index) => {
    const updatedCharacteristics = emptyProduct.characteristics.filter((_, i) => i !== index);
    setEmptyProduct({ ...emptyProduct, characteristics: updatedCharacteristics });
  };

  return (
    <div className="w-full flex flex-col gap-5">
      <div className="w-full flex flex-col relative">
        <div className="w-full overflow-x-scroll flex gap-8 lg:gap-12 scrollbar-hide touch-auto">
          <button
            onClick={() => handleFilter('description')}
            className={`z-10 w-auto text-lg transition-text font-medium ${
              active === 'description' ? 'text-greenView border-b-2 border-b-greenView' : 'text-neutral-400'
            }`}
          >
            <h3 className="my-2 whitespace-nowrap">Description</h3>
          </button>
          <button
            onClick={() => handleFilter('characteristics')}
            className={`z-10 w-auto text-lg transition-text font-medium ${
              active === 'characteristics' ? 'text-greenView border-b-2 border-b-greenView' : 'text-neutral-400'
            }`}
          >
            <h3 className="my-2 whitespace-nowrap">Characteristics</h3>
          </button>
        </div>
        <hr className="w-full border-t-2 absolute bottom-0 border-slate-300" />
      </div>
      <div>
        {active === 'description' ? (
          <div>
            <p className="text-lg leading-5">{filtered}</p>
            <button
              className="px-24 py-4 text-sm font-semibold text-white rounded-xl bg-greenView mt-4"
              onClick={handleEditClick}
            >
              Edit
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-start gap-6 w-full">
            {filtered.map((item, i) => (
              <div key={i} className="w-full flex gap-3">
                <p className="w-full text-neutral-400 max-w-[100px] md:max-w-[150px] mdx:max-w-[200px] lg:max-w-[400px]">
                  {item.parameterName}
                </p>
                <div className="flex w-full flex-col">
                  {item.description.map((desc, j) => (
                    <p key={j}>{desc}</p>
                  ))}
                </div>
              </div>
            ))}
            <button
              className="px-24 py-4 text-sm font-semibold text-white rounded-xl bg-greenView mt-4"
              onClick={handleEditClick}
            >
              Edit
            </button>
          </div>
        )}
      </div>

      {showDescriptionModal && (
        <div className="fixed inset-0 z-[10000] flex justify-center items-center bg-modalBg">
          <div className="bg-white p-8 rounded-lg shadow-lg w-[90%] lg:w-[60%]">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">Description</h2>
              <button onClick={() => setShowDescriptionModal(false)}>Close</button>
            </div>
            <textarea
              className="border p-2 rounded w-full h-40 mt-4"
              value={emptyProduct.description}
              onChange={(e) => setEmptyProduct({ ...emptyProduct, description: e.target.value })}
            />
            <div className="flex justify-end mt-6">
              <button
                className="py-2 px-6 bg-green-500 text-white rounded-lg"
                onClick={() => {
                  setShowDescriptionModal(false);
                  setFiltered(emptyProduct.description);
                }}
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {showCharacteristicsModal && (
        <div className="fixed inset-0 z-[10000] flex justify-center items-center bg-modalBg">
          <div className="bg-white p-8 rounded-lg shadow-lg w-[90%] lg:w-[80%] h-[90%] overflow-y-scroll no-scrollbar">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">Product Characteristics</h2>
              <button onClick={() => setShowCharacteristicsModal(false)}>Close</button>
            </div>
            {emptyProduct.characteristics.map((characteristic, index) => (
              <div key={index} className="w-full flex flex-col items-start">
                <div className="w-full grid grid-cols-1 gap-4 mt-4 ">
                  <label>
                    Parameter name
                    <input
                      type="text"
                      name="parameterName"
                      value={characteristic.parameterName}
                      onChange={(e) => {
                        const newCharacteristics = [...emptyProduct.characteristics];
                        newCharacteristics[index].parameterName = e.target.value;
                        setEmptyProduct({ ...emptyProduct, characteristics: newCharacteristics });
                      }}
                      className="border p-2 rounded w-full"
                    />
                  </label>
                  <label>
                    Description
                    <textarea
                      name="description"
                      value={characteristic.description.join('\n')}
                      onChange={(e) => {
                        const newCharacteristics = [...emptyProduct.characteristics];
                        newCharacteristics[index].description = e.target.value.split('\n');
                        setEmptyProduct({ ...emptyProduct, characteristics: newCharacteristics });
                      }}
                      className="border p-2 rounded w-full h-20"
                    />
                  </label>
                </div>
                <button
                  className="py-2 px-4 text-sm font-semibold text-red-500 rounded-xl bg-transparent border border-red-500 mt-4"
                  onClick={() => removeParameter(index)}
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              className="py-2 px-4 text-sm font-semibold text-green-500 rounded-xl bg-transparent border border-green-500 mt-4"
              onClick={addNewParameter}
            >
              + Add parameter
            </button>
            <div className="flex justify-end mt-6">
              <button
                className="py-2 px-6 bg-green-500 text-white rounded-lg"
                onClick={() => {
                  setShowCharacteristicsModal(false);
                  setFiltered(emptyProduct.characteristics);
                }}
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}