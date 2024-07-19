import Image from "next/image"
import newsPhoto from "@/public/images/news/news-photo.png";
import Link from "next/link";

export default function NewsTitle() {
    return (
        <div className="max-w-[1440px] mx-[15px] mdl:mx-auto">
            <div className="bg-green-100 rounded-3xl mdl:flex mdl:flex-row-reverse mdl:items-center mdl:justify-between">
                <div className="mb-3 mdl:flex-1 mdl:items-center mdl:flex mdl:my-3">
                    <Image
                        src={newsPhoto}
                        width={500}
                        height={500}
                        alt={`News Image`}
                        className="w-full h-auto max-w-[560px] max-h-[308px] object-contain rounded-3xl mdl:max-h-[383px] mdl:max-w-[383px]"
                    />
                </div>
                <div className="flex flex-col uppercase text-greentxt mx-4 mdl:flex-1">
                    <h2 className="font-semibold text-[27px]">
                        Share this news<br /> with a friend!
                    </h2>
                    <p className="text-gray-500 text-[15px] normal-case mdl:w-[300px]">
                        Learn more about the latest advances in medical imaging! Share this news with friends and colleagues who may be interested
                    </p>
                    <Link href="/">
                        <button className="px-[76px] w-[220px] py-4 mt-[20px] mb-[20px] rounded-2xl bg-greentxt text-white font-semibold">
                            Share
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
