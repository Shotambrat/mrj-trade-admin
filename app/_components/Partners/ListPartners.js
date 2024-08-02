"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from 'next/image';
import PartnersMain from "@/app/_components/AdminModal/Partners/PartnersMain";

export default function ListPartners() {
    const [partners, setPartners] = useState([]);
    const [adminModal, setAdminModal] = useState(false);

    useEffect(() => {
        async function fetchPartners() {
            try {
                const response = await fetch("https://mrjtrade.uz/partner/get-all");

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                console.log("Fetched data:", data);

                if (data && data.data) {
                    setPartners(data.data);
                } else {
                    console.error("Unexpected response format:", data);
                }
            } catch (error) {
                console.error("Error fetching partners:", error);
            }
        }

        fetchPartners();
    }, []);

    console.log("Partners state:", partners);

    return (
        <div className="w-full max-w-[1440px] mx-auto px-2 flex flex-col gap-8 mt-7">
            {adminModal && <PartnersMain setAdminModal={setAdminModal} />}
            <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
                {partners.map(card => (
                    <div key={card.id} className="bg-white p-4 w-full rounded-2xl border border-gray-200 mdx:p-0 mdl:p-5 slg:h-auto">
                        <div className="mdx:flex mdx:flex-row items-center justify-between">
                            <div className="mdx:w-[50%] h-[70px] relative mt-3">
                                <Image src={card.photo.url} alt={card.title} layout="fill" objectFit="contain" />
                            </div>
                            <div className='mdx:mb-4 mdx:w-[50%]'>
                                <h2 className="text-xl font-bold right mt-4 mdx:mb-2 xl:text-[28px]">{card.title}</h2>
                                <p className="mb-4 text-gray-600 xl:text-[18px]">{card.main_description}</p>
                                <Link href={`/partners/${card.slug}`}>
                                    <span className="text-green-600 font-semibold hover:underline mdx:text-[18px]">
                                        read more →
                                    </span>
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
                <button onClick={() => setAdminModal(true)} className="border border-greenView border-dashed text-greenView text-3xl font-semibold rounded-2xl p-5">
                    +
                </button>
            </div>
        </div>
    );
}