"use client"
import Image from "next/image";
import { useState, useEffect } from "react";
import Map from "@/app/_components/About/Map";
import NewCard from "@/app/_components/News/NewCard";
import NewPages from "@/app/_components/NewsPages/NewsTitle";
import Share from "@/app/_components/NewsPages/Share";
import OtherNews from "@/app/_components/NewsPages/OtherNews";
import Link from "next/link";


export default function page() {
    return (
        <div >
            <NewPages />
            <Share />
            <OtherNews />
            <Map />
        </div>
    );
}