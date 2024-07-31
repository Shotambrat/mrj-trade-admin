"use client";
import { useState, useEffect } from "react";
import { Transition } from "@headlessui/react";
import Image from "next/image";
import upGreen from "@/public/svg/arrow-up-green.svg";
import downGray from "@/public/svg/arrow-down-gray.svg";

const AccordionItem = ({ title, isOpen, onClick, children, defaultOpen }) => {
  return (
    <div className="border-t border-b border-solid">
      <summary
        onClick={onClick}
        className={`flex gap-5 py-7 ${isOpen ? "text-greenView" : "text-black"} font-semibold text-xl max-md:max-w-full cursor-pointer`}
      >
        <span className="flex-auto">{title}</span>
        {isOpen ? (
          <Image
            src={upGreen}
            alt="Up icon"
            priority
            width={20}
            height={20}
            quality={100}
          />
        ) : (
          <Image
            src={downGray}
            alt="Down icon"
            priority
            width={20}
            height={20}
            quality={100}
          />
        )}
      </summary>
      <Transition
        show={isOpen}
        enter="transition-all duration-500 ease-in-out"
        enterFrom="max-h-0 opacity-0"
        enterTo="max-h-screen opacity-100"
        leave="transition-all duration-500 ease-in-out"
        leaveFrom="max-h-screen opacity-100"
        leaveTo="max-h-0 opacity-0"
      >
        <div className="overflow-hidden">{children}</div>
      </Transition>
    </div>
  );
};

const AccordionContent = ({ children }) => {
  return <div className="pb-5 px-4">{children}</div>;
};

export default function CatalogList({ categories, onCatalogSelect, onCategorySelect, openSection }) {
  const [openSections, setOpenSections] = useState([]);

  useEffect(() => {
    if (openSection) {
      setOpenSections([openSection]);
    }
  }, [openSection]);

  const toggleSection = (section) => {
    setOpenSections((prev) =>
      prev.includes(section)
        ? prev.filter((s) => s !== section)
        : [...prev, section]
    );
  };

  return (
    <section className="w-full">
      <div className="flex flex-col w-full">
        {categories.map(({ id, title, catalog }) => (
          <div key={id} className="w-full">
            {catalog.length > 0 ? (
              <AccordionItem
                title={title}
                isOpen={openSections.includes(id)}
                onClick={() => toggleSection(id)}
                defaultOpen={openSections.includes(id)}
              >
                <AccordionContent>
                  <div className="flex flex-col gap-5 text-lg font-semibold text-neutral-900 w-full">
                    {catalog.map(
                      (catalogItem) => (
                        <div
                          className="cursor-pointer"
                          key={catalogItem.id}
                          onClick={() => onCatalogSelect(catalogItem.id)}
                        >
                          {catalogItem.name}
                        </div>
                      )
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ) : (
              <div
                className="py-7 border-t border-b border-solid border-neutral-200 cursor-pointer"
                onClick={() => onCategorySelect(id)}
              >
                <span className="text-2xl font-bold text-neutral-900">{title}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}