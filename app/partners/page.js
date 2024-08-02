import Title from "@/app/_components/Partners/Title.js";
import ListPartners from "@/app/_components/Partners/ListPartners.js";
import Map from "@/app/_components/About/Map";

export default function Page() {
    return (
        <div className="w-full bg-white flex flex-col gap-23 ">
            <Title />
            <ListPartners />
            <Map />
        </div>
    );
}