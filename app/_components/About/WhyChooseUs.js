import React from 'react';

export default function WhatWeDo() {
    const services = [
        {
            title: "On-site support",
            description: "Available throughout Dubai",
        },
        {
            title: "Service excellence",
            description: "Installation and training provided on-sitebai",
        },
        {
            title: "Quality assurance",
            description: "All products are certified, and services are licensed",
        },
        {
            subtitle: "Trusted by Over 2 000 Medical instructions across the world. Trust us too!",
            title: "",
            description: "",
            highlight: true,
        },
    ];

    return (
        <>
            <div className="max-w-[1440px] mx-auto">
                <div className="text-[25px] mdx:text-[36px] xl:text-[40px] px-2">Why choose us?</div>
                <div className="p-4">
                    <div className="grid gap-4 mdx:grid-cols-2 2xl:grid-cols-4">
                        {services.map((service, index) => (
                            <div
                                key={index}
                                className={`flex ${service.highlight ? 'justify-center items-center text-left' : 'flex-col'} h-[186px] slg:h-[200px] 2xl:h-[236px] p-6 mdx:p-4 mdl:p-6 2xl:p-4 border rounded-[20px] ${service.highlight ? "bg-greentxt text-white" : "bg-white text-black"
                                    }`}
                            >
                                <div className="text-[25px] font-bold text-greentxt mb-[20px] mdx:mb-[10px] mdl:mb-[20px] slg:text-[30px]">
                                    {service.title && (
                                        <>
                                            <span className="block mdx:hidden">{service.title}</span>
                                            <span className="hidden mdx:block">
                                                {service.title.split(' ').map((word, i) => (
                                                    <span key={i}>
                                                        {word}
                                                        {i === 0 && <br />}
                                                        {i !== 0 && ' '}
                                                    </span>
                                                ))}
                                            </span>
                                        </>
                                    )}
                                </div>
                                <div className="text-[18px] slg:text-[20px]">{service.description}</div>
                                <div className="text-[18px] slg:text-[22px]">{service.subtitle}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}