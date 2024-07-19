import Image from "next/image"
import newsPhoto from "@/public/images/news/news-photo.png";
import OtherNews from "@/app/_components/NewsPages/OtherNews";

export default function NewsTitle() {
    return (
        <div className="w-full max-w-[1440px] mx-auto flex flex-col  gap-1 px-2 ">
            <div className=" mt-4">
                <p className="text-gray-400 text-[16px] mdx:text-[18px]">12 June</p>
                <h1 className="text-[25px] text-black mb-2 mdx:text-[34px]">Advances in Medical Imaging Technology</h1>
            </div>
            <div >
                <p className="text-[16px] mdx:text-[20px]">Recent developments in medical imaging technology are transforming diagnostic capabilities and patient outcomes. According to a recent article in The Lancet, innovations such as AI-driven imaging analysis and high-resolution ultrasound are significantly enhancing the accuracy and speed of diagnosis. AI algorithms can now detect anomalies in imaging results that might be overlooked by the human eye, thereby improving early detection rates of diseases like cancer. High-resolution ultrasound, on the other hand, is providing clearer images of soft tissues, which is crucial for diagnosing conditions like liver fibrosis and cardiovascular diseases.
                    Furthermore, The Lancet reports that integrating these technologies into standard medical practice requires robust training programs for medical professionals to ensure they can effectively utilize these tools. The potential of these technologies to revolutionize healthcare is immense, promising not only better diagnostic accuracy but also more personalized patient care.</p>
            </div>
            <div >
                <Image
                    src={newsPhoto}
                    width={500}
                    height={500}
                    alt={`News Image`}
                    className="w-full h-auto max-w-[832px] max-h-[450px] object-cover rounded-3xl"
                />
            </div>
            <div>
                <h2 className="text-[20px] mdx:text-[27px]">Impact on Healthcare</h2>
                <p className="text-[16px] mdx:text-[20px]">The continuous advancements in medical imaging technology are significantly impacting the healthcare industry. Improved diagnostic accuracy leads to earlier detection of diseases, enabling timely and effective treatments. Enhanced imaging capabilities also contribute to better patient management, reducing the need for invasive procedures and hospital stays
                </p>
            </div>
            <div className="mt-[60px] mb-[140px]">
                <ol className="list-decimal list-inside">
                    <li className="text-[20px] mdx:text-[27px]">Artificial Intelligence (AI) and Machine Learning</li>
                    <p className="text-[16px] mdx:text-[20px]">AI and machine learning algorithms are revolutionizing medical imaging by enabling faster and more accurate analysis of images. These technologies assist radiologists in detecting abnormalities, such as tumors or fractures, with greater precision and efficiency. AI-powered imaging tools are also capable of predicting patient outcomes and aiding in personalized treatment planning</p>
                    <li className="text-[20px] mt-[60px]">High-Resolution Imaging</li>
                    <p className="text-[16px] mdx:text-[20px]">AI and machine learning algorithms are revolutionizing medical imaging by enabling faster and more accurate analysis of images. These technologies assist radiologists in detecting abnormalities, such as tumors or fractures, with greater precision and efficiency. AI-powered imaging tools are also capable of predicting patient outcomes and aiding in personalized treatment planning</p>
                    <div className="mt-[30px] mb-[10px]">
                        <Image
                            src={newsPhoto}
                            width={500}
                            height={500}
                            alt={`News Image`}
                            className="w-full h-auto max-w-[832px] max-h-[450px] object-cover rounded-3xl"
                        />
                    </div>
                    <li className="text-[20px] mt-[60px] mdx:text-[27px]">3D and 4D Imaging</li>
                    <p className="text-[16px] mdx:text-[20px]">AI and machine learning algorithms are revolutionizing medical imaging by enabling faster and more accurate analysis of images. These technologies assist radiologists in detecting abnormalities, such as tumors or fractures, with greater precision and efficiency. AI-powered imaging tools are also capable of predicting patient outcomes and aiding in personalized treatment planning</p>
                    <div className="mt-[30px] mb-[10px]">
                        <Image
                            src={newsPhoto}
                            width={500}
                            height={500}
                            alt={`News Image`}
                            className="w-full h-auto max-w-[832px] max-h-[450px] object-cover rounded-3xl"
                        />
                    </div>

                </ol>
            </div>
            <div className="mdl:flex mdl:justify-center">
                
            </div>
        </div>
    );
}