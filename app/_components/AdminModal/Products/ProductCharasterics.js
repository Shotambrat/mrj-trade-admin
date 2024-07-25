"use client";
import { useState } from "react";

export default function ProductCharacteristics() {

  const data = [
    {
      category: 'description',
      title: 'Description',
      desc: true,
      data: 'The Resona R9 by Mindray is a premium ultrasound system designed for high precision in both routine and complex diagnostic and interventional procedures. Leveraging advanced ZONE Sonography Technology (ZST+), it enhances ultrasound image quality through sophisticated zone acquisition and channel data processing. The Resona R9 is equipped with state-of-the-art imaging tools, such as iClear+ for higher signal-to-noise ratio and reduced speckle noise, UWN Contrast Imaging, Plane-Wave-Based CEUS, Micro Flow Enhancement, and High Frame Rate CEUS (HiFR CEUS). These features facilitate more accurate and confident diagnoses and interventions.'
    },
    {
      category: 'characteristics',
      title: 'Characteristics',
      desc: false,
      data: [
        {
          title: 'Display',
          data: [
            '23.8" high-resolution LED monitor',
            '13.3" tilting gesture control touch screen'
          ]
        },
        {
          title: 'Control Panel',
          data: [
            '6-directional floating control panel'
          ]
        },
        {
          title: 'Transducer Ports',
          data: [
            'Five pinless transducer ports with light indicators'
          ]
        },
        {
          title: 'Heating and Handling',
          data: [
            'Temperature-controlled gel warmer'
          ]
        },
        {
          title: 'Locking Mechanism',
          data: [
            'Central and swivel lock'
          ]
        },
        {
          title: 'Technology',
          data: [
            'iClear+ for higher signal-to-noise ratio and reduced speckle noise',
            'UWN Contrast Imaging for improved contrast visualization',
            'Plane-Wave-Based CEUS for high frame rate contrast-enhanced ultrasound',
            'Micro Flow Enhancement for detailed blood flow imaging',
            'High Frame Rate CEUS (HiFR CEUS) for dynamic contrast studies',
          ]
        },
      ]
    }
  ];

  const [active, setActive] = useState(data[0].category);
  const [filtered, setFiltered] = useState(data[0]);

  const handleFilter = (catname) => {
    setActive(catname);
    const filteredArr = data.find((item) => item.category === catname);
    setFiltered(filteredArr);
  };

  return (
    <div className="w-full flex flex-col gap-5">
      <div className="w-full flex flex-col relative">
        <div className="w-full overflow-x-scroll flex gap-8 lg:gap-12 scrollbar-hide touch-auto">
          {data.map((item, index) => {
            return (
              <button
                onClick={() => handleFilter(item.category)}
                key={index}
                className={`z-10 w-auto text-lg transition-text font-medium ${
                  active == item.category
                    ? "text-greenView border-b-2 border-b-greenView"
                    : "text-neutral-400"
                }`}
              >
                <h3 className="my-2 whitespace-nowrap">{item.title}</h3>
              </button>
            );
          })}
        </div>
        <hr className="w-full border-t-2 absolute bottom-0 border-slate-300" />
      </div>
      <div>
        {filtered.desc ? (
          <p className="text-lg leading-5">{filtered.data}</p>
        ) : (
          <div className="flex flex-col gap-6 w-full">
            {filtered.data.map((item, i) => (
              <div key={i} className="w-full flex gap-3">
                <p className="w-full text-neutral-400 max-w-[100px] md:max-w-[150px] mdx:max-w-[200px] lg:max-w-[400px]">
                  {item.title}
                </p>
                <div className="flex w-full flex-col">
                  {item.data.map((subitem, j) => (
                    <p key={j}>{subitem}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}